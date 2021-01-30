import {User} from 'src/models/auth-store';
import {AuthToken} from 'src/models/auth-store/token';
import {Option, Question, QuestionResult} from 'src/models/quiz-store';

export function convertAuthToken(raw: any) {
  return {
    access_token: raw.access_token,
    expires_in: raw.expires_in,
    refresh_expires_in: raw.refresh_expires_in,
    refresh_token: raw.refresh_token || '',
    token_type: raw.token_type || '',
    scope: raw.scope || '',
    session_state: raw.session_state || '',
    guest_user: raw.guest_user || false,
    updatedAt: new Date().getTime(),
  } as AuthToken;
}

export function convertOption(raw: any) {
  return {
    answerId: raw.id,
    text: raw.answer,
    answeredPercentage: raw.answeredPercentage || 0,
  } as Option;
}

export function convertQuestion(raw: any) {
  return {
    questionId: raw.id,
    description: raw.questionText,
    mediaUrl: raw.media.length ? raw.media[0].caption : '',
    options: raw.options.map(convertOption),
  } as Question;
}

export function convertQuestionResult(raw: any) {
  return {
    correctAnswerId: raw.correctAnswerId,
    pointsEarned: raw.pointsEarned || 0,
    isCorrectAnswer: raw.isCorrectAnswer || false,
    options: raw.options.map(convertOption),
  } as QuestionResult;
}

export function convertUser(raw: any) {
  return {
    id: raw.id,
    name: raw.name,
    avatarUrl: raw.avatarUrl || '',
    points: raw.points || '0',
    ranking: raw.ranking || '0',
    emailId: raw.emailId,
    phoneNumber: raw.phoneNumber || '',
    userName: raw.userName,
  } as User;
}
