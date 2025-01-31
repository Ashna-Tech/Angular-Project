import { Injectable } from '@angular/core';
import { IPlanwiseFaqService } from '../core/services/I PlanwiseFaQ.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { PlanwiseFaQListEntity } from '../entity/Plan-Wise-Faq/planwiseFaqList.entity';
import { PlanwiseFaQListmodel } from '../core/domain/Plan-Wise-Faq/planWisefaqListmodel';
import { PlanwiseFaQEntity } from '../entity/Plan-Wise-Faq/planwiseFaq.entity';
import { PlanwiseFaQmodel } from '../core/domain/Plan-Wise-Faq/planWiseFaqmodel';

@Injectable({
  providedIn: 'root',
})
export class PlanwiseFaqService extends IPlanwiseFaqService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreatePlanwiseFaq(
    faqId: string,
    planId: string,
    question: string,
    answer: string,

    orderNo: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/PlanWiseFAQ`;

    return this.http
      .post<SimpleResponse>(url, {
        faqId: faqId,
        planId: planId,
        question: question,
        answer: answer,
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

  override GetPlanwisefaqList(): Observable<PlanwiseFaQListmodel[]> {
    const url = `${baseUrl}/api/PlanWiseFaQ`;

    return this.http.get<PlanwiseFaQListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdatePlanwiseFaq(
    id: string,
    faqId: string,
    planId: string,
    question: string,
    answer: string,
    orderNo: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/PlanWiseFaQ/${id}`;

    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        faqId: faqId,
        planId: planId,
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

  override DeletePlanwiseFaq(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/PlanWiseFaQ/${id}`;
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


override GetPlanwiseFaq(id: string): Observable<PlanwiseFaQmodel> {

    const url = `${baseUrl}/api/PlanWiseFaQ/${id}`;

    return this.http.get <PlanwiseFaQEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )


}






}
