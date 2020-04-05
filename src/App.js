import React from 'react';
import './App.scss';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import verbs from './data/conjugationVerbs';
import haber from './data/haber';
import verbTypes from './data/verbTypes';
import verbTypeNicknames from './data/verbTypeNicknames';
import SimpleDialog from './components/SimpleDialog';
import ConjugationCard from './components/cards/ConjugationCard/ConjugationCard';
import LinearProgress from '@material-ui/core/LinearProgress';
import MultipleChoiceCard from './components/cards/ConjugationCard/MultipleChoiceCard';
import { Hidden } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

class App extends React.Component {
  numberOfQuestions = 25;

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentQuestion: 0,
      open: false,
      showStart: true,
      isMobile: false
    };
    this.createQuestions();
  }

  resolve(path, obj) {
    const properties = Array.isArray(path) ? path : path.split('.');
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
  }

  getAnswer(currentVerbType, currentPronoun, conjugations) {
    if (currentVerbType === 'participle' || currentVerbType === 'gerund') {
      return conjugations[currentVerbType];
    }
    if (currentVerbType.includes('perfect.')) {
      return this.resolve(currentVerbType.substring(8,) + '.' + currentPronoun,
        haber) + ' ' + conjugations['participle'];
    }
    return this.resolve(currentVerbType + '.' + currentPronoun, conjugations);
  }

  createQuestions = () => {
    const questionArray = [];
    let questionTypes = [1,2,3,4];
    if (this.state.isMobile) {
      questionTypes = [1]
    }
    const pronouns = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'];
    for (let i = 0; i < this.numberOfQuestions; i++) {
      const currentVerb = verbs[Math.floor(Math.random() * verbs.length)];
      const currentVerbType = verbTypes[Math.floor(Math.random() * verbTypes.length)];
      const currentQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      let currentPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      let choices = this.getConjugationChoices(currentVerbType, currentPronoun, currentVerb.conjugations);
      let verbTypeList = verbTypeNicknames[currentVerbType].split('.');
      if (currentVerbType === 'participle' || currentVerbType === 'gerund') {
        currentPronoun = '';
      }
      let currentAnswer = this.getAnswer(currentVerbType, currentPronoun, currentVerb.conjugations);
      if (currentQuestionType > 2) {
        currentAnswer = currentVerb.verb;
        console.log(currentAnswer);
        choices = this.getDefinitionChoices(currentVerb.verb);
        verbTypeList = ['defintion'];
      }
      const currentQuestionObject = {
        "questionType": currentQuestionType,
        "top1": currentVerb.verb,
        "top2": currentVerb.definition,
        "top3": currentPronoun,
        "type1": verbTypeList[0],
        "type2": verbTypeList[1],
        "type3": verbTypeList[2],
        "answer": currentAnswer,
        "choices": choices
      };
      if (currentQuestionType > 2) {
        currentQuestionObject.top1 = currentVerb.definition;
        currentQuestionObject.top2 = '';
        currentQuestionObject.top3 = '';
      }
      questionArray.push(currentQuestionObject);
    }
    this.questions = questionArray;
  };

  getDefinitionChoices = (currentVerb) => {
    const choiceArray = [currentVerb];
    while (choiceArray.length < 4) {
      const randomVerb = verbs[Math.floor(Math.random() * verbs.length)].verb;
      if (currentVerb !== randomVerb) {
        choiceArray.push(randomVerb);
      }
    }
    return this.shuffle(choiceArray);
};

  getConjugationChoices = (currentVerbType, currentPronoun, conjugations) => {
    const choiceArray = [];
    const correctAnswer = this.getAnswer(currentVerbType, currentPronoun, conjugations);
    choiceArray.push(this.filterAnswer(correctAnswer));
    while (choiceArray.length < 4) {
      const randomType = verbTypes[Math.floor(Math.random() * verbTypes.length)];
      const randomAnswer = this.getAnswer(randomType, currentPronoun, conjugations);
      if (correctAnswer !== randomAnswer) {
        choiceArray.push(this.filterAnswer(randomAnswer));
      }
    }
    return this.shuffle(choiceArray);
  };

  filterAnswer = (answer) => {
    return answer.replace(/\|/g, '')
  };

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

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
        }
        this.setState((oldState, props) => ({
          currentQuestion: oldState.currentQuestion + 1,
          value: ""
        }));
      } else {
        this.processQuestion();
      }
    }
  };

  processQuestion = () => {
    if (this.realAnswer() !== this.state.value) {
      this.setState({ open: true });
    } else {
      this.setState((oldState, props) => ({
        currentQuestion: oldState.currentQuestion + 1,
        value: ""
      }));
    }
  };

  handleSubmit = (value) => {
    this.setState({ value: value }, this.processQuestion);
  };

  realAnswer() {
    return this.questions[this.state.currentQuestion].answer.replace('|', '').replace('|', '');
  }

  getQuestion(questionType) {
    if (questionType % 2 === 1) {
      return (<MultipleChoiceCard
        question={this.questions[this.state.currentQuestion]}
        value={this.state.value}
        handleSubmit={this.handleSubmit}/>)
    }
    return (
      <ConjugationCard
        question={this.questions[this.state.currentQuestion]}
        value={this.state.value}
        handleChange={this.handleChange}/>
    )
  }

  start = (isMobile) => {
    this.setState({isMobile: isMobile}, () => {
      this.createQuestions();
      this.setState({showStart: false});
    });
  };

  render() {
    return (
      <Container maxWidth="md" className="nji-main" onKeyDown={this._handleKeyDown}>
        <Grid container className="center-grid" direction="column">
          <Grid item>
            <Card className="nji-main-card">
              <CardContent>
                <Hidden xsUp={!this.state.showStart}>
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    minHeight={360}
                    color={'common.black'}
                    textAlign={'center'}
                    style={{'paddingTop': '50px'}}
                  >
                    Hello, welcome to Conjugator {this.state.showStart}<br/>
                    <Hidden smUp>
                      <Button variant="contained" color="primary" onClick={() => {this.start(true)}} style={{'marginTop': '50px'}}>
                        start
                      </Button>
                    </Hidden>
                    <Hidden xsDown>
                      <Button variant="contained" color="primary" onClick={() => {this.start(false)}} style={{'marginTop': '50px'}}>
                        start
                      </Button>
                    </Hidden>
                  </Box>
                </Hidden>
                <Hidden xsUp={this.state.showStart}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={(this.state.currentQuestion / this.numberOfQuestions) * 100}/>
                  <SimpleDialog
                    open={this.state.open} handleClose={this.handleClose}
                    answer={this.state.value}
                    correctAnswer={this.realAnswer()}/>
                  {this.getQuestion(this.questions[this.state.currentQuestion].questionType)}
                </Hidden>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
