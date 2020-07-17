import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { QuestionActions } from 'app/actions/questions';
// import { QuestionModel } from 'app/models';

const initialState: RootState.QuestionState = [
];

export const questionReducer = handleActions<RootState.QuestionState, any>(
  {
    [QuestionActions.Type.ADD_QUESTION]: (state, action) => {
      if (action.payload && action.payload.text) {
        return [
          // {
          //   id: state.reduce((max, question) => Math.max(question.id || 1, max), 0) + 1,
          //   completed: false,
          //   text: action.payload.text
          // },
          ...state
        ];
      }
      return state;
    },
    [QuestionActions.Type.DELETE_QUESTION]: (state, action) => {
      return state.filter((question) => question.id !== (action.payload as any));
    },
    [QuestionActions.Type.EDIT_QUESTION]: (state, action) => {
      return state.map((question) => {
        if (!question || !action || !action.payload) {
          return question;
        }
        return (question.id || 0) === action.payload.id ? { ...action.payload } : question;
      });
    },
    [QuestionActions.Type.CLEAR_COMPLETED]: (state, action) => {
      return state.filter((question) => question.completed === false);
    },
    [QuestionActions.Type.GET_QUESTIONS_SUCCESS]: (state, action) => {
      return [
        ...action.payload,
        ...state
      ];
    }
  },
  initialState
);
