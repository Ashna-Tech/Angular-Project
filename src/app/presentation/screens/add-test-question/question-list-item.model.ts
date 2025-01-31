import { QuestionLevel } from "../../../core/enums/question-level.enum";
import { QuestionTypeEnum } from "../../../core/enums/question-type.enum";

export interface QuestionListItemModel{
    quesMasterId: string;
    quesId: string;
    direction: string;
    summary: string;
    type: QuestionTypeEnum;
    level: QuestionLevel;
    createDate: string;
    createBy: string;
    path: string;
    ques: string;
    exams: string[];
    keywords: string[];
    quesOldId: number;
    quesMasterOldId: number;
    used: {
        oldId: number,
        isUsed: boolean
    }[],
}