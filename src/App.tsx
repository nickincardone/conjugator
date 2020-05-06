import React, {ChangeEvent} from 'react';
import './App.scss';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import rules from './data/rules';
import SimpleDialog from './components/dialogs/answerDialog/AnswerDialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Hidden} from '@material-ui/core';
import OptionPage from './components/options/OptionPage';
import Home from './components/home/Home';
import QuestionCard from './components/cards/QuestionCard';
import ExplanationDialog from './components/dialogs/explanationDialog/ExplanationDialog';
import {Question, QuestionType} from "./types";
import Settings from "./structures/Settings";
import Quiz from "./structures/Quiz";

interface AppState {
  value: string;
  currentQuestion: Question;
  open: boolean;
  showExplanation: boolean;
  showStart: boolean;
  showCustom: boolean;
  submitted: boolean;
  started: boolean;
  clickable: boolean;
  settings: Settings;
}

class App extends React.Component<{}, AppState> {
  quiz: Quiz = new Quiz();

  constructor(props: {}) {
    super(props);
    this.state = {
      value: '',
      currentQuestion: new Question(),
      open: false,
      showExplanation: false,
      showStart: true,
      showCustom: false,
      submitted: false,
      started: false,
      clickable: true,
      settings: new Settings(),
    };
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeyDown, false);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  };

  updateVerbTypes = (event: ChangeEvent<HTMLInputElement>) => {
    const eventTarget = event.target;
    this.setState((oldState: any) => {
      const settingsCopy = { ...oldState.settings };
      const verbTypesCopy = [...settingsCopy.verbTypes];
      const index = verbTypesCopy.indexOf(eventTarget.name);
      if (index === -1) {
        verbTypesCopy.push(eventTarget.name)
      } else {
        verbTypesCopy.splice(index, 1)
      }
      settingsCopy.verbTypes = verbTypesCopy;
      return { settings: settingsCopy }
    });
  };

  updateSettingsEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const eventTarget = event.target;
    this.updateSettings(eventTarget.name as keyof Settings, eventTarget.checked);
  };

  updateSettings = (settingKey: keyof Settings, settingValue: any) => {
    this.setState((oldState) => {
      const settingsCopy = { ...oldState.settings };
      // @ts-ignore
      settingsCopy[settingKey] = settingValue as any;
      return { settings: settingsCopy }
    });
  };

  getQuestionTypes(): QuestionType[] {
    const questionTypes: QuestionType[] = [];
    if (this.state.settings.conjugationMC) questionTypes.push(QuestionType.ConjugationMC);
    if (this.state.settings.conjugationW && !this.state.settings.isMobile) questionTypes.push(QuestionType.ConjugationW);
    if (this.state.settings.definitionMC) questionTypes.push(QuestionType.DefinitionMC);
    if (this.state.settings.definitionW && !this.state.settings.isMobile) questionTypes.push(QuestionType.DefinitionW);
    if (this.state.settings.poropara) questionTypes.push(QuestionType.PorOParaFIB);
    return questionTypes;
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  handleKeyDown = (e: KeyboardEvent) => {
    const isEnterOrTouch = e.key === 'Enter' || e.type === 'touchend';
    // @ts-ignore
    if (e.target !== null && e.target.classList && e.target.classList.contains('prevent-touch')) return;
    //por o para next
    if (isEnterOrTouch && this.state.currentQuestion.questionType === QuestionType.PorOParaFIB
      && !this.state.clickable) {
      return this.processNext();
    }
    //popup next
    if (isEnterOrTouch && (this.state.currentQuestion.questionType % 2 === 0 || this.state.open)) {
      this.setState({ 'submitted': true });
      this.processNext();
    }
  };

  nextQuestion = () => {
    const nextQuestion = this.quiz.nextQuestion() as Question;
    this.setState({
      currentQuestion: nextQuestion,
      value: "",
      clickable: true,
      showExplanation: false,
      submitted: false
    });
  };

  showStart = () => {
    this.setState({ showStart: true, showExplanation: false, clickable: true });
  };

  processNext = () => {
    if (this.state.currentQuestion.questionType === QuestionType.PorOParaFIB) {
      if (!this.state.clickable) {
        if (this.realAnswer() !== this.state.value.toLowerCase()) {
          this.quiz.incorrectAnswers.push({
            ...this.state.currentQuestion,
            response: this.state.value
          });
        }
        if (this.quiz.isEnd()) {
          this.showStart();
        } else {
          this.nextQuestion();
        }
      } else {
        this.setState({ clickable: false });
      }
      return;
    }
    this.setState({ clickable: false });
    if (this.state.open) {
      this.setState({ open: false });
      if (this.quiz.isEnd()) {
        this.showStart();
      } else {
        this.nextQuestion();
      }
    } else {
      if (this.realAnswer() !== this.state.value.toLowerCase()) {
        this.quiz.incorrectAnswers.push({
          ...this.state.currentQuestion,
          response: this.state.value
        });
        this.setState({ open: true });
      } else {
        if (this.quiz.isEnd()) {
          setTimeout(this.showStart, 400);
        } else {
          setTimeout(this.nextQuestion, 400);
        }
      }
    }
  };

  handleSubmit = (value: string) => {
    this.setState({ value: value }, this.processNext);
  };

  realAnswer() {
    return this.state.currentQuestion.answer.replace(/\|/g, '').toLowerCase();
  }

  getQuestion(questionType: number) {
    const isMC = questionType % 2 === 1;
    return (
      <QuestionCard
        isMC={isMC}
        question={this.state.currentQuestion}
        value={this.state.value}
        showExplanation={this.openExplanation}
        clickable={this.state.clickable}
        next={this.processNext}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        isSubmitted={this.state.submitted}/>
    )
  }

  start = (isMobile: boolean) => {
    if (this.getQuestionTypes().length === 0) return;
    const settings = {...this.state.settings};
    settings.isMobile = isMobile;
    const firstQuestion = this.quiz.generateQuiz(settings);
    this.setState({
      showStart: false,
      showCustom: false,
      settings: settings,
      currentQuestion: firstQuestion,
      started: true,
      submitted: false,
      value: ''
    });
  };

  setCustom = (show: boolean) => {
    this.setState({ showCustom: show });
  };

  checkboxChange = (event: any) => {
    const setting = event.target.name as keyof Settings;
    // @ts-ignore
    this.setState({ [setting]: event.target.checked });
  };

  sliderChange = (event: any, newValue: number|number[]) => {
    this.updateSettings('numberOfQuestions', newValue);
  };

  closeExplanation = () => {
    this.setState({showExplanation: false});
  };

  openExplanation = () => {
    this.setState({showExplanation: true});
  };

  getAppClass = () => {
    return (this.state.showStart && this.state.showCustom)
      ? 'center-grid nji-option-mobile' : 'center-grid';
  };

  questionBlock(): JSX.Element {
    return (
      <Hidden xsUp={this.state.showStart}>
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={(this.quiz.currentQuestion / this.state.settings.numberOfQuestions) * 100}/>
        <ExplanationDialog
          open={this.state.showExplanation}
          handleClose={this.processNext}
          rule={rules[this.state.currentQuestion.explanation]}/>
        <SimpleDialog
          open={this.state.open}
          answer={this.state.value}
          handleClose={this.processNext}
          question={this.state.currentQuestion}
          correctAnswer={this.state.currentQuestion.answer}/>
        {this.getQuestion(this.state.currentQuestion.questionType)}
      </Hidden>
    );
  }

  render() {
    return (
      <Container maxWidth="md" className="nji-main">
        <Grid container className={this.getAppClass()} direction="column">
          <Grid item>
            <Card className="nji-main-card">
              <CardContent>
                <Hidden xsUp={!this.state.showStart}>
                  {this.state.showCustom ?
                    <OptionPage
                      settings={this.state.settings}
                      settingsChanged={this.updateSettingsEvent}
                      start={this.start}
                      sliderChange={this.sliderChange}
                      updateVerbTypes={this.updateVerbTypes}/>
                    :
                    <Home
                      setCustom={this.setCustom}
                      numberOfQuestions={this.state.settings.numberOfQuestions}
                      incorrectAnswers={this.quiz.incorrectAnswers.length}
                      start={this.start}
                      started={this.state.started}/>
                  }
                </Hidden>
                { this.state.showStart ? null : this.questionBlock() }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
