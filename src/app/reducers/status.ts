import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { QuestionActions } from 'app/actions/questions';

const initialState: RootState.StatusState = {
  loadCount: 10,
  currentQuestion: -1
};

export const statusReducer = handleActions<RootState.StatusState, number>(
  {
    [QuestionActions.Type.GET_QUESTIONS_SUCCESS]: (state, action) => {
      return {
        ...state,
        loadCount: state.loadCount + 10
      }
    },
    [QuestionActions.Type.SELECT_QUESTION]: (state, action) => {
      return {
        ...state,
        currentQuestion: action.payload
      }
    },
    [QuestionActions.Type.DELETE_QUESTION]: (state, action) => {
      return {
        ...state,
        currentQuestion: -1
      };
    },
  },
  initialState
);
