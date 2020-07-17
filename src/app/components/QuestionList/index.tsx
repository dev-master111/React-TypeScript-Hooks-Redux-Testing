import React from 'react';
import style from './style.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { QuestionActions } from 'app/actions/questions';
import { QuestionItem } from '../QuestionItem';
import { QuestionModel } from 'app/models/QuestionModel';

export namespace QuestionList {
  export interface Props {
    questions: QuestionModel[];
    actions: QuestionActions;
  }
}

export const QuestionList = ({ questions, actions }: QuestionList.Props): JSX.Element => {
  return (
    <section className={style.main}>
      <div className={style.header}>
        <div className={style.headerTitle}>Questions</div>
        <Button variant="outlined" color="primary" onClick={actions.getQuestions}>
          Load More
        </Button>
      </div>
      <List className={style.normal}>
        {questions.map((question) => (
          <ListItem alignItems="flex-start" key={question.id}>
            <QuestionItem
              question={question}
              selectQuestion={actions.selectQuestion}
              deleteQuestion={actions.deleteQuestion}
              editQuestion={actions.editQuestion}
            />
          </ListItem>
        ))}
      </List>
    </section>
  );
};
