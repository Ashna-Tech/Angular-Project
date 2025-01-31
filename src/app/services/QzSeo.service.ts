import { Injectable } from '@angular/core';
import { IQzSeoService } from '../core/services/I QzSeo.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { error } from 'jquery';
import { QzSeoListEntity } from '../entity/Qz-SEO/QzSeoList.entity';
import { QzSEOListModel } from '../core/domain/Qz-SEO/QzSeoList.model';
import { QzSeoEntity } from '../entity/Qz-SEO/QzSeo.entity';
import { QzSeoModel } from '../core/domain/Qz-SEO/QzSeo.model';
@Injectable({
  providedIn: 'root',
})
export class QzSeoService extends IQzSeoService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateQzSEO(
    examTypeID: string,
    pageTitle: string,
    kwordMeta: string,

    pageDesc: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/QzSeo`;
    return this.http
      .post<SimpleResponse>(url, {
        examTypeID: examTypeID,
        pageTitle: pageTitle,
        kwordMeta: kwordMeta,
        pageDesc: pageDesc,
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

override GetQzSEOList(): Observable<QzSEOListModel[]> {
    
    const url = `${baseUrl}/api/QzSeo`;
    return this.http.get <QzSeoListEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}

  override UpdateQzSEO(
    id: string,
    examTypeID: string,
    pageTitle: string,
    kwordMeta: string,

    pageDesc: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/QzSeo/${id}`;

    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        examTypeID: examTypeID,
        pageTitle: pageTitle,
        kwordMeta: kwordMeta,
        pageDesc: pageDesc,
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

override DeleteQzSEO(id: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/QzSeo/${id}`;

return this.http.delete <SimpleResponse>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
)
}

override GetQzSEO(id: string): Observable<QzSeoModel> {
    
const url = `${baseUrl}/api/QzSeo/${id}`;
return this.http.get <QzSeoEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
)


}



















}
