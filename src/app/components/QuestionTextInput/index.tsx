import React, { useState, useEffect } from 'react';
// import classNames from 'classnames';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
// import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit';
import { QuestionModel } from 'app/models/QuestionModel';
import { RootState } from 'app/reducers';
import style from './style.css';

export namespace QuestionTextInput {
  export interface Props {
    placeholder?: string;
    newQuestion?: boolean;
    onSave: (question: QuestionModel) => void;
    questions: QuestionModel[];
  }

  export interface State {
    text: string;
  }
}

export const QuestionTextInput = ({ placeholder, onSave, questions }: QuestionTextInput.Props): JSX.Element => {
  const initQuestion: QuestionModel = {
    completed: false
  };

  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState(Array<string>());
  const [currentQuestion, setCurrentQuestion] = useState(initQuestion);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [errors, setErrors] = useState(Array<string>());

  const { status } = useSelector((state: RootState) => {
    return ({ ...state });
  });

  useEffect(() => {
    if (status.currentQuestion >=0 && questions.length > 0) {
      const selectedQuestion = questions.find(q => q.id === status.currentQuestion);

      if (selectedQuestion) {
        setCurrentQuestion(selectedQuestion);

        if (selectedQuestion.question) {
          setQuestionText(selectedQuestion.question);
        }

        if (selectedQuestion.correct_answer && selectedQuestion.incorrect_answers) {
          setAnswers([
            selectedQuestion.correct_answer,
            ...selectedQuestion.incorrect_answers
          ]);
        }
      }
    } else {
      setCurrentQuestion(initQuestion);
    }
  }, [status.currentQuestion]);

  const handleSubmit = () => {
    const newErrors = [];
    if (correctAnswerIndex < 0) {
      newErrors.push('At least one answer must be correct');
    }

    if (answers.length < 2) {
      newErrors.push('At least one answer must be incorrect');
    }

    if (answers.includes('')) {
      newErrors.push(`Answers can't be an empty string`);
    }

    if (questionText === '') {
      newErrors.push(`The question can't be an empty string`);
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      const newQuestion = currentQuestion;

      if (answers[correctAnswerIndex]) {
        newQuestion.correct_answer = answers[correctAnswerIndex];
      }

      const wrongAnswers = answers.filter((a, idx) => idx !== correctAnswerIndex);
      newQuestion.incorrect_answers = wrongAnswers;

      newQuestion.question = questionText;

      onSave(newQuestion);
    }
  };

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuestionText(event.target.value);
    },[setQuestionText]);

  const handleChangeAnswer = (answer: string, index: number) => {
    const newAnswers = [ ...answers ];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  }

  const handleSelectAnswer = (checked: boolean, index: number) => {
    if (checked) {
      setCorrectAnswerIndex(index);
    }
  }

  const removeAnswer = (index: number) => {
    const newAnswers = answers.filter((a, idx) => idx !== index);
    setAnswers(newAnswers);

    if (correctAnswerIndex === index) {
      setCorrectAnswerIndex(-1);
    }
  }

  const addAnswer = () => {
    const newAnswers = [ ...answers, ''];
    setAnswers(newAnswers);
  }

  return (
    <div className={style.mainEditContainer}>
      {currentQuestion.question &&
        <form noValidate autoComplete="off">
          <Card className={style.cardContainer}>
            {isPreview ?
              <div className={style.previewQuestion}>
                {questionText}
              </div>
              :
              <TextField
                id="questionField"
                className={style.textField}
                label="Question"
                value={questionText}
                onChange={handleChange}
              />
            }
            {!isPreview &&
              <div className={style.answersHeader}>
                <div>Answers</div>
                <div>Is Correct</div>
              </div>
            }
            {!isPreview &&
              <div className={style.answers}>
                {
                  answers.map((answer, index) =>
                    <div className={style.answerItem} key={`answer_${index}`}>
                      <TextField
                        id={`answer${index}`}
                        className={style.textField}
                        value={answer}
                        onChange={(e) => handleChangeAnswer(e.target.value, index)}
                      />
                      <IconButton
                        color="secondary"
                        aria-label="delete answer"
                        component="span"
                        onClick={() => removeAnswer(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Checkbox
                        checked={index === correctAnswerIndex}
                        onChange={e => handleSelectAnswer(e.target.checked, index)}
                        name={`checkAnswer${index}`}
                        color="primary"
                      />
                    </div>
                  )
                }
              </div>
            }
            {
              isPreview &&
                <div className={style.answers}>
                  {
                    answers.map((answer, index) =>
                      <div className={style.previewAnswerItem} key={`answer_${index}`}>
                        {answer}
                      </div>
                    )
                  }
                </div>
            }
            <div className={style.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={style.button}
                onClick={() => addAnswer()}
              >
                + Add Answer
              </Button>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={style.button}
                  startIcon={<SaveIcon />}
                  onClick={() => handleSubmit()}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={style.button}
                  startIcon={isPreview ? <EditIcon /> : <PhotoCamera />}
                  onClick={() => setIsPreview(!isPreview)}
                >
                  {isPreview ? 'Edit' : 'Preview'}
                </Button>
              </div>
            </div>
            <ul className={style.errors}>
              {
                errors.map((error, idx) => 
                  <li className={style.errorItem}>{error}</li>
                )
              }
            </ul>
          </Card>
        </form>
      }
    </div>
  );
};
