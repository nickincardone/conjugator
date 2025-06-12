import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import "./ExplanationDialog.scss";
import { Question, Rule } from "types/types";
import ModifiedTooltip from "components/ui/ModifiedTooltip/ModifiedTooltip";
import FillInBlankText, { StyleChoice } from "components/ui/FillInBlankText";
import { FunctionComponent } from "react";

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
            text={props.question.top1}
            insert={props.question.answer}
            styleChoice={StyleChoice.CORRECT}
          />
        </div>
        <h2>Rule: {props.rule.rule}</h2>
        <ModifiedTooltip
          className="nji-explanation-tooltip"
          placement="bottom"
          title={props.rule.translation}
        >
          <div>
            <b>Example</b>:{" "}
            <span className="nji-example">
              {formatPipes(props.rule.example)}
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
            <Typography variant="caption">Press enter to continue</Typography>
          </Box>
        </div>
      </div>
    </Dialog>
  );
};

export default ExplanationDialog;
