import { QuestionModel, StatusModel } from 'app/models';

export interface RootState {
  questions: RootState.QuestionState;
  router?: any;
  status: RootState.StatusState;
}

export namespace RootState {
  export type QuestionState = QuestionModel[];
  export type StatusState = StatusModel;
}
