import { Injectable } from '@angular/core';
import { IseokeywordPageService } from '../core/services/I seokeywordPage.service';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { HttpClient } from '@angular/common/http';
import { SeokeywordPageListEntity } from '../entity/Seo-Keyword-Page/seoKeywordPageList.entity';
import { SeokeywordPageEntity } from '../entity/Seo-Keyword-Page/seoKeywordPage.entity';
import { SeokeywordPagemodel } from '../core/domain/Seo-Keyword-Page/seoKeywordPage.model.';
import { SeokeywordpageListmodel } from '../core/domain/Seo-Keyword-Page/seoKeywordPageList.model';

@Injectable({
  providedIn: 'root',
})
export class SeokeywordPageService extends IseokeywordPageService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateSeokeywordPage(
    testId: string,
    pageNo: string,
    cTitle: string,
    cKeyword: string,
    cDesc: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/SEOKeywordPage`; 
    return this.http
      .post<SimpleResponse>(url, {
        testId: testId,
        pageNo: pageNo,
        cTitle: cTitle,
        cKeyword: cKeyword,
        cDesc: cDesc,
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

  override GetSeokeywordPageList(): Observable<SeokeywordpageListmodel[]> {
    const url = `${baseUrl}/api/SEOKeywordPage`;

    return this.http.get<SeokeywordPageListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateSeoKeywordPage(
    id: string,
    testId: string,
    pageNo: string,
    cTitle: string,

    cKeyword: string,
    cDesc: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/SEOKeywordPage/${id}`;

    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        testId: testId,
        pageNo: pageNo,
        cTitle: cTitle,
        cKeyword: cKeyword,
        cDesc: cDesc,
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

  override DeleteSeokeywordPage(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/SEOKeywordPage/${id}`;

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

  override GetSeokeywordPage(id: string): Observable<SeokeywordPagemodel> {
    const url = `${baseUrl}/api/SEOKeywordPage/${id}`;
    return this.http.get<SeokeywordPageEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
}
