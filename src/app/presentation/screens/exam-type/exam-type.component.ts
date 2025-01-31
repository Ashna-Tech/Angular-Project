import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable, of, switchMap } from 'rxjs';
import { ExamtypeService } from '../../../services/exam-type.service';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe } from '@angular/common';
import { examCategoryService } from '../../../services/exam-category.service';
import { CommonListItemModel } from '../../../core/domain/common model';
import { examMasterService } from '../../../services/exam-master.service';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { MockType } from '../../../core/enums/Mock-type.enum';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ExamgroupsService } from '../../../services/examgroups.service';
import { ExamgroupsListIdwithnameModel } from '../../../core/domain/Examgroups/examgroups-list-idwithname.model';
import { ExamTypeModel } from '../../../core/domain/Exam type/Exam-type.model';
import { ExamGroup } from '../../../core/enums/ExamGroups.enum';
import { FormsUtilsService } from '../../../services/formsUtils.service';


@Component({
  selector: 'app-exam-type',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DataTableComponent,
    AsyncPipe,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './exam-type.component.html',
  styleUrl: './exam-type.component.scss',
})

export class ExamTypeComponent implements OnInit {
  isUpdateMode: Boolean = false;
  
  examTypeForm: FormGroup = new FormGroup({
    mainCatId: new FormControl('', [Validators.required]),
    examCatId: new FormControl('', [Validators.required]),
    examOrder: new FormControl('0', [Validators.required]),
    mockType: new FormControl('', [Validators.required]),
    examType: new FormControl('', [Validators.required]),
    displayName: new FormControl('', [Validators.required]),
    examGroup : new FormControl([],[]),
    examplans : new FormControl([],[]),
    isShow: new FormControl('Yes', [Validators.required]),
    isShowInApp: new FormControl('Yes', [Validators.required]),
    isShowNewPattern: new FormControl('Yes', [Validators.required]),
    includeInDurationBasedPlan: new FormControl('Yes', [Validators.required]),
    isHighlighted: new FormControl('Yes', [Validators.required]),
    isDiagnosticTest: new FormControl('Yes', [Validators.required]),
    hasOptionalCategory: new FormControl('Yes', [Validators.required]),
    examPreferenceLabelText: new FormControl('', [Validators.required]),
    isTrendingExam: new FormControl('Yes', [Validators.required]),
    hasConnectedSection: new FormControl('Yes', [Validators.required]),
    isDescriptiveExam: new FormControl('Yes', [Validators.required]),
    isGenerateAutoRank: new FormControl('Yes', [Validators.required]),
    isIndex: new FormControl('Yes', [Validators.required]),
    isEnableScroll: new FormControl('Yes', [Validators.required]),
    isSubSectionExam: new FormControl('Yes', Validators.required),
    isShowYearWiseMock: new FormControl('Yes', [Validators.required]),
    shopTopicTest: new FormControl('Yes', [Validators.required]),
    hasSmartRead: new FormControl('Yes', [Validators.required]),
    isChallengeModeExam: new FormControl('Yes', [Validators.required]),
  });

  dataObs: Observable<any> = of([]);
  tableCols: TableColType[] = [];
  editExamTypeId: string = '';

  previewExamIcon: string = ''; 
  MockType = MockType;
  ExamGroup = ExamGroup;

  MainCategoryListDropdown$ : Observable<examMasterListIdnameModel[]> | undefined;
    
  examCategoryDropdown$: Observable<CommonListItemModel[]> | undefined;
  
  examGroupList$:Observable<ExamgroupsListIdwithnameModel[]> = of([]);
  @ViewChild('dttable') dttable: DataTableComponent | undefined;
    
  constructor(
    private examtypeService: ExamtypeService,
    private examCategoryservice: examCategoryService,
    private examMasterservice: examMasterService,
    private toastrService: ToastrService,
    private examGroupService:ExamgroupsService,
    private formUtils:FormsUtilsService
  ) {}

  ngOnInit(): void {
    this.MainCategoryListDropdown$ = this.examMasterservice.getexamMasterListIdwithName();
    this.examGroupList$ = this.examGroupService.getExamgroupsListIdwithname();
  
    this.tableCols = [
      { title: 'Exam Name', data: 'name', type: 'text' },
      { title: 'Order', data: 'order', type: 'text' },
      { title: 'Type', data: 'type', type: 'text' },
      { title:'Exam Group', data:'examGroup', type:'array'}
    ];

    const examMainCategory = this.examTypeForm.get('mainCatId');
    this.dataObs = this.examtypeService.getExamTypeList('');
    setTimeout(() => {
      this.dttable?.reloadTable();
    });

    if(examMainCategory){
      this.examCategoryDropdown$ = examMainCategory.valueChanges.pipe(
        switchMap(() => {
          const MainCatId = this.examTypeForm.get('mainCatId')?.value;
          if(MainCatId) return this.examCategoryservice.getExamCategoryListIdwithname(MainCatId);
    
          return of([]);
        })
      );
    }
  }

