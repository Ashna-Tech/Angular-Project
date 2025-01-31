import { Component, DestroyRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {FormArray,FormControl,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { BehaviorSubject, catchError, combineLatest, Observable, of, shareReplay, Subject, switchMap} from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { CommonListItemModel } from '../../../core/domain/common model';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category.service';
import { examCategoryService } from '../../../services/exam-category.service';
import { examMasterService } from '../../../services/exam-master.service';
import { ExamTestCategoryService } from '../../../services/exam-test-category.service';
import { ExamtypeService } from '../../../services/exam-type.service';
import { AsyncPipe, DatePipe, NgClass, NgFor } from '@angular/common';
import { TestMasterService } from '../../../services/testmaster.service';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';
import { ExamTestcatGetTestCategoryModel } from '../../../core/domain/Exam-Test-Category/Exam-test-cat-Get-test-categoryListmodel';
import { TestListItemModel } from '../../../core/domain/Test-Master/test-list-item.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestStatus } from '../../../core/enums/test-status.enum';
import { RouterLink } from '@angular/router';
import { TestTitle } from '../../../core/enums/test-title.enum';
import { QMarkType } from '../../../core/enums/q-mark-type.enum';
import { TestLevel } from '../../../core/enums/TestLevel.enum';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgFor, DatePipe, RouterLink],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent implements OnInit, OnDestroy {
  isUpdateMode: boolean = false;

  testForm: FormGroup = new FormGroup({
    mainCategory: new FormControl('', [Validators.required]),
    examCategory: new FormControl('', [Validators.required]),
    examid: new FormControl('', [Validators.required]),
    testType: new FormControl('single', [Validators.required]),
    allowNav: new FormControl('', [Validators.required]),
    isComingSoon: new FormControl('Yes', [Validators.required]),
    isLiveTest: new FormControl('No', [Validators.required]),
    highlighted: new FormControl('No', [Validators.required]),
    isSplittedSection: new FormControl('No', [Validators.required]),
    assumestDate: new FormControl('', [Validators.required]),
    expireDate: new FormControl('', [Validators.required]),
    testTitle: new FormControl('', [Validators.required]),
    questionMarkType: new FormControl('', [Validators.required]),
    testLevel: new FormControl('', [Validators.required]),
    testpatternType: new FormControl('', [Validators.required]),
    NoOfTest: new FormControl('0', [Validators.required]),
    totalMaxAttempt: new FormControl('0', [Validators.required]),
    maxMarks: new FormControl('0', [Validators.required]),
    isFree: new FormControl('Yes', [Validators.required]),
    negativeMarks: new FormControl('0', [Validators.required]),
    totalCutoff: new FormControl('0', [Validators.required]),
    englishPdfUrl: new FormControl('', [Validators.required]),
    HindiPdfUrl: new FormControl('', [Validators.required]),
    englishPDF: new FormControl('', [Validators.required]),
    hindiPDF: new FormControl('', [Validators.required]),
    noOfSections: new FormControl('', [Validators.required]),
    sections: new FormArray([]), // FormArray
  });

  dataObs: Observable<any> = of([]);
  tableCols: TableColType[] = [];
  editTestId: string = '';

  PreviewEnglishPdfFile: string = ''; //  Preview English pdf File

  PreviewHindiPdfFile: string = ''; // Preview Hindi Pdf File

  @ViewChild('dttable') dttable : DataTableComponent | undefined ;

  MainSectionListDropdown$ : Observable <ExamTestcatGetTestCategoryModel[]> | undefined;
  MainCatListDropdown$: Observable<examMasterListIdnameModel[]> | undefined;
  ExamCatListDropdown$: Observable<CommonListItemModel[]> | undefined;
  ChooseExamListDropdown$: Observable<IdExamTypeListModel[]> | undefined;
  CategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  testList$: Observable<TestListItemModel[]> | undefined; 
  reloadTestList$ = new BehaviorSubject<string> ('');

  TestTitleEnum = TestTitle;
  qMartTypeEnum = QMarkType;
  TestLevelEnum = TestLevel;

  constructor(
    private examtestcategoryservice: ExamTestCategoryService,
    private toastrservice: ToastrService,
    private examMasterservice: examMasterService,
    private examCategoryservice: examCategoryService,
    private examtypeservice: ExamtypeService,
    private categoryService: CategoryService,
    private testMasterService: TestMasterService,
    private destroyRef:DestroyRef
  ) {}

  ngOnInit(): void {
    this.dataObs = of([])
    this.tableCols = [];
    this.MainCatListDropdown$ = this.examMasterservice.getexamMasterListIdwithName();
    this.CategoryListDropdown$ = this.categoryService.getCategoryListIDwithName();
    

    if(this.ExamID){
      this.testList$ = combineLatest([this.ExamID?.valueChanges, this.reloadTestList$.asObservable()]).pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => {
          const examId = this.ExamID?.value;
          if(examId){
            return this.testMasterService.getUnlaunchedTestList({ExamId:examId, Year:0});
          }
          
          return of([])
        }),
        catchError(() => [])
      )
    }
  }

  get MainCategoryID() {
    return this.testForm.get('mainCategory');
  }

  get ExamCategoryID() {
    return this.testForm.get('examCategory');
  }

  get ExamID() {
    return this.testForm.get('examid');
  }

  get TestType() {
    return this.testForm.get('testType');
  }

  get AllowNav() {
    return this.testForm.get('allowNav');
  }

  get IsComingSoon() {
    return this.testForm.get('isComingSoon');
  }

  get IsLiveTest() {
    return this.testForm.get('isLiveTest');
  }

  get IsHighLighted() {
    return this.testForm.get('highlighted');
  }

  get IsSplittedSection() {
    return this.testForm.get('isSplittedSection');
  }

  get AssumestDate() {
    return this.testForm.get('assumestDate');
  }

  get ExpireDate() {
    return this.testForm.get('expireDate');
  }

  get TestTitle() {
    return this.testForm.get('testTitle');
  }

  get QuestionMarkType() {
    return this.testForm.get('questionMarkType');
  }

  get TestLevel() {
    return this.testForm.get('testLevel');
  }

  get TestPatternType() {
    return this.testForm.get('testpatternType');
  }

  get NumberofTest() {
    return this.testForm.get('NoOfTest');
  }

  get TotalMaxAttempt() {
    return this.testForm.get('totalMaxAttempt');
  }

  get MaxMarks() {
    return this.testForm.get('maxMarks');
  }

  get IsFree() {
    return this.testForm.get('isFree');
  }

  get NegativeMarks() {
    return this.testForm.get('negativeMarks');
  }

  get TotalCutOff() {
    return this.testForm.get('totalCutoff');
  }

  get EnglishPDFUrl() {
    return this.testForm.get('englishPdfUrl');
  }

  get HindiPDFUrl() {
    return this.testForm.get('HindiPdfUrl');
  }

  get EnglishPDF() {
    return this.testForm.get('englishPDF');
  }

  get HindiPDF() {
    return this.testForm.get('hindiPDF');
  }

  // Sections formArray
  get SectionsArray(): FormArray {
    return this.testForm.get('sections') as FormArray;
  }

  onEnglishPdfFileUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event?.target.files[0];      //==== Method for English PDF File Upload
      this.testForm.patchValue({
        englishPDF: file,
      });

      const reader = new FileReader();
      reader.onload = (e) =>
        (this.PreviewEnglishPdfFile = reader.result as string);

      reader.readAsDataURL(file);
    }
  }

  onHindiPdfFileUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event?.target.files[0]; //  //==== Method for Hindi PDF File Upload
      this.testForm.patchValue({
        hindiPDF: file,
      });

      const reader = new FileReader();
      reader.onload = (e) => this.PreviewHindiPdfFile;
    }
  }


  UpdateNumberOfSections() {
    this.onSelectMainSection();
    const numberOfsections = Number(this.testForm.get('noOfSections')?.value);
    // this.SectionsArray.clear();
    const n = this.SectionsArray.length;
    const diff = Math.abs(numberOfsections - n);

    if(numberOfsections > n){  
      for (let i = 0; i < diff; i++) {
        this.SectionsArray.push(new FormGroup({
          "categoryId": new FormControl(''),
          "connectedCatId": new FormControl(null),
          "timeLimit": new FormControl(0),
          "totalSectionMarks": new FormControl(0),
          "noofQuestions": new FormControl(0),
          "cutOff": new FormControl(0),
          "maxAttempt": new FormControl(0),
          "categoryOrderNo": new FormControl(0),
        }));
      }
    }else{
      for (let i = 0; i < diff; i++) {
        const lastIndex = this.SectionsArray.length - 1;
        this.SectionsArray.removeAt(lastIndex);
      }
    }
  }

  
  getSections() {
    const sections: {
      "CategoryId": string,
      "ConnectedCatId": string,
      "TimeLimit": number,
      "TotalSectionMarks": number,
      "NoofQuestions": number,
      "CutOff": number,
      "MaxAttempt": number,
      "CategoryOrderNo": number
    }[] = [];

    this.SectionsArray.controls.forEach((control) => {
      const value: any = control.value;
      
      sections.push({
        "CategoryId": value.categoryId,
        "ConnectedCatId": value.connectedCatId,
        "TimeLimit": value.timeLimit,
        "TotalSectionMarks": value.totalSectionMarks,
        "NoofQuestions": value.noofQuestions,
        "CutOff": value.cutOff,
        "MaxAttempt": value.maxAttempt,
        "CategoryOrderNo": value.categoryOrderNo
      });
    });

    return sections;
  }

  ngOnDestroy(): void {}

  onSelectMainCategory() {
    const MainCatId = this.testForm.get('mainCategory')?.value;
    this.ExamCatListDropdown$ =
      this.examCategoryservice.getExamCategoryListIdwithname(MainCatId);
  }

  onSelectExamCategory() {
    const ExamCatId = this.testForm.get('examCategory')?.value;
    this.ChooseExamListDropdown$ = 
      this.examtypeservice.getExamTypeIdwithName(ExamCatId);
  }

  onSelectMainSection() : void {
    const id = this.ExamID?.value;
    this.MainSectionListDropdown$ = this.examtestcategoryservice.ExamTestCategoryGetTestCategory(id).pipe(shareReplay(1));
  }

  removeSection(index:number){
    this.SectionsArray.removeAt(index);
    const n = this.SectionsArray.length;
    
    this.testForm.patchValue({
      noOfSections:n
    });
  }

  createTest() {
    // const mainCategory = this.MainCategoryID?.value;
    // const examCategory = this.ExamCategoryID?.value;
    const examId = this.ExamID?.value;
    const testType = this.TestType?.value;
    const allownav = this.AllowNav?.value;
    const isComingSoon = this.IsComingSoon?.value;
    const liveTest = this.IsLiveTest?.value;
    const hightlighted = this.IsHighLighted?.value;
    const SplittedSection = this.IsSplittedSection?.value;
    const assumestDate = this.AssumestDate?.value;
    const expireDate = this.ExpireDate?.value;
    const testTitle = this.TestTitle?.value;
    const questionMarkType = this.QuestionMarkType?.value;
    const testLevel = this.TestLevel?.value;
    const testPatternType = this.TestPatternType?.value;
    const noOfTest = this.NumberofTest?.value;
    const totalMaxAttempt = this.TotalMaxAttempt?.value;
    const maxMarks = this.MaxMarks?.value;
    const isFree = this.IsFree?.value;
    const negativeMarks = this.NegativeMarks?.value;
    const totalCutoff = this.TotalCutOff?.value;
    const englishPdfUrl = this.EnglishPDFUrl?.value;
    const hindiPdfUrl = this.HindiPDFUrl?.value;
    const englishPdf = this.EnglishPDF?.value;
    const hindiPdf = this.HindiPDF?.value;
    const sections = this.getSections();

    const formdata = new FormData();

    const iscomingSoon = (isComingSoon === "Yes").toString();
    const isliveTest = (liveTest === "Yes").toString();  
    const ishighlighted = (hightlighted ==="Yes").toString();
    const splittedSection = (SplittedSection ==="Yes").toString();                 
    const isfree = (isFree === "Yes").toString();

    formdata.append('ExamId', examId),
    formdata.append('TestType', testType),
    formdata.append('AllowNav', allownav),
    formdata.append('IsComingSoon', iscomingSoon),
    formdata.append('IsLiveTest', isliveTest),
    formdata.append('IsHighlighted', ishighlighted),
    formdata.append('IsSplittedSection', splittedSection),
    formdata.append('AssumestDate', assumestDate),
    formdata.append('ExpireDate', expireDate),
    formdata.append('TestTitle', testTitle),
    formdata.append('QMarkType', questionMarkType),
    formdata.append('TestLevel', testLevel),
    formdata.append('TestPatternType', testPatternType),
    formdata.append('NoOfTest', noOfTest.toString());
    formdata.append('TotalMaxAttempt', totalMaxAttempt.toString());
    formdata.append('maxMarks', maxMarks.toString());
    formdata.append('IsFree', isfree);
    formdata.append('NegativeMarks', negativeMarks.toString());
    formdata.append('TotalCutOff', totalCutoff.toString());
    formdata.append('PdfUrl', englishPdfUrl),
    formdata.append('PdfUrlH', hindiPdfUrl),
    formdata.append('EnglishPdf', englishPdf),
    formdata.append('HindiPdf', hindiPdf),
    formdata.append(`Sections`, JSON.stringify(sections));
  
  this.testMasterService.CreateTestMaster(formdata).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable();
        }
        this. toastrservice.success('Test Master Created Successfully', 'Test Master Created');
      }),
      error : ((error) => 
      this.toastrservice.error(error.message)
    )
    });
  }
 
  updateTest(TestMasterUpdateID : string) {
    const id = TestMasterUpdateID;
    const examId = this.ExamID?.value;
    const testType = this.TestType?.value;
    const allownav = this.AllowNav?.value;
    const isComingSoon = this.IsComingSoon?.value;
    const liveTest = this.IsLiveTest?.value;
    const hightlighted = this.IsHighLighted?.value;
    const SplittedSection = this.IsSplittedSection?.value;
    const assumestDate = this.AssumestDate?.value;
    const expireDate = this.ExpireDate?.value;
    const testTitle = this.TestTitle?.value;
    const questionMarkType = this.QuestionMarkType?.value;
    const testLevel = this.TestLevel?.value;
    const testPatternType = this.TestPatternType?.value;
    const noOfTest = this.NumberofTest?.value;
    const totalMaxAttempt = this.TotalMaxAttempt?.value;
    const maxMarks = this.MaxMarks?.value;
    const isFree = this.IsFree?.value;
    const negativeMarks = this.NegativeMarks?.value;
    const totalCutoff = this.TotalCutOff?.value;
    const englishPdfUrl = this.EnglishPDFUrl?.value;
    const hindiPdfUrl = this.HindiPDFUrl?.value;
    const englishPdf = this.EnglishPDF?.value;
    const hindiPdf = this.HindiPDF?.value;
    const sections = this.getSections();

    const formdata = new FormData();

    const iscomingSoon = (isComingSoon === "Yes").toString();
    const isliveTest = (liveTest === "Yes").toString();  
    const ishighlighted = (hightlighted ==="Yes").toString();
    const splittedSection = (SplittedSection ==="Yes").toString();                 
    const isfree = (isFree === "Yes").toString();

    formdata.append('Id', id),
    formdata.append('ExamId', examId),
    formdata.append('TestType', testType),
    formdata.append('AllowNav', allownav),
    formdata.append('IsComingSoon', iscomingSoon),
    formdata.append('IsLiveTest', isliveTest),
    formdata.append('IsHighlighted', ishighlighted),
    formdata.append('IsSplittedSection', splittedSection),
    formdata.append('AssumestDate', assumestDate),
    formdata.append('ExpireDate', expireDate),
    formdata.append('TestTitle', testTitle),
    formdata.append('QMarkType', questionMarkType),
    formdata.append('TestLevel', testLevel),
    formdata.append('TestPatternType', testPatternType),
    formdata.append('NoOfTest', noOfTest.toString());
    formdata.append('TotalMaxAttempt', totalMaxAttempt.toString());
    formdata.append('maxMarks', maxMarks.toString());
    formdata.append('IsFree', isfree);
    formdata.append('NegativeMarks', negativeMarks.toString());
    formdata.append('TotalCutOff', totalCutoff.toString());
    formdata.append('PdfUrl', englishPdfUrl),
    formdata.append('PdfUrlH', hindiPdfUrl),
    formdata.append('EnglishPdf', englishPdf),
    formdata.append('HindiPdf', hindiPdf),
    formdata.append(`Sections`, JSON.stringify(sections));
  
    this.testMasterService.UpdateTestMaster(formdata).subscribe({
        next : (response =>{
          if(this.dttable){
            this.dttable.reloadTable();
          }
          this.toastrservice.success('Test Master Update Successfully', 'Test Master Updated');
        }),
        error : ((error) =>{
          this.toastrservice.error(error.message);
        })
      })

  }


  deleteTestCategory(data : any) {
   const id = data.id;

    this.testMasterService.DeleteTestMaster(id).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable();
        }
        this.toastrservice.success('Test Master Delete Successfully', 'Test Master Delete');
      }),
      error : ((error) =>{
        this.toastrservice.error(error.message);
      })
    })
  }

  getTestType(type:string){

  }

  addToList(id:string){
    this.testMasterService.changeStatus({id, status:TestStatus.Launched}).subscribe({
      next:(response => {
        this.toastrservice.success('Test added Successfully', 'Add Test');
        this.reloadTestList$.next('');
      }),
      error:(error => {
        this.toastrservice.error(error.message);
      })
    })
  }

  deleteTest(testId:string){
    this.testMasterService.activateAndDeleteTest(testId, false, true).subscribe({
      next:(response => {
        this.toastrservice.success('Test deleted Successfully', 'Delete Test');
        this.reloadTestList$.next('');
      }),
      error:(error => {
        this.toastrservice.error(error.message);
      })
    })
  }

  toggleActive(testId:string, isActive:boolean){
    this.testMasterService.activateAndDeleteTest(testId, !isActive, false).subscribe({
      next:(response => {
        this.toastrservice.success('Test status updated Successfully', 'Activate Test');
        this.reloadTestList$.next('');
      }), 
      error:(error => {
        this.toastrservice.error(error.message);
      })
    })
  }

  onEditTest(TestId:string){
    this.testMasterService.getTestById(TestId).subscribe({
      next:(testResponse => {
        console.log({testResponse});
        this.editTestId = TestId;
        this.isUpdateMode = true;

        const launchedDate = testResponse.launchedDate.substring(0, 10);
        const expireDate = testResponse.expireDate.substring(0, 10);

        console.log({launchedDate, expireDate});

        this.testForm.patchValue({
          examid: testResponse.examId,
          testType: testResponse.testType,
          allowNav: testResponse.allowNav,
          isComingSoon: testResponse.isComingSoon ? 'Yes' : 'No',
          isLiveTest: testResponse.isLiveTest ? 'Yes' : 'No',
          highlighted: testResponse.isHighlighted ? 'Yes' : 'No',
          isSplittedSection: testResponse.isSplittedSection ? 'Yes' : 'No',
          assumestDate: launchedDate,
          expireDate: expireDate,
          testTitle: testResponse.testTitle,
          questionMarkType: testResponse.qMarkType,
          testLevel: testResponse.testLevel,
          testpatternType: testResponse.testPatternType,
          NoOfTest: 0,
          totalMaxAttempt: testResponse.totalMaxAttempt,
          maxMarks: testResponse.maxMarks,
          isFree: testResponse.isFree ? 'Yes' : 'No',
          negativeMarks: testResponse.negativeMarks,
          totalCutoff: testResponse.totalCutOff,
          englishPdfUrl: testResponse.pdfUrl,
          HindiPdfUrl: testResponse.pdfUrlH,
          englishPDF: '',
          hindiPDF: '',
          noOfSections: testResponse.noofSections,
          sections: [],
        });

        this.onSelectMainSection();
        this.SectionsArray.clear();
        testResponse.testSection.forEach(section => {
          this.SectionsArray.push(new FormGroup({
            "categoryId": new FormControl(section.categoryId),
            "connectedCatId": new FormControl(section.connectedCatId),
            "timeLimit": new FormControl(section.timeLimit),
            "totalSectionMarks": new FormControl(section.totalSectionMarks),
            "noofQuestions": new FormControl(section.noofQuestions),
            "cutOff": new FormControl(section.cutOff),
            "maxAttempt": new FormControl(section.maxAttempt),
            "categoryOrderNo": new FormControl(section.categoryOrderNo),
          }));
        })
      }),
      error:(error => {
        this.toastrservice.error(error.message);
      })
    })
  }

  clearForm() {
    this.editTestId = "";
    this.isUpdateMode = false ;
    this.testForm.reset();
    this.SectionsArray.clear();
  }

  editTestCategory($event: any) {}

}
