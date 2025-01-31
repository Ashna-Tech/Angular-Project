import { Injectable } from '@angular/core';
import { IessayWrittingDetailService } from '../core/services/I essayWrittingDetail.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EssaywrittingDetailmodel } from '../core/domain/Essay-Writting-Detail/essayWrittingDetail.model';
import { EssaywrittingDetailListmodel } from '../core/domain/Essay-Writting-Detail/essayWrittingDetailList.model';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { EssaywrittingDetailListEntity } from '../entity/Essay-Writting-Detail/essayWrittingDetailList.entity';

@Injectable({
  providedIn: 'root',
})
export class EssaywrittingDetailService extends IessayWrittingDetailService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateEssaywrittingDetail(
    essayNo: string,
    planId: string,
    essayTitle: string,

    addNo: string,
    marks: string,
    questionId: string,
    quesDescription: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/EssayWrittingDetail`;
    return this.http
      .post<SimpleResponse>(url, {
        essayNo: essayNo,
        planId: planId,
        essayTitle: essayTitle,
        addNo: addNo,
        marks: marks,
        questionId: questionId,

        quesDescription: quesDescription,
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

  override GetEssaywrittingDetailList(): Observable<
    EssaywrittingDetailListmodel[]
  > {
    const url = `${baseUrl}/api/EssayWrittingDetail`;
    return this.http.get<EssaywrittingDetailListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateEssaywrittingDetail(
    id: string,
    essayNo: string,
    planId: string,
    essayTitle: string,
    addNo: string,
    marks: string,
    questionId: string,
    quesDescription: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/EssayWrittingDetail/${id}`;

    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        essayNo: essayNo,
        planId: planId,
        essayTitle: essayTitle,
        addNo: addNo,
        marks: marks,
        questionId: questionId,
        quesDescription: quesDescription,
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

  override DeleteEssaywrittingDetail(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/EssayWrittingDetail/${id}`;

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
  override GetEssaywrittingDetail(
    id: string
  ): Observable<EssaywrittingDetailmodel> {
    const url = `${baseUrl}/api/EssayWrittingDetail/${id}`;

    return this.http.get<SimpleResponse>(url).pipe(
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
