import { VerbType } from '../types/types';

const verbTypeNicknames: Record<VerbType, string> = {
  participle: "Participle",
  gerund: "Gerund",
  "indicative.present": "Present",
  "indicative.preterite": "Preterite",
  "indicative.imperfect": "Imperfect",
  "indicative.conditional": "Conditional",
  "indicative.future": "Future",
  "subjunctive.present": "Present Subjunctive",
  "subjunctive.imperfect": "Imperfect Subjunctive",
  "subjunctive.imperfect2": "Imperfect Subjunctive (Ese)",
  "subjunctive.future": "Future Subjunctive",
  "perfect.indicative.present": "Present Perfect",
  "perfect.indicative.preterite": "Preterite Perfect",
  "perfect.indicative.imperfect": "Pluperfect",
  "perfect.indicative.conditional": "Conditional Perfect",
  "perfect.indicative.future": "Future Perfect",
  "perfect.subjunctive.present": "Present Perfect Subjunctive",
  "perfect.subjunctive.imperfect": "Pluperfect Subjunctive",
};

export default verbTypeNicknames;
