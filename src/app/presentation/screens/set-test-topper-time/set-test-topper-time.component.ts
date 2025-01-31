import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { examMasterService } from '../../../services/exam-master.service';
import { examCategoryService } from '../../../services/exam-category.service';
import { ExamtypeService } from '../../../services/exam-type.service';
import { TopperTimeExamLevelService } from '../../../services/topper-time-exam-level-service';

@Component({
  selector: 'app-set-test-topper-time',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './set-test-topper-time.component.html',
  styleUrl: './set-test-topper-time.component.scss'
})

export class SetTestTopperTimeComponent implements OnInit {

  isUpdateMode: boolean = false;
  SetTestTopperForm: FormGroup = new FormGroup({
    mainCategory : new FormControl('',[]),
    examCategory : new FormControl('',[]),
    examtype : new  FormControl('',[]),
    examLevel : new FormControl('',[]),
    testid : new FormControl('',[]),    
  });

  editSetTestTopperTimeId: string = '';

  MaincategoryListDropdown$: Observable<any[]> | undefined;
   ExamCategoryListDropdown$: Observable<any[]> | undefined;
    ChooseExamsListDropdown$: Observable<any[]> | undefined;
    ExamLevelListDropdown$: Observable<any[]> | undefined;

  constructor(private examMasterService: examMasterService,
    private examCategoryService: examCategoryService,
     private examTypeService: ExamtypeService,
      private topperTimeExamLevelService : TopperTimeExamLevelService 
  ) {}


  ngOnInit(): void {
    this.MaincategoryListDropdown$ = this.examMasterService.getexamMasterListIdwithName();
  }

   get MainCategory(){
    return this.SetTestTopperForm.get('mainCategory');
   }
 
    get ExamCategory(){
      return this.SetTestTopperForm.get('examCategory');
    }

    get ExamType(){
      return this.SetTestTopperForm.get('examtype');
    } 

    get ExamLevel(){
      return this.SetTestTopperForm.get('examLevel');
    }

     get TestID(){
      return this.SetTestTopperForm.get('testid');
     }


      onSelectMainCategory(){
        const MainCatId = this.SetTestTopperForm.get('mainCategory')?.value;
        this.ExamCategoryListDropdown$ = this.examCategoryService.getExamCategoryListIdwithname(MainCatId);
      }
    

      onSelectExamCategory(){
        const ExamCatId = this.SetTestTopperForm.get('examCategory')?.value ;
        this.ChooseExamsListDropdown$ = this.examTypeService.getExamTypeIdwithName(ExamCatId);
      }

    
      onSelectChooseExam(){
        this.ExamLevelListDropdown$ = this.topperTimeExamLevelService.GetTopperTimeExamLevelList();
      }



  // createSimilarQuestion() {

  // }


  updateSetTestTopperTime(arg: string) {

  }

  clearForm() {

  }

}


