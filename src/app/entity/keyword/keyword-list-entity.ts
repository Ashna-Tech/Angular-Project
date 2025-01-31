import { KeywordListModel } from "../../core/domain/Keyword/keyword-list-item-model";
import { ResponseModel } from "../../core/domain/response.model";

export interface KeywordListEntity extends ResponseModel <KeywordListModel[]> {}