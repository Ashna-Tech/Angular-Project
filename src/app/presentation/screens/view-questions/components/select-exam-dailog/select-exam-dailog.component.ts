import { Component, Inject, inject, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IdExamTypeListModel } from '../../../../../core/domain/Exam type/id-ExamtypeList.model';
import { AsyncPipe } from '@angular/common';
import { ExamtypeService } from '../../../../../services/exam-type.service';

@Component({
  selector: 'app-select-exam-dailog',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './select-exam-dailog.component.html',
  styleUrl: './select-exam-dailog.component.scss'
})
export class SelectExamDailogComponent implements OnInit {
  exams = new FormControl<string[]>([]);
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  examDropdownList$: Observable<IdExamTypeListModel[]> | undefined;

  constructor(
    private dailogRef:MatDialogRef<SelectExamDailogComponent>,
    private examTypeService: ExamtypeService,
    @Inject(MAT_DIALOG_DATA) protected data:{
      title:string;
      noOfQuestions:number;
    }
  ){}

  ngOnInit(): void {
    this.examDropdownList$ = this.examTypeService.getExamTypeIdwithName('');
  }

  closeDailog(isCanceled:boolean){
    if(isCanceled){
      this.dailogRef.close([]);
    }else{
      this.dailogRef.close(this.exams.value);
    }
  }
}
