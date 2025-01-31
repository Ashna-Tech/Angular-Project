import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from '../../../components/data-table/data-table.component';
import { TableColType } from '../../../../core/domain/datatable/DataTableCol.model';
import { Observable, of } from 'rxjs';
import { AddQuestionService } from '../../../../services/add-question.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent implements OnInit {
  @ViewChild('action', { static: true }) actions: TemplateRef<any> | undefined;

  QuestionsForm: FormGroup = new FormGroup({});

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];

  constructor(private addQuestionService: AddQuestionService) {}

  ngOnInit(): void {
    this.dataObs = of([]);
    this.tableCols = [
    // {title : '', data : '', type : ''},

    ];
  }
}
