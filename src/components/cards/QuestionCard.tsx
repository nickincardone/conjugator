import React, {FunctionComponent} from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import './QuestionCard.scss';
import MultipleChoice from './MultipleChoice';
import WrittenOption from './WrittenOption';
import FillInBlankTop from './FillInBlank/FillInBlankTop';
import { Question } from '../../types';

interface NormalTopProps {
  question: Question;
}

interface QuestionCardProps {
  question: Question;
  isMC: boolean;
  clickable: boolean;
  value: string;
  isSubmitted: boolean;
  showExplanation: () => void;
  next: () => void;
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

class QuestionCard extends React.Component<QuestionCardProps, {}> {
  textInput = React.createRef<any>();

  componentDidUpdate() {
    //ensure autofocus on input
    if (this.textInput.current) {
      setTimeout(() => {
        if (this.textInput.current) {
          this.textInput.current.focus();
        }
      }, 300);
    }
  }

  realAnswer(answer: string): string {
    return answer.replace(/\|/g, '').toLowerCase();
  };

  getBottom(): JSX.Element {
    if (this.props.isMC || this.props.question.questionType === 'fill-in-blank-mc') {
      return <MultipleChoice header={this.props.question.top3}
                             choices={this.props.question.choices}
                             clickable={this.props.clickable}
                             click={this.props.handleSubmit}
                             answer={this.realAnswer(this.props.question.answer)}/>
    } else {
      return <WrittenOption header={this.props.question.top3}
                            value={this.props.value}
                            submitted={this.props.isSubmitted}
                            answer={this.realAnswer(this.props.question.answer)}
                            inputRef={this.textInput}
                            handleChange={this.props.handleChange}/>
    }
  };

  getTop(): JSX.Element {
    if (this.props.question.questionType === 'fill-in-blank-mc') {
      return <FillInBlankTop
        submitted={!this.props.clickable}
        choice={this.props.value}
        question={this.props.question}
        next={this.props.next}
        showExplanation={this.props.showExplanation}/>
    } else {
      return <NormalTop question={this.props.question}/>
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="nji-main-top">
          {this.getTop()}
        </div>
        <div className="nji-main-bottom">
          {this.getBottom()}
        </div>
      </React.Fragment>
    )
  }
}

export default QuestionCard;

