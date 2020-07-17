import { combineReducers } from 'redux';
import { RootState } from './state';
import { questionReducer } from './questions';
import { statusReducer } from './status';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  questions: questionReducer,
  status: statusReducer,
});
