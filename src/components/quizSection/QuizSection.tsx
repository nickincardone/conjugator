import React, {ChangeEvent, useState} from "react";
import {Question} from "../../types";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExplanationDialog from "../dialogs/explanationDialog/ExplanationDialog";
import rules from "../../data/rules";
import SimpleDialog from "../dialogs/answerDialog/AnswerDialog";
import QuestionCard from "../cards/QuestionCard";

export interface QuizSectionProps {
  question: Question;
  next: (s: string) => void;
  // percentComplete: number;
  // value: string;
}

const QuizSection = (props: QuizSectionProps) => {
  const [value, setValue] = useState<string>("");
  const [isClickable, setIsClickable] = useState<boolean>(true);
  const [showExplanationDialog, setShowExplanationDialog] = useState<boolean>(false);
  const [showAnswerDialog, setShowAnswerDialog] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const realAnswer: string = props.question.answer.replace(/\|/g, '').toLowerCase();

  const openExplanation = () => {

  };

  const processNext = (value: string) => {
    if (isSubmitted) {
      setIsSubmitted(false);
      return props.next(value);
    }
    setIsSubmitted(true);
    if (value.toLowerCase() === realAnswer) {
      setTimeout(() => {
        setIsSubmitted(false);
        props.next(value);
      }, 400)
    } else {
      setShowAnswerDialog(true);
    }
  };

  const handleClose = () => {
    setShowAnswerDialog(false);
    setIsSubmitted(false);
    props.next(value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (value: string) => {
    setValue(value);

    processNext(value);
  };

  const question = (
    <QuestionCard
      question={props.question}
      value={value}
      showExplanation={openExplanation}
      clickable={isClickable}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      isSubmitted={isSubmitted}/>
  );

  return (
    <React.Fragment>
      {/*<LinearProgress*/}
      {/*  variant="determinate"*/}
      {/*  color="secondary"*/}
      {/*  value={props.percentComplete}/>*/}
      {/*<ExplanationDialog*/}
      {/*  open={showExplanationDialog}*/}
      {/*  handleClose={this.processNext}*/}
      {/*  rule={rules[props.question.explanation]}/>*/}
      <SimpleDialog
        open={showAnswerDialog}
        answer={value}
        handleClose={handleClose}
        question={props.question}/>
      {question}
    </React.Fragment>
  )
};

export default QuizSection;