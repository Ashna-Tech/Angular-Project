import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { PlanFacultyMasterService } from '../../../services/planfacultymaster.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-plan-faculty-master',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent],
  templateUrl: './plan-faculty-master.component.html',
  styleUrl: './plan-faculty-master.component.scss',
})
export class PlanFacultyMasterComponent implements OnInit {
  
  isUpdateMode: boolean = false;
  PlanFacultyMasterForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    experience: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', []),
    imageSource: new FormControl('', []),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editPlanFacultyMasterId: string = '';

  previewImageUrl: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private planFacultyMasterService: PlanFacultyMasterService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.planFacultyMasterService.GetPlanFacultyMasterList();

    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Experience', data: 'experience', type: 'text' },
      { title: 'Description', data: 'description', type: 'text' },
    ];
  }

  get Name() {
    return this.PlanFacultyMasterForm.get('name');
  }
  get Experience() {
    return this.PlanFacultyMasterForm.get('experience');
  }
  get Description() {
    return this.PlanFacultyMasterForm.get('description');
  }

  get Image() {
    return this.PlanFacultyMasterForm.get('image');
  }

  get ImageSource() {
    return this.PlanFacultyMasterForm.get('imageSource');
  }

  createPlanFacultyMaster() {
    const name = this.Name?.value;
    const experience = this.Experience?.value;
    const description = this.Description?.value;
    const image = this.ImageSource?.value;

    this.planFacultyMasterService
      .CreatePlanFacultyMaster(name, experience, description, image)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Plan Faculty Master Created Successfully !!',
            ' Create Plan Faculty Master'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }


  onUploadImg(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.PlanFacultyMasterForm.patchValue({
        imageSource: file,
      });

      const reader = new FileReader();
      reader.onload = (e) => (this.previewImageUrl = reader.result as string);

      reader.readAsDataURL(file);
    }
  }

  updatePlanFacultyMaster(PlanFacultyMasterID: string) {
    const id = PlanFacultyMasterID;
    const name = this.Name?.value;
    const experience = this.Experience?.value;
    const description = this.Description?.value;
    const image = this.ImageSource?.value;

    this.planFacultyMasterService
      .UpdatePlanFacultyMaster(id, name, experience, description, image)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Plan Faculty Master Update Successfully !!',
            'Update Plan Faculty Master'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deletePlanFacultyMaster(data: any) {
    const id = data.id;

    this.planFacultyMasterService.DeletePlanFacultyMaster(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Plan Master Faculty Deleted Successfully !!',
          'Delete Plan Faculty Master'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editPlanFacultyMaster(data: any) {
    const id = data.id;

    this.planFacultyMasterService.GetPlanFacultyMaster(id).subscribe({
      next: (response) => {
        this.editPlanFacultyMasterId = id;
        this.isUpdateMode = true;

        this.PlanFacultyMasterForm.patchValue({
          id: response.id,
          name: response.name,
          experience: response.experience,
          description: response.description,
          image: null,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  clearForm() {
    this.isUpdateMode = false;
    this.editPlanFacultyMasterId = ''
    this.PlanFacultyMasterForm.reset();
  }
}
