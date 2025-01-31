import { Component,OnInit} from '@angular/core';
import { FormArray,FormBuilder,FormControl,FormGroup,ReactiveFormsModule, Validators} from '@angular/forms';
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable, of, switchMap} from 'rxjs';
import { ExamTestCategoryService } from '../../../services/exam-test-category.service';
import { ToastrService } from 'ngx-toastr';
import { examMasterService } from '../../../services/exam-master.service';
import { examCategoryService } from '../../../services/exam-category.service';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { CommonListItemModel } from '../../../core/domain/common model';
import { ExamtypeService } from '../../../services/exam-type.service';
import { CreateExamTestCategoryParams } from '../../../core/domain/Exam-Test-Category/Exam-test-cat-Post-Models';
import { CategoryService } from '../../../services/category.service';
import { UpdateExamTestCategoryPayload } from '../../../core/domain/Exam-Test-Category/Exam-test-category.put.model';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';
import { FormsUtilsService } from '../../../services/formsUtils.service';

@Component({
  selector: 'app-exam-test-category',
  standalone: true,
  imports: [ReactiveFormsModule,AsyncPipe,NgFor],
  templateUrl: './exam-test-category.component.html',
  styleUrl: './exam-test-category.component.scss',
})
export class ExamTestCategoryComponent implements OnInit {
  isUpdateMode: boolean = false;

  ExamTestCategoryForm: FormGroup = this.fb.group({
    mainCat: ['', [Validators.required]],
    examCategory: ['', [Validators.required]],
    examid: ['', [Validators.required]],
    numberOfSection: [0],
    examTestCategories: this.fb.array([]), // FormArray to hold the select boxes
  });

  MainCatListDropdown$: Observable<examMasterListIdnameModel[]> | undefined;

  ExamCatListDropdown$: Observable<CommonListItemModel[]> | undefined;

  ChooseExamListDropdown$: Observable<IdExamTypeListModel[]> | undefined;

  CategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  constructor(
    private examtestcategoryservice : ExamTestCategoryService,
    private toastrservice: ToastrService,
    private examMasterservice: examMasterService,
    private examCategoryservice: examCategoryService,
    private examtypeservice: ExamtypeService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private formsUtilsService:FormsUtilsService
  ) {}

  get MainCategory() {
    return this.ExamTestCategoryForm.get('mainCat');
  }
  
  get ExamCategory() {
    return this.ExamTestCategoryForm.get('examCategory');
  }

  get ExamId() {
    return this.ExamTestCategoryForm.get('examid');
  }

  get CategoryId() {
    return this.ExamTestCategoryForm.get('categoryid');
  }

  get Name() {
    return this.ExamTestCategoryForm.get('name');
  }

  get IsoptionalCategory() {
    return this.ExamTestCategoryForm.get('isOptionalCategory');
  }

  get ExamPreference() {
    return this.ExamTestCategoryForm.get('examPreference');
  }

  get IsIgnoreMarks() {
    return this.ExamTestCategoryForm.get('isIgnoreMarks');
  }

  get NegativeMarks() {
    return this.ExamTestCategoryForm.get('negativeMarks');
  }

  get IsSplittedSection() {
    return this.ExamTestCategoryForm.get('isSplittedSection');
  }

  // Getter For FormArray =>
  get ExamTestCategory(): FormArray {
    return this.ExamTestCategoryForm.get('examTestCategories') as FormArray;
  }

