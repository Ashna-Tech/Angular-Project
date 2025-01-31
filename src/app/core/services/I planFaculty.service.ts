import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { PlanFacultyMasterListModel } from '../domain/Plan-Faculty-Master/planFacultyMasterList.model';
import { PlanFacultyMasterModel } from '../domain/Plan-Faculty-Master/planFacultyMaster.model';

export abstract class IPlanfacultyMasterService {
  abstract CreatePlanFacultyMaster(
    name: string,
    experience: string,
    description: string,
    image: string
  ): Observable<SimpleResponse>;

  abstract GetPlanFacultyMasterList(): Observable<PlanFacultyMasterListModel[]>;

  abstract UpdatePlanFacultyMaster(
    id: string,
    name: string,
    experience: string,
    description: string,
    image: string
  ): Observable<SimpleResponse>;

  abstract DeletePlanFacultyMaster(id: string): Observable<SimpleResponse>;

  abstract GetPlanFacultyMaster(id: string): Observable<PlanFacultyMasterModel>;
}
