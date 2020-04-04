import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import './SimpleDialog.scss';

function simpleDialog(props) {

  return (
    <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <Typography variant="h4">Keep working on this one!</Typography>
      <Typography variant="subtitle1">Your answer: {props.answer}</Typography>
      <Typography variant="subtitle2">Correct answer: {props.correctAnswer}</Typography>
      <Typography variant="caption">Press enter to continue</Typography>
    </Dialog>
  );
}

export default simpleDialog;