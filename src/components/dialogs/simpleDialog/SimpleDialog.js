import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import './SimpleDialog.scss';
import { Hidden } from '@material-ui/core';

function simpleDialog(props) {

  let styledCorrectAnswer = [];
  const splitArray = props.correctAnswer.split('|');

  for (let i = 0; i < splitArray.length; i++) {
    if (i % 2 === 0) {
      styledCorrectAnswer.push(<React.Fragment key={i}>{splitArray[i]}</React.Fragment>)
    } else {
      styledCorrectAnswer.push(<span key={i} style={{"color": "red"}}>{splitArray[i]}</span>)
    }
  }

  if (splitArray.length % 2 === 0) {
    styledCorrectAnswer = props.correctAnswer.replace(/\|/g, '')
  }

  return (
    <Dialog onClick={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <Typography variant="h4">Keep working on this one!</Typography>
      <Typography variant="subtitle1">Your answer: {props.answer}</Typography>
      <Typography variant="subtitle2">Correct answer: {styledCorrectAnswer}</Typography>
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