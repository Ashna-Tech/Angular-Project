import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { PlansService } from '../../../services/Plans.service';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe } from '@angular/common';
import { ExamtypeService } from '../../../services/exam-type.service';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';
import { examCategoryService } from '../../../services/exam-category.service';
import { CommonListItemModel } from '../../../core/domain/common model';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, DataTableComponent, AsyncPipe],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
})
export class PlansComponent implements OnInit {

  isUpdateMode: boolean = false;
  PlansForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    planNameAdmin: new FormControl('', [Validators.required]),
    addPlanName: new FormControl('', [Validators.required]),
    planType: new FormControl('', [Validators.required]),
    planPrice: new FormControl('0', [Validators.required]),
    noOfTest: new FormControl('', [Validators.required]),
    durationMonth: new FormControl('', [Validators.required]),
    pricePerMonth: new FormControl('0', [Validators.required]),
    tax: new FormControl('0', [Validators.required]),
    savePercent: new FormControl('', [Validators.required]),
    examTypeid: new FormControl('', [Validators.required]),
    examTypeIds: new FormControl('', [Validators.required]),
    H_examType: new FormControl('', [Validators.required]),
    examCatid: new FormControl('', [Validators.required]),
    IblNoOfTest: new FormControl('', [Validators.required]),
    IblstrkPrice: new FormControl('', [Validators.required]),
    IblAvail: new FormControl('', [Validators.required]),
    AppOrderNo: new FormControl('0', [Validators.required]),
    porderNo: new FormControl('0', [Validators.required]),
    packagetype: new FormControl('', [Validators.required]),
    isShowinListFormat: new FormControl('Yes', [Validators.required]),
    isSectionalPlan: new FormControl('Yes', [Validators.required]),
    tagLabel: new FormControl('', [Validators.required]),
    discountable: new FormControl('', [Validators.required]),
    durationPlanLabel: new FormControl('', [Validators.required]),
    planExtraInfo: new FormControl('', [Validators.required]),
    isPlanURL: new FormControl('Yes', [Validators.required]),
    planInfoUrl: new FormControl('', [Validators.required]),
    isCuetReattempyAllow: new FormControl('Yes', [Validators.required]),
    isCuetDoubtsDiscussionAllow: new FormControl('Yes', [Validators.required]),
    isCuetPlan: new FormControl('Yes', [Validators.required]),
    isCuetBasePlan: new FormControl('Yes', [Validators.required]),
    isTopicPlan: new FormControl('Yes', [Validators.required]),
    isActivePlan: new FormControl('Yes', [Validators.required]),
    isActivePlanApp: new FormControl('Yes', [Validators.required]),
    isShowInAdmin: new FormControl('Yes', [Validators.required]),
    isApplyCoupon: new FormControl('Yes', [Validators.required]),
    ispdfAvail: new FormControl('Yes', [Validators.required]),
    IsOfferApply: new FormControl('Yes', [Validators.required]),
    CanAddExtraPlan: new FormControl('Yes', [Validators.required]),
    facultyHeading: new FormControl('', [Validators.required]),
    scheduleHeading: new FormControl('', [Validators.required]),
    withPlanId: new FormControl('', [Validators.required]),
    isTrending: new FormControl('Yes', [Validators.required]),
    isValidityAdded: new FormControl('Yes', [Validators.required]),
    validityPlanTag: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editPlansId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  examTypeidListDropdown$: Observable<IdExamTypeListModel[]> | undefined;

  ExamtypeIdsListDropDown$: Observable<any> | undefined;

  ExamCategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  withPlanListDropdown$: Observable<any> | undefined;

  constructor(
    private plansService: PlansService,
    private toastrService: ToastrService,
    private examtypeservice : ExamtypeService,
    private examcategoryservice : examCategoryService
  ) {}

