import React, {FunctionComponent} from 'react';
import Typography from '@material-ui/core/Typography';
import './FillInBlankTop.scss';
import ModifiedTooltip from '../../ui/ModifiedTooltip/ModifiedTooltip';
import {Question} from "../../../types";
import {Hidden} from "@material-ui/core";

interface FillInBlankTopProps {
  question: Question;
  choice: string;
  submitted: boolean;
  showExplanation: () => void;
  handleSubmit: (s: string) => void;
}

function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isBeginning(string: string, index: number): boolean {
  return index === 1 && (string === '' || '!\'"¿'.indexOf(string) > -1);
}

const FillInBlankTop: FunctionComponent<FillInBlankTopProps> = (props) => {
  let questionText: JSX.Element[] = [<React.Fragment>{props.question.top1}</React.Fragment>];
  let className: string =  '';
  const nextString: string = props.choice === props.question.answer ?
    'Press Enter to Continue' : 'Click here for Explanation or Press Enter to Continue';
  const nextStringMobile: string = props.choice === props.question.answer ?
    'Touch here to Continue' : 'Touch here for Explanation';

  if (props.submitted) {
    className = props.choice === props.question.answer ?
      'nji-correct' : 'nji-incorrect';
    const splitArr: string[] = props.question.top1.split('___');
    questionText = [];
    splitArr.forEach((text, i) => {
      if (i % 2 === 0) {
        questionText.push(<React.Fragment key={i}>{text}</React.Fragment>)
      } else {
        questionText.push(
          <React.Fragment key={i}>
            <span className={className}>
              {isBeginning(splitArr[0], i) ? capitalize(props.choice) : props.choice}
            </span>
            {text}
          </React.Fragment>
        )
      }
    });
  }

  const placement = className.length > 0 ? 'top' : 'bottom';
  const title = props.question.translation ? props.question.translation : '';

  return (
    <div>
      <ModifiedTooltip placement={placement} title={title}>
        <Typography variant="h1" className={"nji-fib-header " + className}>
          <span>{questionText}</span>
        </Typography>
      </ModifiedTooltip>
      <Typography
        onClick={() => className === "nji-incorrect" ? props.showExplanation(): props.handleSubmit(props.choice)}
        variant="subtitle1"
        className={className + " prevent-touch"} >
        <Hidden mdUp>{nextStringMobile}</Hidden>
        <Hidden smDown>{nextString}</Hidden>
      </Typography>
    </div>
  );
};

export default FillInBlankTop;