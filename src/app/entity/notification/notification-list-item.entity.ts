import { NotificationListItemModel } from "../../core/domain/notification/notification-list-item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface NotificationListItemEntity extends ResponseModel <NotificationListItemModel[]>{

}