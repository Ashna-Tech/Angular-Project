import { QuestionLevel } from "../../enums/question-level.enum";
import { RightOption } from "../../enums/RightOption.enum";

export interface detailsModel{
    id?: string;
    quesMasterId: string;
    ques: string;
    quesHin: string;
    level: QuestionLevel;
    optRight: RightOption;
    explanation: string;
    optAEng: string;
    optAHin: string;
    optBEng: string;
    optBHin: string;
    optCEng: string;
    optCHin: string;
    optDEng: string;
    optDHin: string;
    optEEng: string;
    optEHin: string;
  }
