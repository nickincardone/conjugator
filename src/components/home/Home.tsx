import * as React from 'react';
import Box from '@material-ui/core/Box';
import {Hidden} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './Home.scss';

export interface HomeProps {
  incorrectAnswers: number;
  numberOfQuestions: number;
  started: boolean;
  start: (b: boolean) => void;
  goToOptions: (b: boolean) => void;
  goToResults: () => void;
}

function Home(props: HomeProps) {

  const postQuizText = () => {
    const correctPercentage: number =
      Math.round(
        (10000 * (props.numberOfQuestions - props.incorrectAnswers)) /
          props.numberOfQuestions
      ) / 100;
    if (correctPercentage === 100) {
      return "Perfect Score! Maybe try something harder with a Custom Quiz"
    } else if (correctPercentage > 79) {
      return `${correctPercentage}% correct. Great Job!`
    } else {
      return `${correctPercentage}% correct. Try Again.`
    }
  };

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
      {props.started ? postQuizText() : "Hello, welcome to Conjugator"}
      <br/>
      {props.started && props.incorrectAnswers !== 0 ?
        <Button variant="contained" color="secondary"
                onClick={() => props.goToResults()}>Results</Button> : null}
      <Hidden mdUp>
        <Button variant="contained" color="primary" onClick={() => props.start(true)}>
          start
        </Button>
        <Button variant="contained" color="secondary" onClick={() => props.goToOptions(true)}>
          custom start
        </Button>
      </Hidden>
      <Hidden smDown>
        <Button variant="contained" color="primary" onClick={() => props.start(false)}>
          start
        </Button>
        <Button variant="contained" color="secondary" onClick={() => props.goToOptions(false)}>
          custom start
        </Button>
      </Hidden>
    </Box>
  )
}

export default Home;