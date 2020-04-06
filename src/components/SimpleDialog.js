import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import './SimpleDialog.scss';
import { Hidden } from '@material-ui/core';

function simpleDialog(props) {

  return (
    <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <Typography variant="h4">Keep working on this one!</Typography>
      <Typography variant="subtitle1">Your answer: {props.answer}</Typography>
      <Typography variant="subtitle2">Correct answer: {props.correctAnswer}</Typography>
      <Hidden smUp>
        <Typography variant="caption">Click outside box to continue</Typography>
      </Hidden>
      <Hidden mdDown>
        <Typography variant="caption">Press enter to continue</Typography>
      </Hidden>
    </Dialog>
  );
}

export default simpleDialog;