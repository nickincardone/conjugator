import React from 'react';
import './App.scss';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import verbs from './data/conjugationVerbs';
import haber from './data/haber';
import verbTypes from './data/verbTypes';
import SimpleDialog from './components/SimpleDialog';
import ConjugationCard from './components/cards/ConjugationCard/ConjugationCard';
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
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
  }

  getAnswer(currentVerbType, currentPronoun, conjugations) {
    if (currentVerbType === 'participle' || currentVerbType === 'gerund') {
      return conjugations[currentVerbType];
    }
    if (currentVerbType.includes('perfect')) {
      return this.resolve(currentVerbType.substring(8,) + '.' + currentPronoun,
        haber) + ' ' + conjugations['participle'];
    }
    return this.resolve(currentVerbType + '.' + currentPronoun, conjugations);
  }

  createQuestions = () => {
    const questionArray = [];
    const pronouns = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'];
    for (let i = 0; i < this.numberOfQuestions; i++) {
      const currentVerb = verbs[Math.floor(Math.random() * verbs.length)];
      const currentVerbType = verbTypes[Math.floor(Math.random() * verbTypes.length)];
      let currentPronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
      const verbTypeList = currentVerbType.split('.');
      if (currentVerbType === 'participle' || currentVerbType === 'gerund') {
        currentPronoun = '';
      }
      const currentVerbObject = {
        "verb": currentVerb.verb,
        "definition": currentVerb.definition,
        "person": currentPronoun,
        "type1": verbTypeList[0],
        "type2": verbTypeList[1],
        "type3": verbTypeList[2],
        "answer": this.getAnswer(currentVerbType, currentPronoun, currentVerb.conjugations)
      };
      questionArray.push(currentVerbObject);
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
      if (this.realAnswer() !== this.state.value) {
        this.setState({ open: true });
      } else {
        this.setState((oldState, props) => ({
          currentQuestion: oldState.currentQuestion + 1,
          value: ""
        }));
      }
    }
  };

  realAnswer() {
    return this.questions[this.state.currentQuestion].answer.replace('|', '').replace('|', '');
  }

  render() {
    return (
      <Container maxWidth="md" className="nji-main" onKeyDown={this._handleKeyDown}>
        <Grid container className="center-grid" direction="column">
          <Grid item>
            <Card className="nji-main-card">
              <CardContent>
                <LinearProgress
                  variant="determinate"
                  color="secondary"
                  value={(this.state.currentQuestion / this.numberOfQuestions) * 100} />
                <SimpleDialog
                  open={this.state.open} handleClose={this.handleClose}
                  answer={this.state.value}
                  correctAnswer={this.realAnswer()} />
                <ConjugationCard
                  question={this.questions[this.state.currentQuestion]}
                  value={this.state.value}
                  handleChange={this.handleChange}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
