import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {AuthStoreModel} from '../auth-store';
import {QuizStoreModel} from '../quiz-store/';
import {RankingStoreModel} from '../ranking-store';
import {TrialStoreModel} from '../trail-store/trial-store';

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  authStore: types.optional(AuthStoreModel, {}),
  quizStore: types.optional(QuizStoreModel, {}),
  rankingStore: types.optional(RankingStoreModel, {}),
  trialStore: types.optional(TrialStoreModel, {}),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