  ngOnInit(): void {

    // this.examTypeidListDropdown$ = this.examtypeservice.getExamTypeIdwithName();

    this.dataObs = this.plansService.GetPlansList();
    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Plan Name Admin', data: 'plan_Name_Admin', type: 'text' },
      { title: 'Add Plan Name', data: 'add_Plan_Name', type: 'text' },
      { title: 'Plan Type', data: 'plan_Type', type: 'text' },
      { title: 'Plan Price', data: 'plan_Price', type: 'text' },
      { title: 'Number of Test', data: 'no_of_Test', type: 'text' },
      { title: 'Duration Month', data: 'duration_Month', type: 'text' },
      { title: 'Price Per Month', data: 'price_Per_Month', type: 'text' },
      { title: 'tax', data: 'tax', type: 'text' },
      { title: 'Save Percent', data: 'savePercent', type: 'text' },
    ];
  }

  get Name() {
    return this.PlansForm.get('name');
  }

  get PlanNameAdmin() {
    return this.PlansForm.get('planNameAdmin');
  }

  get AddPlanName() {
    return this.PlansForm.get('addPlanName');
  }

  get PlanType() {
    return this.PlansForm.get('planType');
  }

  get PlanPrice() {
    return this.PlansForm.get('planPrice');
  }

  get NumberofTest() {
    return this.PlansForm.get('noOfTest');
  }

  get DurationMonth() {
    return this.PlansForm.get('durationMonth');
  }
  get PricePerMonth() {
    return this.PlansForm.get('pricePerMonth');
  }

  get Tax() {
    return this.PlansForm.get('tax');
  }

  get SavePercent() {
    return this.PlansForm.get('savePercent');
  }

  get ExamtypeId() {
    return this.PlansForm.get('examTypeid');
  }

  get ExamtypeIds() {
    return this.PlansForm.get('examTypeIds');
  }

  get H_ExamType() {
    return this.PlansForm.get('H_examType');
  }

  get ExamCatid() {
    return this.PlansForm.get('examCatid');
  }

  get IblnumnberOfTest() {
    return this.PlansForm.get('IblNoOfTest');
  }
  get IblstrkPrice() {
    return this.PlansForm.get('IblstrkPrice');
  }

  get IblAvailable() {
    return this.PlansForm.get('IblAvail');
  }

  get AppOrderNumber() {
    return this.PlansForm.get('AppOrderNo');
  }

  get PlanOrderNumber() {
    return this.PlansForm.get('porderNo');
  }

  get PackageType() {
    return this.PlansForm.get('packagetype');
  }

  get IsShowinListFormat() {
    return this.PlansForm.get('isShowinListFormat');
  }
  get IsSectionalPlan() {
    return this.PlansForm.get('isSectionalPlan');
  }

  get TagLabel() {
    return this.PlansForm.get('tagLabel');
  }

  get Discountable() {
    return this.PlansForm.get('discountable');
  }

  get DurationPlanLabel() {
    return this.PlansForm.get('durationPlanLabel');
  }

  get PlanExtraInfo() {
    return this.PlansForm.get('planExtraInfo');
  }

  get IsPlanURL() {
    return this.PlansForm.get('isPlanURL');
  }

  get PlanInfoURL() {
    return this.PlansForm.get('planInfoUrl');
  }

  get IsCuetReAttempAllow() {
    return this.PlansForm.get('isCuetReattempyAllow');
  }

  get IsCuetdoubtDiscussionAllow() {
    return this.PlansForm.get('isCuetDoubtsDiscussionAllow');
  }

  get IsCuetPlan() {
    return this.PlansForm.get('isCuetPlan');
  }

  get IsCuetBasePlan() {
    return this.PlansForm.get('isCuetBasePlan');
  }

  get IsTopicplan() {
    return this.PlansForm.get('isTopicPlan');
  }

  get IsActivePlan() {
    return this.PlansForm.get('isActivePlan');
  }
  get IsActivePlanApp() {
    return this.PlansForm.get('isActivePlanApp');
  }
  get IsShowinAdmin() {
    return this.PlansForm.get('isShowInAdmin');
  }

  get IsApplyCoupon() {
    return this.PlansForm.get('isApplyCoupon');
  }

  get IsPDFAvailable() {
    return this.PlansForm.get('ispdfAvail');
  }

  get IsOfferApply() {
    return this.PlansForm.get('IsOfferApply');
  }

  get CanAddExtraPlan() {
    return this.PlansForm.get('CanAddExtraPlan');
  }

  get FacultyHeading() {
    return this.PlansForm.get('facultyHeading');
  }

  get ScheduleHeading() {
    return this.PlansForm.get('scheduleHeading');
  }

  get WithplanId() {
    return this.PlansForm.get('withPlanId');
  }
  get IsTrending() {
    return this.PlansForm.get('isTrending');
  }

  get IsValidityAdded() {
    return this.PlansForm.get('isValidityAdded');
  }

  get ValidityPlantag() {
    return this.PlansForm.get('validityPlanTag');
  }

  createPlans() {
    //const id = UpdatePlansId;
    const name = this.Name?.value;
    const plannameAdmin = this.PlanNameAdmin?.value;
    const addPlanname = this.AddPlanName?.value;
    const plantype = this.PlanType?.value;
    const planprice = this.PlanPrice?.value;
    const noOftest = this.NumberofTest?.value;
    const durationMonth = this.DurationMonth?.value;
    const pricePermonth = this.PricePerMonth?.value;
    const tax = this.Tax?.value;
    const savePercent = this.SavePercent?.value;
    const examtypeId = this.ExamtypeId?.value;
    const examtypeIds = this.ExamtypeIds?.value;
    const h_examtype = this.H_ExamType?.value;
    const examCatId = this.ExamCatid?.value;
    const iblnoOfTest = this.IblnumnberOfTest?.value;
    const iblStrkprice = this.IblstrkPrice?.value;
    const iblavailable = this.IblAvailable?.value;
    const appOrderNo = this.AppOrderNumber?.value;
    const planorderNo = this.PlanOrderNumber?.value;
    const packagetype = this.PackageType?.value;
    const isShowinlistFormat = this.IsShowinListFormat?.value;
    const isSectionalPlan = this.IsSectionalPlan?.value;
    const tagLabel = this.TagLabel?.value;
    const discountable = this.Discountable?.value;
    const durationplanlabel = this.DurationPlanLabel?.value;
    const planExtraInfo = this.PlanExtraInfo?.value;
    const isplanUrl = this.IsPlanURL?.value;
    const planInfoUrl = this.PlanInfoURL?.value;
    const isCuetraattempallow = this.IsCuetReAttempAllow?.value;
    const IsCuetdoubtDiscussionAllow = this.IsCuetdoubtDiscussionAllow?.value;
    const isCuetPlan = this.IsCuetPlan?.value;
    const isCuetbasePlan = this.IsCuetBasePlan?.value;
    const istopicPlan = this.IsTopicplan?.value;
    const isActiveplan = this.IsActivePlan?.value;
    const isActiveplanapp = this.IsActivePlanApp?.value;
    const isShowinAdmin = this.IsShowinAdmin?.value;
    const isApplycoupon = this.IsApplyCoupon?.value;
    const isPdfAvail = this.IsPDFAvailable?.value;
    const isofferApply = this.IsOfferApply?.value;
    const canAddextraPlan = this.CanAddExtraPlan?.value;
    const facultyheading = this.FacultyHeading?.value;
    const scheduleheading = this.ScheduleHeading?.value;
    const withplanId = this.WithplanId?.value;
    const istrending = this.IsTrending?.value;
    const isvalidityadded = this.IsValidityAdded?.value;
    const validityplantag = this.ValidityPlantag?.value;

    this.plansService
      .createPlans(
        name,
        plannameAdmin,
        addPlanname,
        plantype,
        planprice,
        noOftest,
        durationMonth,
        pricePermonth,
        tax,
        savePercent,
        examtypeId,
        examtypeIds,
        h_examtype,
        examCatId,
        iblnoOfTest,
        iblStrkprice,
        iblavailable,
        appOrderNo,
        planorderNo,
        packagetype,
        isShowinlistFormat,
        isSectionalPlan,
        tagLabel,
        discountable,
        durationplanlabel,
        planExtraInfo,
        isplanUrl,
        planInfoUrl,
        isCuetraattempallow,
        IsCuetdoubtDiscussionAllow,
        isCuetPlan,
        isCuetbasePlan,
        istopicPlan,
        isActiveplan,
        isActiveplanapp,
        isShowinAdmin,
        isApplycoupon,
        isPdfAvail,
        isofferApply,
        canAddextraPlan,
        facultyheading,
        scheduleheading,
        withplanId,
        istrending,
        isvalidityadded,
        validityplantag

      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Plans Created Successfully',
            'Created Plans'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  onSelectExamtype(){

  }  
  onSelectExamTypeIds() {
//  this.ExamCategoryListDropdown$ = this.examcategoryservice.getExamCategoryListIdwithname()
  }
  onSelecteExamCategory() {

  }
    
  

  updatePlans(UpdatePlansId: string) {
    const id = UpdatePlansId;
    const name = this.Name?.value;
    const plannameAdmin = this.PlanNameAdmin?.value;
    const addPlanname = this.AddPlanName?.value;
    const plantype = this.PlanType?.value;
    const planprice = this.PlanPrice?.value;
    const noOftest = this.NumberofTest?.value;
    const durationMonth = this.DurationMonth?.value;
    const pricePermonth = this.PricePerMonth?.value;
    const tax = this.Tax?.value;
    const savePercent = this.SavePercent?.value;
    const examtypeId = this.ExamtypeId?.value;
    const examtypeIds = this.ExamtypeIds?.value;
    const h_examtype = this.H_ExamType?.value;
    const examCatId = this.ExamCatid?.value;
    const iblnoOfTest = this.IblnumnberOfTest?.value;
    const iblStrkprice = this.IblstrkPrice?.value;
    const iblavailable = this.IblAvailable?.value;
    const appOrderNo = this.AppOrderNumber?.value;
    const planorderNo = this.PlanOrderNumber?.value;
    const packagetype = this.PackageType?.value;
    const isShowinlistFormat = this.IsShowinListFormat?.value;
    const isSectionalPlan = this.IsSectionalPlan?.value;
    const tagLabel = this.TagLabel?.value;
    const discountable = this.Discountable?.value;
    const durationplanlabel = this.DurationPlanLabel?.value;
    const planExtraInfo = this.PlanExtraInfo?.value;
    const isplanUrl = this.IsPlanURL?.value;
    const planInfoUrl = this.PlanInfoURL?.value;
    const isCuetraattempallow = this.IsCuetReAttempAllow?.value;
    const IsCuetdoubtDiscussionAllow = this.IsCuetdoubtDiscussionAllow?.value;
    const isCuetPlan = this.IsCuetPlan?.value;
    const isCuetbasePlan = this.IsCuetBasePlan?.value;
    const istopicPlan = this.IsTopicplan?.value;
    const isActiveplan = this.IsActivePlan?.value;
    const isActiveplanapp = this.IsActivePlanApp?.value;
    const isShowinAdmin = this.IsShowinAdmin?.value;
    const isApplycoupon = this.IsApplyCoupon?.value;
    const isPdfAvail = this.IsPDFAvailable?.value;
    const isofferApply = this.IsOfferApply?.value;
    const canAddextraPlan = this.CanAddExtraPlan?.value;
    const facultyheading = this.FacultyHeading?.value;
    const scheduleheading = this.ScheduleHeading?.value;
    const withplanId = this.WithplanId?.value;
    const istrending = this.IsTrending?.value;
    const isvalidityadded = this.IsValidityAdded?.value;
    const validityplantag = this.ValidityPlantag?.value;

    this.plansService
      .UpdatePlans(
        id,
        name,
        plannameAdmin,
        addPlanname,
        plantype,
        planprice,
        noOftest,
        durationMonth,
        pricePermonth,
        tax,
        savePercent,
        examtypeId,
        examtypeIds,
        h_examtype,
        examCatId,
        iblnoOfTest,
        iblStrkprice,
        iblavailable,
        appOrderNo,
        planorderNo,
        packagetype,
        isShowinlistFormat,
        isSectionalPlan,
        tagLabel,
        discountable,
        durationplanlabel,
        planExtraInfo,
        isplanUrl,
        planInfoUrl,
        isCuetraattempallow,
        IsCuetdoubtDiscussionAllow,
        isCuetPlan,
        isCuetbasePlan,
        istopicPlan,
        isActiveplan,
        isActiveplanapp,
        isShowinAdmin,
        isApplycoupon,
        isPdfAvail,
        isofferApply,
        canAddextraPlan,
        facultyheading,
        scheduleheading,
        withplanId,
        istrending,
        isvalidityadded,
        validityplantag
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Plans Update Successfully',
            'Plans Updated'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deletePlans(data: any) {
    const id = data.id;

    this.plansService.DeletePlans(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Plans Delete Successfully',
          'Plans Deleted'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  editPlans(data: any) {
    const id = data.id;

    this.plansService.GetPlans(id).subscribe({
      next: (response) => {
        this.editPlansId = id;
        this.isUpdateMode = true;

        this.PlansForm.patchValue({
          id: response.id,
          name: response.name,
          planNameAdmin: response.plan_Name_Admin,
          addPlanName: response.add_Plan_Name,
          planType: response.plan_Type,
          planPrice: response.plan_Price,
          noOfTest: response.no_of_Test,
          durationMonth: response.duration_Month,
          pricePerMonth: response.price_Per_Month,
          tax: response.tax,
          savePercent: response.savePercent,
          examTypeid: response.examType_ID,
          examTypeIds: response.examType_IDs,
          H_examType: response.h_Examtype,
          examCatid: response.examCatID,
          IblNoOfTest: response.lbl_nooftest,
          IblstrkPrice: response.lbl_strkprice,
          IblAvail: response.lbl_avail,
          AppOrderNo: response.apporder_no,
          porderNo: response.porder_no,
          packagetype: response.packageType,
          isShowinListFormat: response.isShowInListFormat ? 'Yes' : 'No',
          isSectionalPlan: response.isSectionalPlan ? 'Yes' : 'No',
          tagLabel: response.tagLabel,
          discountable: response.discountLabel,
          durationPlanLabel: response.durationPlanLabel,
          planExtraInfo: response.planExtraInfo,
          isPlanURL: response.isPlanURL ? 'Yes' : 'No',
          planInfoUrl: response.planInfoURL,
          isCuetReattempyAllow: response.isCUETReattemptAllow ? 'Yes' : 'No',
          isCuetDoubtsDiscussionAllow: response.isCUETDoubtsDiscussionAllow
            ? 'Yes'
            : 'No',
          isCuetPlan: response.isCUETPlan ? 'Yes' : 'No',
          isCuetBasePlan: response.isCUETBasePlan ? 'Yes' : 'No',
          isTopicPlan: response.isTopicPlan ? 'Yes' : 'No',
          isActivePlan: response.isActivePlan ? 'Yes' : 'No',
          isActivePlanApp: response.isActivePlanApp ? 'Yes' : 'No',
          isShowInAdmin: response.isShowInAdmin ? 'Yes' : 'No',
          isApplyCoupon: response.isApplyCoupon ? 'Yes' : 'No',
          ispdfAvail: response.isPDFAvailable ? 'Yes' : 'No',
          IsOfferApply: response.isOfferApply ? 'Yes' : 'No',
          CanAddExtraPlan: response.canAddExtraPlan ? 'Yes' : 'No',
          facultyHeading: response.facultyHeading,
          scheduleHeading: response.scheduleHeading,
          withPlanId: response.withPlanId,
          isTrending: response.isTrending ? 'Yes' : 'No',
          isValidityAdded: response.isValidityAdded ? 'Yes' : 'No',
          validityPlanTag: response.validityPlanTag,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  clearForm() {
    this.editPlansId = '';
    this.isUpdateMode = false;
    this.PlansForm.reset();
  }
}
