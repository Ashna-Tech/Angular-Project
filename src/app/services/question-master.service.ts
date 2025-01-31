import { HttpClient } from '@angular/common/http';
import { IQuestionMasterService } from '../core/services/I Question-Master.service';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { QuestionMastermodel } from '../core/domain/Question-Master/Qmaster.model';
import { QuestionMasterListItemModel } from '../core/domain/Question-Master/Qmaster-list-item.Model';
import { baseUrl } from '../../environement';
import { questionMasterListItemEntity } from '../entity/Question-Master/Question-master-List-Item.entity';
import { QuestionMasterEntity } from '../entity/Question-Master/Question-master.entity';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../core/domain/response.model';
import { UpdateQuestionMasterDTO } from '../core/domain/Question-Master/update-question-master.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionMasterService extends IQuestionMasterService {
  constructor(private http: HttpClient) {
    super();
  }

  override createQuestionMaster(
    model: QuestionMastermodel
  ): Observable<string> {
    const url = `${baseUrl}/api/QuestionMaster`;

    return this.http.post<ResponseModel<string>>(url, model).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getQuestionMasterList(): Observable<QuestionMasterListItemModel[]> {
    const url = `${baseUrl}/api/QuestionMaster`;
    
    return this.http.get<questionMasterListItemEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override upadateQuestionMaster(data:UpdateQuestionMasterDTO): Observable<string> {
    const url = `${baseUrl}/api/QuestionMaster`;

    return this.http.put<ResponseModel<string>>(url, data)
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

  override removeQuestionMaster(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/QuestionMaster/${id}`;
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

  override getQuestionMaster(id: string): Observable<QuestionMastermodel> {
    const url = `${baseUrl}/api/QuestionMaster/${id}`;
    return this.http.get<QuestionMasterEntity>(url).pipe(
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
