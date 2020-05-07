import * as React from 'react';
import Box from '@material-ui/core/Box';
import { Hidden } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './Home.scss';

export interface HomeProps {
  incorrectAnswers: number;
  numberOfQuestions: number;
  started: boolean;
  start: (b: boolean) => void;
  history: any;
}

class Home extends React.Component<HomeProps, {}> {

  postQuizText(): string {
    const correctPercentage: number = Math.round(10000 * (this.props.numberOfQuestions - this.props.incorrectAnswers) / this.props.numberOfQuestions) / 100;
    if (correctPercentage === 100) {
      return "Perfect Score! Maybe try something harder with a Custom Quiz"
    } else if (correctPercentage > 79) {
      return "" + correctPercentage + "% correct. Great Job!"
    } else {
      return "" + correctPercentage + "% correct. Try Again."
    }
  };

  render(): JSX.Element {
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        minHeight={360}
        color={'common.black'}
        textAlign={'center'}
        className="nji-home-top"
      >
        <Hidden xsUp={this.props.started}>Hello, welcome to Conjugator</Hidden>
        <Hidden xsUp={!this.props.started}>{this.postQuizText()}</Hidden>
        <br/>
        <Hidden mdUp>
          <Button variant="contained" color="primary" onClick={() => this.props.start(true)}>
            start
          </Button>
          <Button variant="contained" color="secondary" onClick={() => this.props.history.replace('/options')}>
            custom start
          </Button>
        </Hidden>
        <Hidden smDown>
          <Button variant="contained" color="primary" onClick={() => this.props.start(false)}>
            start
          </Button>
          <Button variant="contained" color="secondary" onClick={() => this.props.history.replace('/options')}>
            custom start
          </Button>
        </Hidden>
      </Box>
    )
  }
}

export default Home;