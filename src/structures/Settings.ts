import {VerbType} from "../types";

export default class Settings {
  isMobile: boolean = false;
  numberOfQuestions: number = 5;
  conjugationMC: boolean = false;
  conjugationW: boolean = false;
  definitionMC: boolean = false;
  definitionW: boolean = false;
  poropara: boolean = true;

  vosotros: boolean = false;
  irregular: boolean = false;

  verbTypes: VerbType[] = [
    "indicative.present",
    "indicative.preterite",
    "indicative.imperfect",
    "indicative.conditional",
    "indicative.future",
  ];
}