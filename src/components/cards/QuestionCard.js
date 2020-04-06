import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { Hidden } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class QuestionCard extends React.Component {

  renderAnswerOption = () => {
    if (this.props.isMC) {
      return (
        <React.Fragment>
          <Typography
            variant="subtitle1">{this.props.question.top3}</Typography>
          <Grid container spacing="1" className="nji-card-mc">
            {this.props.question.choices.map((choice, index) => {
              return (
                <Grid item xs="6" key={index} className={ this.props.question.answer === choice ? 'nji-ripple nji-correct' : 'nji-ripple nji-incorrect'}>
                  <Card onClick={() => {
                    this.handleClick(choice)
                  }}>
                    <CardContent>
                      {choice}
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </React.Fragment>
      )
    } else {
      return (
        <Typography variant="h1">
          <TextField id="standard-basic"
                     label={this.props.question.top3}
                     onChange={this.props.handleChange} value={this.props.value}
                     autoFocus={true} autoComplete='off'/>
        </Typography>
      )
    }
  };

  handleClick = (val) => {
    this.props.handleSubmit(val);
  };

  realAnswer(answer) {
    return answer.replace('|', '').replace('|', '');
  };

  render() {
    return (
      <React.Fragment>
        <div className="nji-main-top">
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            minHeight={360}
            color={'common.black'}
            textAlign={'center'}
          >
            <Typography
              variant="h1">{this.props.question.top1}</Typography>
            <Typography
              variant="h4">{this.props.question.top2}</Typography>
            <div className="nji-main-chips">
              <Hidden xsUp={this.props.question.type1 === undefined}>
                <Chip className={this.props.question.type1} label={this.props.question.type1}/>
              </Hidden>
              <Hidden xsUp={this.props.question.type2 === undefined}>
                <Chip className={this.props.question.type2} label={this.props.question.type2}/>
              </Hidden>
              <Hidden xsUp={this.props.question.type3 === undefined}>
                <Chip className={this.props.question.type3} label={this.props.question.type3}/>
              </Hidden>
            </div>
          </Box>
        </div>
        <div className="nji-main-bottom">
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            color={'common.black'}
            textAlign={'center'}
          >
            {this.renderAnswerOption()}
          </Box>
        </div>
      </React.Fragment>
    )
  }
}

export default QuestionCard;

