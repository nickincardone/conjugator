import React, {ChangeEvent} from 'react';
import './App.scss';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import OptionPage from './components/options/OptionPage';
import Home from './components/home/Home';
import {Question, QuestionType} from "./types";
import Settings from "./structures/Settings";
import Quiz from "./structures/Quiz";
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import QuizSection from "./components/quizSection/QuizSection";

interface AppState {
  currentQuestion: Question;
  started: boolean;
  settings: Settings;
}

class App extends React.Component<RouteComponentProps, AppState> {
  quiz: Quiz = new Quiz();

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      currentQuestion: new Question(),
      started: false,
      settings: new Settings(),
    };
  }

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

  nextQuestion = () => {
    const nextQuestion = this.quiz.nextQuestion() as Question;
    this.setState({currentQuestion: nextQuestion});
  };

  restart = () => {
    this.props.history.replace("/");
  };

  processNext = (value: string) => {
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
  };

  realAnswer() {
    return this.state.currentQuestion.answer.replace(/\|/g, '').toLowerCase();
  }

  start = (isMobile: boolean) => {
    if (this.getQuestionTypes().length === 0) return;
    const settings = {...this.state.settings};
    settings.isMobile = isMobile;
    const firstQuestion = this.quiz.generateQuiz(settings);
    this.setState({
      settings: settings,
      currentQuestion: firstQuestion,
      started: true
    }, () => this.props.history.replace('/quiz'));
  };
  
  goToOptions = (isMobile: boolean) => {
    const settings = {...this.state.settings};
    settings.isMobile = isMobile;
    if (isMobile) {
      settings.conjugationW = false;
      settings.definitionW = false;
    }
    this.setState({ settings: settings }, () =>
      this.props.history.replace("/options")
    );
  };

  checkboxChange = (event: any) => {
    const setting = event.target.name as keyof Settings;
    // @ts-ignore
    this.setState({ [setting]: event.target.checked });
  };

  sliderChange = (event: any, newValue: number|number[]) => {
    this.updateSettings('numberOfQuestions', newValue);
  };

  getAppClass = () => {
    return (this.props.location.pathname === '/options')
      ? 'center-grid nji-option-mobile' : 'center-grid';
  };

  render() {
    return (
      <Container maxWidth="md" className="nji-main">
        <Grid container className={this.getAppClass()} direction="column">
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
                    return <QuizSection next={this.processNext}
                                        history={props.history}
                                        question={this.state.currentQuestion}
                                        percentComplete={(this.quiz.currentQuestion / this.state.settings.numberOfQuestions) * 100}/>
                  })}/>
                  <Route path="/" render={(props => {
                    return <Home
                      history={props.history}
                      numberOfQuestions={this.state.settings.numberOfQuestions}
                      incorrectAnswers={this.quiz.incorrectAnswers.length}
                      start={this.start}
                      goToOptions={this.goToOptions}
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
