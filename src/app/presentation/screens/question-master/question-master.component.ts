import { Component, DestroyRef, effect, input, OnInit, signal, untracked, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, Observable, of, shareReplay, switchMap, withLatestFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe } from '@angular/common';
import { MatListModule} from '@angular/material/list';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { QuestionMasterService } from '../../../services/question-master.service';
import { DetailsComponent } from '../details/details.component';
import { CategoryService } from '../../../services/category.service';
import { subCategoryService } from '../../../services/subCategory.service';
import { chapterService } from '../../../services/chapter.service';
import { CommonListItemModel } from '../../../core/domain/common model';
import { CkeditorComponent } from '../../components/ckeditor/ckeditor.component';
import { FormsUtilsService } from '../../../services/formsUtils.service';
import { QuestionTypeEnum } from '../../../core/enums/question-type.enum';
import { QuestionLevel } from '../../../core/enums/question-level.enum';
import { KeywordService } from '../../../services/keyword.service';
import { KeywordListModel } from '../../../core/domain/Keyword/keyword-list-item-model';
import { examMasterService } from '../../../services/exam-master.service';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { examCategoryService } from '../../../services/exam-category.service';
import { ExamtypeService } from '../../../services/exam-type.service';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';
import { QuestionMastermodel } from '../../../core/domain/Question-Master/Qmaster.model';
import { Detailszservice } from '../../../services/Details.service';
import { detailsModel } from '../../../core/domain/details/details.model';
import { DirectQuestionModel } from '../../../core/domain/details/direct-question.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddQuestionService } from '../../../services/add-question.service';
import { UpdateQuestionMasterDTO } from '../../../core/domain/Question-Master/update-question-master.model';

@Component({
  selector: 'app-question-master',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    DetailsComponent,
    CkeditorComponent,
    MatListModule,
  ],
  templateUrl: './question-master.component.html',
  styleUrl: './question-master.component.scss',
})
export class QuestionMasterComponent implements OnInit {
  isUpdateMode: boolean = false;

  QuestionMasterForm: FormGroup = new FormGroup({
    catId: new FormControl('',[Validators.required]),
    sCatId: new FormControl('', [Validators.required]),
    chapId: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    keywords: new FormControl([], [Validators.required]),
    level: new FormControl('', [Validators.required]),
    MasterCategory: new FormControl('',[Validators.required]),
    ExamCategory: new FormControl('',[Validators.required]),
    exams: new FormControl([], [Validators.required]),
    direction: new FormControl('', []),
    directionHin: new FormControl('', []),
    summary: new FormControl('', [Validators.required]),
    summaryHin: new FormControl('', []),
    explanation: new FormControl('', [Validators.required]),
  });

  

  editQuestionMasterId: string = '';
  dataObs: Observable<any> | undefined = of([]);
  tableCols: TableColType[] = [];

  QuestionTypeEum = QuestionTypeEnum;

  QuestionLevel = QuestionLevel;

  summaryId = signal<string> ('');

  QuestionId = input<number> (0);
  Action = input<string> ('');

  selectedExams = signal<({id:string; name:string} | undefined)[]> ([]);


  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  @ViewChild('direction') directioncomp: CkeditorComponent | undefined;

  @ViewChild('directionHin') directionHincomp: CkeditorComponent | undefined;

  @ViewChild('explanation') explanationcomp: CkeditorComponent | undefined;

  @ViewChild('summary') summarycomp: CkeditorComponent | undefined;

  @ViewChild('summaryHin') summaryHincomp: CkeditorComponent | undefined;

  @ViewChild('detailsCom', { static:true}) detailsCom:DetailsComponent | undefined;

  categoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  subaCategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  chapterListDropdown$: Observable<CommonListItemModel[]> | undefined;
  keywordListDropdown$: Observable<KeywordListModel[]> | undefined;
  masterCategoryDropdown$: Observable<examMasterListIdnameModel[]> | undefined;
  examCategoryDropdown$: Observable<CommonListItemModel[]> | undefined;
  examDropdownList$:Observable<IdExamTypeListModel[]> | undefined;

