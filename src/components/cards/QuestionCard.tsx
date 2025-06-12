import React, { FunctionComponent, useEffect, useRef } from 'react';
import { Typography, Chip, Box } from '@mui/material';
import './QuestionCard.scss';
import MultipleChoice from './MultipleChoice/MultipleChoice';
import WrittenOption from './WrittenOption/WrittenOption';
import FillInBlankTop from './FillInBlank/FillInBlankTop';
import { Question, QuestionType } from '../../types';

interface NormalTopProps {
  question: Question;
}

const NormalTop: FunctionComponent<NormalTopProps> = (props) => {
  return (
    <Box className="nji-main-top">
      <Typography variant="h5">{props.question.top1}</Typography>
      <Typography variant="subtitle1">{props.question.top2}</Typography>
      {props.question.chips.map((chip, index) => (
        <Chip
          key={index}
          label={chip}
          size="small"
          sx={{ margin: '0 4px' }}
        />
      ))}
      <Typography variant="subtitle1">{props.question.top3}</Typography>
    </Box>
  );
};

interface QuestionCardProps {
  question: Question;
  value: string;
  showExplanation: () => void;
  handleSubmit: (s: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitted: boolean;
}

const QuestionCard: FunctionComponent<QuestionCardProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const renderQuestionContent = () => {
    switch (props.question.questionType) {
      case QuestionType.ConjugationMC:
      case QuestionType.DefinitionMC:
        return (
          <MultipleChoice
            answer={props.question.answer}
            choices={props.question.choices}
            header={props.question.top1}
            isSubmitted={props.isSubmitted}
            click={props.handleSubmit}
          />
        );
      case QuestionType.ConjugationW:
      case QuestionType.DefinitionW:
        return (
          <WrittenOption
            value={props.value}
            answer={props.question.answer}
            submitted={props.isSubmitted}
            header={props.question.top1}
            handleChange={props.handleChange}
            inputRef={inputRef}
          />
        );
      case QuestionType.PorOParaFIB:
        return (
          <FillInBlankTop
            question={props.question}
            choice={props.value}
            submitted={props.isSubmitted}
            showExplanation={props.showExplanation}
            handleSubmit={props.handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box className="nji-main-bottom">
      <NormalTop question={props.question} />
      {renderQuestionContent()}
    </Box>
  );
};

export default QuestionCard;

