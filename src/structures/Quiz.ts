import {
  Conjugations,
  IncorrectAnswer,
  Pronoun,
  Question,
  QuestionType,
  Verb,
  VerbType,
} from "types/types";
import Settings from "./Settings";
import verbs from "data/conjugationVerbs";
import irregularVerbs from "data/irregularVerbs";
import verbTypeNicknames from "data/verbTypeNicknames";
import poropara from "data/poropara";
import haber from "data/haber";
import verbTypes from "data/verbTypes";

function getQuestionTypes(settings: Settings): QuestionType[] {
  const questionTypes: QuestionType[] = [];
  if (settings.conjugationMC) questionTypes.push(QuestionType.ConjugationMC);
  if (settings.conjugationW && !settings.isMobile)
    questionTypes.push(QuestionType.ConjugationW);
  if (settings.definitionMC) questionTypes.push(QuestionType.DefinitionMC);
  if (settings.definitionW && !settings.isMobile)
    questionTypes.push(QuestionType.DefinitionW);
  if (settings.poropara) questionTypes.push(QuestionType.PorOParaFIB);
  return questionTypes;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function filterAnswer(answer: string): string {
  return answer.replace(/\|/g, "");
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function resolve(path: string, obj: object): any {
  const properties = path.split(".");
  return properties.reduce((prev: any, curr: any) => prev && prev[curr], obj);
}

function isConjugation(questionType: QuestionType): boolean {
  return (
    questionType === QuestionType.ConjugationMC ||
    questionType === QuestionType.ConjugationW
  );
}

function isDefinition(questionType: QuestionType): boolean {
  return (
    questionType === QuestionType.DefinitionW ||
    questionType === QuestionType.DefinitionMC
  );
}

function getDefinitionChoices(currentVerb: string): string[] {
  const choiceArray = [currentVerb];
  while (choiceArray.length < 4) {
    const randomVerb = randomItem(verbs).verb;
    if (currentVerb !== randomVerb) {
      choiceArray.push(randomVerb);
    }
  }
  return shuffle(choiceArray);
}

function getAnswer(
  currentVerbType: VerbType,
  currentPronoun: Pronoun,
  conjugations: Conjugations,
): string {
  if (currentVerbType === "participle" || currentVerbType === "gerund") {
    return conjugations[currentVerbType];
  } else if (currentVerbType.includes("perfect.")) {
    return (
      resolve(currentVerbType.substring(8) + "." + currentPronoun, haber) +
      " " +
      conjugations["participle"]
    );
  } else {
    return resolve(currentVerbType + "." + currentPronoun, conjugations);
  }
}

function generateIrregularVerb(
  settings: Settings,
  pronouns: Pronoun[],
): [Verb, Pronoun, VerbType] {
  let currentPronoun: Pronoun;
  let currentVerb: Verb = randomItem(irregularVerbs);
  const irregularTenses = randomItem(currentVerb.irregularities).split(".");
  if (irregularTenses.length === 1) {
    currentPronoun = randomItem(pronouns);
  } else {
    currentPronoun = irregularTenses.pop() as Pronoun;
    if (!settings.vosotros && currentPronoun === "vosotros")
      return generateIrregularVerb(settings, pronouns);
  }
  let currentVerbType: VerbType = irregularTenses.join(".") as VerbType;
  if (!settings.verbTypes.includes(currentVerbType))
    return generateIrregularVerb(settings, pronouns);
  if (
    currentVerbType === "subjunctive.present" &&
    settings.verbTypes.length !== 1
  ) {
    //reducing the chance of picking a subjunctive present
    if (randomItem([true, true, true, false, false]))
      return generateIrregularVerb(settings, pronouns);
  }
  return [currentVerb, currentPronoun, currentVerbType];
}

function getConjugationChoices(
  currentVerbType: VerbType,
  currentPronoun: Pronoun,
  conjugations: Conjugations,
): string[] {
  const correctAnswer = getAnswer(
    currentVerbType,
    currentPronoun,
    conjugations,
  );
  const choiceArray = [filterAnswer(correctAnswer)];
  while (choiceArray.length < 4) {
    const randomType = randomItem(verbTypes);
    const randomAnswer = getAnswer(randomType, currentPronoun, conjugations);
    if (correctAnswer !== randomAnswer) {
      choiceArray.push(filterAnswer(randomAnswer));
    }
  }
  return shuffle(choiceArray);
}

export default class Quiz {
  questions: Question[] = [];
  currentQuestion: number = 0;
  incorrectAnswers: IncorrectAnswer[] = [];

  generateQuiz(settings: Settings) {
    const questionArray: Question[] = [];
    const questionTypes: QuestionType[] = getQuestionTypes(settings);
    const pronouns: Pronoun[] = ["yo", "tu", "el", "nosotros", "ellos"];
    if (settings.vosotros) pronouns.push("vosotros");

    while (questionArray.length < settings.numberOfQuestions) {
      let currentVerb: Verb = randomItem(verbs);
      if (currentVerb.definition === "") continue; //Need to make sure there are no empty definitions
      let currentVerbType: VerbType = randomItem(settings.verbTypes);
      let currentPronoun: Pronoun = randomItem(pronouns);
      const currentQuestionType: QuestionType = randomItem(questionTypes);

      if (settings.irregular && isConjugation(currentQuestionType)) {
        [currentVerb, currentPronoun, currentVerbType] = generateIrregularVerb(
          settings,
          pronouns,
        );
      }

      const verbTypeList = verbTypeNicknames[currentVerbType].split(".");

      let currentQuestionObject;
      if (isDefinition(currentQuestionType)) {
        currentQuestionObject = {
          questionType: currentQuestionType,
          top1: currentVerb.definition,
          top2: "",
          top3: "",
          chips: ["defintion"],
          answer: currentVerb.verb,
          choices: getDefinitionChoices(currentVerb.verb),
          explanation: 0,
        };
      } else if (isConjugation(currentQuestionType)) {
        currentQuestionObject = {
          questionType: currentQuestionType,
          top1: currentVerb.verb,
          top2: currentVerb.definition,
          top3: currentPronoun,
          chips: verbTypeList,
          answer: getAnswer(
            currentVerbType,
            currentPronoun,
            currentVerb.conjugations,
          ),
          choices: getConjugationChoices(
            currentVerbType,
            currentPronoun,
            currentVerb.conjugations,
          ),
          explanation: 0,
        };
      } else {
        const randomPorOPara = randomItem(poropara);
        currentQuestionObject = {
          questionType: currentQuestionType,
          top1: randomPorOPara.question,
          top2: "",
          top3: "",
          chips: [],
          answer: randomPorOPara.answer,
          translation: randomPorOPara.translation,
          choices: ["por", "para"],
          explanation: randomPorOPara.reason,
        };
      }
      if (currentVerbType === "participle" || currentVerbType === "gerund") {
        currentQuestionObject.top3 = "";
      }
      questionArray.push(currentQuestionObject);
    }
    this.questions = questionArray;
    this.currentQuestion = 0;
    this.incorrectAnswers = [];
    return this.questions[this.currentQuestion];
  }

  nextQuestion(): Question | null {
    if (this.currentQuestion + 1 >= this.questions.length) return null;
    this.currentQuestion++;
    return this.questions[this.currentQuestion];
  }

  isEnd(): boolean {
    return this.currentQuestion + 1 >= this.questions.length;
  }
}
