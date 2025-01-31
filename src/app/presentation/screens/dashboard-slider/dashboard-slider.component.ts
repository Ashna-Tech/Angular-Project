import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { dashboardSliderService } from '../../../services/dashboard Slider.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-dashboard-slider',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DataTableComponent,
    NgIf,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatRadioModule,
  ],
  templateUrl: './dashboard-slider.component.html',
  styleUrl: './dashboard-slider.component.scss',
})
export class DashboardSliderComponent implements OnInit {
  isUpdateMode: boolean = false;
  dashbordSlidForm: FormGroup = new FormGroup({
    image: new FormControl('', []),
    imageSource: new FormControl('', []),
    linkurl: new FormControl('', [Validators.required]),
    groupId: new FormControl([]),
    activeStatus: new FormControl('Yes', []),
  });

  tableCols: TableColType[] = [];
  dataObs: Observable<any> | undefined;
  editDashboardId: string = '';

  previewImage: string = '';

  isActive: boolean = false; // This will hold the initial isActive status

  isLoading: boolean = true;

  sliderId: string = '';

  groupId: number[] = [];

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private dashboardSliderService: dashboardSliderService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.dashboardSliderService.getDashboardSlidList();
    this.tableCols = [
      { title: 'Image', data: 'img', type: 'img' },
      { title: 'Status', data: 'isActive', type: 'toggle' },
    ];
  }

  get dashboardImage() {
    return this.dashbordSlidForm.get('image');
  }
  get dashboardImgSource() {
    return this.dashbordSlidForm.get('imageSource');
  }
  get dashboardLinkurl() {
    return this.dashbordSlidForm.get('linkurl');
  }
  get dashboardGroupId() {
    return this.dashbordSlidForm.get('groupId');
  }

  get activeStatus() {
    return this.dashbordSlidForm.get('activeStatus');
  }

  // Method to handle toggle changes

  onToggleChange(id: string, isChecked: boolean): void {
    const status = isChecked ? 'Yes' : 'No';
    this.updateDashboardStatus(id, status);
  }

  // Call the update api to update the active status

  updateDashboardStatus(id: string, status: string): void {
    this.dashboardSliderService
      .updateDashboardSlidToggleActive(id, status)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }

          this.toastrService.success('Active status updated successfully');

          // Check if dataObs is an array before calling .find
          if (Array.isArray(this.dataObs)) {
            const updatedRow = this.dataObs.find((row) => row.id === id);
            if (updatedRow) {
              updatedRow.isActive = status;
            }
          }
        },
        error: (error: any) => {
          this.toastrService.error(
            error.message || 'An error occurred while updating the status'
          );
        },
      });
  }

  createDashboard() {
    const image = this.dashboardImgSource?.value;
    const linkurl = this.dashboardLinkurl?.value;
    const groupid = this.dashboardGroupId?.value;
    const activestatus = this.activeStatus?.value;

    console.log;
    this.dashboardSliderService
      .createDashboardSlid(image, linkurl, groupid)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success('Created Dashboard Slider Successfully');
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  onImgUpload(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Patch the form control value for 'image', not 'imageSource'
      this.dashbordSlidForm.patchValue({
        imageSource: file,
      });

      // Create a preview of the uploaded image
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateDashboard(updateDashSlidID: string) {
    const id = updateDashSlidID;
    const img = this.dashboardImgSource?.value;
    const linkurl = this.dashboardLinkurl?.value;
    const groupId = this.dashboardGroupId?.value;
    const activestatus = this.activeStatus?.value;

    this.dashboardSliderService
      .updateDashboardSlid(id, img, linkurl, groupId)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Updated Dashboard Slider Successfuly',
            'update Dashboard Slider'
          );
        },
        error: (error) => {
          this.toastrService.error(error.msg);
        },
      });

    this.dashbordSlidForm.patchValue({
      image: '',
      linkurl: '',
      groupId: '',
    });
  }

  deleteDashboard(data: any) {
    const id = data.id;

    this.dashboardSliderService.removeDashboardSlid(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Deleted Dashboard Slider Successfully',
          'Delete Dashboard'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editDashboard(data: any) {
    const id = data.id;

    this.dashboardSliderService.getDashboardSlid(id).subscribe({
      next: (response) => {
        this.editDashboardId = id;
        this.isUpdateMode = true;

        this.dashbordSlidForm.patchValue({
          id: response.id,
          image: null,
          linkurl: response.linkURL,
          groupId: response.groupId,
          activeStatus: response.isActive ? 'Yes' : 'No',
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.editDashboardId = '';
    this.isUpdateMode = false;
    this.dashbordSlidForm.reset();
    this.previewImage = '' ;

    this.dashbordSlidForm.patchValue({
      previewImage : '',
      
    })

  }
}

