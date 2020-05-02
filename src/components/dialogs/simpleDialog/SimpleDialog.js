import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import './SimpleDialog.scss';
import { Hidden } from '@material-ui/core';
import { getStringDifferenceArrays } from '../../../helpers/stringHelpers';

function simpleDialog(props) {

  const [answerArray, inputArray] = getStringDifferenceArrays(props.correctAnswer.replace(/\|/g, ''), props.answer);

  const styledAnswer = (array) => {
    return (
      <React.Fragment>
        {array.map((item,i) => {
          let className = '';
          if (item[0] === -1) className = 'red_different';
          if (item[0] === 1) className = 'green_different';
          return <span key={i} className={className}>{item[1]}</span>
        })}
      </React.Fragment>
    )
  };

  let answerPart = (
    <React.Fragment>
      <Typography variant="subtitle1">Correct answer: {props.correctAnswer.replace(/\|/g, '')}</Typography>
      <Typography variant="subtitle2">Your answer: {props.answer}</Typography>
    </React.Fragment>
  )
  if (props.question.questionType === 1 || props.question.questionType === 2) {
    answerPart = (
      <React.Fragment>
        <Typography variant="subtitle1">Correct answer: {styledAnswer(answerArray)}</Typography>
        <Typography variant="subtitle2">Your answer: {styledAnswer(inputArray)}</Typography>
      </React.Fragment>
    )
  }

  const topPart = (question) => {
    if (question.questionType === 1 || question.questionType === 2) {
      return <Typography style={{marginBottom: "15px"}} className="nji-dialog-top"variant="body1">
        <span>{question.top1}</span>
        <span> - </span>
        <span>{question.chips.join(' ')}</span>
        <span> - </span>
        <span>{question.top3}</span>
      </Typography>
    }
    return null;
  };

  return (
    <Dialog onClick={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <Typography variant="h4">Keep working on this one!</Typography>
      {topPart(props.question)}
      {answerPart}
      <Hidden smUp>
        <Typography variant="caption">Touch anywhere to continue</Typography>
      </Hidden>
      <Hidden mdDown>
        <Typography variant="caption">Press enter to continue</Typography>
      </Hidden>
    </Dialog>
  );
}

export default simpleDialog;