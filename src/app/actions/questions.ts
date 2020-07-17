import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import { QuestionModel } from 'app/models';

export namespace QuestionActions {
  export enum Type {
    ADD_QUESTION = 'ADD_QUESTION',
    EDIT_QUESTION = 'EDIT_QUESTION',
    DELETE_QUESTION = 'DELETE_QUESTION',
    SELECT_QUESTION = 'SELECT_QUESTION',
    GET_QUESTIONS = 'GET_QUESTIONS',
    GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS',
    GET_QUESTIONS_FAIL = 'GET_QUESTIONS_FAIL',
    CLEAR_COMPLETED = 'CLEAR_COMPLETED'
  }

  export const addQuestion = createAction<PartialPick<QuestionModel, 'text'>>(Type.ADD_QUESTION);
  export const editQuestion = createAction<PartialPick<QuestionModel, 'id'>>(Type.EDIT_QUESTION);
  export const deleteQuestion = createAction<QuestionModel['id']>(Type.DELETE_QUESTION);
  export const selectQuestion = createAction<QuestionModel['id']>(Type.SELECT_QUESTION);
  export const getQuestions = createAction(Type.GET_QUESTIONS);
  export const getQuestionsSuccess = createAction<Array<QuestionModel>>(Type.GET_QUESTIONS_SUCCESS);
  export const getQuestionsFail = createAction(Type.GET_QUESTIONS_FAIL);
  export const clearCompleted = createAction(Type.CLEAR_COMPLETED);
}

export type QuestionActions = Omit<typeof QuestionActions, 'Type'>;
export const useQuestionActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = QuestionActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as QuestionActions;
};
