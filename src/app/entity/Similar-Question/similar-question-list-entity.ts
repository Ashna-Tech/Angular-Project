import { ResponseModel } from "../../core/domain/response.model";
import { SimilarQuestionListModel } from "../../core/domain/Similar-Question/similar-question-list-model";

export interface similarQuestionListEntity extends ResponseModel <SimilarQuestionListModel[]>{}