export interface Settings {
  questionType1: boolean;
  questionType2: boolean;
  questionType3: boolean;
  questionType4: boolean;
  questionType5: boolean;
  verbTypes: any[];
  vosotros: boolean;
  irregular: boolean;
}

export interface Question {
  questionType: any; //need to change to enum type
  top1: string;
  top2: string;
  top3: string;
  chips: string[];
  answer: string;
  choices: string[];
  explanation: number;
  translation: string;
}