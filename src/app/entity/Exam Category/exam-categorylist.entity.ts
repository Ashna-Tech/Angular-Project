import { examCategoryListModel } from "../../core/domain/exam-category/examCategory-list-model";
import { ResponseModel } from "../../core/domain/response.model";

export interface examCategoryListEntity extends ResponseModel <examCategoryListModel[]> {}