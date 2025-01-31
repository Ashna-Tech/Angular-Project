import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { PlanHighlightDetailListModel } from "../domain/plan-Highlight-Detail/planHighlightDetailList.mode";
import { PlanHighlightDetailModel } from "../domain/plan-Highlight-Detail/planHighlightDetail.model";

export abstract class IPlanHighlightDetailService {

abstract CreatePlanHighlightDetail(phId : string, planId : string) : Observable <SimpleResponse>

abstract GetPlanHighlightDetailList() : Observable <PlanHighlightDetailListModel[]>

abstract UpdatePlanHighlightDetail(id : string, phId : string, planId : string) : Observable <SimpleResponse>

abstract DeletePlanHighlightDetail(id : string) : Observable <SimpleResponse>

abstract GetPlanHighlightDetail(id : string) : Observable <PlanHighlightDetailModel>

}