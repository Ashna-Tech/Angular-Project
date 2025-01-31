import { Injectable } from '@angular/core';
import { IfacultyPlanDetailservice } from '../core/services/I facultyPlanDetail.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { FacultyPlanDetailListEntity } from '../entity/Faculty-Plan-Detail/facultyPlanDetaiList.entity';
import { FacultyPlanDetaiListmodel } from '../core/domain/Faculty-Plan-Detail/facultyPlanDetailList.model';
import { FacultyPlanDetailEntity } from '../entity/Faculty-Plan-Detail/facultyPlanDetail.entity';
import { FacultyPlanDetailmodel } from '../core/domain/Faculty-Plan-Detail/facultyPlanDetail.model';

@Injectable({
  providedIn: 'root',
})
export class FacultyPlanDetailService extends IfacultyPlanDetailservice {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateFacultyPlanDetail(facultyId: string, planId: string): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/FacultyPlanDetail`;
    return this.http.post<SimpleResponse>(url, { facultyId: facultyId,planId: planId })
    .pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
}       
      
     
  override GetFacultyPlanDetailList(): Observable<FacultyPlanDetaiListmodel[]> {
    const url = `${baseUrl}/api/FacultyPlanDetail`;

    return this.http.get<FacultyPlanDetailListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateFacultyPlanDetail( id: string,facultyId: string,planId: string ): Observable<SimpleResponse> {
  
    const url = `${baseUrl}/api/FacultyPlanDetail/${id}`;

    return this.http.put<SimpleResponse>(url,{id: id,facultyId: facultyId,planid: planId})
    .pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
}

override DeleteFacultyPlanDetail(id: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/FacultyPlanDetail/${id}`;

return this.http.delete <SimpleResponse>(url).pipe(
    map (response =>{
        if (response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)

}

override GetFacultyPlanDetail(id: string): Observable<FacultyPlanDetailmodel> {
    
const url = `${baseUrl}/api/FacultyPlanDetail/${id}`;

return this.http.get <FacultyPlanDetailEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)

}
























}
