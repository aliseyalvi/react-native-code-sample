import firestore from '@react-native-firebase/firestore';
import {QuizMeta} from 'src/models/quiz-store/quiz-meta';
import {convertQuestion, convertQuizMeta} from './converters';

export const listenForLiveQuiz = (onData: (data: QuizMeta | null) => void) => {
  return firestore()
    .collection('live_quiz')
    .where('quizState', '==', 'in_progress')
    .onSnapshot((snapshot) => {
      if (snapshot.docs.length > 0) {
        const quizId = snapshot.docs[0].id;
        const data = snapshot.docs[0].data();
        console.log('User data: ', data);
        if (data) {
          const quizMeta = convertQuizMeta(quizId, data);
          onData(quizMeta);
        }
      } else {
        onData(null);
      }
    });
};

export const getQuestion = async (questionId: string) => {
  try {
    const questionSnap = await firestore()
      .collection('quiz_question')
      .doc(questionId)
      .get();

    return convertQuestion(questionSnap.id, questionSnap.data());
  } catch (err) {
    console.error('Failed to read question');
  }
};
