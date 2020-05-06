export type VerbType =
  "participle"
  | "gerund"
  | "indicative.present"
  | "indicative.preterite"
  | "indicative.imperfect"
  | "indicative.conditional"
  | "indicative.future"
  | "subjunctive.present"
  | "subjunctive.imperfect"
  | "subjunctive.imperfect2"
  | "subjunctive.future"
  | "perfect.indicative.present"
  | "perfect.indicative.preterite"
  | "perfect.indicative.imperfect"
  | "perfect.indicative.conditional"
  | "perfect.indicative.future"
  | "perfect.subjunctive.present"
  | "perfect.subjunctive.imperfect";

export type Pronoun = "yo" | "tu" | "el" | "nosotros" | "vosotros" | "ellos";

export enum QuestionType {
  ConjugationMC = 1,
  ConjugationW,
  DefinitionMC,
  DefinitionW,
  PorOParaFIB
}

export class Question {
  questionType: QuestionType = QuestionType.ConjugationMC;
  top1: string = '';
  top2: string = '';
  top3: string = '';
  chips: string[] = [''];
  answer: string = '';
  choices: string[] = ['',''];
  explanation: number = -1;
  translation?: string;
}

export interface IncorrectAnswer extends Question{
  response: string;
}

export interface Rule {
  id: number;
  use: string;
  rule: string;
  translation: string;
  example: string;
}

export interface FillInBlank {
  question: string;
  translation: string;
  answer: string;
  reason: number;
}

export interface Conjugations {
  participle: string;
  gerund: string;
  indicative: {
    present: ConjugationPronoun;
    preterite: ConjugationPronoun;
    imperfect: ConjugationPronoun;
    conditional: ConjugationPronoun;
    future: ConjugationPronoun;
  };
  subjunctive: {
    present: ConjugationPronoun;
    imperfect: ConjugationPronoun;
    imperfect2: ConjugationPronoun;
    future: ConjugationPronoun;
  };
}

export interface ConjugationPronoun {
  yo: string;
  tu: string;
  el: string;
  nosotros: string;
  vosotros: string;
  ellos: string;
}

export interface Verb {
  verb: string;
  definition: string;
  conjugations: Conjugations;
  isIrregular?: boolean;
  irregularities: string[];
}
