import React, {ReactElement} from "react";
import {History, LocationState} from "history";
import {IncorrectAnswer, QuestionType} from "../../types";
import styles from "./Results.module.scss";
import {Typography} from "@material-ui/core";
import {getStringDifferenceArrays} from "../../helpers/stringHelpers";
import StyledAnswer from "../ui/StyledAnswer/StyledAnswer";

export interface ResultsProps {
  results: IncorrectAnswer[];
  history: History<LocationState>;
}

interface ResultProps {
  result: IncorrectAnswer;
}

const Result = (props: ResultProps) => {

  const cleanedAnswer = props.result.answer.replace(/\|/g, '');
  const [answerArray, inputArray] = getStringDifferenceArrays(cleanedAnswer, props.result.response);

  let topper: string | ReactElement = "Definition";
  if (props.result.questionType === QuestionType.ConjugationMC || props.result.questionType === QuestionType.ConjugationW) {
    topper = (
      <React.Fragment>
        <span>{props.result.top1}</span>
        <span> - </span>
        <span>{props.result.chips.join(' ')}</span>
        <span> - </span>
        <span>{props.result.top3}</span>
      </React.Fragment>
    )
  } else if (props.result.questionType === QuestionType.PorOParaFIB) {
    topper = "Por o Para";
  }

  return (
    <div className={styles.nji_result}>
      <p>{props.result.top1}</p>
      <p>{topper}</p>
      <p>Your Answer: <StyledAnswer answerArray={inputArray}/> - Correct Answer: <StyledAnswer answerArray={answerArray}/></p>
    </div>
  )
};

const Results = (props: ResultsProps) => {
  if (props.results.length === 0) {
    props.history.replace("/");
    return null;
  }

  const results = props.results.map((result) => {
    return <Result result={result}/>
  });

  return (
    <div className={styles.nji_results}>
      <Typography variant="h4">Results</Typography>
      {results}
    </div>
  )
};

export default Results;