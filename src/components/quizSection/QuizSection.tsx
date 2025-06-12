import React, {ChangeEvent, useState} from 'react';
import {Question, QuestionType} from "../../types";
import {useNavigate} from "react-router-dom";
import {Box, Button, Dialog, DialogContent, DialogTitle, LinearProgress, TextField, Typography} from "@mui/material";
import styles from "./QuizSection.module.scss";

export interface QuizSectionProps {
  next: (value: string) => void;
  question: Question;
  percentComplete: number;
}

const QuizSection = (props: QuizSectionProps) => {
  const navigate = useNavigate();
  if (props.question.answer === '' && props.question.top1 === '') navigate('/');
  const [value, setValue] = useState<string>("");
  const [showExplanationDialog, setShowExplanationDialog] = useState<boolean>(false);
  const [showAnswerDialog, setShowAnswerDialog] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const realAnswer: string = props.question.answer.replace(/\|/g, '').toLowerCase();

  const reset = () => {
    setIsSubmitted(false);
    setShowAnswerDialog(false);
    setShowExplanationDialog(false);
    setValue('');
  };

  const openExplanation = () => {
    setShowExplanationDialog(true)
  };

  const processNext = (currentValue: string) => {
    if (props.question.questionType === QuestionType.PorOParaFIB) {
      if (showExplanationDialog) {
        reset();
        return props.next(currentValue);
      }
      if (isSubmitted) return;

      setIsSubmitted(true);
      if (currentValue.toLowerCase() === realAnswer) {
        setTimeout(() => {
          reset();
          props.next(currentValue);
        }, 700)
      } else {
        setTimeout(() => setShowExplanationDialog(true), 700)
      }
      return;
    }
    if (isSubmitted) {
      reset();
      return props.next(currentValue);
    }
    setIsSubmitted(true);
    if (currentValue.toLowerCase() === realAnswer) {
      setTimeout(() => {
        reset();
        props.next(currentValue);
      }, 400);
    } else {
      setShowAnswerDialog(true);
    }
  };

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains('nji-example')) return;
    reset();
    props.next(value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (value: string) => {
    setValue(value);
    processNext(value);
  };

  return (
    <Box className={styles.nji_quiz_section}>
      <LinearProgress variant="determinate" value={props.percentComplete} className={styles.nji_progress}/>
      <Typography variant="h5" className={styles.nji_question}>
        {props.question.top1}
      </Typography>
      <TextField
        autoFocus
        fullWidth
        value={value}
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(value);
          }
        }}
        disabled={isSubmitted}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSubmit(value)}
        disabled={isSubmitted}
      >
        Submit
      </Button>
      <Dialog
        open={showAnswerDialog}
        onClose={handleClose}
      >
        <DialogTitle>Incorrect</DialogTitle>
        <DialogContent>
          <Typography>
            The correct answer is: {props.question.answer}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClose({} as React.MouseEvent<HTMLDivElement>)}
          >
            Next
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={showExplanationDialog}
        onClose={handleClose}
      >
        <DialogTitle>Explanation</DialogTitle>
        <DialogContent>
          <Typography>
            {props.question.explanation}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClose({} as React.MouseEvent<HTMLDivElement>)}
          >
            Next
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default QuizSection;