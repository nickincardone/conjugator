import React from 'react';
import Typography from '@material-ui/core/Typography';
import './FillInBlankTop.scss';
import ModifiedTooltip from '../../ui/ModifiedTooltip/ModifiedTooltip';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isBeginning(string) {
  return string === '' || '!\'"¿'.indexOf(string) > -1;
}

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
        {splitArr[0]}
        <span className={className}>
          {isBeginning(splitArr[0]) ? capitalize(props.choice) : props.choice}
        </span>
        {splitArr[1]}
      </React.Fragment>
    )
  }

  const placement = className.length > 0 ? 'top' : 'bottom';

  return (
    <div>
      <ModifiedTooltip
        placement={placement}
        title={props.question.translation}>
        <Typography variant="h1" className={'nji-fib-header ' + className}><span>{questionText}</span></Typography>
      </ModifiedTooltip>
      <Typography
        onClick={() => {
          if (className === 'nji-incorrect') {
            props.showExplanation()
          } else {
            props.next()
          }}
        }
        variant="subtitle1"
        className={className + ' prevent-touch'}>
        {nextString}
      </Typography>
    </div>
  )
};

export default FillInBlankTop;