  ngOnInit(): void {
    this.MainCatListDropdown$ = this.examMasterservice.getexamMasterListIdwithName();
    this.CategoryListDropdown$ = this.categoryService.getCategoryListIDwithName();

    this.ExamCatListDropdown$ = this.MainCategory?.valueChanges.pipe(switchMap(() => {
      const mainCat = this.MainCategory?.value;
      if(mainCat){
        return  this.examCategoryservice.getExamCategoryListIdwithname(mainCat);
      }

      return of([]);
    }));

    this.ChooseExamListDropdown$ = this.ExamCategory?.valueChanges.pipe(switchMap(() => {
      const examCategory = this.ExamCategory?.value;
      if(examCategory){
        return this.examtypeservice.getExamTypeIdwithName(examCategory);
      }

      return of([]);
    }));


    this.ExamId?.valueChanges.pipe(switchMap(() => {
      const examId = this.ExamTestCategoryForm.get('examid')?.value;
      if(examId){
        return this.examtestcategoryservice.getExamTestCategoryExamId(examId);
      } 
      
      return of([]);
    })).subscribe({
      next: (list) => {
        if(list.length > 0){
          this.isUpdateMode = true;
          this.fillExamCategory(list);
        }else{
          this.fillExamCategory([]);
          this.isUpdateMode = false;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
    
  }

  addFeild() {
    return new FormGroup({
      catId: new FormControl(''),
      name: new FormControl(''),
      optionalCategory: new FormControl(false),
      examPreference: new FormControl(''),
      ignoreMarks: new FormControl(false, []),
      negMarks: new FormControl(0),
      isSplittedSection: new FormControl(false),
    });
  }

  // update number Section
  updateNumberSections() {
    const noOfSections = Number(
      this.ExamTestCategoryForm.get('numberOfSection')?.value
    );
    
    this.ExamTestCategory.clear();

    for (let i = 0; i < noOfSections; i++) {
      this.ExamTestCategory.push(this.addFeild());
    }
  }

  getExamCategory() {
    const examTestCategories: {
      catId: string;
      name: string;
      isOptionalCategory: boolean;
      examPreference: string;
      isIgnoreMarks: boolean;
      negMarks: number;
      isSplittedSection: boolean;
    }[] = [];

    this.ExamTestCategory.controls.forEach((control) => {
      const value: any = control.value;
    
      examTestCategories.push({
        catId: value.catId,
        name: value.name,
        isOptionalCategory: value.optionalCategory,
        examPreference: value.examPreference,
        isIgnoreMarks: value.ignoreMarks,
        negMarks: value.negMarks,
        isSplittedSection: value.isSplittedSection,
      });
    });

    return examTestCategories;
  }

  fillExamCategory(
    examTestCategories: {
      catId: string;
      name: string;
      isOptionalCategory: boolean;
      examPreference: string;
      isIgnoreMarks: boolean;
      negMarks: number;
      isSplittedSection: boolean;
    }[]
  ) {
    this.ExamTestCategory.clear();
    examTestCategories.forEach((category) => {
      this.ExamTestCategory.push(
        new FormGroup({
          catId: new FormControl(category.catId),
          name: new FormControl(category.name),
          optionalCategory: new FormControl(category.isOptionalCategory),
          examPreference: new FormControl(category.examPreference),
          ignoreMarks: new FormControl(category.isIgnoreMarks),
          negMarks: new FormControl(category.negMarks),
          isSplittedSection: new FormControl(category.isSplittedSection),
        })
      );
    });
  }

  createExamTestCategory(): void {
    if(this.formsUtilsService.checkValidationErrors(this.ExamTestCategoryForm)) return;

    const params: CreateExamTestCategoryParams = {
      examId: this.ExamTestCategoryForm.get('examid')?.value,
      examTestCategories: this.getExamCategory(),
    };

    this.examtestcategoryservice.createExamTestCategory(params).subscribe({
      next: (response) => {
        this.toastrservice.success('Exam Test Category Created Successfully','Exam Test Category Created');
        this.clearForm();
      },
      error: (error) => {
        this.toastrservice.error(error.message);
      },
    });
  }

  updateExamTestCategory(): void {
    if(this.formsUtilsService.checkValidationErrors(this.ExamTestCategoryForm)) return;

    const payload: UpdateExamTestCategoryPayload = {
      examId: this.ExamTestCategoryForm.get('examid')?.value,
      examTestCategories: this.getExamCategory(),
    };

    this.examtestcategoryservice.updateExamTestCategory(payload).subscribe({
      next: (response) => {
        this.toastrservice.success('Exam Test Category Update Successfully', 'Exam Test Category Updated');
        this.clearForm();
      },
      error: (error) => {
        this.toastrservice.error(error.message);
      },
    });
  }

  editExamTestCategory(data: any) {
    const id = data.id;

    this.examtestcategoryservice.getExamTestCategoryExamId(id).subscribe({
      next: (response) => {
        this.isUpdateMode = true;
        this.ExamTestCategoryForm.patchValue({
          numberOfSection:0
        });
        this.fillExamCategory(response);
      },
      error: (error) => {
        this.toastrservice.error(error.message);
      },
    });
  }

  clearForm() {
    this.isUpdateMode = false;
    this.ExamTestCategory.clear();
    this.ExamTestCategoryForm.patchValue({
      numberOfSection:0,
      examTestCategories:[]
    });
  }
}
