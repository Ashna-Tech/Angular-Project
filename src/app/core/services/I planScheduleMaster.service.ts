import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { PlanScheduleMasterListmodel } from '../domain/plan-Schedule-Master/planScheduleMasterList.model';
import { PlanScheduleMastermodel } from '../domain/plan-Schedule-Master/planScheduleMastermodel';

export abstract class IPlanScheduleMasterService {
  abstract createPlanScheduleMaster(
    categoryName: string,
    scheduleName: string,
    schedule: string
  ): Observable<SimpleResponse>;

  abstract getPlanScheduleMasterList(): Observable<
    PlanScheduleMasterListmodel[]
  >;

  abstract updatePlanScheduleMaster(
    id: string,
    categoryName: string,
    scheduleName: string,
    schedule: string,
    isActive: boolean,
  ): Observable<SimpleResponse>;

  abstract deletePlanScheduleMaster(id: string): Observable<SimpleResponse>;

  abstract getPlanScheduleMaster(
    id: string
  ): Observable<PlanScheduleMastermodel>;
}
