import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { IQuestionDoubtQueryService } from "../core/services/I-Question-doubtQuery.service";
import { QuestDoubtQueryListModel } from "../core/domain/Question-Doubt-Query/questdoubt-query-list.model";
import { QuestDoubtQueryListEntity } from "../entity/Question-Detail/question-detailList.entity";
import { QuestDoubtQueryModel } from "../core/domain/Question-Doubt-Query/questiondoubt-query.model";
import { QuestDoubtQueryEntity } from "../entity/Question-Detail/question-detail-entity";

@Injectable({
    providedIn: 'root',
})

export class QuestDoubtQueryService extends IQuestionDoubtQueryService {

    constructor(private http: HttpClient) {
        super()
    }

    override CreateQuesDoubtQuery(questionDetailId: number, question: string, answer: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/QuesDoubtQuery`;
        
        return this.http.post<SimpleResponse>(url, {
            "quesDetailId": questionDetailId,
            "question": question,
            "answer": answer
        }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }


    override UpdateQuesDoubtQuery(id: string, question: string, answer: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/QuesDoubtQuery`;

        return this.http.put<SimpleResponse>(url, { id: id, question: question, answer: answer }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }

      override GetQuesDoubtQueryList(QuestionIds: string): Observable<QuestDoubtQueryListModel[]> {
        const url = `${baseUrl}/api/QuesDoubtQuery/${QuestionIds}`;
        return this.http.get<QuestDoubtQueryListEntity>(url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }


    override GetQuesDoubtQuery(id: string): Observable<QuestDoubtQueryModel> {
        const url = `${baseUrl}/api/QuesDoubtQuery/Single/${id}`;
        return this.http.get<QuestDoubtQueryEntity>(url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }



    override DeleteQuesDoubtQuery(id: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/QuesDoubtQuery/${id}`;
        return this.http.delete<SimpleResponse>(url).pipe(
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