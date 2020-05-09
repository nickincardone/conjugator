import Dialog from '@material-ui/core/Dialog';
import React, {FunctionComponent} from 'react';
import Typography from '@material-ui/core/Typography';
import './AnswerDialog.scss';
import {Hidden} from '@material-ui/core';
import {getStringDifferenceArrays} from '../../../helpers/stringHelpers';
import {Question, QuestionType} from "../../../types";

interface answerDialogProps {
  answer: string;
  question: Question;
  handleClose: (a: React.MouseEvent<HTMLDivElement>) => void;
  open: boolean;
}

const answerDialog: FunctionComponent<answerDialogProps> = (props) => {

  const cleanedAnswer = props.question.answer.replace(/\|/g, '');
  const [answerArray, inputArray] = getStringDifferenceArrays(cleanedAnswer, props.answer);
  
  const showStyledArray =
    props.question.questionType === QuestionType.ConjugationW ||
    props.question.questionType === QuestionType.DefinitionW;

  function styledAnswer(array: Array<string | number[]>) {
    return (
      <React.Fragment>
        {array.map((item, i) => {
          let className = "";
          if (item[0] === -1) className = "red_different";
          if (item[0] === 1) className = "green_different";
          return (
            <span key={i} className={className}>
              {item[1]}
            </span>
          );
        })}
      </React.Fragment>
    );
  }

  function topPart(question: Question)  {
    if (question.questionType === 1 || question.questionType === 2) {
      return <Typography style={{ marginBottom: "15px" }} className="nji-dialog-top"
                         variant="body1">
        <span>{question.top1}</span>
        <span> - </span>
        <span>{question.chips.join(' ')}</span>
        <span> - </span>
        <span>{question.top3}</span>
      </Typography>
    }
    return null;
  }

  return (
    <Dialog onClick={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <Typography variant="h4">Keep working on this one!</Typography>
      {topPart(props.question)}
      <Typography variant="subtitle1">Correct answer: {showStyledArray ? styledAnswer(answerArray) : cleanedAnswer}</Typography>
      <Typography variant="subtitle2">Your answer: {showStyledArray ? styledAnswer(inputArray) : props.answer}</Typography>
      <Hidden smUp>
        <Typography variant="caption">Touch anywhere to continue</Typography>
      </Hidden>
      <Hidden mdDown>
        <Typography variant="caption">Press enter to continue</Typography>
      </Hidden>
    </Dialog>
  );
}

export default answerDialog;