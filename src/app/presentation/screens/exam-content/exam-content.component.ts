import { Component, DestroyRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable, of, switchMap } from 'rxjs';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';
import { ExamContentService } from '../../../services/exam-Content.service';
import { ToastrService } from 'ngx-toastr';
import { ExamtypeService } from '../../../services/exam-type.service';
import { AsyncPipe } from '@angular/common';
import { examMasterService } from '../../../services/exam-master.service';
import { examCategoryService } from '../../../services/exam-category.service';
import { CkeditorComponent } from '../../components/ckeditor/ckeditor.component';
import { FormsUtilsService } from '../../../services/formsUtils.service';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { CommonListItemModel } from '../../../core/domain/common model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-exam-content',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DataTableComponent,
    AsyncPipe,
    CkeditorComponent,
  ],
  templateUrl: './exam-content.component.html',
  styleUrl: './exam-content.component.scss',
})
export class ExamContentComponent {
  isUpdateMode: boolean = false;
  ExamContentForm: FormGroup = new FormGroup({
    maincategory: new FormControl('', [Validators.required]),
    examCategory: new FormControl('', [Validators.required]),
    aboutExam: new FormControl('', [Validators.required]),
    examPattern: new FormControl('', [Validators.required]),
    bannerExaminfo: new FormControl('', [Validators.required]),
    totalTest: new FormControl(0, [Validators.required]),
    totalQues: new FormControl(0, [Validators.required]),
    totalHours: new FormControl('', [Validators.required]),
    quizUrl: new FormControl('', [Validators.required]),
    scheduleData: new FormControl('', [Validators.required]),
    hasSchedule: new FormControl('Yes', [Validators.required]),
  });

  dataObs: Observable<any> = of([]);
  tableCols: TableColType[] = [];
  editExamContentId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  @ViewChild('Scheduledata') Schedulecomp: CkeditorComponent | undefined;

  @ViewChild('AboutExam') aboutExcomp: CkeditorComponent | undefined;

  @ViewChild('ExamPattern') examPatterncomp: CkeditorComponent | undefined;

  @ViewChild('BannerExaminfo') bannerExamcomp: CkeditorComponent | undefined;

  MainCategoryListDropdown$: Observable<examMasterListIdnameModel[]> | undefined;

  ExamCategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  ExamTypeListDropdown$: Observable<IdExamTypeListModel[]> | undefined;

  get MainCategory() {
    return this.ExamContentForm.get('maincategory');
  }

  get ExamCategory() {
    return this.ExamContentForm.get('examCategory');
  }

  get ExamtypeId() {
    return this.ExamContentForm.get('id');
  }

  get Aboutexam() {
    return this.ExamContentForm.get('aboutExam');
  }

  get Exampattern() {
    return this.ExamContentForm.get('examPattern');
  }

  get BannerExamInfo() {
    return this.ExamContentForm.get('bannerExaminfo');
  }

  get Totaltest() {
    return this.ExamContentForm.get('totalTest');
  }

  get Totalquestion() {
    return this.ExamContentForm.get('totalQues');
  }

  get Totalhours() {
    return this.ExamContentForm.get('totalHours');
  }

  get Quizurl() {
    return this.ExamContentForm.get('quizUrl');
  }

  get Scheduledata() {
    return this.ExamContentForm.get('scheduleData');
  }

  get Hasschedule() {
    return this.ExamContentForm.get('hasSchedule');
  }

