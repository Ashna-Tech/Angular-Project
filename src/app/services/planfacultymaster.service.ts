import { Injectable } from "@angular/core";
import { IPlanfacultyMasterService } from "../core/services/I planFaculty.service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { PlanFacultyMasterListModel } from "../core/domain/Plan-Faculty-Master/planFacultyMasterList.model";
import { PlanFacultyMasterListEntity } from "../entity/Plan-Faculty-Master/planfacultymasterList.entity";
import { PlanFacultyMasterEntity } from "../entity/Plan-Faculty-Master/planfacultymaster.entity";
import { PlanFacultyMasterModel } from "../core/domain/Plan-Faculty-Master/planFacultyMaster.model";

@Injectable({
    providedIn: 'root',
})


export class PlanFacultyMasterService extends IPlanfacultyMasterService{

constructor(private http : HttpClient){
    super()
}

override CreatePlanFacultyMaster(name: string, experience: string, description: string, image: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/PlanFacultyMaster`;

const formdata = new FormData()

formdata.append('Name', name)
formdata.append('Experience',experience)
formdata.append('Description', description)
formdata.append('Image', image)

return this.http.post<SimpleResponse>(url,formdata).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg)
        }
    })
)


}
override GetPlanFacultyMasterList(): Observable<PlanFacultyMasterListModel[]> {
    
const url = `${baseUrl}/api/PlanFacultyMaster` ;

return this.http.get<PlanFacultyMasterListEntity>(url).pipe(
    map (response =>{
        if (response.status){
            return response.data ;
        }else {
            throw new Error(response.msg);
        }
    })
)


}

override UpdatePlanFacultyMaster(id: string, name: string, experience: string, description: string, image: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/PlanFacultyMaster/${id}`;

const formdata = new FormData() ;

formdata.append('Id', id)
formdata.append('Name', name)
formdata.append('Experience',experience)
formdata.append('Description',description)
formdata.append('Image',image)


return this.http.put<SimpleResponse>(url,formdata).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new  Error(response.msg)
        }
    })
)


}


override DeletePlanFacultyMaster(id: string): Observable<SimpleResponse> {
    
const url =  `${baseUrl}/api/PlanFacultyMaster/${id}`;

return this.http.delete<SimpleResponse>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
)

}

override GetPlanFacultyMaster(id: string): Observable<PlanFacultyMasterModel> {
    
const url = `${baseUrl}/api/PlanFacultyMaster/${id}`;

return this.http.get<PlanFacultyMasterEntity>(url).pipe(
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