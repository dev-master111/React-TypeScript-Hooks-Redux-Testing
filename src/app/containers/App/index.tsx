import React, { useEffect } from 'react';
import style from './style.css';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useQuestionActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { QuestionModel } from 'app/models';
import { QuestionEditor, QuestionList } from 'app/components';

const FILTER_VALUES = (Object.keys(QuestionModel.Filter) as (keyof typeof QuestionModel.Filter)[]).map(
  (key) => QuestionModel.Filter[key]
);

const FILTER_FUNCTIONS: Record<QuestionModel.Filter, (question: QuestionModel) => boolean> = {
  [QuestionModel.Filter.SHOW_ALL]: () => true,
  [QuestionModel.Filter.SHOW_ACTIVE]: (question) => !question.completed,
  [QuestionModel.Filter.SHOW_COMPLETED]: (question) => question.completed
};

export namespace App {
  export interface Props extends RouteComponentProps<void> {}
}

export const App = ({ history, location }: App.Props) => {
  const dispatch = useDispatch();
  const questionActions = useQuestionActions(dispatch);
  const { questions, filter } = useSelector((state: RootState) => {
    const hash = location?.hash?.replace('#', '');
    return {
      questions: state.questions,
      filter: FILTER_VALUES.find((value) => value === hash) ?? QuestionModel.Filter.SHOW_ALL
    };
  });

  useEffect(() => {
    questionActions.getQuestions();
  }, []);

  const filteredQuestions = React.useMemo(() => (filter ? questions.filter(FILTER_FUNCTIONS[filter]) : questions), [questions, filter]);

  return (
    <div className={style.normal}>
      <QuestionEditor editQuestion={questionActions.editQuestion} questions={filteredQuestions} />
      <QuestionList questions={filteredQuestions} actions={questionActions} />
    </div>
  );
};
