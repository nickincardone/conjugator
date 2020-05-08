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
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import QuizSection from "./components/quizSection/QuizSection";

interface AppState {
  value: string;
  currentQuestion: Question;
  open: boolean;
  showExplanation: boolean;
  submitted: boolean;
  started: boolean;
  clickable: boolean;
  settings: Settings;
}

class App extends React.Component<RouteComponentProps, AppState> {
  quiz: Quiz = new Quiz();

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      value: '',
      currentQuestion: new Question(),
      open: false,
      showExplanation: false,
      submitted: false,
      started: false,
      clickable: true,
      settings: new Settings(),
    };
  }

  componentDidMount = () => {
    // document.addEventListener("keydown", this.handleKeyDown, false);
  };

  componentWillUnmount = () => {
    // document.removeEventListener("keydown", this.handleKeyDown, false);
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

  // handleKeyDown = (e: KeyboardEvent) => {
  //   const isEnterOrTouch = e.key === 'Enter' || e.type === 'touchend';
  //   // @ts-ignore
  //   if (e.target !== null && e.target.classList && e.target.classList.contains('prevent-touch')) return;
  //   //por o para next
  //   if (isEnterOrTouch && this.state.currentQuestion.questionType === QuestionType.PorOParaFIB
  //     && !this.state.clickable) {
  //     return this.processNext();
  //   }
  //   //popup next
  //   if (isEnterOrTouch && (this.state.currentQuestion.questionType % 2 === 0 || this.state.open)) {
  //     this.setState({ 'submitted': true });
  //     this.processNext();
  //   }
  // };

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

  restart = () => {
    this.setState({ showExplanation: false, clickable: true }, () =>
      this.props.history.replace("/")
    );
  };

  processNext = (value: string) => {
    if (this.state.currentQuestion.questionType === QuestionType.PorOParaFIB) {
      if (!this.state.clickable) {
        if (this.realAnswer() !== value.toLowerCase()) {
          this.quiz.incorrectAnswers.push({
            ...this.state.currentQuestion,
            response: value
          });
        }
        if (this.quiz.isEnd()) {
          this.restart();
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
        this.restart();
      } else {
        this.nextQuestion();
      }
    } else {
      if (this.realAnswer() !== value.toLowerCase()) {
        this.quiz.incorrectAnswers.push({
          ...this.state.currentQuestion,
          response: value
        });
      }
      if (this.quiz.isEnd()) {
        this.restart();
      } else {
        this.nextQuestion();
      }
    }
  };

  // handleSubmit = (value: string) => {
  //   this.setState({ value: value }, this.processNext);
  // };

  realAnswer() {
    return this.state.currentQuestion.answer.replace(/\|/g, '').toLowerCase();
  }

  // getQuestion(questionType: number) {
  //   return (
  //     <QuestionCard
  //       question={this.state.currentQuestion}
  //       value={this.state.value}
  //       showExplanation={this.openExplanation}
  //       clickable={this.state.clickable}
  //       next={this.processNext}
  //       handleSubmit={this.handleSubmit}
  //       handleChange={this.handleChange}
  //       isSubmitted={this.state.submitted}/>
  //   )
  // }

  start = (isMobile: boolean) => {
    if (this.getQuestionTypes().length === 0) return;
    const settings = {...this.state.settings};
    settings.isMobile = isMobile;
    const firstQuestion = this.quiz.generateQuiz(settings);
    this.setState({
      settings: settings,
      currentQuestion: firstQuestion,
      started: true,
      submitted: false,
      value: ''
    }, () => this.props.history.replace('/quiz'));
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

  // getAppClass = () => {
  //   return (this.state.showStart && this.state.showCustom)
  //     ? 'center-grid nji-option-mobile' : 'center-grid';
  // };

  render() {
    return (
      <Container maxWidth="md" className="nji-main">
        <Grid container className="center-grid" direction="column">
          <Grid item>
            <Card className="nji-main-card">
              <CardContent>
                <Switch>
                  <Route path="/options" exact render={(props => {
                    return <OptionPage
                      settings={this.state.settings}
                      settingsChanged={this.updateSettingsEvent}
                      start={this.start}
                      sliderChange={this.sliderChange}
                      updateVerbTypes={this.updateVerbTypes}/>
                  })}/>
                  <Route path="/quiz" exact render={(props => {
                    return (
                    //   <Hidden>
                    //   <LinearProgress
                    //     variant="determinate"
                    //     color="secondary"
                    //     value={(this.quiz.currentQuestion / this.state.settings.numberOfQuestions) * 100}/>
                    //   <ExplanationDialog
                    //     open={this.state.showExplanation}
                    //     handleClose={this.processNext}
                    //     rule={rules[this.state.currentQuestion.explanation]}/>
                    //   <SimpleDialog
                    //     open={this.state.open}
                    //     answer={this.state.value}
                    //     handleClose={this.processNext}
                    //     question={this.state.currentQuestion}/>
                    //   {this.getQuestion(this.state.currentQuestion.questionType)}
                    // </Hidden>
                      <QuizSection next={this.processNext} question={this.state.currentQuestion}/>
                    )
                  })}/>
                  <Route path="/" render={(props => {
                    return <Home
                      history={props.history}
                      numberOfQuestions={this.state.settings.numberOfQuestions}
                      incorrectAnswers={this.quiz.incorrectAnswers.length}
                      start={this.start}
                      started={this.state.started}/>
                  })}/>
                </Switch>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withRouter(App);
