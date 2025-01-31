import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { catchError, Observable, of } from 'rxjs';
import { AddQuestionService } from '../../../services/add-question.service';
import { ProofReaderQuestionModel } from '../../../core/domain/Add-Test-Question/proof-reader-question.model';
import { MatDialog } from '@angular/material/dialog';
import { QuestionViewDailogComponent } from '../../components/question-view-dailog/question-view-dailog.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  isUpdateMode: boolean = false;
  SearchForm: FormGroup = new FormGroup({
    dateFrom: new FormControl('', []),
    dateTo: new FormControl('', []),
    name: new FormControl('', []),
    search: new FormControl('', []),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editSearchId: string = '';

  readonly addQuestionService = inject(AddQuestionService);
  readonly dailog = inject(MatDialog);

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor() {}

  ngOnInit(): void {
    this.dataObs = of([]);
    this.tableCols = [
      { title: 'Edit', data:'id', type:'renderF', width:'50px', 
        renderF:function (data: any, type: any, row: ProofReaderQuestionModel) {

          return `<a class="default" href="/dashboard/Question-Master?QuestionId=${row.quesOldId}"><i class="fa fa-pencil"></i></a>`;
        }, 
      },
      { title: 'Question ID', data: 'quesOldId', type: 'text', width:'120px' },
      { title: 'Uploaded by', data: 'createBy', type: 'text', width:'150px' },
      { title: 'Date', data:'createDate', type:'renderF', width:'150px', 
        renderF:function (data: any, type: any, row: ProofReaderQuestionModel) {
          const date = new Date(row.createDate);
          // <i class="fa fa-pencil"></i>

          return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        }, 
      },
      { title: 'Path', data: 'path', type: 'text', width:'200px' },
      { title: 'Question', data: 'ques', type: 'text' },
      { title: 'Exams', data: 'exams', type: 'text' , width:'200px'},
      { title: 'View', data: 'id', type: 'view' , width:'200px'},
    ];
  }

  get DateFrom() {
    return this.SearchForm.get('dateFrom');
  }

  get Dateto() {
    return this.SearchForm.get('dateTo');
  }

  get Name() {
    return this.SearchForm.get('name');
  }

  get Search() {
    return this.SearchForm.get('search');
  }

  search() {
    const dateFrom = this.SearchForm.get('dateFrom')?.value;
    const dateTo = this.SearchForm.get('dateTo')?.value;
    const name = this.SearchForm.get('name')?.value;
    const search = this.SearchForm.get('search')?.value;


    this.dataObs = this.addQuestionService.getProofReaderQuestions(search, name, dateFrom, dateTo).pipe(catchError((error) => of([])));
    setTimeout(() => {  this.dttable?.reloadTable(); });
  }

  updateSearch(arg: string) {}

  deleteSearch(data: any) {
    console.log(data);
    // this.addQuestionService.removeQuestionFromTest().subscribe({
  }

  onView(data: any) {
    this.dailog.open(QuestionViewDailogComponent, {
      data:{
        questionId: data.quesId, 
        oldId: data.quesOldId
      },
      width: '90vw',
      height: '90vh',
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }

  editSearch($event: any) {}

  clearForm() {}
}
