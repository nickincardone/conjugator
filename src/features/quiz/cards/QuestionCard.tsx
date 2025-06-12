import React, { FunctionComponent, useEffect, useRef } from "react";
import { Typography, Chip, Box } from "@mui/material";
import "./QuestionCard.scss";
import MultipleChoice from "./MultipleChoice/MultipleChoice";
import WrittenOption from "./WrittenOption/WrittenOption";
import FillInBlankTop from "./FillInBlank/FillInBlankTop";
import { Question, QuestionType } from "types/types";

interface NormalTopProps {
  question: Question;
}

interface QuestionCardProps {
  question: Question;
  value: string;
  isSubmitted: boolean;
  showExplanation: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (s: string) => void;
}

const NormalTop: FunctionComponent<NormalTopProps> = (props) => {
  const chips: JSX.Element[] = props.question.chips.map((chip) => {
    return <Chip key={chip} className={chip} label={chip}/>
  });

  return (
    <React.Fragment>
      <Typography variant="h1">{props.question.top1}</Typography>
      <Typography variant="h4">{props.question.top2}</Typography>
      <div className="nji-main-chips">
        {chips}
      </div>
    </React.Fragment>
  )
};

function QuestionCard(props: QuestionCardProps) {
  const textInput = useRef();

  useEffect(() => {
    if (textInput.current) {
      setTimeout(() => {
        if (textInput.current) {
          // @ts-ignore
          textInput.current.focus();
        }
      }, 300);
    }
  });

  const realAnswer = function(answer: string): string {
    return answer.replace(/\|/g, '').toLowerCase();
  };

  const getBottom = function(): JSX.Element {
    const isMC =
      props.question.questionType === QuestionType.ConjugationMC ||
      props.question.questionType === QuestionType.DefinitionMC ||
      props.question.questionType === QuestionType.PorOParaFIB;

    if (isMC) {
      return <MultipleChoice header={props.question.top3}
                             choices={props.question.choices}
                             isSubmitted={props.isSubmitted}
                             click={props.handleSubmit}
                             answer={realAnswer(props.question.answer)}/>
    } else {
      return <WrittenOption header={props.question.top3}
                            value={props.value}
                            submitted={props.isSubmitted}
                            answer={realAnswer(props.question.answer)}
                            inputRef={textInput}
                            handleChange={props.handleChange}/>
    }
  };

  const getTop = function(): JSX.Element {
    if (props.question.questionType === QuestionType.PorOParaFIB) {
      return <FillInBlankTop
        submitted={props.isSubmitted}
        choice={props.value}
        question={props.question}
        handleSubmit={props.handleSubmit}
        showExplanation={props.showExplanation}/>
    } else {
      return <NormalTop question={props.question}/>
    }
  };

  return (
    <React.Fragment>
      <div className="nji-main-top">
        {getTop()}
      </div>
      <div className="nji-main-bottom">
        {getBottom()}
      </div>
    </React.Fragment>
  )
}

export default QuestionCard;
