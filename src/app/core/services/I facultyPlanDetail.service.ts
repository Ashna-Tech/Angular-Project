import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { FacultyPlanDetaiListmodel } from '../domain/Faculty-Plan-Detail/facultyPlanDetailList.model';
import { FacultyPlanDetailmodel } from '../domain/Faculty-Plan-Detail/facultyPlanDetail.model';

export abstract class IfacultyPlanDetailservice {

  abstract CreateFacultyPlanDetail(facultyId: string,planId: string,): Observable<SimpleResponse>;
    
  abstract GetFacultyPlanDetailList(): Observable<FacultyPlanDetaiListmodel[]>;

  abstract UpdateFacultyPlanDetail(id: string,facultyId: string,planId: string): Observable<SimpleResponse>;

  abstract DeleteFacultyPlanDetail(id: string): Observable<SimpleResponse>;

  abstract GetFacultyPlanDetail(id: string): Observable<FacultyPlanDetailmodel>;
}
