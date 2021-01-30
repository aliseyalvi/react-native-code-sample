import {User} from 'src/models/auth-store';
import {AuthToken} from 'src/models/auth-store/token';
import {Question, QuestionResult} from 'src/models/quiz-store';
import {GeneralApiProblem} from './api-problem';

export type GeneralResult = {kind: 'ok'; data: any} | GeneralApiProblem;

export type QuizResponse =
  | {
      kind: 'ok';
      data: {
        quizId: string;
        startTime: string;
        questions: Question[];
      };
    }
  | GeneralApiProblem;

export type QuestionResultResponse =
  | {
      kind: 'ok';
      data: QuestionResult;
    }
  | GeneralApiProblem;

export type RankingResponse =
  | {
      kind: 'ok';
      data: User[];
    }
  | GeneralApiProblem;

export type LoginResponse =
  | {
      kind: 'ok';
      data: AuthToken;
    }
  | GeneralApiProblem;

export type UsernameCheckResponse =
  | {
      kind: 'ok';
      data: boolean;
    }
  | GeneralApiProblem;

export type ProfileResponse =
  | {
      kind: 'ok';
      data: User;
    }
  | GeneralApiProblem;

export type RegisterForm = {
  name: string;
  userName: string;
  email: string;
  password: string;
};

export type ProfileUpdateForm = {
  name?: string;
  userName?: string;
  emailId?: string;
  userAvatar?: string;
};
