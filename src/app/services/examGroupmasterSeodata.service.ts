import { Injectable } from '@angular/core';
import { IExamGroupmasterSeodataService } from '../core/services/I examGroupmasterSeodata.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { ExamGroupMasterSeodataListentity } from '../entity/Exam-Group-Master-Seo-Data/examGroupmasterSeodataList.entity';
import { ExamGroupMasterSeodataListmodel } from '../core/domain/Exam-Group-Master-Seo-Data/examGroupmasterSeodataList.model';
import { ExamGroupmasterSeodataEntity } from '../entity/Exam-Group-Master-Seo-Data/examGroupMasterSeodata.entity';
import { ExamGroupmasterSeoDatamodel } from '../core/domain/Exam-Group-Master-Seo-Data/examGroupmasterSeodata.model';

@Injectable({
  providedIn: 'root',
})
export class ExamGroupMasterSeoDataService extends IExamGroupmasterSeodataService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateExamGroupmasterSeoData(
    seoTitle: string,
    seoKeywords: string,
    seoDescription: string,
    jsonSchema: string,
    otherData: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamGroupMasterSeoData`;

    return this.http
      .post<SimpleResponse>(url, {
        seoTitle: seoTitle,
        seoKeywords: seoKeywords,

        seoDescription: seoDescription,
        jsonSchema: jsonSchema,
        otherData: otherData,
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

  override GetExamGroupmasterListSeodata(): Observable<
    ExamGroupMasterSeodataListmodel[]
  > {
    const url = `${baseUrl}/api/ExamGroupMasterSeoData`;
    return this.http.get<ExamGroupMasterSeodataListentity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateExamGroupmasterSeodata(
    id: string,
    seoTitle: string,
    seoKeywords: string,

    seoDescription: string,
    jsonSchema: string,
    otherData: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamGroupMasterSeoData/${id}`;

    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        seoTitle: seoTitle,
        seoKeywords: seoKeywords,
        seoDescription: seoDescription,
        jsonSchema: jsonSchema,
        otherData: otherData,
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

  override DeleteExamGroupmasterSeodata(
    id: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamGroupMasterSeoData/${id}`;

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

  override GetExamGroupmasterSeodata(
    id: string
  ): Observable<ExamGroupmasterSeoDatamodel> {
    const url = `${baseUrl}/api/ExamGroupMasterSeoData/${id}`;

    return this.http.get<ExamGroupmasterSeodataEntity>(url).pipe(
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
