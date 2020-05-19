import React, {FunctionComponent} from 'react';
import Typography from '@material-ui/core/Typography';
import './FillInBlankTop.scss';
import ModifiedTooltip from '../../ui/ModifiedTooltip/ModifiedTooltip';
import {Question} from "../../../types";
import FillInBlankText from "../../ui/FillInBlankText";

interface FillInBlankTopProps {
  question: Question;
  choice: string;
  submitted: boolean;
  showExplanation: () => void;
  handleSubmit: (s: string) => void;
}

const FillInBlankTop: FunctionComponent<FillInBlankTopProps> = (props) => {
  let questionText: JSX.Element = <React.Fragment>{props.question.top1}</React.Fragment>;
  let className: string =  '';

  if (props.submitted) {
    className = props.choice === props.question.answer ?
      'nji-correct' : 'nji-incorrect';
    questionText = <FillInBlankText text={props.question.top1} insert={props.choice} className={className}/>
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
      </Typography>
    </div>
  );
};

export default FillInBlankTop;