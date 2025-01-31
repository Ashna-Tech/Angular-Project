import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDetailsService } from '../core/services/I Details.service';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { detailsModel } from '../core/domain/details/details.model';
import { baseUrl } from '../../environement';
import { detailsListItemEntity } from '../entity/details/details-List-Item.entity';
import { detailsListItemModel } from '../core/domain/details/details-list-item.model';
import { detailsEntity } from '../entity/details/details.entity';
import { detailsListIdWithNameModel } from '../core/domain/details/detailsListIdwithName.model';
import { DirectQuestionModel } from '../core/domain/details/direct-question.model';

@Injectable({
  providedIn: 'root',
})
export class Detailszservice extends IDetailsService {
  constructor(private http: HttpClient) {
    super();
  }

  override createDetails(model: detailsModel): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/QuestionDetails`;

    return this.http.post<SimpleResponse>(url, model).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getDetailsList(): Observable<detailsListItemModel[]> {
    const url = `${baseUrl}/api/QuestionDetails`;

    return this.http.get<detailsListItemEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override updateDetails(data: detailsModel): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/QuestionDetails`;

    return this.http.put<SimpleResponse>(url, data).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override removeDetails(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/QuestionDetails/${id}`;

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
  override getDetails(id: string): Observable<detailsModel> {
    const url = `${baseUrl}/api/QuestionDetails/${id}`;

    return this.http.get<detailsEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getDetailsListIdWithName(): Observable<
    detailsListIdWithNameModel[]
  > {
    throw new Error('Method not implemented.');
  }

  override createDirectQuestion(
    model: DirectQuestionModel
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/QuestionDetails/Direct`;

    return this.http.post<SimpleResponse>(url, model).pipe(
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