  constructor(
    private examContentService: ExamContentService,
    private toastrservice: ToastrService,
    private examMasterService: examMasterService,
    private examCategoryService: examCategoryService,
    private examtypeservice: ExamtypeService,
    private formsUtils: FormsUtilsService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.MainCategoryListDropdown$ = this.examMasterService.getexamMasterListIdwithName();
    this.dataObs = this.examContentService.GetExamContentList();

    this.tableCols = [
      { title: 'About Exam', data: 'aboutExam', type: 'text' },
      { title: 'Exam Pattern', data: 'examPattern', type: 'text' },
      { title: 'BannerTestInformation', data: 'bannerExamInfo', type: 'text' },
      { title: 'Total Test', data: 'totalTest', type: 'text' },
      { title: 'Total Question', data: 'totalQuestion', type: 'text' },
      { title: 'Total Hours', data: 'totalHrs', type: 'text' },
      { title: 'Quiz URL', data: 'quizURL', type: 'text' },
      { title: 'Schedule Data', data: 'scheduleData', type: 'text' },
    ];

    this.ExamCategoryListDropdown$ = this.MainCategory?.valueChanges.pipe(
      switchMap(() => {
        const maincategory = this.MainCategory?.value;
        if (maincategory) {
          return this.examCategoryService.getExamCategoryListIdwithname(maincategory);
        }

        return of([]);
      })
    );

    this.ExamTypeListDropdown$ = this.ExamCategory?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(() => {
        const examCategory = this.ExamCategory?.value;

        if (examCategory) {
          return this.examtypeservice.getExamTypeIdwithName(examCategory);
        }

        return of([]);
      })
    );
  }

  setDataFormFromCkeditor() {
    const ckinputs = [
      { comp: this.Schedulecomp, FormControlName: 'scheduleData' },
      { comp: this.aboutExcomp, FormControlName: 'aboutExam' },
      { comp: this.examPatterncomp, FormControlName: 'examPattern' },
      { comp: this.bannerExamcomp, FormControlName: 'bannerExaminfo' },
    ];

    this.formsUtils.setDataFormCkEditorToForm(ckinputs, this.ExamContentForm);
  }

  createExamContent() {
    this.setDataFormFromCkeditor();
    if (this.formsUtils.checkValidationErrors(this.ExamContentForm)) {
      return;
    }

    const examtypeid = this.ExamtypeId?.value;
    const aboutexam = this.Aboutexam?.value;
    const exampattern = this.Exampattern?.value;
    const bannerExaminfo = this.BannerExamInfo?.value;
    const totaltest = this.Totaltest?.value;
    const totalquestion = this.Totalquestion?.value;
    const totalhours = this.Totalhours?.value;
    const quizurl = this.Quizurl?.value;
    const scheduledata = this.Scheduledata?.value;
    const hasschedule = this.Hasschedule?.value;

    this.examContentService.CreateExamContent(
        examtypeid,
        aboutexam,
        exampattern,
        bannerExaminfo,
        totaltest,
        totalquestion,
        totalhours,
        quizurl,
        scheduledata,
        hasschedule
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrservice.success('Exam Content Created Successfully','Exam Content Create');
          this.clearForm();
        },
        error: (error) => {
          this.toastrservice.error(error.message);
        },
      });
  }

  updateExamContent(ExamContentUPdate: string) {
    this.setDataFormFromCkeditor();
    if (this.formsUtils.checkValidationErrors(this.ExamContentForm)) {
      return;
    }

    const id = ExamContentUPdate;
    const aboutexam = this.Aboutexam?.value;
    const exampattern = this.Exampattern?.value;
    const bannerExaminfo = this.BannerExamInfo?.value;
    const totaltest = this.Totaltest?.value;
    const totalquestion = this.Totalquestion?.value;
    const totalhours = this.Totalhours?.value;
    const quizurl = this.Quizurl?.value;
    const scheduledata = this.Scheduledata?.value;
    const haschedule = this.Hasschedule?.value;

    this.examContentService
      .UpdateExamContent(
        id,
        aboutexam,
        exampattern,
        bannerExaminfo,
        totaltest,
        totalquestion,
        totalhours,
        quizurl,
        scheduledata,
        haschedule
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrservice.success('Exam Content Updated Successfully','Update Exam Content');
          this.clearForm();
        },
        error: (error) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrservice.error(error.message);
        },
      });
  }

  deleteExamContent(data: any) {
    const id = data.id;

    this.examContentService.DeleteExamContent(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrservice.success(
          'Exam Content Deleted Successfully',
          'Exam Content Delete'
        );
      },
      error: (error) => {
        this.toastrservice.error(error.messaeg);
      },
    });
  }

  editExamContent(data: any) {
    const id = data.id;

    this.examContentService.GetExamContent(id).subscribe({
      next: (response) => {
        this.editExamContentId = id;
        this.isUpdateMode = true;

        this.ExamContentForm.patchValue({
          aboutExam: response.aboutExam,
          examPattern: response.examPattern,
          bannerExaminfo: response.bannerExamInfo,
          totalTest: response.totalTest,
          totalQues: response.totalQuestion,
          totalHours: response.totalHrs,
          quizUrl: response.quizURL,
          scheduleData: response.scheduleData,
          hasSchedule: response.hasSchedule ? 'Yes' : 'No',
        });
      },
      error: (error) => {
        this.toastrservice.error(error.message);
      },
    });
  }

  clearForm() {
    this.editExamContentId = '';
    this.isUpdateMode = false;
    this.ExamContentForm.patchValue({
      examPattern: '',
      bannerExaminfo: '',
      totalTest: '',
      totalQues: 0,
      totalHours: 0,
      quizUrl: '',
      scheduleData: '',
      hasSchedule: 'Yes',
    })
  }
}
