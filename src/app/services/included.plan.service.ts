import { Injectable } from '@angular/core';
import { IincludedPlanService } from '../core/services/I includedPlan.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { IncludedPlanListModel } from '../core/domain/included -plan/included-planListI.model';
import { includedPlanListEntity } from '../entity/Included-plan/includedPlanList.entity';
import { IncludedPlanEntity } from '../entity/Included-plan/includedPlan.entity';
import { IncludedplanModel } from '../core/domain/included -plan/includedplan.model';

@Injectable({
  providedIn: 'root',
})


export class includedPlanService extends IincludedPlanService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateIncludedPlan(planId: string,name: string,isIncluded: string): Observable<SimpleResponse> {

    const url = `${baseUrl}/api/IncludedPlan`;
    return this.http .post<SimpleResponse>(url,{planId: planId,name: name,isIncluded : (isIncluded =="Yes")})
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

              

  override GetIncludedPlanList(): Observable<IncludedPlanListModel[]> {
    const url = `${baseUrl}/api/IncludedPlan`;
    return this.http.get<includedPlanListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateIncludedPlan(id: string,planId: string,name: string,isIncluded: string
  
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/IncludedPlan/${id}`;

    return this.http.put<SimpleResponse>(url,{id: id, planId: planId,name: name,
       isIncluded: (isIncluded =="Yes")}).pipe(
        map((response) => {
          if (response.status) {
            return response.data;
          } else {
            throw new Error(response.msg);
          }
        })
      );
  }
       
  override DeleteIncludedPlan(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/IncludedPlan/${id}`;

    return this.http.delete<SimpleResponse>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  override GetIncludedPlan(id: string): Observable<IncludedplanModel> {
    const url = `${baseUrl}/api/IncludedPlan/${id}`;
    return this.http.get<IncludedPlanEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
}
