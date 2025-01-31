import { Injectable } from "@angular/core";
import { ITopperTimeExamLevelService } from "../core/services/I-topper-time-examLevel.service";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { TopperTimeExamLevelListEntity } from "../entity/Topper-Time-Exam-Level/topper-time-examLevel-List.entity";
import { TopperTimeExamLevelListModel } from "../core/domain/Topper-Time-Exam-Level/topper-time-examLevel-list.model";
import { TopperTimeExamLevelModel } from "../core/domain/Topper-Time-Exam-Level/topper-time-examLevel-model";
import { TopperTimeExamLevelEntity } from "../entity/Topper-Time-Exam-Level/topper-time-examLevel-entity";

@Injectable({
    providedIn: 'root',
})


export class TopperTimeExamLevelService extends ITopperTimeExamLevelService {

    constructor(private http: HttpClient) {
        super()
    }

    override CreateTopperTimeExamLevel(name: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/TopperTimeExamLevel`;
        return this.http.post<SimpleResponse>(url, { name }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }



    override GetTopperTimeExamLevelList(): Observable<TopperTimeExamLevelListModel[]> {
        const url = `${baseUrl}/api/TopperTimeExamLevel`;
        return this.http.get<TopperTimeExamLevelListEntity>(url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }



    override UpdateTopperTimeExamLevel(id: string, name: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/TopperTimeExamLevel`;
        return this.http.put<SimpleResponse>(url, { id, name }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }


    override GetTopperTimeExamLevel(id: string): Observable<TopperTimeExamLevelModel> {
        const url = `${baseUrl}/api/TopperTimeExamLevel/${id}`;
        return this.http.get<TopperTimeExamLevelEntity>(url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }


}