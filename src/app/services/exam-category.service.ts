import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { IexamCategoryService } from '../core/services/I exam-category.service';
import { examCategoryListEntity } from '../entity/Exam Category/exam-categorylist.entity';
import { examCategoryModel } from '../core/domain/exam-category/exam-category.model';
import { examCategoryEntity } from '../entity/Exam Category/examcategory.entity';
import { CommonListItemModel } from '../core/domain/common model';
import { CommonModelListEntity } from '../entity/Common-model-list entity';
import { examCategoryListModel } from '../core/domain/exam-category/examCategory-list-model';

@Injectable({
  providedIn: 'root',
})
export class examCategoryService extends IexamCategoryService {
  
  constructor(private http: HttpClient) {
    super();
  }

override createExamCategory(mainCatId: string, name: string, ordering: number, isShowInApp: string,
   isShowInWeb: string, isShowCatURL: string, catURL: string, webName:string): Observable<SimpleResponse> {

    const url = `${baseUrl}/api/ExamCategory`;

    const showApp = (isShowInApp ==="Yes"); 
    const showWeb = (isShowInWeb ==="Yes");    
    const showcatUrl = (isShowCatURL ==="Yes");
   
    return this.http
      .post<SimpleResponse>(url, {
        mainCatId:mainCatId,
        name:name,
        webName:webName,
        ordering:ordering,
        isShowInApp:showApp,
        isShowInWeb:showWeb,
        isShowCatURL:showcatUrl,
        catURL:catURL
      })
      .pipe(
        map((response) => {
          if (response.status) {
            return response.data;
          } else {
            throw new Error(response.msg);
          }
        })
      );
  }


override getExamCategoryList(MainCatId: string): Observable<examCategoryListModel[]> {
  
    const url = `${baseUrl}/api/ExamCategory/${MainCatId}`;
    return this.http.get<examCategoryListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override updateExamCategory(id: string, mainCatId: string, name: string, ordering: number, isShowInApp: 
    string, isShowInWeb: string, isShowCatURL: string, catURL: string, webName:string): Observable<SimpleResponse> {
      
   const url = `${baseUrl}/api/ExamCategory/${id}`;

   const showApp = (isShowInApp ==="Yes"); 
   const showWeb = (isShowInWeb ==="Yes");    
   const showcatUrl = (isShowCatURL ==="Yes");

    return this.http.put<SimpleResponse>(url,{
        mainCatId:mainCatId,
        name:name,
        webName:webName,
        ordering:ordering,
        isShowInApp:showApp,
        isShowInWeb:showWeb,
        isShowCatURL:showcatUrl,
        catURL:catURL
      })
      .pipe(
        map((response) => {
          if (response.status) {
            return response.data;
          } else {
            throw new Error(response.msg);
          }
        })
      );
  }


  override deleteExamCategory(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamCategory/${id}`;

    return this.http.delete<SimpleResponse>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }



  override getExamCategorySingle(id: string): Observable<examCategoryModel> {
    const url = `${baseUrl}/api/ExamCategory/Single/${id}`;

    return this.http.get<examCategoryEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }


  
  override getExamCategoryListIdwithname(MainCatId: string): Observable<CommonListItemModel[]> {
    const url = `${baseUrl}/api/ExamCategory/IdWithName/${MainCatId}`;

    return this.http.get<CommonModelListEntity>(url).pipe(
      map (response =>{
        if(response.status){
          return response.data;
        }else {
          throw new Error(response.msg)
        }
      })
    );
  }
}
