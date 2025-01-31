import { QuestionLevel } from "../../enums/question-level.enum";
import { QuestionTypeEnum } from "../../enums/question-type.enum";
import { RightOption } from "../../enums/RightOption.enum";

export interface DirectQuestionModel{
    catId: string;
    sCatId: string;
    chapId: string;
    type: QuestionTypeEnum;
    keywords: string[];
    exams: string[];
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