import { PlansListModel } from "../../core/domain/plans/plansList.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface PlansListEntity extends ResponseModel <PlansListModel[]>{}