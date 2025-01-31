import { QuestionLevel } from "../../../core/enums/question-level.enum";
import { QuestionTypeEnum } from "../../../core/enums/question-type.enum";

export interface getNewQuestionListDTO{
    "catId": string;
    "subCatId": string;
    "chapId": string;
    "type": QuestionTypeEnum;
    "pageNo": number;
    "key":string[];
    "exams": string[],
    "level": QuestionLevel;
}