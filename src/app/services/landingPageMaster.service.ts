import { Injectable, resolveForwardRef } from '@angular/core';
import { IlandingPageMasterService } from '../core/services/I LandingPageMaster.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { LandingPageMasterListEntity } from '../entity/Landing-Page-Master/landingPageMasterLIst.entity';
import { LandingPageMasterListmodel } from '../core/domain/Landing-Page-Master/landingpageMasterList.model';
import { LandingPageMasterEntity } from '../entity/Landing-Page-Master/landingPageMaster.entity';
import { LandingPageMastermodel } from '../core/domain/Landing-Page-Master/landingPageMaster.model';

@Injectable({
  providedIn: 'root',
})
export class LandingPageMasterService extends IlandingPageMasterService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateLandingPageMaster(
    examGroupId: string,
    name: string,
    description: string,

    seoTitle: string,
    seoKeywords: string,
    seoDescription: string,
    otherDetail: string,

    jsonSchema: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/LandingPageMaster`;

    return this.http
      .post<SimpleResponse>(url, {
        examGroupId: examGroupId,
        name: name,
        description: description,
        seoTitle: seoTitle,
        seoKeywords: seoKeywords,
        seoDescription: seoDescription,
        otherDetail: otherDetail,
        jsonSchema: jsonSchema,
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

  override GetLandingPageMasterList(): Observable<
    LandingPageMasterListmodel[]
  > {
    const url = `${baseUrl}/api/LandingPageMaster`;

    return this.http.get<LandingPageMasterListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateLandingPageMaster(
    id: string,
    examGroupId: string,
    name: string,
    description: string,
    seoTitle: string,
    seoKeywords: string,
    seoDescription: string,
    otherDetail: string,
    jsonSchema: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/LandingPageMaster/${id}`;

    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        examGroupId: examGroupId,
        name: name,
        description: description,
        seoTitle: seoTitle,
        seoKeywords: seoKeywords,
        seoDescription: seoDescription,
        otherDetail: otherDetail,
        jsonSchema: jsonSchema,
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

  override DeleteLandingPageMaster(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/LandingPageMaster/${id}`;

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

  override GetLandingPageMaster(
    id: string
  ): Observable<LandingPageMastermodel> {
    const url = `${baseUrl}/api/LandingPageMaster/${id}`;

    return this.http.get<LandingPageMasterEntity>(url).pipe(
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
