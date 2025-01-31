import { Injectable } from '@angular/core';
import { Itestcategoryservice } from '../core/services/I testcategory.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { TestcategoryListmodel } from '../core/domain/Test-Category/testcategoryList.model';
import { TestcategoryListEntity } from '../entity/Test-Category/testcategoryList.entity';
import { TestcategoryEntity } from '../entity/Test-Category/testcategory.entity';
import { Testcategorymodel } from '../core/domain/Test-Category/testcategory.model';
import { CommonModelListEntity } from '../entity/Common-model-list entity';
import { CommonListItemModel } from '../core/domain/common model';

@Injectable({
  providedIn: 'root',
})
export class TestCategoryService extends Itestcategoryservice {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateTestCategory(
    name: string,
    flag: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestCategory`;
    return this.http.post<SimpleResponse>(url, { name: name, flag: flag }).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override GetTestCategoryList(): Observable<TestcategoryListmodel[]> {
    const url = `${baseUrl}/api/TestCategory`;
    return this.http.get<TestcategoryListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateTestCategory(
    id: string,
    name: string,
    flag: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestCategory/${id}`;
    return this.http
      .put<SimpleResponse>(url, { id: id, name: name, flag: flag })
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

  override DeleteTestCategory(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestCategory/${id}`;

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

  override GetTestCategory(id: string): Observable<Testcategorymodel> {
    const url = `${baseUrl}/api/TestCategory/${id}`;
    return this.http.get<TestcategoryEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

override GetTestCategoryIdwithName(): Observable<CommonListItemModel[]> {
  const url = `${baseUrl}/api/TestCategory/IdWithName`;
  return this.http.get<CommonModelListEntity>(url).pipe(
    map (response =>{
      if(response.status){
        return response.data;
      }else {
        throw new Error(response.msg);
      }
    })
  )
}



}
