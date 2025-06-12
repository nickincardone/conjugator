import React from 'react';
import { useNavigate } from "react-router-dom";
import {IncorrectAnswer} from "../../types/types";
import {Button, Typography} from "@mui/material";
import {getStringDifferenceArrays} from "../../utils/stringHelpers";
import StyledAnswer from "../../components/ui/StyledAnswer/StyledAnswer";
import styles from "./Results.module.scss";

export interface ResultsProps {
  results: IncorrectAnswer[];
}

const Result = (props: { result: IncorrectAnswer }) => {
  const result = props.result;
  const [targetArray, inputArray] = getStringDifferenceArrays(result.response, result.answer);
  return (
    <div className={styles.nji_result}>
      <Typography variant="h6">{result.top1}</Typography>
      <Typography variant="body1">
        Your answer: <StyledAnswer answerArray={inputArray}/>
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