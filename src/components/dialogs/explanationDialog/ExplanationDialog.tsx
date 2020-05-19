import Dialog from '@material-ui/core/Dialog';
import React, {FunctionComponent} from 'react';
import Typography from '@material-ui/core/Typography';
import './ExplanationDialog.scss';
import { Hidden } from '@material-ui/core';
import {Question, Rule} from '../../../types';
import ModifiedTooltip from "../../ui/ModifiedTooltip/ModifiedTooltip";
import FillInBlankText from "../../ui/FillInBlankText";

interface explanationDialogProps {
  handleClose: (a: React.MouseEvent<HTMLDivElement>) => void;
  question: Question;
  rule: Rule;
  open: boolean;
}

function formatPipes(str: string): JSX.Element[] | string {
  const styledJSX: JSX.Element[] = [];
  const splitArray = str.split('|');

  // should be even number of pipes
  if (splitArray.length % 2 === 0) {
    return str.replace(/\|/g, '');
  }

  for (let i = 0; i < splitArray.length; i++) {
    if (i % 2 === 0) {
      styledJSX.push(<React.Fragment key={i}>{splitArray[i]}</React.Fragment>)
    } else {
      styledJSX.push(<span key={i} className="nji-rule-span">{splitArray[i]}</span>)
    }
  }
  return styledJSX;
}

const explanationDialog: FunctionComponent<explanationDialogProps> = (props) => {

  return (
    <Dialog onClick={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <div className="nji-explanation-body">
        <h1>Try again next time!</h1>
        <div className="fill-in-blank"><FillInBlankText text={props.question.top1} insert={props.question.answer} className="nji-correct"/></div>
        <h2>Rule: {props.rule.rule}</h2>
        <ModifiedTooltip className="nji-explanation-tooltip" placement="bottom" title={props.rule.translation}>
          <div><b>Example</b>: <span className="nji-example">{formatPipes(props.rule.example)}</span></div>
        </ModifiedTooltip>
        <div className="nji-caption">
        <Hidden lgUp>
          <Typography variant="caption">Touch anywhere to continue</Typography>
        </Hidden>
        <Hidden mdDown>
          <Typography variant="caption">Press enter to continue</Typography>
        </Hidden>
        </div>
      </div>
    </Dialog>
  );
}

export default explanationDialog;