import { Injectable } from "@angular/core";
import { IexamTestCategoryService } from "../core/services/I exam-test-category.service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { ExamTestCategoryListEntity } from "../entity/Exam-Test-Category/exam-test-category-list.entity";
import { ExamTestCategoryListModel } from "../core/domain/Exam-Test-Category/exam-test-category-list.model";
import { CreateExamTestCategoryParams } from "../core/domain/Exam-Test-Category/Exam-test-cat-Post-Models";
import { UpdateExamTestCategoryPayload } from "../core/domain/Exam-Test-Category/Exam-test-category.put.model";
import { ExamTestcatGetTestCategoryModel } from "../core/domain/Exam-Test-Category/Exam-test-cat-Get-test-categoryListmodel";
import { ExamTestCatGetTestCatListEntity } from "../entity/Exam-Test-Category/Exam-test-cat-Get-Test-cat-listEntity";


@Injectable({
    providedIn : 'root',
})


export class ExamTestCategoryService  extends IexamTestCategoryService{

    constructor(private http : HttpClient){
        super()
    }


    override createExamTestCategory(params: CreateExamTestCategoryParams): Observable<SimpleResponse> {
      const url = `${baseUrl}/api/ExamTestCategory`;

        return this.http.post<SimpleResponse>(url, params).pipe(
                map((response)=> {
                    if(response.status){
                        return response.data;
                    }else{
                        throw new Error(response.msg);
                    }
                })
            )
    }


    override updateExamTestCategory(payload: UpdateExamTestCategoryPayload): Observable<SimpleResponse> {
        
        const url = `${baseUrl}/api/ExamTestCategory`;
  return this.http.put<SimpleResponse>(url,payload,).pipe(
    map ((response)=>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)
} 

override getExamTestCategoryExamId(id: string): Observable<ExamTestCategoryListModel[]> {
    
    const url = `${baseUrl}/api/ExamTestCategory/ExamId/${id}`;
    return this.http.get<ExamTestCategoryListEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
} 


override ExamTestCategoryGetTestCategory(id : string): Observable<ExamTestcatGetTestCategoryModel[]> {
    const url = `${baseUrl}/api/ExamTestCategory/GetTestCategoryByExamID/${id}`;
    return this.http.get<ExamTestCatGetTestCatListEntity>(url).pipe(
        map ((response) =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}


}
