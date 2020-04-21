import React from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import './QuestionCard.scss';
import MultipleChoice from './MultipleChoice';
import WrittenOption from './WrittenOption';

class QuestionCard extends React.Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

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

  realAnswer(answer) {
    return answer.replace(/\|/g, '');
  };

  getChips = () => {
    return this.props.question.chips.map((chip) => {
      return <Chip key={chip} className={chip} label={chip}/>
    });
  };

  getBottom = () => {
    if (this.props.isMC) {
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

  render() {
    return (
      <React.Fragment>
        <div className="nji-main-top">
          <Typography variant="h1">{this.props.question.top1}</Typography>
          <Typography variant="h4">{this.props.question.top2}</Typography>
          <div className="nji-main-chips">
            {this.getChips()}
          </div>
        </div>
        <div className="nji-main-bottom">
          {this.getBottom()}
        </div>
      </React.Fragment>
    )
  }
}

export default QuestionCard;

