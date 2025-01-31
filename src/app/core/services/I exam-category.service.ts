import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { examCategoryModel } from '../domain/exam-category/exam-category.model';
import { CommonListItemModel } from '../domain/common model';
import { examCategoryListModel } from '../domain/exam-category/examCategory-list-model';

export abstract class IexamCategoryService {
  abstract createExamCategory(
    mainCatId: string,
    name: string,
    ordering: number,
    isShowInApp: string,
    isShowInWeb: string,
    isShowCatURL: string,
    catURL: string,
    webName: string
  ): Observable<SimpleResponse>;

  abstract getExamCategoryList(MainCatId : string): Observable<examCategoryListModel[]>;

  abstract updateExamCategory(
    id: string,
    mainCatId: string,
    name: string,
    ordering: number,
    isShowInApp: string,
    isShowInWeb: string,
    isShowCatURL: string,
    catURL: string,
    webName: string
  ): Observable<SimpleResponse>;

  abstract deleteExamCategory(id: string): Observable<SimpleResponse>;

  abstract getExamCategorySingle(id: string): Observable<examCategoryModel>;

  abstract getExamCategoryListIdwithname(MainCatId :string) : Observable <CommonListItemModel[]>

}
