import { Injectable } from "@angular/core";
import { IExamSeoService} from "../core/services/I Exam-seo-service";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { HttpClient } from "@angular/common/http";
import { ExamseoListModel } from "../core/domain/Tz-Seo/Exam-seo-list-model";
import { ExamSeoModel } from "../core/domain/Tz-Seo/Exam-seo-model";
import { ExamSeoListEntity } from "../entity/Tz-seo/Exam-seo-list-entity";
import { ExamSeoEntity } from "../entity/Tz-seo/Exam-seo-entity";


@Injectable({
    providedIn : 'root',
})


export class ExamSeoService extends IExamSeoService {

constructor(private http : HttpClient){
    super()
}

override createExamSeo(id: string, pageTitle: string, keyword: string, description: string, metaTag: string,
     reviewCount: string, rating: string): Observable<SimpleResponse> {
 
        const url = `${baseUrl}/api/ExamSeo`;
        return this.http.post<SimpleResponse>(url,{id : id , pageTitle : pageTitle, 
            keyword : keyword, description : description, metaTag : metaTag, reviewCount : reviewCount, 
            rating : rating
        }).pipe(
            map ((response)=>{
                if(response.status){
                    return response.data;
                    
                }else {
                    throw new Error(response.msg);
                }
            })
        )
}


override updateExamSeo(id: string, pageTitle: string, keyword: string, description: string, metaTag: string,
     reviewCount: string, rating: string): Observable<SimpleResponse> {
     
       const url = `${baseUrl}/api/ExamSeo`;
       return this.http.put<SimpleResponse>(url,{id : id, pageTitle : pageTitle, keyword : keyword,
        description : description, metaTag: metaTag, reviewCount : reviewCount, rating :
        rating }).pipe(
               map ((response)=>{
              if(response.status){
               return response.data ;
              }else{
               throw new Error(response.msg);
              }
               })
           )
   }
    

override getExamSeoList(): Observable<ExamseoListModel[]> {
    const url = `${baseUrl}/api/ExamSeo`;
    return this.http.get<ExamSeoListEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}
   
override deleteExamSeo(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamSeo/${id}`;
    return this.http.delete<SimpleResponse>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data ;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}


override getExamSeo(id: string): Observable<ExamSeoModel> {
    const url = `${baseUrl}/api/ExamSeo/${id}`;
    return this.http.get<ExamSeoEntity>(url).pipe(
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