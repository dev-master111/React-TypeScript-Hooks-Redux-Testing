import React from 'react';
import styles from './style.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { QuestionModel } from 'app/models';
import { QuestionActions } from 'app/actions';

export namespace QuestionItem {
  export interface Props {
    question: QuestionModel;
    editQuestion: typeof QuestionActions.editQuestion;
    deleteQuestion: typeof QuestionActions.deleteQuestion;
    selectQuestion: typeof QuestionActions.selectQuestion;
  }
}

export const QuestionItem = ({ question, editQuestion, deleteQuestion, selectQuestion }: QuestionItem.Props) => {
  return (
    <Card className={styles.questionItem}>
      <div className={styles.label}>Question:</div>
      <div className={styles.text}>{question.question}</div>
      <div className={styles.label}>Category:</div>
      <div className={styles.text}>{question.category}</div>
      <div className={styles.label}>Difficulty:</div>
      <div className={styles.text}>{question.difficulty}</div>
      <div className={styles.buttons}>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          onClick={() => selectQuestion(question.id)}
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={styles.button}
          onClick={() => deleteQuestion(question.id)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};
