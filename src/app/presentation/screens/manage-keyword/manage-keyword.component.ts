import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable, of } from 'rxjs';
import { KeywordService } from '../../../services/keyword.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category.service';
import { subCategoryService } from '../../../services/subCategory.service';
import { chapterService } from '../../../services/chapter.service';
import { CommonListItemModel } from '../../../core/domain/common model';
import { FormsUtilsService } from '../../../services/formsUtils.service';


@Component({
  selector: 'app-manage-keyword',
  standalone: true,
  imports: [ReactiveFormsModule, DataTableComponent, AsyncPipe],
  templateUrl: './manage-keyword.component.html',
  styleUrl: './manage-keyword.component.scss'
})

export class ManageKeywordComponent implements OnInit {

  isUpdateMode: boolean = false;
  KeywordForm: FormGroup = new FormGroup({
    catid: new FormControl('', [Validators.required]),
    subCatid: new FormControl('', [Validators.required]),
    chapterid: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editKeywordId: string = '';


  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  categoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  SubcategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  ChapterListDropdown$: Observable<CommonListItemModel[]> | undefined;

  constructor(private keywordService: KeywordService,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private subcategoryService: subCategoryService,
    private chapterService: chapterService,
    private formsUtils: FormsUtilsService
  ) { }


  ngOnInit(): void {
    this.dataObs = of([]);
    // this.dataObs = this.keywordService.getKeywordList();
    this.tableCols = [
      { title: 'Keyword', data: 'name', type: 'text' },
      { title: 'Active Status', data: 'isActive', type: 'toggle' },
    ];

    this.categoryListDropdown$ = this.categoryService.getCategoryListIDwithName();
  }

  get CategoryID() {
    return this.KeywordForm.get('catid')
  }

  get SubcategoryID() {
    return this.KeywordForm.get('subCatid')
  }

  get ChapterID() {
    return this.KeywordForm.get('chapterid')
  }

  get Name() {
    return this.KeywordForm.get('name')
  }

  get Description() {
    return this.KeywordForm.get('description')
  }



  onCategorySelect() {
    const CatId = this.KeywordForm.get('catid')?.value;
    this.SubcategoryListDropdown$ = this.subcategoryService.getSubcategoryIdWithName(CatId);
  }

  onSubCategorySelect() {
    const SubCatId = this.KeywordForm.get('subCatid')?.value;
    this.ChapterListDropdown$ = this.chapterService.getChapterIdwithname(SubCatId)
  }


  onChapterSelect() {
    const chapterId = this.ChapterID?.value;
    this.dataObs = this.keywordService.getKeywordList(chapterId);

    setTimeout(() => {
      this.dttable?.reloadTable();
    });
  }

  createKeyword() {
    if(this.formsUtils.checkValidationErrors(this.KeywordForm, {
      catid:'Category',
      subCatid:'Sub Category',
      chapterid:'Chapter',
      name:'Keyword Name',
      description:'Keyword Description'
    })){
      return;
    }

    const chapter = this.ChapterID?.value;
    const name = this.Name?.value;
    const description = this.Description?.value;

    this.keywordService.createKeyword(chapter, name, description).subscribe({
      next: (response => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success('Manage Keyword Created Successfully', 'Create Manage Keyword');
      }),
      error: (error => {
        this.toastrService.error(error.message);
      })
    })
  }


  updateKeyword(KeyWordID: string) {
    if(this.formsUtils.checkValidationErrors(this.KeywordForm, {
      catid:'Category',
      subCatid:'Sub Category',
      chapterid:'Chapter',
      name:'Keyword Name',
      description:'Keyword Description'
    })){
      return;
    }

    const id = KeyWordID;
    const name = this.Name?.value;
    const description = this.Description?.value;

    this.keywordService.updateKeyword(id, name, description).subscribe({
      next: (response => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success('Manage Keyword Update Successfully', 'Update Manage Keyword');
      }),
      error: (error => {
        this.toastrService.error(error.message);
      })
    })
  }

  deleteKeyword(data: any) {
    const id = data.id;
    this.keywordService.deleteKeyword(id).subscribe({
      next: (response => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success('Manage Keyword Delete Successfully', 'Manage Keyword Deleted');
      }),
      error: (error => {
        this.toastrService.error(error.message);
      })
    })

  }


  editKeyword(data: any) {
    const id = data.id;

    this.keywordService.getkeywordSelect(id).subscribe({
      next: (response => {
        this.editKeywordId = id;
        this.isUpdateMode = true;

        this.KeywordForm.patchValue({
          id: response.id,
          name: response.name,
          catid: response.catId,
          subCatid: response.subCatId,
          chapterid: response.chapterId,
          description: response.description,
        });
      }),
      error: (error => {
        this.toastrService.error(error.message);
      })
    })

  }

  clearForm() {
    this.isUpdateMode = false;
    this.editKeywordId = '';

    this.KeywordForm.patchValue({
      name:'',
      description:''
    });
  }



}
