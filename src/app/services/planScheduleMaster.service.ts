import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPlanScheduleMasterService } from '../core/services/I planScheduleMaster.service';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { PlanScheduleMasterListmodel } from '../core/domain/plan-Schedule-Master/planScheduleMasterList.model';
import { PlanScheduleMasterListEntity } from '../entity/Plan-Schedule-Master/planScheduleMasterList.entity';
import { PlanScheduleMastermodel } from '../core/domain/plan-Schedule-Master/planScheduleMastermodel';
import { PlanScheduleMasterEntity } from '../entity/Plan-Schedule-Master/planScheduleMaster.entity';

@Injectable({
  providedIn: 'root',
})
export class PlanScheduleMasterService extends IPlanScheduleMasterService {
  constructor(private http: HttpClient) {
    super();
  }

  override createPlanScheduleMaster(
    categoryName: string,
    scheduleName: string,
    schedule: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/PlanScheduleMaster`;

    return this.http
      .post<SimpleResponse>(url, {
        categoryName: categoryName,
        scheduleName: scheduleName,
        schedule: schedule,
      })
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

  override getPlanScheduleMasterList(): Observable<
    PlanScheduleMasterListmodel[]
  > {
    const url = `${baseUrl}/api/PlanScheduleMaster`;

    return this.http.get<PlanScheduleMasterListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override updatePlanScheduleMaster(
    id: string,
    categoryName: string,
    scheduleName: string,
    schedule: string,
    isActive: boolean,
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/PlanScheduleMaster/${id}`;
    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        categoryName: categoryName,
        scheduleName: scheduleName,
        schedule: schedule,
        isActive : isActive,
      })
      .pipe(
        map((response) => {
          if (response.status) {
            return response.data;
          }
        })
      );
  }

  override deletePlanScheduleMaster(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/PlanScheduleMaster/${id}`;
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

  override getPlanScheduleMaster(
    id: string
  ): Observable<PlanScheduleMastermodel> {
    const url = `${baseUrl}/api/PlanScheduleMaster/${id}`;

    return this.http.get<PlanScheduleMasterEntity>(url).pipe(
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
