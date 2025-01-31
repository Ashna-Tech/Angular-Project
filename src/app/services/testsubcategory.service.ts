import { Injectable } from '@angular/core';
import { ItestSubcategoryService } from '../core/services/I testsubCategory.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { error } from 'jquery';
import { TestsubCategoryListEntity } from '../entity/Test-subcategory/testSubcategoryList.entity';
import { TestSubcategoryListmodel } from '../core/domain/Test-subcategory/testSubcategoryList.model';
import { TestsubCategoryEntity } from '../entity/Test-subcategory/testSubcategory.entity';
import { TestSubcategorymodel } from '../core/domain/Test-subcategory/testSubcategory.model';
import { CommonModelListEntity } from '../entity/Common-model-list entity';
import { CommonListItemModel } from '../core/domain/common model';

@Injectable({
  providedIn: 'root',
})
export class TestsubCategoryService extends ItestSubcategoryService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateTestsubCategory(
    catId: string,
    name: string,
    flag: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestSubCategory`;

    return this.http
      .post<SimpleResponse>(url, { catId: catId, name: name, flag: flag })
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

  override GetTestsubCategoryList(): Observable<TestSubcategoryListmodel[]> {
    const url = `${baseUrl}/api/TestSubCategory`;

    return this.http.get<TestsubCategoryListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateTestsubCategory(
    id: string,
    catId: string,
    name: string,
    flag: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestSubCategory/${id}`;

    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        catId: catId,
        name: name,
        flag: flag,
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

override DeleteTestsubCategory(id: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/TestSubCategory/${id}`;

return this.http.delete <SimpleResponse>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
)

}

override GetTestsubCategory(id: string): Observable<TestSubcategorymodel> {
    
    const url = `${baseUrl}/api/TestSubCategory/${id}`;

    return this.http.get <TestsubCategoryEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data ;
            }else {
                throw new Error(response.msg);
            }
        })
    )

}

override GetTestsubCategoryListIdwithName(): Observable<CommonListItemModel[]> {
  
  const url = `${baseUrl}/api/TestSubCategory/IdWithName`;
  return this.http.get<CommonModelListEntity>(url).pipe(
    map (response =>{
      if(response.status){
        return response.data;
      }else{
        throw new Error(response.msg);
      }
    })
  )
}


}
