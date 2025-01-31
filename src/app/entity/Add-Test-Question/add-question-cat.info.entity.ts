import { AddQuestionListCategoryModel } from "../../core/domain/Add-Test-Question/add-question-cat-info.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface AddQuestionListCatEntity extends ResponseModel <AddQuestionListCategoryModel[]>{}