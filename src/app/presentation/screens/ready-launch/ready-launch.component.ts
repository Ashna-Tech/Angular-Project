import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TestMasterService } from '../../../services/testmaster.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, catchError, combineLatest, finalize, map, Observable, of, Subject, switchMap } from 'rxjs';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { CommonListItemModel } from '../../../core/domain/common model';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';
import { examMasterService } from '../../../services/exam-master.service';
import { examCategoryService } from '../../../services/exam-category.service';
import { ExamtypeService } from '../../../services/exam-type.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestListItemModel } from '../../../core/domain/Test-Master/test-list-item.model';
import { ToastrService } from 'ngx-toastr';
import { TestStatus } from '../../../core/enums/test-status.enum';

@Component({
  selector: 'app-ready-launch',
  standalone: true,
  imports: [AsyncPipe, MatListModule, ReactiveFormsModule, DatePipe],
  templateUrl: './ready-launch.component.html',
  styleUrl: './ready-launch.component.scss'
})
export class ReadyLaunchComponent implements OnInit {

  form:FormGroup = new FormGroup({
    mainCategory: new FormControl('', []),
    examCategory: new FormControl('', []),
    examType: new FormControl([]),
    year: new FormControl(0)
  });

  readonly testMasterService = inject(TestMasterService);
  readonly examMasterService = inject(examMasterService);
  readonly examCategoryService = inject(examCategoryService);
  readonly examTypeService = inject(ExamtypeService);
  readonly destoryRef = inject(DestroyRef);
  readonly toastrservice = inject(ToastrService);

  reloadTestList$ = new BehaviorSubject<string> ('');

  MainCategoryListDropdown$: Observable<examMasterListIdnameModel[]> | undefined;
  
  ExamCategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  ExamTypeListDropdown$: Observable<IdExamTypeListModel[]> | undefined;

  testList$:  Observable<TestListItemModel[]> | undefined;

  yearDropDown$: Observable<number[]> | undefined;

  isLoading$ = new Subject<boolean> ();

  get MainCategory() {
    return this.form.get('mainCategory');
  }

  get ExamCatgory() {
    return this.form.get('examCategory')
  }

  get ExamType() {
    return this.form.get('examType')
  }

  get Year(){
    return this.form.get("year");
  }

  ngOnInit(): void {
    this.MainCategoryListDropdown$ = this.examMasterService.getexamMasterListIdwithName();
    this.yearDropDown$ = this.testMasterService.getTestYears().pipe(map(yearList => yearList.map(year => year.name)));

    if(this.ExamType && this.Year){
      this.testList$ = combineLatest([this.ExamType.valueChanges, this.Year.valueChanges, this.reloadTestList$.asObservable()]).pipe(
        takeUntilDestroyed(this.destoryRef),
        switchMap(() => {
          const examId =  this.ExamType?.value;
          const year = this.Year?.value;

          if(examId && year){
            this.isLoading$.next(true);
            return this.testMasterService.getlaunchedTestList({ExamId:examId, Year: year}).pipe(finalize(() => { this.isLoading$.next(false); }));
          }
  
          return of([]);
        }),
        catchError(() => of([]))
      );
    }
  }

  onSelectMainCategory() {
    const MainCatId = this.form.get('mainCategory')?.value;
    this.ExamCategoryListDropdown$ = this.examCategoryService.getExamCategoryListIdwithname(MainCatId)
  }

  onExamCategorySelect() {
    const ExamCatId = this.form.get('examCategory')?.value;
    this.ExamTypeListDropdown$ = this.examTypeService.getExamTypeIdwithName(ExamCatId);
  }

  
    BackToList(id:string){
      // console.log({id, status:TestStatus.UnLaunched});
      this.testMasterService.changeStatus({id, status:TestStatus.UnLaunched}).subscribe({
        next:(response => {
          this.toastrservice.success('Test removed Successfully', 'Remove Test');
          this.reloadTestList$.next('');
        }),
        error:(error => {
          this.toastrservice.error(error.message);
        })
      })
    }

}
