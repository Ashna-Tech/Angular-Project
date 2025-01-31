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
import { LandingPageMasterService } from '../../../services/landingPageMaster.service';
import { ToastrService } from 'ngx-toastr';
import { ExamGroup } from '../../../core/enums/ExamGroups.enum';

@Component({
  selector: 'app-landing-page-master',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, DataTableComponent],
  templateUrl: './landing-page-master.component.html',
  styleUrl: './landing-page-master.component.scss',
})
export class LandingPageMasterComponent implements OnInit {
  isUpdateMode: boolean = false;
  LandingPageMasterForm: FormGroup = new FormGroup({
    examgroupId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    seotitle: new FormControl('', [Validators.required]),
    seokeywords: new FormControl('', [Validators.required]),
    seodescription: new FormControl('', [Validators.required]),
    otherdetail: new FormControl('', [Validators.required]),
    jsonschema: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editLandingPageMasterId: string = '';
  ExamGroup = ExamGroup;

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  ExamGroupListDropdown$ : Observable <any[]> | undefined ;

  constructor(
    private LandingPageMasterService: LandingPageMasterService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.LandingPageMasterService.GetLandingPageMasterList();

    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Description', data: 'description', type: 'text' },
      { title: 'SEO Title', data: 'seoTitle', type: 'text' },
      { title: 'SEO Keywords', data: 'seoKeywords', type: 'text' },
      { title: 'SEO Description', data: 'seoDescription', type: 'text' },
      { title: 'Other Detail', data: 'otherDetail', type: 'text' },
      { title: 'Json Schema', data: 'jsonSchema', type: 'text' },
    ];
  }

  get ExamGroupID() {
    return this.LandingPageMasterForm.get('examgroupId');
  }

  get Name() {
    return this.LandingPageMasterForm.get('name');
  }

  get Description() {
    return this.LandingPageMasterForm.get('description');
  }

  get SEOTitle() {
    return this.LandingPageMasterForm.get('seotitle');
  }

  get SEOKeywords() {
    return this.LandingPageMasterForm.get('seokeywords');
  }

  get SEODescription() {
    return this.LandingPageMasterForm.get('seodescription');
  }

  get OtherDetail() {
    return this.LandingPageMasterForm.get('otherdetail');
  }

  get JsonSchema() {
    return this.LandingPageMasterForm.get('jsonschema');
  }

  createLandingPageMaster() {
    const examgroupid = this.ExamGroupID?.value;
    const name = this.Name?.value;
    const description = this.Description?.value;
    const seotitle = this.SEOTitle?.value;
    const seokeywords = this.SEOKeywords?.value;
    const seodescription = this.SEODescription?.value;
    const otherdetail = this.OtherDetail?.value;
    const jsonschema = this.JsonSchema?.value;

    this.LandingPageMasterService.CreateLandingPageMaster(
      examgroupid,
      name,
      description,
      seotitle,
      seokeywords,
      seodescription,
      otherdetail,
      jsonschema
    ).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }

        this.toastrService.success(
          'Landing Page Master Created Successfully',
          'Create Landing Page Master'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  updateLandingPageMaster(UpdateLandingPagemasterID: string) {
    const id = UpdateLandingPagemasterID;
    const examgroupid = this.ExamGroupID?.value;
    const name = this.Name?.value;
    const description = this.Description?.value;
    const seotitle = this.SEOTitle?.value;
    const seokeywords = this.SEOKeywords?.value;
    const seodescription = this.SEODescription?.value;
    const otherdetail = this.OtherDetail?.value;
    const jsonschema = this.JsonSchema?.value;

    this.LandingPageMasterService.UpdateLandingPageMaster(
      id,
      examgroupid,
      name,
      description,
      seotitle,
      seokeywords,
      seodescription,
      otherdetail,
      jsonschema
    ).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Landing Page Master Updated Successfully',
          'Update Landing Page Master'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.editLandingPageMasterId = '',
    this.LandingPageMasterForm.reset();
    this.isUpdateMode = false;
  }

  editLandingPageMaster(data: any) {
    const id = data.id;

    this.LandingPageMasterService.GetLandingPageMaster(id).subscribe({
      next: (response) => {
        this.editLandingPageMasterId = id;
        this.isUpdateMode = true;

        this.LandingPageMasterForm.patchValue({
          id: response.id,
          examgroupId: response.examGroupId,
          name: response.name,
          description: response.description,
          seotitle: response.seoTitle,
          seokeywords: response.seoKeywords,
          seodescription: response.seoDescription,
          otherdetail: response.otherDetail,
          jsonschema: response.jsonSchema,
        });
      },
      error : (error =>{
        this.toastrService.error(error.message);
      })
    })
  }
  deleteLandingPageMaster(data : any) {
    
    const id = data.id ;

    this.LandingPageMasterService.DeleteLandingPageMaster(id).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable();
        }
        this.toastrService.success('Landing Page Master Deleted Successfully', 'Delete Landing Page Master')
      }),
      error : (error =>{
        this.toastrService.error(error.message);
      })
    })

  }
}
