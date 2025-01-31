import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { SeokeywordPageService } from '../../../services/seoKeywordPage.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';

@Component({
  selector: 'app-seo-keyword-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, DataTableComponent, AsyncPipe],
  templateUrl: './seo-keyword-page.component.html',
  styleUrl: './seo-keyword-page.component.scss',
})
export class SeoKeywordPageComponent implements OnInit {
  isUpdateMode: boolean = false;

  seoKeywordPageForm: FormGroup = new FormGroup({
    testId: new FormControl('', [Validators.required]),
    pageNumber: new FormControl('', [Validators.required]),
    ctitle: new FormControl('', [Validators.required]),
    cKeyword: new FormControl('', [Validators.required]),
    cdesc: new FormControl('', [Validators.required]),
  });

  tableCols: TableColType[] = [];
  dataObs: Observable<any> | undefined;
  editSeokeywordPageId: string = '';

  testListDropdown$: Observable<any[]> | undefined;

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private SeokeywordpageService: SeokeywordPageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.SeokeywordpageService.GetSeokeywordPageList();

    this.tableCols = [
      { title: 'Page Number', data: 'pageNo', type: 'text' },
      { title: 'C Title', data: 'cTitle', type: 'text' },
      { title: 'C Keyword', data: 'cKeyword', type: 'text' },
      { title: 'C Desc', data: 'cDesc', type: 'text' },
    ];
  }

  get TestId() {
    return this.seoKeywordPageForm.get('testId');
  }

  get Pagenumber() {
    return this.seoKeywordPageForm.get('pageNumber');
  }

  get Ctitle() {
    return this.seoKeywordPageForm.get('ctitle');
  }

  get Ckeyword() {
    return this.seoKeywordPageForm.get('cKeyword');
  }

  get CDesc() {
    return this.seoKeywordPageForm.get('cdesc');
  }

  createSeokeywordPage() {
    const testid = this.TestId?.value;
    const pagenumber = this.Pagenumber?.value;
    const ctitle = this.Ctitle?.value;
    const ckeyword = this.Ckeyword?.value;
    const cdesc = this.CDesc?.value;

    this.SeokeywordpageService.CreateSeokeywordPage(
      testid,
      pagenumber,
      ctitle,
      ckeyword,
      cdesc
    ).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'SEO Keyword Page Created Successfully',
          'SEO Keyword Page Created'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  updateSeokeywordPage(UpdateSeokeywordpageId: string) {
    const id = UpdateSeokeywordpageId;
    const testid = this.TestId?.value;
    const pagenumber = this.Pagenumber?.value;
    const ctitle = this.Ctitle?.value;
    const ckeyword = this.Ckeyword?.value;
    const cdesc = this.CDesc?.value;

    this.SeokeywordpageService.UpdateSeoKeywordPage(
      id,
      testid,
      pagenumber,
      ctitle,
      ckeyword,
      cdesc
    ).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'SEO Keyword Page Updated Successfully',
          'SEO Keyword Page Upadated'
        );
      },
    });
  }

  deleteSeokeywordPage(data: any) {
    const id = data.id;

    this.SeokeywordpageService.DeleteSeokeywordPage(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable?.reloadTable();
        }
        this.toastrService.success(
          'SEO Keyword Page Deleted Successfully',
          'SEO Keyword Page Deleted'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editSeokeywordPage(data: any) {
    const id = data.id;

    this.SeokeywordpageService.GetSeokeywordPage(id).subscribe({
      next: (response) => {
        this.editSeokeywordPageId = id;
        this.isUpdateMode = true;

        this.seoKeywordPageForm.patchValue({
          id: response.id,
          testId: response.testId,
          pageNumber: response.pageNo,
          ctitle: response.cTitle,
          cKeyword: response.cKeyword,
          cdesc: response.cDesc,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.isUpdateMode = false;
    this.editSeokeywordPageId = '',
     this.seoKeywordPageForm.reset();
  }
}
