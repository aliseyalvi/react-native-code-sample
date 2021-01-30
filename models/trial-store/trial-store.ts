import {
  types,
  Instance,
  SnapshotOut,
  getEnv,
  getRoot,
  flow,
} from 'mobx-state-tree';
import {QuestionResultResponse, QuizResponse} from 'src/services/api';
import {Environment} from '../environment';
import {QuestionModel} from '../quiz-store';
import {RootStore} from '../root-store';

export const TrialStoreModel = types
  .model('AuthStore')
  .props({
    quizId: types.optional(types.string, ''),
    questions: types.optional(types.array(QuestionModel), []),
    activeQuestionIndex: types.optional(types.number, 0),
    startTime: types.optional(types.number, 0),
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
    get totalQuestions() {
      return self.questions.length;
    },
    get activeQuestion() {
      if (self.questions.length > self.activeQuestionIndex) {
        return self.questions[self.activeQuestionIndex];
      }
      return null;
    },
    get wasLastQuestion() {
      if (self.questions.length - 1 === self.activeQuestionIndex) {
        return true;
      }
      return false;
    },
    get totalPointsEarned() {
      var points = 0;
      self.questions.forEach((question) => {
        points += question.result ? question.result.pointsEarned : 0;
      });
      return points;
    },
  }))
  .actions((self) => ({
    reset() {
      self.quizId = '';
      self.questions = [] as any;
      self.activeQuestionIndex = 0;
    },
    setQuizId(id: string) {
      self.quizId = id;
    },
    setQuestions(questions: Question[] | QuestionSnapshot[]) {
      self.questions = questions as any;
    },
    setStatus(value: 'idle' | 'pending' | 'done' | 'error') {
      self.status = value;
    },
    setStatusMessage(message: string) {
      self.statusMessage = message;
    },
    setNextAsActive() {
      self.activeQuestionIndex = self.activeQuestionIndex + 1;
    },
  }))
  .actions((self) => ({
    getQuestions: flow(function* () {
      self.setStatus('pending');
      try {
        const result: QuizResponse = yield self.environment.api.getTrialQuiz();
        if (result.kind === 'ok') {
          self.setQuestions(result.data.questions);
          self.setQuizId(result.data.quizId);
          return result.data;
        } else {
          self.setStatus('error');
        }
      } catch (err) {
        self.setStatus('error');
      }
    }),
    getActiveQuestionResult: flow(function* () {
      self.setStatus('pending');
      try {
        const activeQuestion = self.activeQuestion;
        if (!activeQuestion) {
          throw new Error('No active question');
        }

        const result: QuestionResultResponse = yield self.environment.api.getQuestionResult(
          self.quizId,
          activeQuestion.questionId,
          activeQuestion.selectedAnswerId,
          5000,
        );
        if (result.kind === 'ok') {
          activeQuestion.setResult(result.data);
          return result.data;
        } else {
          self.setStatus('error');
        }
      } catch (err) {
        self.setStatus('error');
      }
    }),
  }));

export interface TrialStore extends Instance<typeof TrialStoreModel> {}

export interface TrialStoreSnapshot
  extends SnapshotOut<typeof TrialStoreModel> {}
