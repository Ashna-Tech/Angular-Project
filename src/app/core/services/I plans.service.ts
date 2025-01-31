import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { PlansListModel } from '../domain/plans/plansList.model';
import { PlansModel } from '../domain/plans/plans.model';

export abstract class IPlansService {
  abstract createPlans(
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
  ): Observable<SimpleResponse>;

  abstract GetPlansList(): Observable<PlansListModel[]>;

  abstract UpdatePlans(
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
  ): Observable<SimpleResponse>;
 
abstract DeletePlans(id : string) : Observable <SimpleResponse>


abstract GetPlans(id : string) : Observable <PlansModel>


}


