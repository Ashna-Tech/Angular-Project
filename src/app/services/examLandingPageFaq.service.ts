import { Injectable } from '@angular/core';
import { IexamLandingPageFaqService } from '../core/services/I examLandingPageFaq.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { ExamLandingPageFaqListmodel } from '../core/domain/Exam-landing-Page-Faq/examLandingPageFAqList.model';
import { ExamLandingPageFaqListEntity } from '../entity/Exam-Landing-Page-Faq/examLandingpageFaqList.entity';
import { ExamLandingPageFaqEntity } from '../entity/Exam-Landing-Page-Faq/examLandingPageFaq.entity';
import { ExamLandingPageFaqmodel } from '../core/domain/Exam-landing-Page-Faq/examLandingPageFaq.model';
@Injectable({
  providedIn: 'root',
})
export class ExamLandingPageFaqService extends IexamLandingPageFaqService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateExamLandingPageFaq(
    pageId: string,
    question: string,
    answer: string,
    orderNo: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamLandingPageFAQ`;
    return this.http
      .post<SimpleResponse>(url, {
        pageId: pageId,
        question: question,
        answer: answer,
        orderNo: orderNo,
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

  override getExamLandingPageFaqList(): Observable<
    ExamLandingPageFaqListmodel[]
  > {
    const url = `${baseUrl}/api/ExamLandingPageFAQ`;
    return this.http.get<ExamLandingPageFaqListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateExamLandingPageFaq(
    id: string,
    pageId: string,
    question: string,
    answer: string,
    orderNo: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamLandingPageFAQ/${id}`;
    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        pageId: pageId,
        question: question,
        answer: answer,
        orderNo: orderNo,
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

  override DeleteExamLandingPageFaq(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/ExamLandingPageFAQ/${id}`;
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

  override GetExamLandingPageFaq(
    id: string
  ): Observable<ExamLandingPageFaqmodel> {
    const url = `${baseUrl}/api/ExamLandingPageFAQ/${id}`;

    return this.http.get<ExamLandingPageFaqEntity>(url).pipe(
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
