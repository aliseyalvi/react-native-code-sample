import {
  types,
  Instance,
  SnapshotOut,
  getEnv,
  getRoot,
  flow,
} from 'mobx-state-tree';
import {RankingResponse} from 'src/services/api';
import {User, UserModel, UserSnapshot} from '../auth-store';

import {Environment} from '../environment';
import {RootStore} from '../root-store';

export const RankingStoreModel = types
  .model('RankingStore')
  .props({
    globalRakings: types.optional(types.array(UserModel), []),
    quizRankings: types.optional(types.array(UserModel), []),
    showRankingAtQuizEnd: types.optional(types.boolean, false),
    statusMessage: types.optional(types.string, ''),
    status: types.optional(
      types.enumeration(['idle', 'pending', 'done', 'error']),
      'idle',
    ),
  })
  .views((self) => ({
    get environment() {
      return getEnv(self) as Environment;
    },
    get rootStore(): RootStore {
      return getRoot(self) as RootStore;
    },
    get isLoading() {
      return self.status === 'pending';
    },
  }))
  .actions((self) => ({
    setGlobalRankings(data: User[] | UserSnapshot[]) {
      self.globalRakings = data as any;
    },
    setQuizRankings(data: User[] | UserSnapshot[]) {
      self.quizRankings = data as any;
    },
    setShowRankingAtQuizEnd(value: boolean) {
      self.showRankingAtQuizEnd = value;
    },
    setStatus(value: 'idle' | 'pending' | 'done' | 'error') {
      self.status = value;
    },
    setStatusMessage(message: string) {
      self.statusMessage = message;
    },
  }))
  .actions((self) => ({
    getGlobalRankings: flow(function* () {
      self.setStatus('pending');
      try {
        const result: RankingResponse = yield self.environment.api.getGlobalRanking();
        if (result.kind === 'ok') {
          self.setGlobalRankings(result.data);
          return result.data;
        } else {
          self.setStatus('error');
        }
      } catch (err) {
        self.setStatus('error');
      }
    }),
    getQuizRankings: flow(function* () {
      self.setStatus('pending');
      self.setQuizRankings([]);
      try {
        const result: RankingResponse = yield self.environment.api.getQuizRanking(
          self.rootStore.quizStore.lastLiveQuizId,
        );
        if (result.kind === 'ok') {
          self.setQuizRankings(result.data);
          return result.data;
        } else {
          self.setStatus('error');
        }
      } catch (err) {
        self.setStatus('error');
      }
    }),
  }));

export interface RankingStore extends Instance<typeof RankingStoreModel> {}

export interface RankingStoreSnapshot
  extends SnapshotOut<typeof RankingStoreModel> {}