  onCategorySelect(){
    const examCatId = this.examTypeForm.get('examCatId')?.value;
    this.dataObs = this.examtypeService.getExamTypeList(examCatId);
  
    setTimeout(() => {
      this.dttable?.reloadTable();
    });
  }

  get ExamType() {
    return this.examTypeForm.get('examType');
  }

  get displayName() {
    return this.examTypeForm.get('displayName');
  }

  get Examgroup(){
    return this.examTypeForm.get('examGroup')
  }

  get Examplan(){
    return this.examTypeForm.get('examplans')
  }

  get examOrder() {
    return this.examTypeForm.get('examOrder');
  }

  get mockType() {
    return this.examTypeForm.get('mockType');
  }

  get examCatId() {
    return this.examTypeForm.get('examCatId');
  }
  get mainCategoryid() {
    return this.examTypeForm.get('mainCatId');
  }
  get isShow() {
    return this.examTypeForm.get('isShow');
  }
  get isShowInApp() {
    return this.examTypeForm.get('isShowInApp');
  }
  get showNewPattern() {
    return this.examTypeForm.get('isShowNewPattern');
  }
  get includeDurationBasedPlan() {
    return this.examTypeForm.get('includeInDurationBasedPlan');
  }
  get highLighted() {
    return this.examTypeForm.get('isHighlighted');
  }
  get isDiagnosticTest() {
    return this.examTypeForm.get('isDiagnosticTest');
  }
  get hasOptionalCategory() {
    return this.examTypeForm.get('hasOptionalCategory');
  }
  get examPreferenceLabelText() {
    return this.examTypeForm.get('examPreferenceLabelText');
  }
  get isTrendingExam() {
    return this.examTypeForm.get('isTrendingExam');
  }
  get examIcon() {
    return this.examTypeForm.get('examIcon');
  }
  get examIconImgSource() {
    return this.examTypeForm.get('examIconImgSource');
  }
  get hasConnectedSection() {
    return this.examTypeForm.get('hasConnectedSection');
  }
  get isDescriptiveExam() {
    return this.examTypeForm.get('isDescriptiveExam');
  }
  get isGenerateAutoRank() {
    return this.examTypeForm.get('isGenerateAutoRank');
  }
  get isIndex() {
    return this.examTypeForm.get('isIndex');
  }
  get enableScroll() {
    return this.examTypeForm.get('isEnableScroll');
  }
  get isSubSectionExam() {
    return this.examTypeForm.get('isSubSectionExam');
  }
  get isShowYearWiseMock() {
    return this.examTypeForm.get('isShowYearWiseMock');
  }
  get shopTopicTest() {
    return this.examTypeForm.get('shopTopicTest');
  }
  get hasSmartRead() {
    return this.examTypeForm.get('hasSmartRead');
  }

  get isChallengeModeExam() {
    return this.examTypeForm.get('isChallengeModeExam');
  }

  isFormValid(){
    if(this.formUtils.checkValidationErrors(this.examTypeForm, {
      examType:'Exam Name',
      displayName: 'Exam Display Name',
      examGroup: 'Exam Group',
      examplans: 'Exam Plans',
      examOrder: 'Exam Order',
      mockType: 'Mock Type',
      mainCatId: 'Main Category',
      examCatId: 'Exam Category',
      examPreferenceLabelText: 'Exam Preference Label Text'
    })){
      return false;
    }

    return true;
  }

