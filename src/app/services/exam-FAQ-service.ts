import { HttpClient } from "@angular/common/http";
import { IexamFAQService } from "../core/services/I exam-FAQ.service";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { ExamFAQListModel } from "../core/domain/Exam-FAQ/exam-faq-list.model";
import { ExamFAQListEntity } from "../entity/Exam-FAQ/exam-faq-list.entity";
import { ExamFAQModel } from "../core/domain/Exam-FAQ/exam-faq.model";
import { ExamFAQEntity } from "../entity/Exam-FAQ/exam-faq-entity";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn : 'root',
    
})

export class ExamFAQService extends IexamFAQService{

constructor(private http : HttpClient){
    super()
}

override createExamFAQ(examId: string, question: string, answer: string, orderNo: number): Observable<SimpleResponse> {

const url = `${baseUrl}/api/ExamFAQ`;
return this.http.post<SimpleResponse>(url,{examId : examId , question : question, answer : answer, 
    orderNo : orderNo}).pipe(
    map ((response)=>{
        if(response.status){
            return response.data ;
        }else {
            throw new Error(response.msg);
        }
    })
)

}



override updateExamFAQ(id: string, examId: string, question: string, answer: string, orderNo: number): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/ExamFAQ`;
        return this.http.put<SimpleResponse>(url,{id : id,  examId :  examId, question : question, answer : answer,
            orderNo : orderNo  }).pipe(
                map ((response)=>{
                    if(response.status){
                        return response.data;
                    }else{
                        throw new Error(response.msg);
                    }
                })
            )    
        }
    

        override deleteExamFAQ(id: string): Observable<SimpleResponse> {
            const url = `${baseUrl}/api/ExamFAQ/${id}`;
            return this.http.delete<SimpleResponse>(url).pipe(
                map ((response)=>{
                    if(response.status){
                        return response.data;
                    }else{
                        throw new Error(response.msg);
                    }
                })
            )
        }
        

override getExamFAQList(id : string): Observable<ExamFAQListModel[]> {
    const url = `${baseUrl}/api/ExamFAQ/${id}`;
    return this.http.get<ExamFAQListEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data ;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}
   

override getExamFAQSingle(id: string): Observable<ExamFAQModel> {
    const url = `${baseUrl}/api/ExamFAQ/Single/${id}`;
    return this.http.get<ExamFAQEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}

}