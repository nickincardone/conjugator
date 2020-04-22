import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import './ExplanationDialog.scss';
import { Hidden } from '@material-ui/core';

function explanationDialog(props) {

  return (
    <Dialog onClick={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <Typography variant="h4">{props.rule.rule}</Typography>
      <Typography variant="subtitle1">{props.rule.example}</Typography>
      <Typography variant="subtitle2">{props.rule.translation}</Typography>
      <Hidden smUp>
        <Typography variant="caption">Touch anywhere to continue</Typography>
      </Hidden>
      <Hidden mdDown>
        <Typography variant="caption">Press enter to continue</Typography>
      </Hidden>
    </Dialog>
  );
}

export default explanationDialog;