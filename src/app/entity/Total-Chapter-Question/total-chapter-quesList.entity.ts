import { ResponseModel } from "../../core/domain/response.model";
import { TotalChapterQuesListItemModel} from "../../core/domain/Total-Chapter-Question/total-chapter-ques.List.model";

export interface TotalChapterQuesListEntity extends ResponseModel <TotalChapterQuesListItemModel[]>{}