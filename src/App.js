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
import LinearProgress from '@material-ui/core/LinearProgress';
import { Hidden } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import QuestionCard from './components/cards/QuestionCard';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

class App extends React.Component {
  incorrectAnswers = 0;

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentQuestion: 0,
      numberOfQuestions: 5,
      open: false,
      showStart: true,
      started: false,
      isMobile: false,
      questionType1: true,
      questionType2: true,
      questionType3: true,
      questionType4: true,
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

  getQuestionTypes() {
    const questionTypes = [];
    if (this.state.questionType1) questionTypes.push(1);
    if (this.state.questionType2 && !this.state.isMobile) questionTypes.push(2);
    if (this.state.questionType3) questionTypes.push(3);
    if (this.state.questionType4 && !this.state.isMobile) questionTypes.push(4);
    return questionTypes;
  }

  createQuestions = () => {
    this.incorrectAnswers = 0;
    const questionArray = [];
    let questionTypes = this.getQuestionTypes();
    const pronouns = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'];
    for (let i = 0; i < this.state.numberOfQuestions; i++) {
      const currentVerb = verbs[Math.floor(Math.random() * verbs.length)];
      const currentVerbType = verbTypes[Math.floor(Math.random() * verbTypes.length)];
      const currentQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      const verbTypeList = verbTypeNicknames[currentVerbType].split('.');
      const currentPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];

      let currentQuestionObject;
      if (currentQuestionType === 3 || currentQuestionType === 4) {
        currentQuestionObject = {
          "questionType": currentQuestionType,
          "top1": currentVerb.definition,
          "top2": '',
          "top3": '',
          "type1": 'defintion',
          "type2": undefined,
          "type3": undefined,
          "answer": currentVerb.verb,
          "choices": this.getDefinitionChoices(currentVerb.verb)
        };
      } else {
        currentQuestionObject = {
          "questionType": currentQuestionType,
          "top1": currentVerb.verb,
          "top2": currentVerb.definition,
          "top3": currentPronoun,
          "type1": verbTypeList[0],
          "type2": verbTypeList[1],
          "type3": verbTypeList[2],
          "answer": this.getAnswer(currentVerbType, currentPronoun, currentVerb.conjugations),
          "choices": this.getConjugationChoices(currentVerbType,
            currentPronoun,
            currentVerb.conjugations)
        };
      }
      if (currentVerbType === 'participle' || currentVerbType === 'gerund') {
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
    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

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
    this.processNext();
  };

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.processNext();
    }
  };

  nextQuestion= () => {
    this.setState((oldState, props) => ({
      currentQuestion: oldState.currentQuestion + 1,
      value: ""
    }));
  };

  processNext = () => {
    if (this.state.open) {
      this.setState({ open: false });
      if (this.state.currentQuestion + 1 === this.questions.length) {
        this.setState({ showStart: true });
      } else {
        this.nextQuestion();
      }
    } else {
      if (this.realAnswer() !== this.state.value) {
        this.setState({ open: true });
        this.incorrectAnswers = this.incorrectAnswers + 1;
      } else {
        if (this.state.currentQuestion + 1 === this.questions.length) {
          setTimeout(() => {
            this.setState({ showStart: true });
          }, 510);
        } else {
          setTimeout(this.nextQuestion, 510);
        }
      }
    }
  };

  handleSubmit = (value) => {
    this.setState({ value: value }, this.processNext);
  };

  realAnswer() {
    return this.questions[this.state.currentQuestion].answer.replace('|', '').replace('|', '');
  }

  getQuestion(questionType) {
    const isMC = questionType % 2 === 1;
    return (
      <QuestionCard
        isMC={isMC}
        question={this.questions[this.state.currentQuestion]}
        value={this.state.value}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}/>
    )
  }

  start = (isMobile) => {
    this.setState({ isMobile: isMobile }, () => {
      if (this.getQuestionTypes().length === 0) {
        return;
      }
      this.createQuestions();
      this.setState({ showStart: false, currentQuestion: 0, started: true });
    });
  };

  checkboxChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  sliderChange = (event, newValue) => {
    this.setState({ numberOfQuestions: newValue });
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
                    style={{ 'paddingTop': '50px' }}
                  >
                    <Hidden xsUp={this.state.started}>Hello, welcome to Conjugator</Hidden>
                    <Hidden xsUp={!this.state.started}>{this.state.numberOfQuestions-this.incorrectAnswers}/{this.state.numberOfQuestions} correct! Try Again.</Hidden>
                    <br/>
                    <FormControl component="fieldset"
                                 style={{ 'marginTop': '50px', 'marginBottom': '20px' }}>
                      <FormLabel component="legend">Question Types</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox name="questionType3" checked={this.state.questionType3}
                                             onChange={this.checkboxChange}/>}
                          label="Definition (Multiple Choice)"
                        />
                        <Hidden mdDown>
                          <FormControlLabel
                            control={<Checkbox name="questionType4"
                                               checked={this.state.questionType4}
                                               onChange={this.checkboxChange}/>}
                            label="Definition (Written)"
                          />
                        </Hidden>
                        <FormControlLabel
                          control={<Checkbox name="questionType1" checked={this.state.questionType1}
                                             onChange={this.checkboxChange}/>}
                          label="Conjugations (Multiple Choice)"
                        />
                        <Hidden mdDown>
                          <FormControlLabel
                            control={<Checkbox name="questionType2"
                                               checked={this.state.questionType2}
                                               onChange={this.checkboxChange}/>}
                            label="Conjugations (Written)"
                          />
                        </Hidden>
                      </FormGroup>
                    </FormControl>
                    <Typography id="discrete-slider-custom" gutterBottom>
                      Number of Questions
                    </Typography>
                    <Slider
                      defaultValue={this.state.numberOfQuestions}
                      min={0}
                      max={100}
                      aria-labelledby="discrete-slider-custom"
                      step={5}
                      valueLabelDisplay="auto"
                      style={{ "maxWidth": "200px" }}
                      onChange={this.sliderChange}
                    />
                    <Hidden mdUp>
                      <Button variant="contained" color="primary" onClick={() => {
                        this.start(true)
                      }} style={{ 'marginTop': '50px' }}>
                        start
                      </Button>
                    </Hidden>
                    <Hidden smDown>
                      <Button variant="contained" color="primary" onClick={() => {
                        this.start(false)
                      }} style={{ 'marginTop': '50px' }}>
                        start
                      </Button>
                    </Hidden>
                  </Box>
                </Hidden>
                <Hidden xsUp={this.state.showStart}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={(this.state.currentQuestion / this.state.numberOfQuestions) * 100}/>
                  <SimpleDialog
                    open={this.state.open}
                    handleClose={this.handleClose}
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
