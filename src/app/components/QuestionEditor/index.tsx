import React from 'react';
import { QuestionTextInput } from '../QuestionTextInput';
import style from '../QuestionTextInput/style.css';
import { QuestionActions } from 'app/actions/questions';
import { QuestionModel } from 'app/models/QuestionModel';

export namespace QuestionEditor {
  export interface Props {
    editQuestion: typeof QuestionActions.editQuestion;
    questions: QuestionModel[];
  }
}

export const QuestionEditor = ({ editQuestion, questions }: QuestionEditor.Props): JSX.Element => {
  const handleSave = React.useCallback(
    (question: QuestionModel) => {
      editQuestion(question);
    },
    [editQuestion]
  );

  return (
    <div className={style.mainEditContainer}>
      <h3>Editor</h3>
      <QuestionTextInput
        newQuestion
        onSave={handleSave}
        placeholder="What needs to be done?"
        questions={questions}
      />
    </div>
  );
};
