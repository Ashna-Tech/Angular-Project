import { Injectable, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { IExamContentService } from '../core/services/I exam-Content.service';
import { ExamContentListmodel } from '../core/domain/Test-Content/exam-ContentList.model';
import { ExamContentModel } from '../core/domain/Test-Content/exam-Content.model';
import { ExamContentListentity } from '../entity/test-Content/exam-ContentList.entity';
import { ExamContententity } from '../entity/test-Content/exam-Content.entity';

@Injectable({
  providedIn: 'root',
})
export class ExamContentService extends IExamContentService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateExamContent(
    examTypeId: string,
    aboutExam: string,
    examPattern: string,
    bannerExamInfo: string,
    totalTest: string,
    totalQuestion: string,
    totalHrs: string,
    quizURL: string,
    scheduleData: string,
    hasSchedule: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamContent`;
    return this.http
      .post<SimpleResponse>(url, {
        examTypeId: examTypeId,
        aboutExam: aboutExam,
        examPattern: examPattern,
        bannerExamInfo: bannerExamInfo,
        totalTest: totalTest,
        totalQuestion: totalQuestion,
        totalHrs: totalHrs,
        quizURL: quizURL,
        scheduleData: scheduleData,
        hasSchedule: hasSchedule === 'Yes',
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

  override GetExamContentList(): Observable<ExamContentListmodel[]> {
    const url = `${baseUrl}/api/ExamContent`;
    return this.http.get<ExamContentListentity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateExamContent(
    id: string,
    aboutExam: string,
    examPattern: string,
    bannerExamInfo: string,
    totalTest: string,
    totalQuestion: string,
    totalHrs: string,
    quizURL: string,
    scheduleData: string,
    hasSchedule: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamContent`;
    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        aboutExam: aboutExam,
        examPattern: examPattern,
        bannerExamInfo: bannerExamInfo,
        totalTest: totalTest,
        totalQuestion: totalQuestion,
        totalHrs: totalHrs,
        quizURL: quizURL,
        scheduleData: scheduleData,
        hasSchedule: hasSchedule === 'Yes',
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

  override DeleteExamContent(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamContent/${id}`;
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

  override GetExamContent(id: string): Observable<ExamContentModel> {
    const url = `${baseUrl}/api/ExamContent/${id}`;
    return this.http.get<ExamContententity>(url).pipe(
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
