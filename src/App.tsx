import React, {ChangeEvent, useCallback, useMemo, useState} from 'react';
import './App.scss';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import OptionPage from './components/options/OptionPage';
import Home from './components/home/Home';
import {Question, QuestionType, VerbType} from "./types";
import Settings from "./structures/Settings";
import Quiz from "./structures/Quiz";
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import QuizSection from "./components/quizSection/QuizSection";
import Results from "./components/results/Results";

function App(props: RouteComponentProps) {
  const quiz: Quiz = useMemo<Quiz>(() => new Quiz(), []);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(new Question());
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>(new Settings());

  const questionTypes: QuestionType[] = useMemo(() => {
    const questionTypes = [];
    if (settings.conjugationMC) questionTypes.push(QuestionType.ConjugationMC);
    if (settings.conjugationW && !settings.isMobile) questionTypes.push(QuestionType.ConjugationW);
    if (settings.definitionMC) questionTypes.push(QuestionType.DefinitionMC);
    if (settings.definitionW && !settings.isMobile) questionTypes.push(QuestionType.DefinitionW);
    if (settings.poropara) questionTypes.push(QuestionType.PorOParaFIB);
    return questionTypes
  }, [settings]);

  const updateVerbTypes = (event: ChangeEvent<HTMLInputElement>) => {
    const eventTargetName = event.target.name as VerbType;
    setSettings(prevSettings => {
      const settingsCopy = { ...prevSettings };
      const verbTypesCopy = [...settingsCopy.verbTypes];
      const index = verbTypesCopy.indexOf(eventTargetName);
      if (index === -1) {
        verbTypesCopy.push(eventTargetName)
      } else {
        verbTypesCopy.splice(index, 1)
      }
      settingsCopy.verbTypes = verbTypesCopy;
      return settingsCopy;
    });
  };

  const updateSettings = (settingKey: keyof Settings, settingValue: any) => {
    setSettings(prevSettings => {
      const settingsCopy = { ...prevSettings };
      // @ts-ignore
      settingsCopy[settingKey] = settingValue as any;
      return settingsCopy
    });
  };

  const updateSettingsEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const eventTarget = event.target;
    updateSettings(eventTarget.name as keyof Settings, eventTarget.checked);
  };

  const nextQuestion = () => {
    const nextQuestion = quiz.nextQuestion() as Question;
    setCurrentQuestion(nextQuestion);
  };

  const restart = () => {
    props.history.replace("/");
  };

  const goToResults = () => {
    props.history.replace("/results");
  };

  const realAnswer = () => {
    return currentQuestion.answer.replace(/\|/g, '').toLowerCase();
  };

  const processNext = (value: string) => {
    if (realAnswer() !== value.toLowerCase()) {
      quiz.incorrectAnswers.push({
        ...currentQuestion,
        response: value
      });
    }
    if (quiz.isEnd()) {
      restart();
    } else {
      nextQuestion();
    }
  };

  const start = (isMobile: boolean) => {
    if (questionTypes.length === 0) return;
    const settingsCopy: Settings = { ...settings };
    settingsCopy.isMobile = isMobile;
    const firstQuestion = quiz.generateQuiz(settingsCopy);
    setSettings(settingsCopy);
    setCurrentQuestion(firstQuestion);
    setIsStarted(true);
    props.history.replace('/quiz')
  };
  
  const goToOptions = (isMobile: boolean) => {
    const settingsCopy = {...settings};
    settingsCopy.isMobile = isMobile;
    if (isMobile) {
      settingsCopy.conjugationW = false;
      settingsCopy.definitionW = false;
    }
    setSettings(settingsCopy);
    props.history.replace("/options");
  };

  const sliderChange = (event: any, newValue: number|number[]) => {
    updateSettings('numberOfQuestions', newValue);
  };

  const getAppClass = () => {
    return (props.location.pathname === '/options')
      ? 'center-grid nji-option-mobile' : 'center-grid';
  };

  return (
    <Container maxWidth="md" className="nji-main">
      <Grid container className={getAppClass()} direction="column">
        <Grid item className="nji-wrap">
          <Card className="nji-main-card">
            <CardContent>
              <Switch>
                <Route path="/results" exact render={(props => {
                  return <Results history={props.history} results={quiz.incorrectAnswers}/>
                })} />
                <Route path="/options" exact render={(props => {
                  return <OptionPage
                    settings={settings}
                    settingsChanged={updateSettingsEvent}
                    start={start}
                    sliderChange={sliderChange}
                    updateVerbTypes={updateVerbTypes}/>
                })}/>
                <Route path="/quiz" exact render={(props => {
                  return <QuizSection next={processNext}
                                      history={props.history}
                                      question={currentQuestion}
                                      percentComplete={(quiz.currentQuestion / settings.numberOfQuestions) * 100}/>
                })}/>
                <Route path="/" render={(props => {
                  return <Home
                    numberOfQuestions={settings.numberOfQuestions}
                    incorrectAnswers={quiz.incorrectAnswers.length}
                    start={start}
                    goToOptions={goToOptions}
                    goToResults={goToResults}
                    started={isStarted}/>
                })}/>
              </Switch>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default withRouter(App);
