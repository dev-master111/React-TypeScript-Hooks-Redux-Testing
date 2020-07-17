import { Middleware } from 'redux';
import { QuestionActions } from '../actions/questions';

const FETCH_URL = (amount: number) => `https://opentdb.com/api.php?amount=${amount}&category=21&difficulty=medium&type=multiple`;

export const questions: Middleware = (store) => (next) => (action) => {
  switch (action.type) {
    case QuestionActions.Type.GET_QUESTIONS:
      fetch(FETCH_URL(store.getState().status.loadCount))
        .then(async (res) => {
          const data = await res.json();
          const results = data.results.slice(data.results.length - 10, data.results.length);
          const questions = 
            results
              .map((q: any, idx: number) => ({
                ...q,
                id: store.getState().status.loadCount - 10 + idx
              }))
              .sort((q1: any, q2: any) => {
                if (q1.id < q2.id) {
                  return 1;
                } else if (q1.id === q2.id) {
                  return 0;
                } else {
                  return -1;
                }
              });
          next(QuestionActions.getQuestionsSuccess(questions));
        })
        .catch(err => next(QuestionActions.getQuestionsFail()))
      break;
    default:
      break;
  }
  return next(action);
};
