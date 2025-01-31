import { Injectable } from '@angular/core';
import { IPlansService } from '../core/services/I plans.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { PlansListEntity } from '../entity/Plans/PlansListEntity';
import { PlansModel } from '../core/domain/plans/plans.model';
import { PlansListModel } from '../core/domain/plans/plansList.model';
import { PlansEntity } from '../entity/Plans/PlansEntity';

@Injectable({
  providedIn: 'root',
})
export class PlansService extends IPlansService {
  constructor(private http: HttpClient) {
    super();
  }

  override createPlans(
    name: string,
    plan_Name_Admin: string,
    add_Plan_Name: string,
    plan_Type: string,
    plan_Price: string,
    no_of_Test: string,
    duration_Month: string,
    price_Per_Month: string,
    tax: string,
    savePercent: string,
    examType_ID: string,
    examType_IDs: string,
    h_Examtype: string,
    examCatID: string,
    lbl_nooftest: string,
    lbl_strkprice: string,
    lbl_avail: string,
    apporder_no: string,
    porder_no: string,
    packageType: string,
    isShowInListFormat: string,
    isSectionalPlan: string,
    tagLabel: string,
    discountLabel: string,
    durationPlanLabel: string,
    planExtraInfo: string,
    isPlanURL: string,
    planInfoURL: string,
    isCUETReattemptAllow: string,
    isCUETDoubtsDiscussionAllow: string,
    isCUETPlan: string,
    isCUETBasePlan: string,
    isTopicPlan: string,
    isActivePlan: string,
    isActivePlanApp: string,
    isShowInAdmin: string,
    isApplyCoupon: string,
    isPDFAvailable: string,
    isOfferApply: string,
    canAddExtraPlan: string,
    facultyHeading: string,
    scheduleHeading: string,
    withPlanId: string,
    isTrending: string,
    isValidityAdded: string,
    validityPlanTag: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/Plans`;
    return this.http
      .post<SimpleResponse>(url, {
        name: name,
        plan_Name_Admin: plan_Name_Admin,
        add_Plan_Name: add_Plan_Name,
        plan_Type: plan_Type,
        plan_Price: plan_Price,
        no_of_Test: no_of_Test,
        duration_Month: duration_Month,
        price_Per_Month: price_Per_Month,
        tax: tax,
        savePercent: savePercent,
        examType_ID: examType_ID,
        examType_IDs: examType_IDs,
        h_Examtype: h_Examtype,
        examCatID: examCatID,
        lbl_nooftest: lbl_nooftest,
        lbl_strkprice: lbl_strkprice,
        lbl_avail: lbl_avail,
        apporder_no: apporder_no,
        porder_no: porder_no,
        packageType: packageType,
        isShowInListFormat: (isShowInListFormat =="Yes"),
        isSectionalPlan: (isSectionalPlan =="Yes"),
        tagLabel: tagLabel,
        discountLabel: discountLabel,
        durationPlanLabel: durationPlanLabel,
        planExtraInfo: planExtraInfo,
        isPlanURL: (isPlanURL =="Yes"),
        planInfoURL: planInfoURL,
        isCUETReattemptAllow: (isCUETReattemptAllow =="Yes"),
        isCUETDoubtsDiscussionAllow: (isCUETDoubtsDiscussionAllow =="Yes"),
        isCUETPlan: (isCUETPlan =="Yes"),
        isCUETBasePlan: (isCUETBasePlan =="Yes"),
        isTopicPlan: (isTopicPlan =="Yes"),
        isActivePlan: (isActivePlan =="Yes"),
        isActivePlanApp: (isActivePlanApp =="Yes"),
        isShowInAdmin: (isShowInAdmin =="Yes"),
        isApplyCoupon: (isApplyCoupon =="Yes"),
        isPDFAvailable: (isPDFAvailable =="Yes"),
        isOfferApply: (isOfferApply =="Yes"),
        canAddExtraPlan: (canAddExtraPlan =="Yes"),
        facultyHeading: facultyHeading,
        scheduleHeading: scheduleHeading,
        withPlanId: withPlanId,
        isTrending: (isTrending =="Yes"),
        isValidityAdded: (isValidityAdded =="Yes"),
        validityPlanTag: validityPlanTag,

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

  override GetPlansList(): Observable<PlansListModel[]> {
    const url = `${baseUrl}/api/Plans`;
    return this.http.get<PlansListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdatePlans(
    id: string,
    name: string,
    plan_Name_Admin: string,
    add_Plan_Name: string,

    plan_Type: string,
    plan_Price: string,
    no_of_Test: string,
    duration_Month: string,
    price_Per_Month: string,
    tax: string,
    savePercent: string,
    examType_ID: string,
    examType_IDs: string,
    h_Examtype: string,
    examCatID: string,
    lbl_nooftest: string,
    lbl_strkprice: string,
    lbl_avail: string,
    apporder_no: string,
    porder_no: string,
    packageType: string,
    isShowInListFormat: string,
    isSectionalPlan: string,
    tagLabel: string,
    discountLabel: string,
    durationPlanLabel: string,
    planExtraInfo: string,
    isPlanURL: string,
    planInfoURL: string,
    isCUETReattemptAllow: string,
    isCUETDoubtsDiscussionAllow: string,
    isCUETPlan: string,
    isCUETBasePlan: string,
    isTopicPlan: string,
    isActivePlan: string,
    isActivePlanApp: string,
    isShowInAdmin: string,
    isApplyCoupon: string,
    isPDFAvailable: string,
    isOfferApply: string,
    canAddExtraPlan: string,
    facultyHeading: string,
    scheduleHeading: string,
    withPlanId: string,
    isTrending: string,
    isValidityAdded: string,
    validityPlanTag: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/Plans/${id}`;

    return this.http
      .put<SimpleResponse>(url, {
        id: id,
        name: name,
        plan_Name_Admin: plan_Name_Admin,
        add_Plan_Name: add_Plan_Name,
        plan_Type: plan_Type,
        plan_Price: plan_Price,
        no_of_Test: no_of_Test,
        duration_Month: duration_Month,
        price_Per_Month: price_Per_Month,
        tax: tax,
        savePercent: savePercent,
        examType_ID: examType_ID,
        examType_IDs: examType_IDs,
        h_Examtype: h_Examtype,
        examCatID: examCatID,
        lbl_nooftest: lbl_nooftest,
        lbl_strkprice: lbl_strkprice,
        lbl_avail: lbl_avail,
        apporder_no: apporder_no,
        porder_no: porder_no,
        packageType: packageType,
        isShowInListFormat: (isShowInListFormat =="Yes"),
        isSectionalPlan: (isSectionalPlan =="Yes"),
        tagLabel: tagLabel,
        discountLabel: discountLabel,
        durationPlanLabel: durationPlanLabel,
        planExtraInfo: planExtraInfo,
        isPlanURL: (isPlanURL =="Yes"),
        planInfoURL: planInfoURL,
        isCUETReattemptAllow: (isCUETReattemptAllow =="Yes"),
        isCUETDoubtsDiscussionAllow: (isCUETDoubtsDiscussionAllow =="Yes"),
        isCUETPlan: (isCUETPlan =="Yes"),
        isCUETBasePlan: (isCUETBasePlan =="Yes"),
        isTopicPlan: (isTopicPlan =="Yes"),
        isActivePlan: (isActivePlan =="Yes"),
        isActivePlanApp: (isActivePlanApp =="Yes"),
        isShowInAdmin: (isShowInAdmin =="Yes"),
        isApplyCoupon: (isApplyCoupon =="Yes"),
        isPDFAvailable: (isPDFAvailable =="Yes"),
        isOfferApply: (isOfferApply =="Yes"),
        canAddExtraPlan: (canAddExtraPlan =="Yes"),
        facultyHeading: facultyHeading,
        scheduleHeading: scheduleHeading,
        withPlanId: withPlanId,
        isTrending: (isTrending =="Yes"),
        isValidityAdded: (isValidityAdded =="Yes"),
        validityPlanTag: validityPlanTag,
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

  override DeletePlans(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/Plans/${id}`;
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

  override GetPlans(id: string): Observable<PlansModel> {
    const url = `${baseUrl}/api/Plans/${id}`;
    return this.http.get<PlansEntity>(url).pipe(
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


