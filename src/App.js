import React from 'react';
import './App.scss';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import verbs from './data/conjugationVerbs';
import verbTypes from './data/verbTypes';
import { Hidden } from '@material-ui/core';
import SimpleDialog from './components/SimpleDialog';
import LinearProgress from '@material-ui/core/LinearProgress';

class App extends React.Component {
  numberOfQuestions = 25;
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentQuestion: 0,
      open: false,
    };
    this.createQuestions();
  }

  resolve(path, obj) {
    const properties = Array.isArray(path) ? path : path.split('.');
    return properties.reduce((prev, curr) => prev && prev[curr], obj)
  }

  getAnswer(currentVerbType, currentPronoun, conjugations) {
    if (currentVerbType === 'participle' || currentVerbType === 'gerund') {
      return conjugations[currentVerbType];
    }
    return this.resolve(currentVerbType + '.' + currentPronoun, conjugations);
  }

  createQuestions = () => {
    const questionArray = [];
    const pronouns = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'];
    for (let i = 0; i < this.numberOfQuestions; i++) {
      const currentVerb = verbs[Math.floor(Math.random() * verbs.length)];
      const currentVerbType = verbTypes[Math.floor(Math.random() * verbTypes.length)];
      const currentPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const verbTypeList = currentVerbType.split('.');
      const currentVerbObject = {
        "verb": currentVerb.verb,
        "definition": currentVerb.definition,
        "person": currentPronoun,
        "type1": verbTypeList[0],
        "type2": verbTypeList.length === 2 ? verbTypeList[1] : null,
        "answer": this.getAnswer(currentVerbType, currentPronoun, currentVerb.conjugations)
      };
      questionArray.push(currentVerbObject)
    }
    this.questions = questionArray;
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleClose = () => {
    if (this.state.currentQuestion + 1 === this.questions.length) {
      return;
    }
    this.setState((oldState, props) => ({
      currentQuestion: oldState.currentQuestion + 1,
      value: ""
    }));
    this.setState({ open: false });
  };

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (this.state.open) {
        this.setState({ open: false });
        if (this.state.currentQuestion + 1 === this.questions.length) {
          return;
        }
        this.setState((oldState, props) => ({
          currentQuestion: oldState.currentQuestion + 1,
          value: ""
        }));
        return;
      }
      if (this.questions[this.state.currentQuestion].answer !== this.state.value) {
        this.setState({ open: true });
      } else {
        this.setState((oldState, props) => ({
          currentQuestion: oldState.currentQuestion + 1,
          value: ""
        }));
      }

    }
  };

  render() {
    return (
      <Container maxWidth="md" className="nji-main" onKeyDown={this._handleKeyDown}>
        <Grid container className="center-grid" direction="column">
          <Grid item>
            <Card className="nji-main-card">
              <CardContent>
                <SimpleDialog
                  open={this.state.open} handleClose={this.handleClose}
                  answer={this.state.value}
                  correctAnswer={this.questions[this.state.currentQuestion].answer}/>
                <div className="nji-main-top">
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={(this.state.currentQuestion/this.numberOfQuestions) * 100}
                  />
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
                      variant="h1">{this.questions[this.state.currentQuestion].verb}</Typography>
                    <Typography
                      variant="h4">{this.questions[this.state.currentQuestion].definition}</Typography>
                    <div className="nji-main-chips">
                      <Chip label={this.questions[this.state.currentQuestion].type1}/>
                      <Hidden xsUp={this.questions[this.state.currentQuestion].type2 === null}>
                        <Chip label={this.questions[this.state.currentQuestion].type2}/>
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
                    <Typography variant="h1">
                      <TextField id="standard-basic"
                                 label={this.questions[this.state.currentQuestion].person}
                                 onChange={this.handleChange} value={this.state.value}
                                 autoFocus={true} autoComplete='off'/>
                      {/*<div contentEditable="true">{this.state.value}</div>*/}
                    </Typography>
                  </Box>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
