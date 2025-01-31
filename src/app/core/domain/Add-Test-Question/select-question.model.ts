import { QuestionTypeEnum } from "../../enums/question-type.enum";
import { RightOption } from "../../enums/RightOption.enum";

export interface SelectQuestionModel{
    "quesId": string;
    "quesOldId": number;
    "quesMasterOldId": number;
    "quesMasterId": string;
    "catId": string;
    "sCatId": string;
    "chapId": string;
    "ques": string;
    "quesHin": string;
    "optRight": RightOption;
    "explanation": string;
    "optAEng": string;
    "optAHin": string;
    "optBEng": string;
    "optBHin": string;
    "optCEng": string;
    "optCHin": string;
    "optDEng": string;
    "optDHin": string;
    "optEEng": string;
    "optEHin": string;
    "isTestLaunched": boolean;
    "type": QuestionTypeEnum;
    "direction": string;
    "directionHin": string;
    "commonExplanation": string;
    "summary": string;
    "summaryHin": string;
    "exams": { id:string; name:string;}[];
    "keywords": string[];
    "qmLevel": string;
}