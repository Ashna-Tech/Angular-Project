import { Injectable } from "@angular/core";
import { ITotalChapterQuestionService } from "../core/services/I-total-Chapter-Ques.service";
import { HttpClient } from "@angular/common/http";
import { Observable,catchError,map, throwError} from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { TotalChapterQuesListEntity } from "../entity/Total-Chapter-Question/total-chapter-quesList.entity";
import { TotalChapterQuesModel } from "../core/domain/Total-Chapter-Question/total-chapter-qest-model";
import { TotalChapterQuesEntity } from "../entity/Total-Chapter-Question/total-chapter-ques-entity";
import { TotalChapterQuesListItemModel } from "../core/domain/Total-Chapter-Question/total-chapter-ques.List.model";



@Injectable({
    providedIn : 'root',
})


export class TotalChapterQuestionService extends ITotalChapterQuestionService{

constructor(private http : HttpClient){
    super()
}

override CreateTotalChapterQues(examId: string, categoryId: string, subCategoryId: string, chapterId: string,
     noofQues: number, trending: number): Observable<SimpleResponse> {
    
   const url = `${baseUrl}/api/TotalChapterQuestion`;
   return this.http.post<SimpleResponse>(url,{examId : examId , categoryId : categoryId, subCategoryId :
    subCategoryId,chapterId : chapterId, noofQues : noofQues,trending : trending}).pipe(
        map((response) =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    ) 
    
}

override UpdateTotalChapterQues(examId: string, categoryId: string, subCategoryId: string, chapterId: string,
     noofQues: number, trending: string): Observable<SimpleResponse> {

        
    
        const url = `${baseUrl}/api/TotalChapterQuestion`;
        return this.http.put<SimpleResponse>(url,{
            "examId": examId,
            "categoryId": categoryId,
            "subCategoryId": subCategoryId,
            "chapterId": chapterId,
            "noofQues": noofQues,
            "trending": trending
        }).pipe(
                map ((response)=>{
                    if(response.status){
                        return response.data;
                    }else{
                        throw new Error(response.msg);
                    }
                })
            )
}


override DeleteTotalChapterQues(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TotalChapterQuestion/${id}`;
    return this.http.delete<SimpleResponse>(url).pipe(
        map ((response) =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            } 
        })
    )
}



 override GetTotalChapterQuesList(examId: string, categoryId: string, subCategoryId: string): Observable<TotalChapterQuesListItemModel[]> {
       const url = `${baseUrl}/api/TotalChapterQuestion/${examId}/${categoryId}/${subCategoryId}` ;
       return this.http.get<TotalChapterQuesListEntity>(url).pipe(
        map ((response) =>{
            if(response.status){
                return response.data;
             }else{
                throw new Error(response.msg)
            }
        })
       )
 }



 override getSingleTotalChapterQuest(examId: string, categoryId: string, subCategoryId: string, chapterId: string): Observable<TotalChapterQuesModel> {
     const url = `${baseUrl}/api/TotalChapterQuestion/${examId}/${categoryId}/${subCategoryId}/${chapterId}`;
     return this.http.get<TotalChapterQuesEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        }), 
      
        
     catchError((error =>{
        console.error('Error fetching Total Chapter Question :', error);
        return throwError(()=> error);

     }))
     )
 }



}