import React, {ChangeEvent} from 'react';
import './App.scss';
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import verbs from './data/conjugationVerbs';
import irregularVerbs from './data/irregularVerbs';
import haber from './data/haber';
import verbTypes from './data/verbTypes';
import verbTypeNicknames from './data/verbTypeNicknames';
import poropara from './data/poropara';
import rules from './data/rules';
import SimpleDialog from './components/dialogs/answerDialog/AnswerDialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Hidden} from '@material-ui/core';
import OptionPage from './components/options/OptionPage';
import Home from './components/home/Home';
import QuestionCard from './components/cards/QuestionCard';
import ExplanationDialog from './components/dialogs/explanationDialog/ExplanationDialog';
import {Conjugations, Pronoun, Question, QuestionType, Settings, Verb, VerbType} from "./types";

interface AppProps {

}

interface AppState {
  value: string;
  currentQuestion: number;
  numberOfQuestions: number;
  open: boolean;
  showExplanation: boolean;
  showStart: boolean;
  showCustom: boolean;
  submitted: boolean;
  started: boolean;
  isMobile: boolean;
  clickable: boolean;
  settings: Settings;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

class App extends React.Component<AppProps, AppState> {
  incorrectAnswers: number = 0;
  questions: Question[] = [];

  constructor(props: AppProps) {
    super(props);
    this.state = {
      value: '',
      currentQuestion: 0,
      numberOfQuestions: 5,
      open: false,
      showExplanation: false,
      showStart: true,
      showCustom: false,
      submitted: false,
      started: false,
      isMobile: false,
      clickable: true,
      settings: {
        vosotros: false,
        irregular: false,
        conjugationMC: true,
        conjugationW: true,
        definitionMC: true,
        definitionW: true,
        poropara: false,
        verbTypes: [
          "indicative.present",
          "indicative.preterite",
          "indicative.imperfect",
          "indicative.conditional",
          "indicative.future",
        ]
      },
    };
    this.createQuestions();
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.handleKeyDown, false);
  };

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  };

  resolve(path: string, obj: object): any {
    const properties = path.split('.');
    // @ts-ignore
    return properties.reduce((prev: object, curr: string) => prev && prev[curr], obj);
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

  updateSettings = (event: ChangeEvent<HTMLInputElement>) => {
    const eventTarget = event.target;
    this.setState((oldState) => {
      const settingsCopy = { ...oldState.settings };
      // @ts-ignore
      settingsCopy[eventTarget.name] = eventTarget.checked;
      return { settings: settingsCopy }
    });
  };

  getAnswer(currentVerbType: string, currentPronoun: string, conjugations: Conjugations): string {
    if (currentVerbType === 'participle' || currentVerbType === 'gerund') {
      return conjugations[currentVerbType];
    } else if (currentVerbType.includes('perfect.')) {
      return this.resolve(currentVerbType.substring(8,) + '.' + currentPronoun, haber)
        + ' ' + conjugations['participle'];
    } else {
      return this.resolve(currentVerbType + '.' + currentPronoun, conjugations);
    }
  }

  getQuestionTypes(): QuestionType[] {
    const questionTypes: QuestionType[] = [];
    if (this.state.settings.conjugationMC) questionTypes.push(QuestionType.ConjugationMC);
    if (this.state.settings.conjugationW && !this.state.isMobile) questionTypes.push(QuestionType.ConjugationW);
    if (this.state.settings.definitionMC) questionTypes.push(QuestionType.DefinitionMC);
    if (this.state.settings.definitionW && !this.state.isMobile) questionTypes.push(QuestionType.DefinitionW);
    if (this.state.settings.poropara) questionTypes.push(QuestionType.PorOParaFIB);
    return questionTypes;
  }

  createQuestions(): void {
    this.incorrectAnswers = 0;
    const questionArray: Question[] = [];
    const questionTypes: QuestionType[] = this.getQuestionTypes();
    const pronouns: Pronoun[] = ['yo', 'tu', 'el', 'nosotros', 'ellos'];
    if (this.state.settings.vosotros) {
      pronouns.push('vosotros');
    }
    while (questionArray.length < this.state.numberOfQuestions) {
      let currentVerb: Verb = randomItem(verbs);
      if (currentVerb.definition === "") continue;
      let currentVerbType = randomItem(this.state.settings.verbTypes);
      let currentPronoun: Pronoun = randomItem(pronouns);
      const currentQuestionType = randomItem(questionTypes);

      if (this.state.settings.irregular && (currentQuestionType === 1 || currentQuestionType === 2)) {
        currentVerb = randomItem(irregularVerbs);
        const irregularTenses = randomItem(currentVerb.irregularities).split('.');
        if (irregularTenses.length === 1) {
          currentPronoun = randomItem(pronouns);
        } else {
          currentPronoun = irregularTenses.pop() as Pronoun;
        }
        currentVerbType = irregularTenses.join('.') as VerbType;
        if (!this.state.settings.verbTypes.includes(currentVerbType)) continue;
        if (currentVerbType === 'subjunctive.present' && this.state.settings.verbTypes.length !== 1) {
          //reducing the chance of picking a subjunctive present by half
          if (randomItem([true, false])) continue;
        }
        if (currentVerbType.indexOf('perfect.') === 0 && this.state.settings.verbTypes.length !== 1) {
          //reducing the chance of picking a irregular perfect verb by 6
          if (randomItem([true, false, false, false, false, false])) continue;
        }
        if (!this.state.settings.vosotros && currentPronoun === 'vosotros') continue;
      }

      const verbTypeList = currentVerbType ? verbTypeNicknames[currentVerbType].split('.') : [];

      let currentQuestionObject;
      if (currentQuestionType === 3 || currentQuestionType === 4) {
        currentQuestionObject = {
          questionType: currentQuestionType,
          top1: currentVerb.definition,
          top2: '',
          top3: '',
          chips: ['defintion'],
          answer: currentVerb.verb,
          choices: this.getDefinitionChoices(currentVerb.verb),
          explanation: 0
        };
      } else if (currentQuestionType === 1 || currentQuestionType === 2) {
        currentQuestionObject = {
          questionType: currentQuestionType,
          top1: currentVerb.verb,
          top2: currentVerb.definition,
          top3: currentPronoun,
          chips: verbTypeList,
          answer: this.getAnswer(currentVerbType, currentPronoun, currentVerb.conjugations),
          choices: this.getConjugationChoices(currentVerbType,
            currentPronoun,
            currentVerb.conjugations),
          explanation: 0
        }
      } else {
        const randomPorOPara = randomItem(poropara);
        currentQuestionObject = {
          questionType: QuestionType.PorOParaFIB,
          top1: randomPorOPara.question,
          top2: '',
          top3: '',
          chips: [],
          answer: randomPorOPara.answer,
          translation: randomPorOPara.translation,
          choices: ['por', 'para'],
          explanation: randomPorOPara.reason
        }
      }
      if (currentVerbType === 'participle' || currentVerbType === 'gerund') {
        currentQuestionObject.top3 = '';
      }
      questionArray.push(currentQuestionObject);
    }
    this.questions = questionArray;
  };

  getDefinitionChoices(currentVerb: string): string[] {
    const choiceArray = [currentVerb];
    while (choiceArray.length < 4) {
      const randomVerb = randomItem(verbs).verb;
      if (currentVerb !== randomVerb) {
        choiceArray.push(randomVerb);
      }
    }
    return this.shuffle(choiceArray);
  };

  getConjugationChoices = (currentVerbType: VerbType, currentPronoun: Pronoun, conjugations: Conjugations) => {
    const correctAnswer = this.getAnswer(currentVerbType, currentPronoun, conjugations);
    const choiceArray = [this.filterAnswer(correctAnswer)];
    while (choiceArray.length < 4) {
      const randomType = randomItem(verbTypes);
      const randomAnswer = this.getAnswer(randomType, currentPronoun, conjugations);
      if (correctAnswer !== randomAnswer) {
        choiceArray.push(this.filterAnswer(randomAnswer));
      }
    }
    return this.shuffle(choiceArray);
  };

  filterAnswer = (answer: string) => {
    return answer.replace(/\|/g, '')
  };

  shuffle<T>(array: T[]): T[] {
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

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  // TODO needs typing
  handleKeyDown = (e: any) => {
    const isEnterOrTouch = e.key === 'Enter' || e.type === 'touchend';
    // @ts-ignore
    if (e.target !== null && e.target.classList && e.target.classList.contains('prevent-touch')) return;
    //por o para next
    if (isEnterOrTouch && this.questions[this.state.currentQuestion].questionType === QuestionType.PorOParaFIB
      && !this.state.clickable) {
      return this.processNext();
    }
    //popup next
    if (isEnterOrTouch && (this.questions[this.state.currentQuestion].questionType % 2 === 0 || this.state.open)) {
      this.setState({ 'submitted': true });
      this.processNext();
    }
  };

  nextQuestion = () => {
    this.setState((oldState, props) => ({
      currentQuestion: oldState.currentQuestion + 1,
      value: "",
      clickable: true,
      showExplanation: false,
      submitted: false
    }));
  };

  processNext = () => {
    if (this.questions[this.state.currentQuestion].questionType === QuestionType.PorOParaFIB) {
      if (!this.state.clickable) {
        if (this.realAnswer() !== this.state.value.toLowerCase()) {
          this.incorrectAnswers = this.incorrectAnswers + 1;
        }
        if (this.state.currentQuestion + 1 === this.questions.length) {
          this.setState({ showStart: true, showExplanation: false, clickable: true });
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
      if (this.state.currentQuestion + 1 === this.questions.length) {
        this.setState({ showStart: true, showExplanation: false, clickable: true });
      } else {
        this.nextQuestion();
      }
    } else {
      if (this.realAnswer() !== this.state.value.toLowerCase()) {
        this.setState({ open: true });
        this.incorrectAnswers = this.incorrectAnswers + 1;
      } else {
        if (this.state.currentQuestion + 1 === this.questions.length) {
          setTimeout(() => {
            this.setState({ showStart: true, showExplanation: false, clickable: true });
          }, 400);
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
    return this.questions[this.state.currentQuestion].answer.replace(/\|/g, '').toLowerCase();
  }

  getQuestion(questionType: number) {
    const isMC = questionType % 2 === 1;
    return (
      <QuestionCard
        isMC={isMC}
        question={this.questions[this.state.currentQuestion]}
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
    this.setState({ isMobile: isMobile }, () => {
      if (this.getQuestionTypes().length === 0) return
      this.createQuestions();
      this.setState({
        showStart: false,
        showCustom: false,
        currentQuestion: 0,
        started: true,
        submitted: false,
        value: ''
      });
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
    this.setState({ numberOfQuestions: newValue as number });
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
                      settingsChanged={this.updateSettings}
                      start={this.start}
                      sliderChange={this.sliderChange}
                      updateVerbTypes={this.updateVerbTypes}
                      numberOfQuestions={this.state.numberOfQuestions}/>
                    :
                    <Home
                      setCustom={this.setCustom}
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
                    <ExplanationDialog
                      open={this.state.showExplanation}
                      handleClose={this.processNext}
                      rule={rules[this.questions[this.state.currentQuestion].explanation]}/>
                  <SimpleDialog
                    open={this.state.open}
                    answer={this.state.value}
                    handleClose={this.processNext}
                    question={this.questions[this.state.currentQuestion]}
                    correctAnswer={this.questions[this.state.currentQuestion].answer}/>
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