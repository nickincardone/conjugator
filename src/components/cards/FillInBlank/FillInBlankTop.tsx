import React, { FunctionComponent } from 'react';
import { Typography, Box } from '@mui/material';
import './FillInBlankTop.scss';
import ModifiedTooltip from '../../ui/ModifiedTooltip/ModifiedTooltip';
import { Question } from "../../../types";
import FillInBlankText from "../../ui/FillInBlankText";

interface FillInBlankTopProps {
  question: Question;
  choice: string;
  submitted: boolean;
  showExplanation: () => void;
  handleSubmit: (s: string) => void;
}

const FillInBlankTop: FunctionComponent<FillInBlankTopProps> = (props) => {
  const className = props.submitted 
    ? props.choice === props.question.answer 
      ? 'nji-correct' 
      : 'nji-incorrect'
    : '';

  return (
    <Box className="nji-fill-in-blank">
      <Typography variant="h5" className="nji-fib-question">
        {props.question.top1}
      </Typography>
      <ModifiedTooltip
        title={props.question.translation || ''}
        className="nji-fib-tooltip"
      >
        <Box>
          <FillInBlankText
            text={props.question.top1}
            insert={props.choice}
            className={className}
          />
        </Box>
      </ModifiedTooltip>
    </Box>
  );
};

export default FillInBlankTop;