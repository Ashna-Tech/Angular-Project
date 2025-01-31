import { Injectable } from '@angular/core';
import { IessaywrittingService } from '../core/services/I essaywritting.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { EssaywrittingListEntity } from '../entity/Essay-Writting/essayWrittingList.entity';
import { EssaywrittingListmodel } from '../core/domain/Essay-Writting/essayWrittingList.model';
import { EssaywrittingModel } from '../core/domain/Essay-Writting/essayWritting.model';
import { EssaywrittingEntity } from '../entity/Essay-Writting/essayWritting.entity';

@Injectable({
  providedIn: 'root',
})
export class essayWrittingService extends IessaywrittingService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateEssayWritting(
    title: string,
    createDate: string,
    expiryDate: string,
    essayNo: string,

    noofEssay: string,
    plainId: string,
    examTypeId: string,
    maxAttemptPerQuestionId: string,
    added: string,
    isActive: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/EssayWritting`;

    return this.http
      .post<SimpleResponse>(url, {
        title: title,
        createDate: createDate,
        expiryDate: expiryDate,
        essayNo: essayNo,
        noofEssay: noofEssay,
        plainId: plainId,
        examTypeId: examTypeId,
        maxAttemptPerQuestionId: maxAttemptPerQuestionId,
        added: added,
        isActive: (isActive == 'Yes'),
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

  override GetEssayWrittingList(): Observable<EssaywrittingListmodel[]> {
    const url = `${baseUrl}/api/EssayWritting`;
    return this.http.get<EssaywrittingListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateEssayWritting(id: string, title: string, createDate: string, expiryDate: string,
    
    essayNo: string, noofEssay: string, plainId: string, examTypeId: string,
    
    maxAttemptPerQuestionId: string, added: string, isActive: string): Observable<SimpleResponse> {
  
    const url = `${baseUrl}/api/EssayWritting/${id}`;

    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        title: title,
        createDate: createDate,

        expiryDate: expiryDate,
        essayNo: essayNo,
        noofEssay: noofEssay,
        plainId: plainId,

        examTypeId: examTypeId,
        maxAttemptPerQuestionId: maxAttemptPerQuestionId,
        added : added,
        isActive:( isActive == 'Yes'),
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

  override DeleteEssayWritting(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/EssayWritting/${id}`;

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

  override GetEssayWritting(id: string): Observable<EssaywrittingModel> {
    const url = `${baseUrl}/api/EssayWritting/${id}`;
    return this.http.get<EssaywrittingEntity>(url).pipe(
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
