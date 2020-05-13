import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {Question, QuestionType} from "../../types";
import AnswerDialog from "../dialogs/answerDialog/AnswerDialog";
import ExplanationDialog from "../dialogs/explanationDialog/ExplanationDialog";
import QuestionCard from "../cards/QuestionCard";
import {LinearProgress} from "@material-ui/core";
import {History, LocationState} from "history";
import rules from "../../data/rules";

export interface QuizSectionProps {
  question: Question;
  next: (s: string) => void;
  percentComplete: number;
  history: History<LocationState>;
}

const QuizSection = (props: QuizSectionProps) => {
  if (props.question.answer === '' && props.question.top1 === '') props.history.replace('/');
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
      if (isSubmitted) {
        reset();
        return props.next(currentValue);
      } else {
        setIsSubmitted(true);
        if (currentValue.toLowerCase() === realAnswer) {
          setTimeout(() => {
            reset();
            props.next(currentValue);
          }, 1000)
        } else {
          setTimeout(() => setShowExplanationDialog(true), 1000)
        }
        return;
      }
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

  const handleUserKeyPress = useCallback((event: KeyboardEvent) => {
    const key = event.key;
    if (key === 'Enter' && isSubmitted) {
      return processNext(value);
    }
    if (
      key === "Enter" &&
      (props.question.questionType === QuestionType.DefinitionW ||
        props.question.questionType === QuestionType.ConjugationW)
    ) {
      return processNext(value);
    }
    // eslint-disable-next-line
  }, [isSubmitted, value, props.question.questionType]); //processNext does not need to be in array

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => window.removeEventListener('keydown', handleUserKeyPress);
  }, [handleUserKeyPress]);

  return (
    <React.Fragment>
      <LinearProgress
        variant="determinate"
        color="secondary"
        value={props.percentComplete}/>
      <ExplanationDialog
        open={showExplanationDialog}
        handleClose={handleClose}
        rule={rules[props.question.explanation]}/>
      <AnswerDialog
        open={showAnswerDialog}
        answer={value}
        handleClose={handleClose}
        question={props.question}/>
      <QuestionCard
        question={props.question}
        value={value}
        showExplanation={openExplanation}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isSubmitted={isSubmitted}/>
    </React.Fragment>
  )
};

export default QuizSection;