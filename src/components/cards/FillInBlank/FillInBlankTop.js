import React from 'react';
import Typography from '@material-ui/core/Typography';
import './FillInBlankTop.scss';
import Tooltip from '@material-ui/core/Tooltip';
// import HelpIcon from '@material-ui/icons/Help';

const FillInBlankTop = (props) => {
  let questionText = props.question.top1;
  let className =  '';
  const nextString = props.choice === props.question.answer ?
    'Press Enter to Continue' : 'Click here for Explanation or Press Enter to Continue';

  if (props.submitted) {
    className = props.choice === props.question.answer ?
      'nji-correct' : 'nji-incorrect';
    const splitArr = props.question.top1.split('___');
    questionText = (
      <React.Fragment>
        {splitArr[0]}<span className={className}>{props.choice}</span>{splitArr[1]}
      </React.Fragment>
    )
  }

  return (
    <div>
      <Tooltip classes={{tooltip: 'nji-fib-tooltip'}} title={props.question.translation}>
          <Typography variant="h1" className={'nji-fib-header ' + className}>{questionText}</Typography>
      </Tooltip>
      {/*<HelpIcon className={"nji-fib-why " + className}/>*/}
      <Typography onClick={() => {props.showExplanation()}} variant="subtitle1" className={className + ' prevent-touch'}>{nextString}</Typography>
    </div>
  )
};

export default FillInBlankTop;