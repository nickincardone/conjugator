import { Dialog, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FunctionComponent } from 'react';
import './AnswerDialog.scss';
import { getStringDifferenceArrays } from '../../../utils/stringHelpers';
import { Question, QuestionType } from "../../../types/types";
import StyledAnswer from "../../../components/ui/StyledAnswer/StyledAnswer";

interface AnswerDialogProps {
  answer: string;
  question: Question;
  handleClose: (a: React.MouseEvent<HTMLDivElement>) => void;
  open: boolean;
}

const AnswerDialog: FunctionComponent<AnswerDialogProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const cleanedAnswer = props.question.answer.replace(/\|/g, '');
  const [answerArray, inputArray] = getStringDifferenceArrays(cleanedAnswer, props.answer);
  
  const showStyledArray =
    props.question.questionType === QuestionType.ConjugationW ||
    props.question.questionType === QuestionType.DefinitionW;

  function topPart(question: Question) {
    if (question.questionType === QuestionType.ConjugationMC || question.questionType === QuestionType.ConjugationW) {
      return (
        <Typography sx={{ marginBottom: "15px" }} className="nji-dialog-top" variant="body1">
          <span>{question.top1}</span>
          <span> - </span>
          <span>{question.chips.join(' ')}</span>
          <span> - </span>
          <span>{question.top3}</span>
        </Typography>
      );
    }
    return null;
  }

  return (
    <Dialog onClick={props.handleClose} open={props.open}>
      <Typography variant="h4">Keep working on this one!</Typography>
      {topPart(props.question)}
      <Typography variant="subtitle1">
        Correct answer: {showStyledArray ? <StyledAnswer answerArray={answerArray}/> : cleanedAnswer}
      </Typography>
      <Typography variant="subtitle2">
        Your answer: {showStyledArray ? <StyledAnswer answerArray={inputArray}/> : props.answer}
      </Typography>
      {isMobile ? (
        <Typography variant="caption">Touch anywhere to continue</Typography>
      ) : (
        <Typography variant="caption">Press enter to continue</Typography>
      )}
    </Dialog>
  );
};

export default AnswerDialog;