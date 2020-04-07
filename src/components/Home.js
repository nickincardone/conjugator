import React from 'react';
import Box from '@material-ui/core/Box';
import { Hidden } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class Home extends React.Component {
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
          xsUp={!this.props.started}>{this.props.numberOfQuestions - this.props.incorrectAnswers}/{this.props.numberOfQuestions} correct!
          Try Again.</Hidden>
        <br/>
        <Hidden mdUp>
          <Button variant="contained" color="primary" onClick={() => {
            this.props.start(true)
          }} style={{ 'marginTop': '50px' }}>
            start
          </Button>
          <Button variant="contained" color="secondary" onClick={() => {
            this.props.setCustom(true);
          }} style={{ 'marginTop': '50px' }}>
            custom start
          </Button>
        </Hidden>
        <Hidden smDown>
          <Button variant="contained" color="primary" onClick={() => {
            this.props.start(false)
          }} style={{ 'marginTop': '50px' }}>
            start
          </Button>
        </Hidden>
      </Box>
    )
  }
}

export default Home;
