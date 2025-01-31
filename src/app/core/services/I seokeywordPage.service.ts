import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { SeokeywordpageListmodel } from '../domain/Seo-Keyword-Page/seoKeywordPageList.model';
import { SeokeywordPagemodel } from '../domain/Seo-Keyword-Page/seoKeywordPage.model.';

export abstract class IseokeywordPageService {
  abstract CreateSeokeywordPage(
    testId: string,
    pageNo: string,
    cTitle: string,
    cKeyword: string,
    cDesc: string
  ): Observable<SimpleResponse>;

  abstract GetSeokeywordPageList(): Observable<SeokeywordpageListmodel[]>;

  abstract UpdateSeoKeywordPage(
    id: string,
    testId: string,
    pageNo: string,
    cTitle: string,
    cKeyword: string,
    cDesc: string
  ): Observable<SimpleResponse>;

  abstract DeleteSeokeywordPage(id : string): Observable<SimpleResponse>;

  abstract GetSeokeywordPage(id : string): Observable<SeokeywordPagemodel>;
}
