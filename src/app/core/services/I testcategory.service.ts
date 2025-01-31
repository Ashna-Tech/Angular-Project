import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { TestcategoryListmodel } from '../domain/Test-Category/testcategoryList.model';
import { Testcategorymodel } from '../domain/Test-Category/testcategory.model';
import { CommonListItemModel } from '../domain/common model';

export abstract class Itestcategoryservice {
  abstract CreateTestCategory(name : string, flag : string): Observable<SimpleResponse>;

  abstract GetTestCategoryList(): Observable<TestcategoryListmodel[]>;

  abstract UpdateTestCategory(id: string, name : string, flag : string): Observable<SimpleResponse>;

  abstract DeleteTestCategory(id: string): Observable<SimpleResponse>;

  abstract GetTestCategory(id: string): Observable<Testcategorymodel>;

  abstract GetTestCategoryIdwithName() : Observable <CommonListItemModel[]>
}
