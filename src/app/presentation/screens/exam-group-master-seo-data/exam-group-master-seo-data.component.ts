import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { ExamGroupMasterSeoDataService } from '../../../services/examGroupmasterSeodata.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-exam-group-master-seo-data',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, DataTableComponent],
  templateUrl: './exam-group-master-seo-data.component.html',
  styleUrl: './exam-group-master-seo-data.component.scss',
})
export class ExamGroupMasterSeoDataComponent implements OnInit {
  isUpdateMode: boolean = false;
  examGroupMasterSeodataForm: FormGroup = new FormGroup({
    seotitle: new FormControl('', [Validators.required]),
    seoKeywords: new FormControl('', [Validators.required]),
    seodescription: new FormControl('', [Validators.required]),
    jsonschema: new FormControl('', [Validators.required]),
    otherdata: new FormControl('', [Validators.required]),
  });

  tableCols: TableColType[] = [];
  dataObs: Observable<any> | undefined;
  editExamGroupMasterSeodataId: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private examGroupmasterSeodataService: ExamGroupMasterSeoDataService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs =
      this.examGroupmasterSeodataService.GetExamGroupmasterListSeodata();

    this.tableCols = [
      { title: 'Seo Title', data: 'seoTitle', type: 'text' },
      { title: 'Seo Keywords', data: 'seoKeywords', type: 'text' },
      { title: 'Seo Description', data: 'seoDescription', type: 'text' },
      { title: 'Json Schema', data: 'jsonSchema', type: 'text' },
      { title: 'Other Data', data: 'otherData', type: 'text' },
    ];
  }

  get Seotitle() {
    return this.examGroupMasterSeodataForm.get('seotitle');
  }

  get Seokeywords() {
    return this.examGroupMasterSeodataForm.get('seoKeywords');
  }

  get Seodescription() {
    return this.examGroupMasterSeodataForm.get('seodescription');
  }

  get Jsonschema() {
    return this.examGroupMasterSeodataForm.get('jsonschema');
  }

  get Otherdata() {
    return this.examGroupMasterSeodataForm.get('otherdata');
  }

  createExamGroupMasterSeodata() {
    const seotitle = this.Seotitle?.value;
    const seokeywords = this.Seokeywords?.value;
    const seodescription = this.Seodescription?.value;
    const jsonschema = this.Jsonschema?.value;
    const otherdata = this.Otherdata?.value;

    this.examGroupmasterSeodataService
      .CreateExamGroupmasterSeoData(
        seotitle,
        seokeywords,
        seodescription,
        jsonschema,
        otherdata
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Exam Group Master Seo Data Created Successfully',
            'Exam Group Master Seo Data Created'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  updateExamGroupMasterSeodata(UpdateExamGroupmasterSeodataID: any) {
    const id = UpdateExamGroupmasterSeodataID;
    const seotitle = this.Seotitle?.value;
    const seokeywords = this.Seokeywords?.value;
    const seodescription = this.Seodescription?.value;
    const jsonschema = this.Jsonschema?.value;
    const otherdata = this.Otherdata?.value;

    this.examGroupmasterSeodataService
      .UpdateExamGroupmasterSeodata(
        id,
        seotitle,
        seokeywords,
        seodescription,
        jsonschema,
        otherdata
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Exam Group Master Seo Data Updated Successfully',
            'Exam Group Master Seo Data Updated'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deleteExamGroupMasterSeodata(data: any) {
    const id = data.id;

    this.examGroupmasterSeodataService
      .DeleteExamGroupmasterSeodata(id)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Exam Group Master Seo Data Deleted Successfully',
            'Exam Group Master Seo Data Deleted'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  editExamGroupMasterSeodata(data: any) {
    const id = data.id;

    this.examGroupmasterSeodataService.GetExamGroupmasterSeodata(id).subscribe({
      next: (response) => {
        this.editExamGroupMasterSeodataId = id;
        this.isUpdateMode = true;

        this.examGroupMasterSeodataForm.patchValue({
          id: response.id,
          seotitle: response.seoTitle,
          seoKeywords: response.seoKeywords,
          seodescription: response.seoDescription,
          jsonschema: response.jsonSchema,
          otherdata: response.otherData,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    
    this.editExamGroupMasterSeodataId = '',
    this.isUpdateMode = false;
    this.examGroupMasterSeodataForm.reset();

  }
}
