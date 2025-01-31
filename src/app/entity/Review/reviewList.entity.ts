import { ResponseModel } from "../../core/domain/response.model";
import { ReviewListModel } from "../../core/domain/Review/reviewList.model";

export interface ReviewListEntity extends ResponseModel <ReviewListModel[]>{}