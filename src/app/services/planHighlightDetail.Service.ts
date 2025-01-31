import { Injectable } from "@angular/core";
import { IPlanHighlightDetailService } from "../core/services/I planHighlightDetail.Service";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { HttpClient } from "@angular/common/http";
import { PlanHighlightDetailListEntity } from "../entity/Plan-Highlight-Detail/planHighlightDetailList.entity";
import { PlanHighlightDetailListModel } from "../core/domain/plan-Highlight-Detail/planHighlightDetailList.mode";
import { PlanHighlightDetailEntity } from "../entity/Plan-Highlight-Detail/planHighlightDetail.entity";
import { PlanHighlightDetailModel } from "../core/domain/plan-Highlight-Detail/planHighlightDetail.model";

@Injectable({
    providedIn : 'root',
})


export class PlanHighlightDetailService extends IPlanHighlightDetailService{


constructor(private http :HttpClient){
    super()
}

override CreatePlanHighlightDetail(phId: string, planId: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/PlanHighlightDetail`;

return this.http.post <SimpleResponse>(url,{phId : phId, planId : planId }).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg)
        }
    })
)


}
override GetPlanHighlightDetailList(): Observable<PlanHighlightDetailListModel[]> {
    
const url = `${baseUrl}/api/PlanHighlightDetail` ;

return this.http.get <PlanHighlightDetailListEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg)
        }
    })
)

}

override UpdatePlanHighlightDetail(id: string, phId: string, planId: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/PlanHighlightDetail/${id}`;

return this.http.put <SimpleResponse>(url,{id : id , phId : phId, planId : planId }).pipe(
    map (response =>{
        if(response.status){
            return response.data
        }else {
            throw new Error(response.msg)
        }
    })
)
}

override DeletePlanHighlightDetail(id: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/PlanHighlightDetail/${id}`;

return this.http.delete <SimpleResponse>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg)
        }
    })
)
}

override GetPlanHighlightDetail(id: string): Observable<PlanHighlightDetailModel> {
    
const url = `${baseUrl}/api/PlanHighlightDetail/${id}` ;

return this.http.get <PlanHighlightDetailEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg)
        }
    })
)

}





}