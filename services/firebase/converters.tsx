import {Option, Question} from 'src/models/quiz-store';
import {QuizMeta} from 'src/models/quiz-store/quiz-meta';

export function convertOption(raw: any) {
  return {
    answerId: raw.id,
    text: raw.answer,
    answeredPercentage: raw.answeredPercentage || 0,
  } as Option;
}

export function convertQuestion(id: string, raw: any) {
  return {
    questionId: id,
    description: raw.questionText,
    mediaUrl: raw.media.length ? raw.media[0].caption : '',
    options: raw.options.map(convertOption),
    totalTimeSec: raw.maxDurationInSecs,
    sponsorLink: raw.sponsorLink || '',
  } as Question;
}

export const convertQuizMeta = (id: string, data: any) => {
  const result = data.lastQuestionResult
    ? data.lastQuestionResult.options.map(convertOption)
    : [];

  const completedQuestions = data.lastQuestionResult
    ? data.lastQuestionResult.completedQuestions
    : 0;

  const nextTimestamp = data.nextEntityStartTime
    ? data.nextEntityStartTime.toMillis()
    : 0;

  const activeTimestamp = data.currentEntityStartTime
    ? data.currentEntityStartTime.toMillis()
    : 0;

  return {
    quizId: id,
    activeQuestionId: data.currentQuestionId ? data.currentQuestionId : '',
    quizState: data.quizState,
    lastResultOptions: result,
    completedQuestions: completedQuestions,
    nextEntityStartTimestamp: nextTimestamp,
    activeEntityStartTimestamp: activeTimestamp,
    activeQuestion: data.currentQuestion
      ? convertQuestion(data.currentQuestionId || '', data.currentQuestion)
      : null,
    activeQuestionNumber: data.currentQuestionNumber || 0,
    totalQuestions: data.totalQuestions,
    mediaUrl: data.currentMedia ? data.currentMedia.link : '',
    activeEntityType: data.currentEntityType || 'video',
    nextEntityType: data.nextEntityType,
  } as QuizMeta;
};
