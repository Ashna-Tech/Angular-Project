import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { ExamLandingPageFaqListmodel } from '../domain/Exam-landing-Page-Faq/examLandingPageFAqList.model';
import { ExamLandingPageFaqmodel } from '../domain/Exam-landing-Page-Faq/examLandingPageFaq.model';

export abstract class IexamLandingPageFaqService {
  abstract CreateExamLandingPageFaq(
    pageId: string,
    question: string,
    answer: string,
    orderNo: string
  ): Observable<SimpleResponse>;

  abstract getExamLandingPageFaqList(): Observable<
    ExamLandingPageFaqListmodel[]
  >;

  abstract UpdateExamLandingPageFaq(
    id: string,
    pageId: string,
    question: string,
    answer: string,
    orderNo: string
  ): Observable<SimpleResponse>;

  abstract DeleteExamLandingPageFaq(id: string): Observable<SimpleResponse>;

  abstract GetExamLandingPageFaq(id : string): Observable<ExamLandingPageFaqmodel>;
}