  createExamType() {
    if(this.isFormValid()){
      return;
    }

    const ExamType = this.ExamType?.value;
    const DisplayName = this.displayName?.value;
    const ExamOrder = this.examOrder?.value;
    const MockType = this.mockType?.value;
    const ExamCategoryId = this.examCatId?.value;
    const IsShow = this.isShow?.value;
    const isShowInApp = this.isShowInApp?.value;
    const ShowNewpattern = this.showNewPattern?.value;
    const IncludeDurationbasedPlan = this.includeDurationBasedPlan?.value;
    const Highlighted = this.highLighted?.value;
    const isDiagnosticTest = this.isDiagnosticTest?.value;
    const HasOptionalCategory = this.hasOptionalCategory?.value;
    const ExamPreferenceLabel = this.examPreferenceLabelText?.value;
    const IsTrendingExam = this.isTrendingExam?.value;
    const hasConnectedSection = this.hasConnectedSection?.value;
    const IsDescriptiveExam = this.isDescriptiveExam?.value;
    const isGenerateAutoRank = this.isGenerateAutoRank?.value;
    const IsIndex = this.isIndex?.value;
    const EnableScroll = this.enableScroll?.value;
    const isSubSectionExam = this.isSubSectionExam?.value;
    const isShowYearWiseMock = this.isShowYearWiseMock?.value;
    const ShopTopicTest = this.shopTopicTest?.value;
    const HasSmartRead = this.hasSmartRead?.value;
    const isChallengeModeExam = this.isChallengeModeExam?.value;
    const ExamGroup = this.Examgroup?.value;
    const examplans = this.Examplan?.value;
    const mainCategoryId = this.mainCategoryid?.value;

    const examTypeModel:ExamTypeModel = {
      "mainCatId": mainCategoryId,
      "name": ExamType,
      "displayName": DisplayName,
      "order": ExamOrder,
      "type": MockType,
      "examCatId": ExamCategoryId,
      "planIds": examplans,
      "groupIds": ExamGroup,
      "isShow": IsShow === "Yes",
      "isShowInApp": isShowInApp === "Yes",
      "isShowNewPattern": ShowNewpattern === "Yes",
      "includeInDurationBasedPlan": IncludeDurationbasedPlan === "Yes",
      "isHighlighted": Highlighted === "Yes",
      "isDiagnosticTest": isDiagnosticTest === "Yes",
      "hasOptionalCategory": HasOptionalCategory === "Yes",
      "examPreferenceLabelText": ExamPreferenceLabel,
      "isTrendingExam": IsTrendingExam === "Yes",
      "hasConnectedSection": hasConnectedSection === "Yes",
      "isDescriptiveExam": IsDescriptiveExam === "Yes",
      "isGenerateAutoRank": isGenerateAutoRank === "Yes",
      "isIndex": IsIndex === "Yes",
      "isEnableScroll": EnableScroll === "Yes",
      "isSubSectionExam": isSubSectionExam === "Yes",
      "isShowYearWiseMock": isShowYearWiseMock === "Yes",
      "showTopicTest": ShopTopicTest === "Yes",
      "hasSmartRead": HasSmartRead === "Yes",
      "isChallengeModeExam": isChallengeModeExam === "Yes",
    }

    this.examtypeService.createExamType(examTypeModel).subscribe(
      {
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Created Successfully ExamType !!',
            'Created Exam Type'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  onExamIcon(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.examTypeForm.patchValue({
        examIconImgSource: file,
      });
      const reader = new FileReader();
      reader.onload = (e) => (this.previewExamIcon = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  updateExamType(UpdateExamTypeId: string) {
    if(this.isFormValid()){
      return;
    }

    const ExamType = this.ExamType?.value;
    const DisplayName = this.displayName?.value;
    const ExamOrder = this.examOrder?.value;
    const MockType = this.mockType?.value;
    const ExamCategoryId = this.examCatId?.value;
    const IsShow = this.isShow?.value;
    const isShowInApp = this.isShowInApp?.value;
    const ShowNewpattern = this.showNewPattern?.value;
    const IncludeDurationbasedPlan = this.includeDurationBasedPlan?.value;
    const Highlighted = this.highLighted?.value;
    const isDiagnosticTest = this.isDiagnosticTest?.value;
    const HasOptionalCategory = this.hasOptionalCategory?.value;
    const ExamPreferenceLabel = this.examPreferenceLabelText?.value;
    const IsTrendingExam = this.isTrendingExam?.value;
    const hasConnectedSection = this.hasConnectedSection?.value;
    const IsDescriptiveExam = this.isDescriptiveExam?.value;
    const isGenerateAutoRank = this.isGenerateAutoRank?.value;
    const IsIndex = this.isIndex?.value;
    const EnableScroll = this.enableScroll?.value;
    const isSubSectionExam = this.isSubSectionExam?.value;
    const isShowYearWiseMock = this.isShowYearWiseMock?.value;
    const ShopTopicTest = this.shopTopicTest?.value;
    const HasSmartRead = this.hasSmartRead?.value;
    const isChallengeModeExam = this.isChallengeModeExam?.value;
    const ExamGroup = this.Examgroup?.value;
    const examplans = this.Examplan?.value;
    const mainCategoryId = this.mainCategoryid?.value;

    const examTypeModel:ExamTypeModel = {
      "id":UpdateExamTypeId,
      "mainCatId":mainCategoryId,
      "name": ExamType,
      "displayName": DisplayName,
      "order": ExamOrder,
      "type": MockType,
      "examCatId": ExamCategoryId,
      "planIds": examplans,
      "groupIds": ExamGroup,
      "isShow": IsShow === "Yes",
      "isShowInApp": isShowInApp === "Yes",
      "isShowNewPattern": ShowNewpattern === "Yes",
      "includeInDurationBasedPlan": IncludeDurationbasedPlan === "Yes",
      "isHighlighted": Highlighted === "Yes",
      "isDiagnosticTest": isDiagnosticTest === "Yes",
      "hasOptionalCategory": HasOptionalCategory === "Yes",
      "examPreferenceLabelText": ExamPreferenceLabel,
      "isTrendingExam": IsTrendingExam === "Yes",
      "hasConnectedSection": hasConnectedSection === "Yes",
      "isDescriptiveExam": IsDescriptiveExam === "Yes",
      "isGenerateAutoRank": isGenerateAutoRank === "Yes",
      "isIndex": IsIndex === "Yes",
      "isEnableScroll": EnableScroll === "Yes",
      "isSubSectionExam": isSubSectionExam === "Yes",
      "isShowYearWiseMock": isShowYearWiseMock === "Yes",
      "showTopicTest": ShopTopicTest === "Yes",
      "hasSmartRead": HasSmartRead === "Yes",
      "isChallengeModeExam": isChallengeModeExam === "Yes",
    }

    this.examtypeService
      .updateExamType(examTypeModel)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Updated Successsfully Exam Type !!',
            'Update Exam Type'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
          console.log('UpdateExamTypeId');
        },
      });
  }

  deleteExamType(data: any) {
    const id = data.id;

    this.examtypeService.deleteExamType(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success('Deleted Successfully Exam Type');
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editExamType(data: any) {
    const id = data.id;

    this.examtypeService.getExamType(id).subscribe({
      next: (response) => {
        this.isUpdateMode = true;
        this.editExamTypeId = id;

        this.examTypeForm.patchValue({
          mainCatId:response.mainCatId,
          examType:response.name,
          displayName:response.displayName,
          examGroup:response.groupIds,
          examplans:response.planIds,
          examOrder:response.order,
          examCatId:response.examCatId,
          mockType:response.type,
          isShow:response.isShow ? "Yes" : "No",
          isShowInApp:response.isShowInApp ? "Yes" : "No",
          isShowNewPattern:response.isShowNewPattern ? "Yes" : "No",
          includeInDurationBasedPlan:response.includeInDurationBasedPlan ? "Yes" : "No",
          isHighlighted:response.isHighlighted ? "Yes" : "No",
          isDiagnosticTest:response.isDiagnosticTest ? "Yes" : "No",
          hasOptionalCategory:response.hasOptionalCategory ? "Yes" : "No",
          examPreferenceLabelText:response.examPreferenceLabelText,
          isTrendingExam:response.isTrendingExam ? "Yes" : "No",
          hasConnectedSection:response.hasConnectedSection ? "Yes" : "No",
          isDescriptiveExam:response.isDescriptiveExam ? "Yes" : "No",
          isGenerateAutoRank:response.isGenerateAutoRank ? "Yes" : "No",
          isIndex:response.isIndex ? "Yes" : "No",
          isEnableScroll:response.isEnableScroll ? "Yes" : "No",
          isSubSectionExam:response.isSubSectionExam ? "Yes" : "No",
          isShowYearWiseMock:response.isShowYearWiseMock ? "Yes" : "No",
          shopTopicTest:response.showTopicTest ? "Yes" : "No",
          hasSmartRead:response.hasSmartRead ? "Yes" : "No",
          isChallengeModeExam:response.isChallengeModeExam ? "Yes" : "No"
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  clearForm() {
    this.isUpdateMode = false;
    this.editExamTypeId = '';
    this.examTypeForm.patchValue({
      examType: '',
      displayName: '',
      examGroup : [],
      examplans : [],
      examOrder: 0,
      mockType: '',
      examCatId: '',
      mainCatId: '',
      isShow: 'Yes',
      isShowInApp: 'Yes',
      isShowNewPattern: 'Yes',
      includeInDurationBasedPlan: 'Yes',
      isHighlighted: 'Yes',
      isDiagnosticTest: 'Yes',
      hasOptionalCategory: 'Yes',
      examPreferenceLabelText: 'Yes',
      isTrendingExam: 'Yes',
      hasConnectedSection: 'Yes',
      isDescriptiveExam: 'Yes',
      isGenerateAutoRank: 'Yes',
      isIndex: 'Yes',
      isEnableScroll: 'Yes',
      isSubSectionExam: 'Yes',
      isShowYearWiseMock: 'Yes',
      shopTopicTest: 'Yes',
      hasSmartRead: 'Yes',
      isChallengeModeExam: 'Yes',
    })
  }
}
