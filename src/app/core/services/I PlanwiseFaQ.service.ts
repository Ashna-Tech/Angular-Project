import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { PlanwiseFaQListmodel } from '../domain/Plan-Wise-Faq/planWisefaqListmodel';
import { PlanwiseFaQmodel } from '../domain/Plan-Wise-Faq/planWiseFaqmodel';

export abstract class IPlanwiseFaqService {
  abstract CreatePlanwiseFaq(
    faqId: string,
    planId: string,
    question: string,
    answer: string,
    orderNo: string
  ): Observable<SimpleResponse>;

  abstract GetPlanwisefaqList(): Observable<PlanwiseFaQListmodel[]>;

  abstract UpdatePlanwiseFaq(
    id: string,
    faqId: string,
    planId: string,
    question: string,
    answer: string,
    orderNo: string
  ): Observable<SimpleResponse>;

  abstract DeletePlanwiseFaq(id: string): Observable<SimpleResponse>;

  abstract GetPlanwiseFaq(id: string): Observable<PlanwiseFaQmodel>;
}
