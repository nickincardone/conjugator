import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { Hidden } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class MultipleChoiceCard extends React.Component {

  constructor(props) {
    super(props);
  }

  handleClick = (val) => {
    this.props.handleSubmit(val);
  };

  realAnswer(answer) {
    return answer.replace('|', '').replace('|', '');
  }

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
              variant="h1">{this.props.question.verb}</Typography>
            <Typography
              variant="h4">{this.props.question.definition}</Typography>
            <div className="nji-main-chips">
              <Chip label={this.props.question.type1}/>
              <Hidden xsUp={this.props.question.type2 === undefined}>
                <Chip label={this.props.question.type2}/>
              </Hidden>
              <Hidden xsUp={this.props.question.type3 === undefined}>
                <Chip label={this.props.question.type3}/>
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
            <Typography
              variant="subtitle1">{this.props.question.person}</Typography>
            <Grid container spacing="1" className="nji-card-mc">
              {this.props.question.choices.map((answer, index) => {
                return (
                  <Grid item xs="6" key={index}>
                  <Card onClick={() => {this.handleClick(answer)}}>
                    <CardContent>
                      {answer}
                    </CardContent>
                  </Card>
                </Grid>
                )
              })}
            </Grid>
          </Box>
        </div>
      </React.Fragment>
    )
  }
}

export default MultipleChoiceCard;

