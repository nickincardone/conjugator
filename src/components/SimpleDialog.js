import Dialog from '@material-ui/core/Dialog';
import React from 'react';

function simpleDialog(props) {

  return (
    <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <div>Your answer: {props.answer}</div>
      <div>Correct answer: {props.correctAnswer}</div>
    </Dialog>
  );
}

export default simpleDialog;