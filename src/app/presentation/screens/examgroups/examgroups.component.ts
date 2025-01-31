import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import {
  MatChipEditedEvent,
  MatChipInput,
  MatChipInputEvent,
} from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ENTER, COMMA, C } from '@angular/cdk/keycodes';
import { ExamgroupsService } from '../../../services/examgroups.service';
import { ToastrService } from 'ngx-toastr';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { error } from 'jquery';
import { response } from 'express';

@Component({
  selector: 'app-examgroups',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    FormsModule,
    MatLabel,
    MatIcon,
    MatFormField,
    CommonModule,
    FormsModule,
    DataTableComponent,
    MatChipInput,
    MatChipsModule,
  ],
  templateUrl: './examgroups.component.html',
  styleUrl: './examgroups.component.scss',
})
export class ExamgroupsComponent implements OnInit {
  isUpdateMode: boolean = false;

  ExamgroupsForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    shortname: new FormControl('', [Validators.required]),
    icon: new FormControl('', []),
    iconSource: new FormControl('', []),
    image: new FormControl('', []),
    imageSource: new FormControl('', []),
    url: new FormControl('', [Validators.required]),
    categorySearch: new FormControl([], [Validators.required]),
    topicSearch: new FormControl([], [Validators.required]),
    isMockDrll: new FormControl('Yes', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editExamgroupsId: string = '';

  ShowIcons : string = "";

  ShowImages : string = "";

  categories: any[] = [];
  topics: any[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  addOnBlur = true;

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private examGroupsService: ExamgroupsService,
    private toastrservice: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.examGroupsService.getExamGroupsList() ;
    this.tableCols = [{ title: 'Name', data: 'name', type: 'text' }];
  }

  get Name() {
    return this.ExamgroupsForm.get('name');
  }

  get Shortname() {
    return this.ExamgroupsForm.get('shortname');
  }

  get Icon() {
    return this.ExamgroupsForm.get('icon');
  }

  get IconSource() {
    return this.ExamgroupsForm.get('iconSource');
  }

  get Image() {
    return this.ExamgroupsForm.get('image');
  }

  get ImageSource() {
    return this.ExamgroupsForm.get('imageSource');
  }

  get Url() {
    return this.ExamgroupsForm.get('url');
  }

  get CategorySearch() {
    return this.ExamgroupsForm.get('categorySearch');
  }

  get TopicSearch() {
    return this.ExamgroupsForm.get('topicSearch');
  }

  get Mockdrill() {
    return this.ExamgroupsForm.get('isMockDrll');
  }

  createExamgroups() {
    const name = this.Name?.value;
    const shortname = this.Shortname?.value;
    const icon = this.IconSource?.value;
    const image = this.ImageSource?.value;
    const url = this.Url?.value;
    const searchcategory = this.categories;
    const topicsearch = this.topics;
    const mockdrill = this.Mockdrill?.value;

    console.log({ searchcategory });
    console.log({ topicsearch });

    this.examGroupsService
      .createExamgroups(
        name,
        shortname,
        icon,
        image,
        url,
        searchcategory,
        topicsearch,
        mockdrill
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrservice.success(
            'ExamGroups Created Successfully',
            'Create Examgroups'
          );
        },
        error: (error) => {
          this.toastrservice.error(error.message);
        },
      });
  }

  // Add chip function for both categories and topics
  addChip(event: MatChipInputEvent, type: 'category' | 'topic'): void {
    const input = event.chipInput?.inputElement; // Use chipInput.inputElement
    const value = (event.value || '').trim();

    // Add the value to the corresponding array (categories or topics)
    if (value) {
      if (type === 'category') {
        this.categories.push(value);
      } else if (type === 'topic') {
        this.topics.push(value);
      }
    }

    // Clear the input value
    if (input) {
      input.value = '';
    }
  }

  removeChip(item: any, type: 'category' | 'topic'): void {
    if (type === 'category') {
      const index = this.categories.indexOf(item);
      if (index >= 0) {
        this.categories.splice(index, 1);
      }
    } else if (type === 'topic') {
      const index = this.topics.indexOf(item);
      if (index >= 0) {
        this.topics.splice(index, 1);
      }
    }
  }
  
  onUploadIcon (event: any) {
    if(event.target.files.length>0){
     const file = event.target.files[0];
     this.ExamgroupsForm.patchValue({
      'iconSource' : file
     });
     const reader = new FileReader();
     reader.onload = e=> this.ShowIcons = reader.result as string ;
     reader.readAsDataURL(file);
    }
 }
   onUploadImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ExamgroupsForm.patchValue({
        'imageSource' : file,
      });
      const reader = new FileReader();
      reader.onload = e  => this.ShowImages = reader.result as string ;
      reader.readAsDataURL(file);
    }
  }

  updateExamgroups(examGroupsIdUpdate: string) {
    const id = examGroupsIdUpdate;
    const name = this.Name?.value;
    const shortname = this.Shortname?.value;
    const icon = this.IconSource?.value;
    const image = this.ImageSource?.value;
    const url = this.Url?.value;
    const searchcategory = this.categories;
    const topicsearch = this.topics;
    const mockdrill = this.Mockdrill?.value;

    this.examGroupsService
      .updateExamgroups(
        id,
        name,
        shortname,
        icon,
        image,
        url,
        searchcategory,
        topicsearch,
        mockdrill
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrservice.success(
            'ExamGroups Update Successfully',
            'Examgroups Updated'
          );
        },
        error: (error) => {
          this.toastrservice.error(error.message);
        },
      });
  }

  deleteExamgroups(data: any) {
    const id = data.id;

    this.examGroupsService.deleteExamgroups(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrservice.success(
          'ExamGroups Delete Successfully',
          'Examgroup Deleted'
        );
      },
      error: (error) => {
        this.toastrservice.error(error.message);
      },
    });
  }

  editExamgroups(data: any) {
    const id = data.id;

    console.log(id);
    this.examGroupsService.getExamgroupsById(id).subscribe({
      next: (response) => {
        this.editExamgroupsId = id;
        this.isUpdateMode = true;

        this.ExamgroupsForm.patchValue({
          name: response.name,
          shortname: response.shortName,
          icon: null,
          image: null,
          url: response.url,
          categorySearch : response.categorySearch,
          topicSearch : response.topicSearch,
          isMockDrll: response.isMockDrill ? 'Yes' : 'No',
        });

        this.categories = response.categorySearch;
        this.topics = response.topicSearch;
      },
      error: (error) => {
        this.toastrservice.error(error.message);
      },
    });
  }
  clearForm() {
    this.editExamgroupsId = '';
    this.isUpdateMode = false;
    this.ExamgroupsForm.reset();
    this.categories = [];
    this.topics = [];
  }
}
