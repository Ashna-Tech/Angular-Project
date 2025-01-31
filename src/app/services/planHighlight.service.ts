import { Injectable } from "@angular/core";
import { IPlanHighlightService } from "../core/services/I planHighlight.service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { PlanHighlightListEntity } from "../entity/plan-Highlight/planHighlightList.entity";
import { PlanHighlightListModel } from "../core/domain/Plan- Highlight/planHighlightList.model";
import { error, escapeSelector } from "jquery";
import { PlanHighlightEntity } from "../entity/plan-Highlight/planHighlight.entity";
import { PlanhighlightModel } from "../core/domain/Plan- Highlight/planHighlight.model";

@Injectable({
    providedIn : 'root',
})


export class PlanHighlightService extends IPlanHighlightService{

constructor(private http : HttpClient){
    super()
}

override CreatePlanHighlight(name: string, heading: string, highlight: string): Observable<SimpleResponse> {
    
const url =  `${baseUrl}/api/PlanHighlight` ;
return this.http.post<SimpleResponse>(url,{name : name , heading : heading, highlight : highlight}).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg)
        }
    })
)

}

override GetPlanHighlightList(): Observable<PlanHighlightListModel[]> {
    
const url =  `${baseUrl}/api/PlanHighlight`;

return this.http.get<PlanHighlightListEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data
        }else {
            throw new Error(response.msg)
        }
    })
)
}

override UpdatePlanHighlight(id: string, name: string, heading: string, highlight: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/PlanHighlight/${id}`;

return this.http.put <SimpleResponse>(url,{id : id , name : name , heading : heading ,highlight : highlight}).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg)
        }
    })
)


}

override DeletePlanHighlight(id: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/PlanHighlight/${id}`;

return this.http.delete <SimpleResponse>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
)

}

override GetPlanHighlight(id: string): Observable<PlanhighlightModel> {
    
const url = `${baseUrl}/api/PlanHighlight/${id}`
return this.http.get<PlanHighlightEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
)

}


}