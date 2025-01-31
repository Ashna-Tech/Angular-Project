import { PlanMasterListItemModel } from "../../core/domain/plan Master/planmaster.list.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface planMasterListEntity extends ResponseModel <PlanMasterListItemModel[]>{}