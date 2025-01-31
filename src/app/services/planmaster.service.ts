import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { planmastermodel } from '../core/domain/plan Master/planmaster.model';
import { PlanMasterListItemModel } from '../core/domain/plan Master/planmaster.list.model';
import { baseUrl } from '../../environement';
import { HttpClient } from '@angular/common/http';
import { planMasterEntity } from '../entity/plan master/planmaster.entity';
import { planMasterListEntity } from '../entity/plan master/planmasterList.entity';
import { IplanMasterService } from '../core/services/I planmaster.service';

@Injectable({
  providedIn: 'root',
})
export class PlanMasterService extends IplanMasterService {
  constructor(private http: HttpClient) {
    super();
  }

  override updatePlanMaster(
    id: string,
    name: string,
    amount: string,
    tax_Percent: string,
    save_amt: string,
    member_for: string,

    current_plan: string,
    total_Month: string,
    total_days: string,
    ptype: string,
    message: string,

    plan_Per_month: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/PlanMaster/${id}`;
    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        name: name,
        amount: amount,
        tax_Percent: tax_Percent,

        save_amt: save_amt,
        member_for: member_for,
        current_plan: current_plan,
        total_Month: total_Month,
        total_days: total_days,
        ptype: ptype,
        message: message,
        plan_Per_month: plan_Per_month,
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

  override getPlanMaster(id: string): Observable<planmastermodel> {
    const url = `${baseUrl}/api/PlanMaster/${id}`;

    return this.http.get<planMasterEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getPlanMasterList(): Observable<PlanMasterListItemModel[]> {
    const url = `${baseUrl}/api/PlanMaster`;

    return this.http.get<planMasterListEntity>(url).pipe(
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
