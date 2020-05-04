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

export interface Settings {
  conjugationMC: boolean;
  conjugationW: boolean;
  definitionMC: boolean;
  definitionW: boolean;
  poropara: boolean;
  verbTypes: VerbType[];
  vosotros: boolean;
  irregular: boolean;
}

export interface Question {
  questionType: QuestionType;
  top1: string;
  top2: string;
  top3: string;
  chips: string[];
  answer: string;
  choices: string[];
  explanation: number;
  translation?: string;
}

export interface Rule {
  rule: string;
  translation: string;
  example: string;
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

export enum QuestionType {
  ConjugationMC = 1,
  ConjugationW,
  DefinitionMC,
  DefinitionW,
  PorOParaFIB
}
