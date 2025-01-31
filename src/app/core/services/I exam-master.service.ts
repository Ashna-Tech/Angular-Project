import { Observable } from "rxjs";
import { examMasterListIdnameModel } from "../domain/exam-master-category/exam-masterList-Id-name.model";
import { ExamMasterCategoryModel } from "../domain/exam-master-category/exam-master-category.model";
import { SimpleResponse } from "../domain/simple-response.model";

export abstract class IexamMasterService {

    abstract getExamMasterCategoryBYId(Id: string): Observable<ExamMasterCategoryModel>;

    abstract getExamMasterCategoryList(): Observable<ExamMasterCategoryModel[]>;

    abstract createExamMasterCategory(name: string): Observable<SimpleResponse>;

    abstract updateExamMasterCategory(data: ExamMasterCategoryModel): Observable<SimpleResponse>;

    abstract deleteExamMasterCategory(id: string): Observable<SimpleResponse>;

    abstract getexamMasterListIdwithName(): Observable<examMasterListIdnameModel[]>;


}