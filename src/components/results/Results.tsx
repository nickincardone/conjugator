import React, {ReactElement} from "react";
import { useNavigate } from "react-router-dom";
import {IncorrectAnswer, QuestionType} from "../../types";
import styles from "./Results.module.scss";
import { Typography, Button } from "@mui/material";
import {getStringDifferenceArrays} from "../../helpers/stringHelpers";
import StyledAnswer from "../ui/StyledAnswer/StyledAnswer";

export interface ResultsProps {
  results: IncorrectAnswer[];
}

const Result = (props: { result: IncorrectAnswer }) => {
  const result = props.result;
  const answerArray = getStringDifferenceArrays(result.response, result.answer);
  return (
    <div className={styles.nji_result}>
      <Typography variant="h6">{result.top1}</Typography>
      <Typography variant="body1">
        Your answer: <StyledAnswer answerArray={answerArray}/>
      </Typography>
      <Typography variant="body1">
        Correct answer: {result.answer}
      </Typography>
    </div>
  );
};

const Results = (props: ResultsProps) => {
  const navigate = useNavigate();
  
  if (props.results.length === 0) {
    navigate("/");
    return null;
  }

  const results = props.results.map((result) => {
    return <Result key={result.top1} result={result}/>
  });

  return (
    <div className={styles.nji_results}>
      <Typography variant="h4">Results</Typography>
      {results}
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </div>
  )
};

export default Results;