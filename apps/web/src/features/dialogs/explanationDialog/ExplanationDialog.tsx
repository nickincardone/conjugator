import * as React from "react";
import {
  Dialog,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import "./ExplanationDialog.scss";
import { FunctionComponent, useEffect, useState } from "react";
import { Question, Rule } from "@poropara/shared";
import { ModifiedTooltip, FillInBlankText, StyleChoice } from "components";

interface ExplanationDialogProps {
  handleClose: (a: React.MouseEvent<HTMLDivElement>) => void;
  question: Question;
  rule: Rule;
  open: boolean;
}

function formatPipes(str: string): JSX.Element[] | string {
  const styledJSX: JSX.Element[] = [];
  const splitArray = str.split("|");

  // should be even number of pipes
  if (splitArray.length % 2 === 0) {
    return str.replace(/\|/g, "");
  }

  for (let i = 0; i < splitArray.length; i++) {
    if (i % 2 === 0) {
      styledJSX.push(<React.Fragment key={i}>{splitArray[i]}</React.Fragment>);
    } else {
      styledJSX.push(
        <span key={i} className="nji-rule-span">
          {splitArray[i]}
        </span>,
      );
    }
  }
  return styledJSX;
}

const ExplanationDialog: FunctionComponent<ExplanationDialogProps> = (
  props,
) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [displayQuestion, setDisplayQuestion] = useState<Question>(
    props.question,
  );
  const [displayRule, setDisplayRule] = useState<Rule>(props.rule);

  useEffect(() => {
    if (props.open) {
      setDisplayQuestion(props.question);
      setDisplayRule(props.rule);
    }
  }, [props.open, props.question, props.rule]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (props.open) {
        props.handleClose(event as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [props.open, props.handleClose]);

  return (
    <Dialog
      onClick={props.handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.open}
    >
      <div className="nji-explanation-body">
        <h1>Try again next time!</h1>
        <div className="fill-in-blank">
          <FillInBlankText
            text={displayQuestion.top1}
            insert={displayQuestion.answer}
            styleChoice={StyleChoice.CORRECT}
          />
        </div>
        <h2>Rule: {displayRule.rule}</h2>
        <ModifiedTooltip
          className="nji-explanation-tooltip"
          placement="bottom"
          title={displayRule.translation}
        >
          <div>
            <b>Example</b>:{" "}
            <span className="nji-example">
              {formatPipes(displayRule.example)}
            </span>
          </div>
        </ModifiedTooltip>
        <div className="nji-caption">
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Typography variant="caption">
              Touch anywhere to continue
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant="caption">Press any key to continue</Typography>
          </Box>
        </div>
      </div>
    </Dialog>
  );
};

export default ExplanationDialog;
