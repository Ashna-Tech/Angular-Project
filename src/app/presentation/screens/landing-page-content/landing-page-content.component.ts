import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { LandingPageContentService } from '../../../services/landingPageContent.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-landing-page-content',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, DataTableComponent, AsyncPipe],
  templateUrl: './landing-page-content.component.html',
  styleUrl: './landing-page-content.component.scss',
})
export class LandingPageContentComponent implements OnInit {
  isUpdateMode: boolean = false;
  LandingPageContentForm: FormGroup = new FormGroup({
    pageId: new FormControl('', [Validators.required]),
    exampatterntype: new FormControl('', [Validators.required]),
    heading: new FormControl('', [Validators.required]),
    examcontent: new FormControl('', [Validators.required]),
  });

  tableCols: TableColType[] = [];
  dataObs: Observable<any> | undefined;
  editLandingPageContentId: string = '';

  PageListDropdown$: Observable<any[]> | undefined;

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private landingPageContentService: LandingPageContentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.landingPageContentService.GetLandingPageContentList();

    this.tableCols = [
      { title: 'Exam Pattern Type', data: 'examPatternType', type: 'text' },
      { title: 'Heading', data: 'heading', type: 'text' },
      { title: 'Exam Content', data: 'examContent', type: 'text' },
    ];
  }

  get PageId() {
    return this.LandingPageContentForm.get('pageId');
  }

  get ExamPatternType() {
    return this.LandingPageContentForm.get('exampatterntype');
  }

  get Heading() {
    return this.LandingPageContentForm.get('heading');
  }

  get ExamContent() {
    return this.LandingPageContentForm.get('examcontent');
  }

  createLandingPageContent() {
    const pageid = this.PageId?.value;
    const exampatterntype = this.ExamPatternType?.value;
    const heading = this.Heading?.value;
    const examcontent = this.ExamContent?.value;

    this.landingPageContentService
      .CreateLandingPageContent(pageid, exampatterntype, heading, examcontent)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Landing Page Content Created Successfully',
            'Create Landing Page Content '
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  updateLandingPageContent(UpdateLandingPageContentID: string) {
    const id = UpdateLandingPageContentID;
    const pageid = this.PageId?.value;
    const exampatterntype = this.ExamPatternType?.value;
    const heading = this.Heading?.value;
    const examcontent = this.ExamContent?.value;

    this.landingPageContentService
      .UpadateLandingPageContent(
        id,
        pageid,
        exampatterntype,
        heading,
        examcontent
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Landing Page Content Update Successfully',
            'Update Landing Page Content'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deleteLandingPageContent(data: any) {
    const id = data.id;

    this.landingPageContentService.DeleteLandingPageContent(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Landing Page Content Deleted Successfully',
          'Delete Landing Page Content'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editLandingPageContent(data: any) {
    const id = data.id;

    this.landingPageContentService.GetLandingPageContent(id).subscribe({
      next: (response) => {
        this.editLandingPageContentId = id;
        this.isUpdateMode = true;

        this.LandingPageContentForm.patchValue({
          id: response.id,
          pageId: response.pageId,
          exampatterntype: response.examPatternType,
          heading: response.heading,
          examcontent: response.examContent,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.editLandingPageContentId = '',
    this.isUpdateMode = false ;
    this.LandingPageContentForm.reset();
  }
}
