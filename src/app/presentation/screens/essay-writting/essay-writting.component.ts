import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { essayWrittingService } from '../../../services/essaywritting.service';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';
import { ExamtypeService } from '../../../services/exam-type.service';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';

@Component({
  selector: 'app-essay-writting',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe, DataTableComponent],
  templateUrl: './essay-writting.component.html',
  styleUrl: './essay-writting.component.scss',
})
export class EssayWrittingComponent implements OnInit {
  isUpdateMode: boolean = false;
  essayWrittingForm: FormGroup = new FormGroup({
    title: new FormControl('', []),
    createdate: new FormControl('', []),
    expirydate: new FormControl('', []),
    essaynumber: new FormControl('', []),
    noOfessay: new FormControl('', []),
    plainId: new FormControl('', []),
    examtypeId: new FormControl('', []),
    maxattemptPerQuestionid: new FormControl('', []),
    added: new FormControl('', []),
    isActive: new FormControl('Yes', []),
  });

  tableCols: TableColType[] = [];
  dataObs: Observable<any> | undefined;
  editEssayWrittingId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  plainListDropdown$: Observable<any[]> | undefined;

  examListDropdown$: Observable<IdExamTypeListModel[]> | undefined;

  questionListDropdown$: Observable<any[]> | undefined;

  constructor(
    private EssaywrittingService: essayWrittingService,
    private toastrService: ToastrService,
    private examtypeservice: ExamtypeService
  ) {}

  ngOnInit(): void {

    // this.examListDropdown$ = this.examtypeservice.();

    this.dataObs = this.EssaywrittingService.GetEssayWrittingList();

    this.tableCols = [
      { title: 'Title', data: 'title', type: 'text' },
      // {title : 'Create Date', data :'createDate', type :'text'},
      // {title : 'Expiry Date', data : 'expityDate', type :'text'},
      { title: 'Essay Number', data: 'essayNo', type: 'text' },
      { title: 'Number of Essay', data: 'noofEssay', type: 'text' },
      { title: 'Added', data: 'added', type: 'text' },
    ];
  }

  get Title() {
    return this.essayWrittingForm.get('title');
  }

  get CreateDate() {
    return this.essayWrittingForm.get('createdate');
  }

  get ExpiryDate() {
    return this.essayWrittingForm.get('expirydate');
  }

  get Essaynumber() {
    return this.essayWrittingForm.get('essaynumber');
  }
  get NumberofEssay() {
    return this.essayWrittingForm.get('noOfessay');
  }

  get PlainId() {
    return this.essayWrittingForm.get('plainId');
  }

  get ExamtypeId() {
    return this.essayWrittingForm.get('examtypeId');
  }

  get MaxAttemptperQuestionId() {
    return this.essayWrittingForm.get('maxattemptPerQuestionid');
  }

  get Added() {
    return this.essayWrittingForm.get('added');
  }

  get Isactive() {
    return this.essayWrittingForm.get('isActive');
  }

  createEssayWritting() {
    const title = this.Title?.value;
    const createdate = this.CreateDate?.value;
    const expirydate = this.ExpiryDate?.value;
    const essaynumber = this.Essaynumber?.value;
    const numberOfessay = this.NumberofEssay?.value;
    const plainid = this.PlainId?.value;
    const examtypeid = this.ExamtypeId?.value;
    const maxAttemptperQuestionid = this.MaxAttemptperQuestionId?.value;
    const added = this.Added?.value;
    const isactive = this.Isactive?.value;

    this.EssaywrittingService.CreateEssayWritting(
      title,
      createdate,
      expirydate,
      essaynumber,
      numberOfessay,
      plainid,
      examtypeid,
      maxAttemptperQuestionid,
      added,
      isactive
    ).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Essay Writting Created Successfully',
          ' Create Essay Writting '
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  updateEssayWritting(essayWrittingupdateId: string) {
    const id = essayWrittingupdateId;
    const title = this.Title?.value;
    const createdate = this.CreateDate?.value;
    const expirydate = this.ExpiryDate?.value;
    const essaynumber = this.Essaynumber?.value;
    const numberOfessay = this.NumberofEssay?.value;
    const plainid = this.PlainId?.value;
    const examtypeid = this.ExamtypeId?.value;
    const maxattemptperquestionid = this.MaxAttemptperQuestionId?.value;
    const added = this.Added?.value;
    const isactive = this.Isactive?.value;


    
    this.EssaywrittingService.UpdateEssayWritting(
      id,
      title,
      createdate,
      expirydate,
      essaynumber,
      numberOfessay,
      plainid,
      examtypeid,
      maxattemptperquestionid,
      added,
      isactive
    ).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Essay Writting Updated Successfully',
          'Essay Writting Update'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  deleteEssayWritting(data: any) {
    const id = data.id;

    this.EssaywrittingService.DeleteEssayWritting(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Essay Writting deleted Successfully',
          'Essay Writting Deleted'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editEssayWritting(data: any) {
    const id = data.id;

    this.EssaywrittingService.GetEssayWritting(id).subscribe({
      next: (response) => {
        this.editEssayWrittingId = id;
        this.isUpdateMode = true;

        this.essayWrittingForm.patchValue({
          id: response.id,
          title: response.title,
          createdate: response.createDate.substring(0,16),
          expirydate: response.expiryDate.substring(0,16),
          essaynumber: response.essayNo,
          noOfessay: response.noofEssay,
          plainId: response.plainId,
          examtypeId: response.examTypeId,
          maxattemptPerQuestionid: response.maxAttemptPerQuestionId,
          added: response.added,
          isActive: response.isActive ? 'Yes' : 'No',
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  clearForm() {
    this.editEssayWrittingId = '',
     this.isUpdateMode = false;
    this.essayWrittingForm.reset();
  }
}
