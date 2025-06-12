import { Dialog, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FunctionComponent } from 'react';
import './ExplanationDialog.scss';
import { Question, Rule } from '../../../types';

interface ExplanationDialogProps {
  handleClose: (a: React.MouseEvent<HTMLDivElement>) => void;
  question: Question;
  rule: Rule;
  open: boolean;
}

const ExplanationDialog: FunctionComponent<ExplanationDialogProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog onClick={props.handleClose} open={props.open}>
      <Typography variant="h4">Explanation</Typography>
      <Typography variant="body1">
        {props.rule.rule}
      </Typography>
      <Typography variant="body1">
        Example: {props.rule.example}
      </Typography>
      <Typography variant="body1">
        Translation: {props.rule.translation}
      </Typography>
      {isMobile ? (
        <Typography variant="caption">Touch anywhere to continue</Typography>
      ) : (
        <Typography variant="caption">Press enter to continue</Typography>
      )}
    </Dialog>
  );
};

export default ExplanationDialog;