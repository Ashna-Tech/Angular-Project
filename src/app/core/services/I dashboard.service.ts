import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { dashboardListItemModel } from "../domain/dashboard slider/dashboard-List-Item.model";
import { dashboardModel } from "../domain/dashboard slider/dashboard.model";


export abstract class IdashboardSliderService{

abstract createDashboardSlid(img :string,linkURL : string , groupId : number[]) : Observable <SimpleResponse>


abstract getDashboardSlidList() : Observable <dashboardListItemModel[]>


abstract updateDashboardSlid(id:string, img :string, linkURL:string, groupId : number[]) : Observable <SimpleResponse>


abstract removeDashboardSlid(id : string) : Observable <SimpleResponse>


abstract getDashboardSlid(id : string) : Observable <dashboardModel>

abstract updateDashboardSlidToggleActive(id : string, status : string) : Observable <SimpleResponse>

}

