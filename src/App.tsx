import React, { ChangeEvent, useMemo, useState } from "react";
import "./styles/App.scss";
import { Container, Card, CardContent, Grid } from "@mui/material";
import OptionPage from "./features/options/OptionPage";
import Home from "./features/home/Home";
import { Question, QuestionType, VerbType } from "./types/types";
import Settings from "./structures/Settings";
import Quiz from "./structures/Quiz";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import QuizSection from "./features/quiz/QuizSection";
import Results from "./features/results/Results";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const quiz: Quiz = useMemo<Quiz>(() => new Quiz(), []);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    new Question(),
  );
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>(new Settings());

  const questionTypes: QuestionType[] = useMemo(() => {
    const questionTypes = [];
    if (settings.conjugationMC) questionTypes.push(QuestionType.ConjugationMC);
    if (settings.conjugationW && !settings.isMobile)
      questionTypes.push(QuestionType.ConjugationW);
    if (settings.definitionMC) questionTypes.push(QuestionType.DefinitionMC);
    if (settings.definitionW && !settings.isMobile)
      questionTypes.push(QuestionType.DefinitionW);
    if (settings.poropara) questionTypes.push(QuestionType.PorOParaFIB);
    return questionTypes;
  }, [settings]);

  const updateVerbTypes = (event: ChangeEvent<HTMLInputElement>) => {
    const eventTargetName = event.target.name as VerbType;
    setSettings((prevSettings) => {
      const settingsCopy = { ...prevSettings };
      const verbTypesCopy = [...settingsCopy.verbTypes];
      const index = verbTypesCopy.indexOf(eventTargetName);
      if (index === -1) {
        verbTypesCopy.push(eventTargetName);
      } else {
        verbTypesCopy.splice(index, 1);
      }
      settingsCopy.verbTypes = verbTypesCopy;
      return settingsCopy;
    });
  };

  const updateSettings = (settingKey: keyof Settings, settingValue: any) => {
    setSettings((prevSettings) => {
      const settingsCopy = { ...prevSettings };
      // @ts-ignore
      settingsCopy[settingKey] = settingValue as any;
      return settingsCopy;
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
    navigate("/");
  };

  const goToResults = () => {
    navigate("/results");
  };

  const realAnswer = () => {
    return currentQuestion.answer.replace(/\|/g, "").toLowerCase();
  };

  const processNext = (value: string) => {
    if (realAnswer() !== value.toLowerCase()) {
      quiz.incorrectAnswers.push({
        ...currentQuestion,
        response: value,
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
    navigate("/quiz");
  };

  const goToOptions = (isMobile: boolean) => {
    const settingsCopy = { ...settings };
    settingsCopy.isMobile = isMobile;
    if (isMobile) {
      settingsCopy.conjugationW = false;
      settingsCopy.definitionW = false;
    }
    setSettings(settingsCopy);
    navigate("/options");
  };

  const sliderChange = (event: any, newValue: number | number[]) => {
    updateSettings("numberOfQuestions", newValue);
  };

  const getAppClass = () => {
    return location.pathname === "/options"
      ? "center-grid nji-option-mobile"
      : "center-grid";
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" className="nji-main">
        <Grid container className={getAppClass()} direction="column">
          <Grid className="nji-wrap">
            <Card className="nji-main-card">
              <CardContent>
                <Routes>
                  <Route
                    path="/results"
                    element={<Results results={quiz.incorrectAnswers} />}
                  />
                  <Route
                    path="/options"
                    element={
                      <OptionPage
                        settings={settings}
                        settingsChanged={updateSettingsEvent}
                        start={start}
                        sliderChange={sliderChange}
                        updateVerbTypes={updateVerbTypes}
                      />
                    }
                  />
                  <Route
                    path="/quiz"
                    element={
                      <QuizSection
                        next={processNext}
                        question={currentQuestion}
                        percentComplete={
                          (quiz.currentQuestion / settings.numberOfQuestions) *
                          100
                        }
                      />
                    }
                  />
                  <Route
                    path="/"
                    element={
                      <Home
                        numberOfQuestions={settings.numberOfQuestions}
                        incorrectAnswers={quiz.incorrectAnswers.length}
                        start={start}
                        goToOptions={goToOptions}
                        goToResults={goToResults}
                        started={isStarted}
                      />
                    }
                  />
                </Routes>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
