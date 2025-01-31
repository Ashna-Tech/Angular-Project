import { QuestionLevel } from "../../enums/question-level.enum";

export interface QuestionMastermodel {
  id?: string;
  catId: string;
  sCatId: string;
  chapId: string;
  type: string;
  direction: string;
  directionHin: string;
  explanation: string;
  summary: string;
  summaryHin: string;
  level: QuestionLevel;
  keywords:string[];
  exams: string[];
 }
