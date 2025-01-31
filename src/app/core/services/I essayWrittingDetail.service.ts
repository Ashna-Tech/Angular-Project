import { SimpleChange } from '@angular/core';
import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { EssaywrittingDetailListmodel } from '../domain/Essay-Writting-Detail/essayWrittingDetailList.model';
import { EssaywrittingModel } from '../domain/Essay-Writting/essayWritting.model';
import { EssaywrittingDetailmodel } from '../domain/Essay-Writting-Detail/essayWrittingDetail.model';

export abstract class IessayWrittingDetailService {
  abstract CreateEssaywrittingDetail(
    essayNo: string,
    planId: string,
    essayTitle: string,
    addNo: string,

    marks: string,
    questionId: string,
    quesDescription: string
  ): Observable<SimpleResponse>;

  abstract GetEssaywrittingDetailList(): Observable<
    EssaywrittingDetailListmodel[]
  >;

  abstract UpdateEssaywrittingDetail(
    id: string,
    essayNo: string,
    planId: string,
    essayTitle: string,
    addNo: string,
    marks: string,
    questionId: string,
    quesDescription: string
  ): Observable<SimpleResponse>;

  abstract DeleteEssaywrittingDetail(id: string): Observable<SimpleResponse>;

  abstract GetEssaywrittingDetail(
    id: string
  ): Observable<EssaywrittingDetailmodel>;
}
