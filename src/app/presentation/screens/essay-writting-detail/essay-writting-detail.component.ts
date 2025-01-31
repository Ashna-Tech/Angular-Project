import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { EssaywrittingDetailService } from '../../../services/essayWrittingDetail.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-essay-writting-detail',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe, DataTableComponent],
  templateUrl: './essay-writting-detail.component.html',
  styleUrl: './essay-writting-detail.component.scss',
})
export class EssayWrittingDetailComponent implements OnInit {
  isUpdateMode: boolean = false;
  essayWrittingDetailForm: FormGroup = new FormGroup({
    essayNumber: new FormControl('', [Validators.required]),
    planId: new FormControl('', [Validators.required]),
    essaytitle: new FormControl('', [Validators.required]),
    addnumber: new FormControl('', [Validators.required]),
    marks: new FormControl('', [Validators.required]),
    questionid: new FormControl('', [Validators.required]),
    questiondescripion: new FormControl('', [Validators.required]),
  });

  tableCols: TableColType[] = [];
  dataObs: Observable<any> | undefined;
  editEssayWrittingDetailId: string = '';

  constructor(
    private essayWrittingDetailservice: EssaywrittingDetailService,
    private toastrService: ToastrService
  ) {}

  PlanListDropdown$: Observable<any[]> | undefined;

  questionListDropdown$: Observable<any[]> | undefined;

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  ngOnInit(): void {
    this.dataObs = this.essayWrittingDetailservice.GetEssaywrittingDetailList();

    this.tableCols = [
      { title: 'Essay No.', data: 'essayNo', type: 'text' },
      { title: 'Essay Title', data: 'essayTitle', type: 'text' },
      { title: 'Add No.', data: 'addNo', type: 'text' },
      { title: 'Marks', data: 'marks', type: 'text' },
      { title: 'Question Description', data: 'quesDescription', type: 'text' },
    ];
  }

  get EssayNumber() {
    return this.essayWrittingDetailForm.get('essayNumber');
  }

  get PlanId() {
    return this.essayWrittingDetailForm.get('planId');
  }

  get EssayTitle() {
    return this.essayWrittingDetailForm.get('essaytitle');
  }

  get AddNumber() {
    return this.essayWrittingDetailForm.get('addnumber');
  }

  get Marks() {
    return this.essayWrittingDetailForm.get('marks');
  }

  get QuestionId() {
    return this.essayWrittingDetailForm.get('questionid');
  }

  get QuestionDescription() {
    return this.essayWrittingDetailForm.get('questiondescripion');
  }

  createEssayWrittingDetail() {
    const essaynumber = this.EssayNumber?.value;
    const planid = this.PlanId?.value;
    const essaytitle = this.EssayTitle?.value;
    const addnumber = this.AddNumber?.value;
    const marks = this.Marks?.value;
    const questionid = this.QuestionId?.value;
    const questiondescription = this.QuestionDescription?.value;

    this.essayWrittingDetailservice
      .CreateEssaywrittingDetail(
        essaynumber,
        planid,
        essaytitle,
        addnumber,
        marks,
        questionid,
        questiondescription
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Essay Writting Detail Created Successfully',
            'Create Essay Writting Detail'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  updateEssayWrittingDetail(EssayWrittingDetID: string) {
    const id = EssayWrittingDetID;
    const essaynumber = this.EssayNumber?.value;
    const planid = this.PlanId?.value; 
    const essaytitle = this.EssayTitle?.value;
    const addnumber = this.EssayNumber?.value;
    const marks = this.Marks?.value;
    const questionid = this.QuestionId?.value;
    const questionDescription = this.QuestionDescription?.value;

    this.essayWrittingDetailservice
      .UpdateEssaywrittingDetail(
        id,
        essaynumber,
        planid,
        essaytitle,
        addnumber,
        marks,
        questionid,
        questionDescription
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Essay Writting Detail Upadte Successfully',
            ' Update Essay Writting Detail'
          );
        },
        error : (error =>{
          this.toastrService.error(error.message);
        })
      });
  }

  deleteEssayWrittingDetail(data: any) {
    const id = data.id;

    this.essayWrittingDetailservice.DeleteEssaywrittingDetail(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Essay Writting Detail Deleted Successfully',
          'Delete Essay Writting'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  editEssayWrittingDetail(data: any) {
    const id = data.id;

    this.essayWrittingDetailservice.GetEssaywrittingDetail(id).subscribe({
      next: (response) => {
        this.editEssayWrittingDetailId = id;
        this.isUpdateMode = true;

        this.essayWrittingDetailForm.patchValue({
          id: response.id,
          essayNumber: response.essayNo,
          planId: response.planId,
          essaytitle: response.essayTitle,
          addnumber: response.addNo,
          marks: response.marks,
          questionid: response.questionId,
          questiondescripion: response.quesDescription,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  clearForm() {
    this.editEssayWrittingDetailId = '';
    this.isUpdateMode = false;
    this.essayWrittingDetailForm.reset();
  }
}
