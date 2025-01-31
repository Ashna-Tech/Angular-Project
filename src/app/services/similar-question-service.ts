import { Injectable } from "@angular/core";
import { IsimilarQuestionservice } from "../core/services/I similar-question-service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { similarQuestionListEntity } from "../entity/Similar-Question/similar-question-list-entity";
import { SimilarQuestionListModel } from "../core/domain/Similar-Question/similar-question-list-model";
import { similarQuestionModel } from "../core/domain/Similar-Question/similar-question-model";
import { similarQuestionEntity } from "../entity/Similar-Question/similar-question-entity";

@Injectable({
    providedIn : 'root',
})



export class SimilarQuestionService extends IsimilarQuestionservice{

constructor(private http : HttpClient){
    super()
}


override createSimilarQuestion(testID: string, question: string, optionA: string, optionB: string,
     optionC: string, optionD: string, optionE: string, optionF: string, explanation: string, correct: string,
      flag: string, similarId: string): Observable<SimpleResponse> {
 
        const url = `${baseUrl}/api/SimilarQuestion`;
        return this.http.post<SimpleResponse>(url,{testID : testID, question : question, optionA : optionA ,
            optionB : optionB, optionC : optionC, optionD : optionD, optionE : optionE, optionF : optionF,
            explanation : explanation, correct : correct, flag : flag , similarId : similarId}).pipe(
                map ((response)=>{
                    if(response.status){
                        return response.data;
                    }else{
                        throw new Error(response.msg);
                    }
                })
                )
        
        }
        
        
override getSimilarQuestionList(): Observable<SimilarQuestionListModel[]> {
    
    const url = `${baseUrl}/api/SimilarQuestion`;
    return this.http.get<similarQuestionListEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data ;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}


override updateSimilarQuestion(id: string, testID: string, question: string, optionA: string, optionB: string,
     optionC: string, optionD: string, optionE: string, optionF: string, explanation: string, correct: string,
      flag: string, similarId: string): Observable<SimpleResponse> {
    
        const url = `${baseUrl}/api/SimilarQuestion/${id}`;
        return this.http.put<SimpleResponse>(url,{id : id, testID : testID, question : question, optionA : optionA,
            optionB : optionB, optionC : optionC , optionD : optionD, optionE : optionE,optionF : optionF,
            explanation : explanation, correct : correct, flag : flag, similarId : similarId}).pipe(
                map ((response)=>{
                    if(response.status){
                        return response.data;
                    }else{
                        throw new Error(response.msg);
                    }
                })
            )
        
}


override deleteSimilarQuestion(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/SimilarQuestion/${id}`;
    return this.http.delete<SimpleResponse>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else 
            throw new Error(response.msg);
        })
    )
}


override getSimilarQuestion(id: string): Observable<similarQuestionModel> {
    
    const url = `${baseUrl}/api/SimilarQuestion/${id}`;
    return this.http.get<similarQuestionEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data ;
            }else {
                 throw new Error(response.msg);
            }
        })
    )
}



}