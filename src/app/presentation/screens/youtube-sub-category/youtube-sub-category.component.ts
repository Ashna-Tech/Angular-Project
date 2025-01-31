import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable, of } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { youTubeSubCategoryService } from '../../../services/youTubeSubCategory.service';
import { AsyncPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { youtubeCategoryService } from '../../../services/youTube-category.service';
import { CommonListItemModel } from '../../../core/domain/common model';

@Component({
  selector: 'app-youtube-sub-category',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DataTableComponent, AsyncPipe],
  templateUrl: './youtube-sub-category.component.html',
  styleUrl: './youtube-sub-category.component.scss',
})
export class YoutubeSubCategoryComponent implements OnInit {
  isUpdateMode: boolean = false;
  youTubeSubCatForm: FormGroup = new FormGroup({
    CatId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    videoOrder: new FormControl(0, [Validators.required]),
    playlistid: new FormControl('', [Validators.required]),
  });

  editYouTubeSubcatId: string = '';
  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  CategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  constructor(
    private youTubeSubCategoryService: youTubeSubCategoryService,
    private toastrService: ToastrService,
    private youtubecategoryService: youtubeCategoryService
  ) {}

  ngOnInit(): void {
    this.CategoryListDropdown$ =
      this.youtubecategoryService.getYouTubeCategoryListIdwithName();
    this.dataObs = of([]);
    this.dataObs = new Observable((observer) => {
      observer.next([]);
      observer.complete();
    });

    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Video Order', data: 'videoOrder', type: 'text'},
    ];
  }

  get CatId() {
    return this.youTubeSubCatForm.get('CatId');
  }

  get Name() {
    return this.youTubeSubCatForm.get('name');
  }

  get VideoOrder() {
    return this.youTubeSubCatForm.get('videoOrder');
  }

  get PlayListID() {
    return this.youTubeSubCatForm.get('playlistid');
  }

  createYouTubeSubCategory() {
    const catId = this.CatId?.value;
    const name = this.Name?.value;
    const videoOrder = this.VideoOrder?.value;
    const playlistid = this.PlayListID?.value;

    this.youTubeSubCategoryService
      .createYouTubeSubCategory(catId, name, videoOrder, playlistid)
      .subscribe({
        next: (_response) => {
          if (this.dttable) this.dttable.reloadTable();
          this.toastrService.success(
            'Youtube Sub category created Successfully !!',
            'Create Youtube SubCategory'
          );

          this.resetFrom();
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  onCatIdSelect() {
    const CatId = this.CatId?.value;
    this.dataObs =
      this.youTubeSubCategoryService.getYouTubeSubcategoryList(CatId);
    setTimeout(() => {
      this.dttable?.reloadTable();
    });
  }

  updateYoutubesubCategory(subYouTubeId: string) {
    const id = subYouTubeId;
    const name = this.Name?.value;
    const videoOrder = this.VideoOrder?.value;
    const playlistid = this.PlayListID?.value;

    this.youTubeSubCategoryService
      .updateYoutubesubCategory(id, name, videoOrder, playlistid)
      .subscribe({
        next: (_response) => {
          if (this.dttable) this.dttable.reloadTable();
          this.toastrService.success(
            'Update Youtube sub Category Successfully!!',
            'Update Youtube Subcategory'
          );
          this.resetFrom();
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  removeYouTubeSubCategory(data: any) {
    const id = data.id;

    this.youTubeSubCategoryService.removeYouTubeSubCategory(id).subscribe({
      next: (_response) => {
        if (this.dttable) this.dttable.reloadTable();
        this.toastrService.success(
          'Remove Youtube Sub Category Successfully !! ',
          'Remove Youtube Subcategory'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  resetFrom() {
    this.youTubeSubCatForm.patchValue({
      name: '',
      videoOrder: 0,
      playListId: '',
    });

    this.isUpdateMode = false;
    this.editYouTubeSubcatId = '';
  }

  clearForm() {
    this.editYouTubeSubcatId = '';
    this.isUpdateMode = false;
    this.youTubeSubCatForm.reset();
  }

  editYouTubeSubCategory(data: any) {
    const id = data.id;

    this.youTubeSubCategoryService.getYouTubeSubCategorySingle(id).subscribe({
      next: (response) => {
        this.editYouTubeSubcatId = id;
        this.isUpdateMode = true;

        this.youTubeSubCatForm.patchValue({
          id: response.id,
          name: response.name,
          CatId: response.catId,
          videoOrder: response.videoOrder,
          playlistid: response.playListId,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  deleteYouTubeSubCategory(data: any) {
    const id = data.id;
    this.youTubeSubCategoryService.removeYouTubeSubCategory(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Delete Youtubesub Category Successfully',
          'Deleted Youtube Subcategory'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
}
