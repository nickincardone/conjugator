import React from 'react';
import Typography from '@material-ui/core/Typography';
import './FillInBlankTop.scss';
import Tooltip from '@material-ui/core/Tooltip';

const FillInBlankTop = (props) => {
  let questionText = props.question.top1;
  if (props.submitted) {
    const className = props.choice === props.question.answer ?
      'nji-correct' : 'nji-incorrect';
    const splitArr = props.question.top1.split('___');
    questionText = (
      <React.Fragment>
        {splitArr[0]}<span className={className}>{props.choice}</span>{splitArr[1]}
      </React.Fragment>
    )
  }
  return (
    <Tooltip classes={{tooltip: 'nji-fib-tooltip'}} title={props.question.translation}>
      <Typography variant="h1" className="nji-fib-header">{questionText}</Typography>
    </Tooltip>
  )
};

export default FillInBlankTop;