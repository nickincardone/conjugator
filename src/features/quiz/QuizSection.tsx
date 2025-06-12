import React, { ChangeEvent, useState } from "react";
import { Question, QuestionType } from "types/types";
import { useNavigate } from "react-router-dom";
import QuestionCard from "features/quiz/cards/QuestionCard";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import AnswerDialog from "features/dialogs/answerDialog/AnswerDialog";
import ExplanationDialog from "features/dialogs/explanationDialog/ExplanationDialog";
import rules from "data/rules";

export interface QuizSectionProps {
  next: (value: string) => void;
  question: Question;
  percentComplete: number;
}

const QuizSection = (props: QuizSectionProps) => {
  const navigate = useNavigate();
  if (props.question.answer === "" && props.question.top1 === "") navigate("/");
  const [value, setValue] = useState<string>("");
  const [showExplanationDialog, setShowExplanationDialog] =
    useState<boolean>(false);
  const [showAnswerDialog, setShowAnswerDialog] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openExplanation, setOpenExplanation] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const realAnswer: string = props.question.answer
    .replace(/\|/g, "")
    .toLowerCase();

  const reset = () => {
    setIsSubmitted(false);
    setShowAnswerDialog(false);
    setShowExplanationDialog(false);
    setValue("");
  };

  const handleOpenExplanation = () => {
    setShowExplanationDialog(true);
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
        }, 700);
      } else {
        setTimeout(() => setShowExplanationDialog(true), 700);
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
    if (target.classList.contains("nji-example")) return;
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

  console.log(props.question);

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <LinearProgress
        variant="determinate"
        value={props.percentComplete}
        sx={{ mb: 2 }}
      />
      <ExplanationDialog
        open={showExplanationDialog}
        question={props.question}
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
        isSubmitted={isSubmitted}
      />
    </Box>
  );
};

export default QuizSection;
