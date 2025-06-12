import React from 'react';
import { Typography } from '@mui/material';

interface StyledAnswerProps {
  answerArray: [number, string][];
  className?: string;
}

const StyledAnswer: React.FC<StyledAnswerProps> = ({ answerArray, className }) => {
  return (
    <Typography className={className} component="span">
      {answerArray.map(([type, value], idx) => (
        <span key={idx} style={{
          color: type === 0 ? 'inherit' : type === 1 ? 'red' : 'green',
          fontWeight: type === 0 ? 'normal' : 'bold'
        }}>{value}</span>
      ))}
    </Typography>
  );
};

export default StyledAnswer; 