import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { planmastermodel } from '../domain/plan Master/planmaster.model';
import { PlanMasterListItemModel } from '../domain/plan Master/planmaster.list.model';

export abstract class IplanMasterService {
  abstract updatePlanMaster(
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
  ): Observable<SimpleResponse>;

  abstract getPlanMaster(id: string): Observable<planmastermodel>;

  abstract getPlanMasterList(): Observable<PlanMasterListItemModel[]>;
}
