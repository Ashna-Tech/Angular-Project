import { Injectable } from '@angular/core';
import { IaffiliateService } from '../core/services/I affiliatemaster.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { affiliateMasterListModel } from '../core/domain/Affiliate-Master/affiliatemaster.List.model';
import { affiliateMasterModel } from '../core/domain/Affiliate-Master/affiliatemaster.model';
import { affilMasterListIdwithnameModel } from '../core/domain/Affiliate-Master/affiliatemasteridwithname.model';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { affiliateMasterEntity } from '../entity/Affiliate Master/affiliatemaster.entity';
import { affiliateMasterListEntity } from '../entity/Affiliate Master/affiliatemasterList.entity';
import { affilMasterListIdwithnameEntity } from '../entity/Affiliate Master/affiliatemasterIdwithname.entity';

@Injectable({
  providedIn: 'root',
})
export class affiliateMasterService extends IaffiliateService {
  constructor(private http: HttpClient) {
    super();
  }

  override createAffiliateMaster(
    name: string,
    email: string,
    mobile: string,
    password: string,
    affDays: string,
    couponApplydays: string,
    canLogin: string,
    isStarted: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/AffiliateMaster`;
    return this.http
      .post<SimpleResponse>(url, {
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        affDays: affDays,
        couponApplydays: couponApplydays,
        canLogin:(canLogin ==="Yes"),
        isStarted:( isStarted ==="Yes"),
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
  override getAffiliateMasterList(): Observable<affiliateMasterListModel[]> {
    const url = `${baseUrl}/api/AffiliateMaster`;
    return this.http.get<affiliateMasterListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  override updateAffiliateMaster(
    id: string,
    name: string,
    email: string,
    mobile: string,
    password: string,
    affDays: string,
    couponApplydays: string,
    canLogin: string,
    isStarted: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/AffiliateMaster/${id}`;

    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        affDays: affDays,
        couponApplydays: couponApplydays,
        canLogin: (canLogin ==="Yes"),
        isStarted: (isStarted ==="Yes"),
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
  override deleteAffiliateMaster(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/AffiliateMaster${id}`;
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
  override getAffiliateMaster(id: string): Observable<affiliateMasterModel> {
    const url = `${baseUrl}/api/AffiliateMaster/${id}`;
    return this.http.get<affiliateMasterEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getAffiliateMasterListIdwithname(): Observable<
    affilMasterListIdwithnameModel[]
  > {
    const url = `${baseUrl}/api/AffiliateMaster/IdWithName`;
    return this.http.get<affilMasterListIdwithnameEntity>(url).pipe(
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
