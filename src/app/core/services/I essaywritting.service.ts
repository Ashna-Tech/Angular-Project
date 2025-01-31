import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { EssaywrittingListmodel } from '../domain/Essay-Writting/essayWrittingList.model';
import { EssaywrittingModel } from '../domain/Essay-Writting/essayWritting.model';

export abstract class IessaywrittingService {
  abstract CreateEssayWritting(
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
  ): Observable<SimpleResponse>;

  abstract GetEssayWrittingList(): Observable<EssaywrittingListmodel[]>;

  abstract UpdateEssayWritting(
    id: string,
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
  ): Observable<SimpleResponse>;

  abstract DeleteEssayWritting(id: string): Observable<SimpleResponse>;

  abstract GetEssayWritting(id: string): Observable<EssaywrittingModel>;
}
