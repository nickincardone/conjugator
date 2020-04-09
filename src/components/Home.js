import React from 'react';
import Box from '@material-ui/core/Box';
import { Hidden } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class Home extends React.Component {

  postQuizText = () => {
    const correctPercentage = 100 * (this.props.numberOfQuestions - this.props.incorrectAnswers) / this.props.numberOfQuestions;
    if (correctPercentage === 100) {
      return "Perfect Score! Maybe try something harder with a Custom Quiz"
    } else if (correctPercentage > 79) {
      return "" + correctPercentage + "% correct. Great Job!"
    } else {
      return "" + correctPercentage + "% correct. Try Again."
    }
};


  render = () => {
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        minHeight={360}
        color={'common.black'}
        textAlign={'center'}
        style={{ 'paddingTop': '50px' }}
      >
        <Hidden xsUp={this.props.started}>Hello, welcome to Conjugator</Hidden>
        <Hidden
          xsUp={!this.props.started}>{this.postQuizText()}</Hidden>
        <br/>
        <Hidden mdUp>
          <Button variant="contained" color="primary" onClick={() => {
            this.props.start(true)
          }} style={{ 'marginTop': '50px' }}>
            start
          </Button>
        </Hidden>
        <Hidden smDown>
          <Button variant="contained" color="primary" onClick={() => {
            this.props.start(false)
          }} style={{ 'marginTop': '50px' }}>
            start
          </Button>
          <Button variant="contained" color="secondary" onClick={() => {
            this.props.setCustom(true);
          }} style={{ 'marginTop': '50px' }}>
            custom start
          </Button>
        </Hidden>
      </Box>
    )
  }
}

export default Home;
