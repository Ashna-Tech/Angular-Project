import { dashboardListItemModel } from "../../core/domain/dashboard slider/dashboard-List-Item.model";
import { detailsListItemModel } from "../../core/domain/details/details-list-item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface detailsListItemEntity extends ResponseModel <detailsListItemModel[]>{}