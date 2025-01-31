import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable, of } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { QuestionLevel } from '../../../core/enums/question-level.enum';
import { CategoryService } from '../../../services/category.service';
import { subCategoryService } from '../../../services/subCategory.service';
import { chapterService } from '../../../services/chapter.service';
import { CommonListItemModel } from '../../../core/domain/common model';
import { TopperTimeExamLevelService } from '../../../services/topper-time-exam-level-service';


@Component({
  selector: 'app-topper-time-master',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent, AsyncPipe, CommonModule, FormsModule],
  templateUrl: './topper-time-master.component.html',
  styleUrl: './topper-time-master.component.scss'
})

export class TopperTimeMasterComponent implements OnInit {

  isUpdateMode: boolean = false;
   TopperTimeMasterForm: FormGroup

  dataObs: Observable<any> | undefined;
   tableCols: TableColType[] = [];
   editTopperTimeMasterId: string = ""; // Update id

   questionLevel = QuestionLevel;  // Enum Question Level

    numberOfQuest: any[] = [];  /// Array to store table row data 
 
  constructor(private categoryService: CategoryService,
    private subCategoryService: subCategoryService,
     private chapterService: chapterService,
      private topperTimeExamLevelService: TopperTimeExamLevelService,
      private fb: FormBuilder
  ) {

    this.TopperTimeMasterForm = this.fb.group({
      level: [],
       category: [],
        subCategory: [],
         chapter: [],
          questionType: ['direct'],
           questionLevel: [],
           orderNumber: [],
            numberofQuestion: [0, [Validators.required, Validators.min(1)]],
             questions: this.fb.array([]), // This will hold dianamically created rows in table  
     
    });

  }

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  ExamLevelListDropdown$: Observable<any[]> | undefined;
   CategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;
    SubCategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;
     ChapterListDropdown$: Observable<CommonListItemModel[]> | undefined;


  ngOnInit(): void {
    this.ExamLevelListDropdown$ = this.topperTimeExamLevelService.GetTopperTimeExamLevelList();
     this.dataObs = of([]);
      this.tableCols = [
      { title: 'ExamLevel', data: 'examLevel', type: 'text' },
       { title: 'Category', data: 'category', type: 'text' },
        { title: 'SubCategory', data: 'subcategory', type: 'text' },
        { title: 'Chapter', data: 'chapter', type: 'text' },
         { title: 'Question Type', data: 'questionType', type: 'text' },
          { title: 'Question Level', data: 'questionLevel', type: 'text' },
           { title: 'Order No.', data: 'orderNo', type: 'text' },
            { title: 'Q No.', data: 'questionNo', type: 'text' },
             { title: 'Topper Time', data: 'topperTime', type: 'text' },
              { title: 'AVG Time', data: 'avgTime', type: 'text' }

    ];
  }

  get Level() {
    return this.TopperTimeMasterForm.get('level');
  }

  get Category() {
    return this.TopperTimeMasterForm.get('category');
  }
 
  get SubCategory() {
    return this.TopperTimeMasterForm.get('subCategory');
  }

  get Chapter() {
    return this.TopperTimeMasterForm.get('chapter');
  }

  get QuestionType() {
    return this.TopperTimeMasterForm.get('questionType');
  }

  get QuestionLevel() {
    return this.TopperTimeMasterForm.get('questionLevel');
  }

  get OrderNumber() {
    return this.TopperTimeMasterForm.get('orderNumber');
  }

  get NumberOfQuestion() {
    return this.TopperTimeMasterForm.get('numberofQuestion')
  }

  get Questions(): FormArray {
    return this.TopperTimeMasterForm.get('questions') as FormArray;
  }


  onSelectChooseExamLevel() {
    this.CategoryListDropdown$ = this.categoryService.getCategoryListIDwithName();
  }

  onSelectCategory() {
    const CatId = this.TopperTimeMasterForm.get('category')?.value;
    this.SubCategoryListDropdown$ = this.subCategoryService.getSubcategoryIdWithName(CatId);
  }


  onSelectSubCategory() {
    const SubCatId = this.TopperTimeMasterForm.get('subCategory')?.value
    this.ChapterListDropdown$ = this.chapterService.getChapterIdwithname(SubCatId);
  }

  // Function to add question fields dynamically based on entered number 
  AddNumberOfQuestion() {
    const numofQuestions = this.TopperTimeMasterForm.value.numberofQuestion;

    //  Clear any existing questions before adding new ones 
    this.Questions.clear();

    // Create question fields 

    for (let i = 0; i < numofQuestions; i++) {
      this.Questions.push(
        this.fb.group({
          questionNo: [],
          topperMinTime: [],
          topperMaxTime: [],
          avgMinTime: [],
          avgMaxTime: []
        })
      )
    }
  }

  // Function to remove specific row 
  RemoveRow(index: number) {
    this.Questions.removeAt(index);
  }

  createTopperTimeMaster() { }

  updateTopperTimeMaster(arg: string) { }

  deleteTopperTimeMaster($event: any) { }

  editTopperTimeMaster($event: any) { }

  clearForm() { }

}

