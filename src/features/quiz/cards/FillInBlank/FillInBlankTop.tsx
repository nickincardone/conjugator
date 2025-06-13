import React, { FunctionComponent } from "react";
import { Typography, Box } from "@mui/material";
import ModifiedTooltip from "components/ui/ModifiedTooltip/ModifiedTooltip";
import { Question } from "types/types";
import FillInBlankText, { StyleChoice } from "components/ui/FillInBlankText";

interface FillInBlankTopProps {
  question: Question;
  choice: string;
  submitted: boolean;
  showExplanation: boolean;
  handleSubmit: (s: string) => void;
}

const FillInBlankTop: FunctionComponent<FillInBlankTopProps> = (props) => {
  let questionText: JSX.Element = (
    <React.Fragment>{props.question.top1}</React.Fragment>
  );

  if (props.submitted) {
    questionText = (
      <FillInBlankText
        text={props.question.top1}
        insert={props.choice}
        styleChoice={
          props.submitted
            ? props.choice === props.question.answer
              ? StyleChoice.CORRECT
              : StyleChoice.INCORRECT
            : StyleChoice.NEUTRAL
        }
      />
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <ModifiedTooltip title={props.question.translation || ""}>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "2.5em", sm: "3em" },
            display: "inline-block",
            m: 1.25,
            ...(props.question.translation && {
              borderBottom: "2px dotted #cacaca",
              "&:hover": {
                borderBottom: "2px dotted #5a5a5a",
              },
            }),
          }}
        >
          {questionText}
        </Typography>
      </ModifiedTooltip>
    </Box>
  );
};

export default FillInBlankTop;
