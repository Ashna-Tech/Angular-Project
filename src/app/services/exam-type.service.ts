import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { IexamTypeService } from "../core/services/Iexam-type.service";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { ExamTypeModel } from "../core/domain/Exam type/Exam-type.model";
import { baseUrl } from "../../environement";
import { ExamTypeListItemEntity } from "../entity/Exam type/exam-type-list-item.entity";
import { ExamTypeListItemModel } from "../core/domain/Exam type/Exam-type-List-item.model";
import { ExamTypeEntity } from "../entity/Exam type/exam-type.entity";
import { IdExamTypeListModel } from "../core/domain/Exam type/id-ExamtypeList.model";
import { IdExamTypeListEntity } from "../entity/Exam type/idExamtypeList.entity";


@Injectable({
    providedIn : 'root'
})


export class ExamtypeService extends IexamTypeService{

constructor (private http: HttpClient){
    super()
}


override createExamType(data:ExamTypeModel): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamType`;
    

return this.http.post<SimpleResponse>(url,data).pipe(                                       
     map (response =>{
             if(response.status){
                 return response.data;
             }else {
                 throw new Error(response.msg);
         }
     })
       )     
     }
     
override getExamTypeList(ExamCatId:string): Observable<ExamTypeListItemModel[]> {
    const url = ExamCatId ? `${baseUrl}/api/Examtype?ExamCatId=${ExamCatId}` : `${baseUrl}/api/Examtype`;

    return this.http.get<ExamTypeListItemEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}


override updateExamType(data:ExamTypeModel): Observable<SimpleResponse> {

    const url = `${baseUrl}/api/ExamType`;

  
    return this.http.put<SimpleResponse>(url,data).pipe(
            map (response =>{
                if(response.status){
                    return response.data;
                }else{
                    throw new Error(response.msg);
                }
            })
        )      
    }

override deleteExamType(id: string): Observable<SimpleResponse> {
 
    const url = `${baseUrl}/api/ExamType/${id}`;

    return this.http.delete<SimpleResponse>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else { 
                throw new Error(response.msg);
            }
        })
    )
}

override getExamType(id: string): Observable<ExamTypeModel> {
    const url = `${baseUrl}/api/ExamType/${id}`;
        
    return this.http.get<ExamTypeEntity>(url).pipe(
        map (response =>{
            if (response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}

override getExamTypeIdwithName(ExamCatId : string): Observable<IdExamTypeListModel[]> {
    
const url = `${baseUrl}/api/ExamType/IdWithName/${ExamCatId}`;

return this.http.get <IdExamTypeListEntity>(url).pipe(

    map (response =>{
        if(response.status){
            return response.data ;
        }else {
             throw new Error(response.msg)
        }
    })

)

}

}