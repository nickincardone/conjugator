import * as React from "react";
import { useNavigate } from "react-router-dom";
import { IncorrectAnswer, QuestionType } from "types/types";
import { Box, Button, Typography, Paper } from "@mui/material";
import { getStringDifferenceArrays } from "utils/stringHelpers";
import StyledAnswer from "components/ui/StyledAnswer/StyledAnswer";

export interface ResultsProps {
  results: IncorrectAnswer[];
  ignoreStringDifferences?: boolean;
}

// ok I need to add a prop to this to ignore string differences
// and then further up the chain I need to pass true to this prop if the question type is pororpara

const Result = (props: {
  result: IncorrectAnswer;
  ignoreStringDifferences?: boolean;
}) => {
  const result = props.result;
  const [targetArray, inputArray] = getStringDifferenceArrays(
    result.response,
    result.answer,
  );
  return (
    <Paper
      sx={{
        p: 1.25,
        m: 1.25,
        boxSizing: "border-box",
        boxShadow:
          "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Typography variant="h6">{result.top1}</Typography>
      <Typography variant="body1">
        Your answer:{" "}
        {props.ignoreStringDifferences ? (
          result.response
        ) : (
          <StyledAnswer answerArray={inputArray} />
        )}
      </Typography>
      <Typography variant="body1">Correct answer: {result.answer}</Typography>
    </Paper>
  );
};

const Results = (props: ResultsProps) => {
  const navigate = useNavigate();

  if (props.results.length === 0) {
    navigate("/");
    return null;
  }

  const results = props.results.map((result) => {
    return (
      <Result
        key={result.top1}
        result={result}
        ignoreStringDifferences={props.ignoreStringDifferences}
      />
    );
  });

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4">Results</Typography>
      {results}
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
};

export default Results;