  constructor(
    private QuestionMasterService: QuestionMasterService,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private SubCatService: subCategoryService,
    private chapterService: chapterService,
    private formsUtils: FormsUtilsService,
    private keywordService:KeywordService,
    private masterCategoryService:examMasterService,
    private examCategoryService:examCategoryService,
    private examTypeService:ExamtypeService,
    private questionDetailsService:Detailszservice,
    private addQuestionService:AddQuestionService,
    private destroyRef:DestroyRef
  ) {
    effect(() => {
      const questionId = this.QuestionId();

      untracked(() => {
        if(questionId){
          this.addQuestionService.selectQuestion('', questionId).subscribe({
            next:(question => {
              // console.log({question});
              this.isUpdateMode = true;
              this.editQuestionMasterId = question.quesMasterId;
              
              
              this.QuestionMasterForm.patchValue({
                catId: question.catId,
                sCatId: question.sCatId,
                chapId: question.chapId,
                type: question.type,
                keywords: question.keywords,
                level: question.qmLevel,
                MasterCategory: '',
                ExamCategory: '',
                exams: question.exams.map(exam => exam.id),
                direction: question.direction,
                directionHin: question.directionHin,
                summary: question.summary,
                summaryHin: question.summaryHin,
                explanation: question.commonExplanation,
              });

              this.selectedExams.set(question.exams);

              const data:detailsModel = {
                quesMasterId: question.quesMasterId,
                ques: question.ques,
                quesHin: question.quesHin,
                level: QuestionLevel.Easy,
                optRight: question.optRight,
                explanation: question.explanation,
                optAEng: question.optAEng,
                optAHin: question.optAHin,
                optBEng: question.optBEng,
                optBHin: question.optBHin,
                optCEng: question.optCEng,
                optCHin: question.optCHin,
                optDEng: question.optDEng,
                optDHin: question.optDHin,
                optEEng: question.optEEng,
                optEHin: question.optEHin
              }
              

              this.detailsCom?.setFormData(data, question.quesId);
            }),
            error:(error => {
              console.log(error);
            })
          })
        }
      });
    })
  }

  ngOnInit(): void {
    this.tableCols = [];

    // console.log({"QuestionId": this.QuestionId(), "Action":this.Action()});


    this.categoryListDropdown$ = this.categoryService.getCategoryListIDwithName().pipe(catchError(() => of([])));

    this.masterCategoryDropdown$ = this.masterCategoryService.getexamMasterListIdwithName().pipe(catchError(() => of([])));

    this.type?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((selectedType) => {
      const summaryControl = this.summary;
      const explanation = this.explanation;

      if (selectedType === QuestionTypeEnum.Multiple) {
        // Add Required Validator to 'summary'
        summaryControl?.addValidators(Validators.required);
        explanation?.addValidators(Validators.required);
      } else {
        // Remove Required Validator from 'summary'
        summaryControl?.clearValidators();
        explanation?.clearValidators();
      }

      // Update validation status
      summaryControl?.updateValueAndValidity();
    });


    // oncategory changes
    this.subaCategoryListDropdown$ = this.catId?.valueChanges
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(() => {
        const categoryId = this.catId?.value;
        if(categoryId){
          return this.SubCatService.getSubcategoryIdWithName(categoryId).pipe(catchError(() => []));
        }

        return of([])
      })
    );

