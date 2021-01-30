import {ApiResponse, ApisauceInstance, create} from 'apisauce';
import {User} from 'src/models/auth-store';
import {AuthToken} from 'src/models/auth-store/token';
import {Question, QuestionResult} from 'src/models/quiz-store';
import {ApiConfig, DEFAULT_API_CONFIG} from './api-config';
import {getGeneralApiProblem} from './api-problem';
import {
  QuestionResultResponse,
  RankingResponse,
  QuizResponse,
  LoginResponse,
  ProfileResponse,
  RegisterForm,
  ProfileUpdateForm,
  GeneralResult,
  UsernameCheckResponse,
} from './api.types';
import {
  convertAuthToken,
  convertUser,
  convertQuestion,
  convertQuestionResult,
} from './converters';

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  async updateBearerToken(bearerToken: string) {
    this.apisauce.setHeader('Authorization', bearerToken);
  }

  async getQuiz(): Promise<QuizResponse> {
    const response: ApiResponse<any> = await this.apisauce.get('/quiz');

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;
      const resultData: Question[] = rawData.questions.map(convertQuestion);
      return {
        kind: 'ok',
        data: {
          startTime: rawData.startTime,
          quizId: rawData.id,
          questions: resultData,
        },
      };
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async getTrialQuiz(): Promise<QuizResponse> {
    const response: ApiResponse<any> = await this.apisauce.get('/quiz/trial');

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;
      const resultData: Question[] = rawData.questions.map(convertQuestion);
      return {
        kind: 'ok',
        data: {
          startTime: rawData.startTime,
          quizId: rawData.id,
          questions: resultData,
        },
      };
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async getQuestionResult(
    quizId: string,
    questionId: string,
    answerId: string,
    answeredInMs: number,
  ): Promise<QuestionResultResponse> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `/quiz/${quizId}/question/${questionId}/answer`,
      {
        answerId: answerId,
        totalTimeTakenInMs: answeredInMs,
      },
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;
      const resultData: QuestionResult = convertQuestionResult(rawData);
      return {kind: 'ok', data: resultData};
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async getQuizRanking(quizId: string): Promise<RankingResponse> {
    const response: ApiResponse<any> = await this.apisauce.get(
      `/quiz/${quizId}/result`,
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;
      const resultData: User[] = rawData.participants.map(convertUser);
      return {
        kind: 'ok',
        data: resultData,
      };
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async getGlobalRanking(): Promise<RankingResponse> {
    const response: ApiResponse<any> = await this.apisauce.get(
      '/global/ranking',
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;
      const resultData: User[] = rawData.map(convertUser);
      return {
        kind: 'ok',
        data: resultData,
      };
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async login(userName: string, password: string): Promise<LoginResponse> {
    const response: ApiResponse<any> = await this.apisauce.post('/user/login', {
      userName,
      password,
    });

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;
      const resultData: AuthToken = convertAuthToken(rawData);
      return {kind: 'ok', data: resultData};
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async checkUsernameExists(userName: string): Promise<UsernameCheckResponse> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post(
      '/user/exists',
      {userName},
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;
      return {kind: 'ok', data: rawData.userNameExists};
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async register(form: RegisterForm): Promise<LoginResponse> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.post('/user', form);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;
      const resultData: AuthToken = convertAuthToken(rawData);
      return {kind: 'ok', data: resultData};
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async updateProfile(form: ProfileUpdateForm): Promise<ProfileResponse> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.put('/user', form);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;
      const resultData: User = convertUser(rawData);
      return {kind: 'ok', data: resultData};
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async getProfile(): Promise<ProfileResponse> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get('/user');

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;
      const resultData: User = convertUser(rawData);
      return {kind: 'ok', data: resultData};
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async getDefaultAvatars(): Promise<GeneralResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      '/user/avatar/icon',
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;

      return {kind: 'ok', data: rawData};
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async getAdvertisement(): Promise<GeneralResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(
      '/quiz/advertisement',
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;

      return {kind: 'ok', data: rawData};
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async uploadAvatar(
    name: string,
    uri: string,
    type: string,
  ): Promise<ProfileResponse> {
    const form = new FormData();
    form.append('file', {
      name: name,
      uri: uri,
      type: type,
    });

    const response: ApiResponse<any> = await this.apisauce.post(
      '/user/avatar',
      form,
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    // transform the data into the format we are expecting
    try {
      let resultData = response.data;
      const data = convertUser(resultData);

      return {kind: 'ok', data: data};
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }

  async logout(): Promise<LoginResponse> {
    const response: ApiResponse<any> = await this.apisauce.delete(
      '/user/logout',
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    try {
      const rawData = response.data;
      const resultData: AuthToken = convertAuthToken(rawData);
      return {kind: 'ok', data: resultData};
    } catch (err) {
      return {kind: 'bad-data'};
    }
  }
}
