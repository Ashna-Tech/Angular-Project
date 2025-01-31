import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { IncludedPlanListModel } from '../domain/included -plan/included-planListI.model';
import { IncludedplanModel } from '../domain/included -plan/includedplan.model';

export abstract class IincludedPlanService {

  abstract CreateIncludedPlan(planId: string,name: string,isIncluded: string): Observable<SimpleResponse>;
  
  abstract GetIncludedPlanList(): Observable<IncludedPlanListModel[]>;

  abstract UpdateIncludedPlan( id: string, planId: string, name: string,isIncluded: string): Observable<SimpleResponse>;
  
  abstract DeleteIncludedPlan(id: string): Observable<SimpleResponse>;

  abstract GetIncludedPlan(id: string): Observable<IncludedplanModel>;
}
