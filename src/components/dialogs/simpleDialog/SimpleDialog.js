import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import './SimpleDialog.scss';
import { Hidden } from '@material-ui/core';
import { getStringDifferenceArrays } from '../../../helpers/stringHelpers';

function simpleDialog(props) {

  const [answerArray, inputArray] = getStringDifferenceArrays(props.correctAnswer.replace(/\|/g, ''), props.answer);

  // let styledCorrectAnswer = [];
  // const splitArray = props.correctAnswer.split('|');
  //
  // for (let i = 0; i < splitArray.length; i++) {
  //   if (i % 2 === 0) {
  //     styledCorrectAnswer.push(<React.Fragment key={i}>{splitArray[i]}</React.Fragment>)
  //   } else {
  //     styledCorrectAnswer.push(<span key={i} style={{"font-weight": "bold"}}>{splitArray[i]}</span>)
  //   }
  // }
  //
  // if (splitArray.length % 2 === 0) {
  //   styledCorrectAnswer = props.correctAnswer.replace(/\|/g, '')
  // }

  const styledAnswer = (array) => {
    return (
      <React.Fragment>
        {array.map((item,i) => {
          let className = '';
          if (item[0] === -1) className = 'red_different';
          if (item[0] === 1) className = 'green_different';
          return <span key={i} className={className}>{item[1]}</span>
        })}
      </React.Fragment>
    )
  };

  return (
    <Dialog onClick={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <Typography variant="h4">Keep working on this one!</Typography>
      {/*<Typography variant="subtitle1">Your answer: {props.answer}</Typography>*/}
      {/*<Typography variant="subtitle2">Correct answer: {styledCorrectAnswer}</Typography>*/}
      <Typography variant="subtitle1">Correct answer: {styledAnswer(answerArray)}</Typography>
      <Typography variant="subtitle2">Your answer: {styledAnswer(inputArray)}</Typography>
      <Hidden smUp>
        <Typography variant="caption">Touch anywhere to continue</Typography>
      </Hidden>
      <Hidden mdDown>
        <Typography variant="caption">Press enter to continue</Typography>
      </Hidden>
    </Dialog>
  );
}

export default simpleDialog;