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
import QuestionCard from './components/cards/QuestionCard';
import OptionPage from './components/options/OptionPage';
import Home from './components/Home';

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
      showCustom: false,
      started: false,
      isMobile: false,
      settings: {
        vosotros: false,
        questionType1: true,
        questionType2: true,
        questionType3: true,
        questionType4: true,
      },
    };
    this.createQuestions();
  }

  updateSettings = (event) => {
    const eventTarget = event.target;
    this.setState((oldState, props) => {
      const settingsCopy = { ...oldState.settings };
      settingsCopy[eventTarget.name] = eventTarget.checked;
      return { settings: settingsCopy }
    });
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
    if (this.state.settings.questionType1) questionTypes.push(1);
    if (this.state.settings.questionType2 && !this.state.isMobile) questionTypes.push(2);
    if (this.state.settings.questionType3) questionTypes.push(3);
    if (this.state.settings.questionType4 && !this.state.isMobile) questionTypes.push(4);
    return questionTypes;
  }

  createQuestions = () => {
    this.incorrectAnswers = 0;
    const questionArray = [];
    let questionTypes = this.getQuestionTypes();
    const pronouns = ['yo', 'tu', 'el', 'nosotros', 'ellos'];
    if (this.state.settings.vosotros) {
      pronouns.push('vosotros');
    }
    while (questionArray.length < this.state.numberOfQuestions) {
      const currentVerb = verbs[Math.floor(Math.random() * verbs.length)];
      if (currentVerb.definition === "") continue;
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

  nextQuestion = () => {
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
          }, 300);
        } else {
          setTimeout(this.nextQuestion, 300);
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
      this.setState({ showStart: false, showCustom: false, currentQuestion: 0, started: true });
    });
  };

  setCustom = (show) => {
    this.setState({ showCustom: show });
  };

  checkboxChange = (event) => {
    console.log(event.target);
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
                  {this.state.showCustom ?
                    <OptionPage
                      settings={this.state.settings}
                      settingsChanged={this.updateSettings}
                      start={this.start}
                      sliderChange={this.sliderChange}
                      numberOfQuestions={this.state.numberOfQuestions}/>
                    :
                    <Home
                      setCustom={this.setCustom}
                      showStart={this.state.showStart}
                      numberOfQuestions={this.state.numberOfQuestions}
                      incorrectAnswers={this.incorrectAnswers}
                      start={this.start}
                      started={this.state.started}/>
                  }
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
