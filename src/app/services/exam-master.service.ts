import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { baseUrl } from '../../environement';
import { HttpClient } from '@angular/common/http';
import { examMasterListIdnameModel } from '../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { examMasterListIdnameEntity } from '../entity/exam-master/exam-masterlist-idwithname.entity';
import { IexamMasterService } from '../core/services/I exam-master.service';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { ResponseModel } from '../core/domain/response.model';
import { ExamMasterCategoryModel } from '../core/domain/exam-master-category/exam-master-category.model';

@Injectable({
    providedIn: 'root',
})
export class examMasterService extends IexamMasterService {
    constructor(private http: HttpClient) {
        super();
    }

    override getexamMasterListIdwithName(): Observable<examMasterListIdnameModel[]> {
        const url = `${baseUrl}/api/ExamMasterCategory/idwithname`;

        return this.http.get<examMasterListIdnameEntity>(url).pipe(
            map((response) => {
                if (response) {
                    return response.data;
                } else {
                    throw new Error(response);
                }
            })
        );
    }

    override createExamMasterCategory(name: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/ExamMasterCategory`;

        return this.http.post<SimpleResponse> (url, {name}).pipe(
            map((response) => {
                if (response) {
                    return response.data;
                } else {
                    throw new Error(response);
                }
            })
        );
    }

    override deleteExamMasterCategory(id: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/ExamMasterCategory/${id}`;

        return this.http.delete<SimpleResponse> (url).pipe(
            map((response) => {
                if (response) {
                    return response.data;
                } else {
                    throw new Error(response);
                }
            })
        );
    }


    override getExamMasterCategoryBYId(Id: string): Observable<ExamMasterCategoryModel> {
        const url = `${baseUrl}/api/ExamMasterCategory/${Id}`;

        return this.http.get<ResponseModel<ExamMasterCategoryModel>> (url).pipe(
            map((response) => {
                if (response) {
                    return response.data;
                } else {
                    throw new Error(response);
                }
            })
        );
    }


    override getExamMasterCategoryList(): Observable<ExamMasterCategoryModel[]> {
        const url = `${baseUrl}/api/ExamMasterCategory`;

        return this.http.get<ResponseModel<ExamMasterCategoryModel[]>> (url).pipe(
            map((response) => {
                if (response) {
                    return response.data;
                } else {
                    throw new Error(response);
                }
            })
        );
    }

    override updateExamMasterCategory(data: ExamMasterCategoryModel): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/ExamMasterCategory`;

        return this.http.put<SimpleResponse> (url, data).pipe(
            map((response) => {
                if (response) {
                    return response.data;
                } else {
                    throw new Error(response);
                }
            })
        );
    }

}