    // onsubcategory change
    this.chapterListDropdown$ = this.sCatId?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(() => {
        const SCatId = this.sCatId?.value;
        if(SCatId){
          return this.chapterService.getChapterIdwithname(SCatId).pipe(catchError(() => []));
        }

        return of([]);
      })
    );

    // onChapter change
    this.keywordListDropdown$ = this.chapId?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(() => {
        const chapterid = this.chapId?.value;
        if(chapterid){
          return this.keywordService.getKeywordList(chapterid).pipe(catchError(() => []));
        }

        return of([]);
      })
    );

    // on master category
    this.examCategoryDropdown$ = this.MasterCategory?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(() => {
        const masterCategory = this.MasterCategory?.value;

        if(masterCategory){
          return this.examCategoryService.getExamCategoryListIdwithname(masterCategory).pipe(catchError(() => []));
        }

        return of([]);
      })
    );

    
    // on exam category
    this.examDropdownList$ = this.ExamCategory?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(() => {
        const category = this.ExamCategory?.value;

        if(category){
          return this.examTypeService.getExamTypeIdwithName(category).pipe(catchError(() => []));
        }

        return of([]);
      }),
      shareReplay(1)
    )

    // on exams change
    if(this.examDropdownList$){
      this.exams?.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
        withLatestFrom(this.examDropdownList$)
      ).subscribe(([_, examList]) => {
        const exams:string[] = this.exams?.value;
        const newlySelectedExamList = exams.map(examId => examList.find((exam) => exam.id === examId))
        const combineSelectedExams = [...newlySelectedExamList, ...this.selectedExams()];
        const ids = new Set([...combineSelectedExams.map(exam => exam ? exam.id : '').filter(exam => !!exam)]);
        const combineListUndefined = [...ids].map((examId) => combineSelectedExams.find((exam => (exam && exam.id === examId))))
        this.selectedExams.set([...combineListUndefined]);
      }) 
    }
  }

  get catId() {
    return this.QuestionMasterForm.get('catId');
  }

  get sCatId() {
    return this.QuestionMasterForm.get('sCatId');
  }

  get chapId() {
    return this.QuestionMasterForm.get('chapId');
  }

  get type() {
    return this.QuestionMasterForm.get('type');
  }

  get direction() {
    return this.QuestionMasterForm.get('direction');
  }

  get explanation() {
    return this.QuestionMasterForm.get('explanation');
  }

  get summary() {
    return this.QuestionMasterForm.get('summary');
  }
  get summaryHin() {
    return this.QuestionMasterForm.get('summaryHin');
  }

  get keywords() {
    return this.QuestionMasterForm.get('keywords');
  }

  get level() {
    return this.QuestionMasterForm.get('level');
  }

  get directionHin() {
    return this.QuestionMasterForm.get('directionHin');
  }

  get exams(){
    return this.QuestionMasterForm.get('exams');
  }

  get MasterCategory(){
    return this.QuestionMasterForm.get('MasterCategory');
  } 

  get ExamCategory(){
    return this.QuestionMasterForm.get('ExamCategory');
  }

  setDataFormFromCkeditor() {
    const ckInputs = [
      { comp: this.directioncomp, FormControlName: 'direction' },
      { comp: this.directionHincomp, FormControlName: 'directionHin' },
      { comp: this.explanationcomp, FormControlName: 'explanation' },
      { comp: this.summarycomp, FormControlName: 'summary' },
      { comp: this.summaryHincomp, FormControlName: 'summaryHin' },
    ];
    this.formsUtils.setDataFormCkEditorToForm(
      ckInputs,
      this.QuestionMasterForm
    );
  }

  removeSelectedExam(examId:string){
    this.selectedExams.update((exams) => exams.filter((exam) => (exam && exam.id !== examId)));
    const examsList:string[] = this.exams?.value;
    const newExamList = examsList.filter(examId => examId !== examId);
    this.exams?.patchValue(newExamList);
  }

  createQuestionExam() {
    this.setDataFormFromCkeditor();
    
    if (this.formsUtils.checkValidationErrors(this.QuestionMasterForm, {
      MasterCategory: 'Exam Master Category',
      ExamCategory: 'Exam Category',
      catId: 'Category',
      sCatId: 'Sub Category',
      chapId: 'Chapter',
      exams: 'Exams',
      type: 'Question Type',
      direction: 'Direction',
      explanation: 'Explanation',
      summary: 'Question Summary English',
      summaryHin: 'Question Summary Hindi',
      keywords: 'Keywords',
      level: 'Level',
      directionHin: 'Direction Hindi',
    })) {
      return;
    }

    const catId = this.catId?.value;
    const sCatId = this.sCatId?.value;
    const chapId = this.chapId?.value;
    const type = this.type?.value;
    const direction = this.direction?.value;
    const explanation = this.explanation?.value;
    const summary = this.summary?.value;
    const summaryHindi = this.summaryHin?.value;
    const keywords = this.keywords?.value;
    const level = this.level?.value;
    const directionHin = this.directionHin?.value;
    const exams:string[] = this.selectedExams().filter(exam => !!exam).map((exam:any) => exam.id);

    const model:QuestionMastermodel = {
      catId: catId,
      sCatId: sCatId,
      chapId: chapId,
      type: type,
      direction: direction,
      directionHin: directionHin,
      explanation: explanation,
      summary: summary,
      summaryHin: summaryHindi,
      level: level,
      keywords: keywords,
      exams: exams
    }

    this.QuestionMasterService.createQuestionMaster(model).subscribe({
      next: (response) => {
        this.summaryId.set(response);
        
        if (this.dttable) {
          this.dttable.reloadTable();
        }

        this.toastrService.success(
          'Question Master Created Successfully !!',
          ' Create Question Master'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }


  createDirectionQuestion(data:detailsModel){

    if (this.formsUtils.checkValidationErrors(this.QuestionMasterForm, {
      MasterCategory: 'Exam Master Category',
      ExamCategory: 'Exam Category',
      catId: 'Category',
      sCatId: 'Sub Category',
      chapId: 'Chapter',
      exams: 'Exams',
      type: 'Question Type',
      direction: 'Direction',
      explanation: 'Explanation',
      summary: 'Question Summary English',
      summaryHin: 'Question Summary Hindi',
      keywords: 'Keywords',
      level: 'Level',
      directionHin: 'Direction Hindi',
    })) {
      return;
    }


    const catId = this.catId?.value;
    const sCatId = this.sCatId?.value;
    const chapId = this.chapId?.value;
    const type = this.type?.value;
    const keywords = this.keywords?.value;
    const level = this.level?.value;
    const exams:string[] = this.selectedExams().filter(exam => !!exam).map((exam:any) => exam.id);

    const directQuestionModel:DirectQuestionModel = {
      catId,
      sCatId,
      chapId,
      type,
      keywords,
      exams,
      ...data,
      level,
    };

    // console.log({directQuestionModel});
    this.questionDetailsService.createDirectQuestion(directQuestionModel).subscribe({
      next: (response) => {
        this.toastrService.success(
          'Question Created Successfully !!',
          ' Create Question'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  updateQuestionExam(UpdateQMasterId: string) {
    this.setDataFormFromCkeditor();
    if (this.formsUtils.checkValidationErrors(this.QuestionMasterForm)) {
      return;
    }

    const direction = this.direction?.value;
    const explanation = this.explanation?.value;
    const summary = this.summary?.value;
    const summaryHindi = this.summaryHin?.value;
    const keywords = this.keywords?.value;
    const level = this.level?.value;
    const directionHin = this.directionHin?.value;
    const exams:string[] = this.selectedExams().filter(exam => !!exam).map((exam:any) => exam.id);
  
    const model:UpdateQuestionMasterDTO = {
      "id": UpdateQMasterId,
      "direction": direction,
      "directionHin": directionHin,
      "explanation": explanation,
      "summary": summary,
      "summaryHin": summaryHindi,
      "level": level,
      "keywords": keywords,
      "exams": exams
    }
    
    this.QuestionMasterService.upadateQuestionMaster(model).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }

        this.toastrService.success(
          'Question Master Upadted Successsfully !!',
          'Question Master Update'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  // deleteQuestionExam(data: any) {
  //   const id = data.id;

  //   this.QuestionMasterService.removeQuestionMaster(id).subscribe({
  //     next: (response) => {
  //       if (this.dttable) {
  //         this.dttable.reloadTable();
  //       }
  //       this.toastrService.success(
  //         'Question Master Deleted Successfully !!',
  //         'Question Master Deleted'
  //       );
  //     },
  //     error: (error) => {
  //       this.toastrService.error(error.message);
  //     },
  //   });
  // }
  
  // editQuestionExam(data: any) {
  //   const id = data.id;

  //   this.QuestionMasterService.getQuestionMaster(id).subscribe({
  //     next: (response) => {
  //       this.editQuestionMasterId = id;
  //       this.isUpdateMode = true;

  //       this.QuestionMasterForm.patchValue({
  //         catId: response.catId,
  //         sCatId: response.sCatId,
  //         chapId: response.chapId,
  //         exams: response.exams,
  //         type: response.type,
  //         direction: response.direction,
  //         explanation: response.explanation,
  //         summary: response.summary,
  //         summaryHin: response.summaryHin,
  //         keywords: response.keywords,
  //         level: response.level,
  //         directionHin: response.directionHin,
  //       });
  //     },
  //     error: (error) => {
  //       this.toastrService.error(error.message);
  //     },
  //   });
  // }
  clearForm() {
    this.editQuestionMasterId = '';
    this.isUpdateMode = false;
    this.QuestionMasterForm.reset();
    this.summaryId.set('');
  }
}
