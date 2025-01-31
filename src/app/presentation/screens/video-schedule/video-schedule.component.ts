import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { VideoScheduleService } from '../../../services/video-schedule-service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category.service';
import { CommonListItemModel } from '../../../core/domain/common model';
import { subCategoryService } from '../../../services/subCategory.service';
import { chapterService } from '../../../services/chapter.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-video-schedule',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, ReactiveFormsModule, AsyncPipe, DataTableComponent],
  templateUrl: './video-schedule.component.html',
  styleUrl: './video-schedule.component.scss',
})

export class VideoScheduleComponent implements OnInit {
  isUpdateMode: boolean = false;
  VideoScheduleForm: FormGroup = new FormGroup({
    videotype: new FormControl('', []),
    videoid: new FormControl('', []),
    scheduletime: new FormControl('', []),
    title: new FormControl('', []),
    description: new FormControl('', []),
    chapterid: new FormControl('', []),
    subcategoryid: new FormControl('', []),
    categoryid: new FormControl('', []),
    videoDuration: new FormControl('', []),
    thumbfile: new FormControl('', []),
    thumbfileSource: new FormControl('', []),
    isActive: new FormControl('', []),
    isdemoclass: new FormControl('Yes', []),
    isfreeclass: new FormControl('Yes', []),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editVideoScheduleId: string = '';

  previewThumbfile: string = '';

  scheduletime: [''] | undefined;

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  VideoListDropdown$: Observable<any[]> | undefined;

  ChapterListDropdown$: Observable<CommonListItemModel[]> | undefined;

  SubcategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  CategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  constructor(
    private videoScheduleservice: VideoScheduleService,
    private toastrservice: ToastrService,
    private categoryservice: CategoryService,
    private subcatservice: subCategoryService,
    private chapterservice: chapterService
  ) { }

  ngOnInit(): void {
    this.CategoryListDropdown$ = this.categoryservice.getCategoryListIDwithName();

    this.dataObs = this.videoScheduleservice.getVideoScheduleList();
    this.tableCols = [
      { title: 'SrNo', data: 'srno', type: 'text' },
      { title: 'Category Name', data: 'videoType', type: 'text' },
      { title: 'ScheduleTime', data: 'scheduleTime', type: 'text' },
      { title: 'Title', data: 'title', type: 'text' },
      { title: 'Demo Class', data: 'demoClass', type: 'toggle' },
    ];
  }

  get Videotype() {
    return this.VideoScheduleForm.get('videotype');
  }

  get VideoID() {
    return this.VideoScheduleForm.get('videoid');
  }

  get Scheduletime() {
    return this.VideoScheduleForm.get('scheduletime');
  }

  get Title() {
    return this.VideoScheduleForm.get('title');
  }

  get Description() {
    return this.VideoScheduleForm.get('description');
  }

  get ChapterID() {
    return this.VideoScheduleForm.get('chapterid');
  }

  get SubcategoryID() {
    return this.VideoScheduleForm.get('subcategoryid');
  }

  get CategoryID() {
    return this.VideoScheduleForm.get('categoryid');
  }

  get Duration() {
    return this.VideoScheduleForm.get('duration');
  }

  get Thumfile() {
    return this.VideoScheduleForm.get('thumbfile');
  }

  get thumfilesource() {
    return this.VideoScheduleForm.get('thumbfileSource');
  }

  get IsdemoClass() {
    return this.VideoScheduleForm.get('isdemoclass');
  }

  get IsfreeClass() {
    return this.VideoScheduleForm.get('isfreeclass');
  }

  onSelectCategory() {
    const CatId = this.VideoScheduleForm.get('categoryid')?.value;
    this.SubcategoryListDropdown$ = this.subcatservice.getSubcategoryIdWithName(CatId);
  }

  onSelectSubCategory() {
    const SubCatId = this.VideoScheduleForm.get('subcategoryid')?.value;
    this.ChapterListDropdown$ = this.chapterservice.getChapterIdwithname(SubCatId);
  }

  onSelectChapter() { }

  onThumbFileUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.VideoScheduleForm.patchValue({
        thumbfileSource: file,
      });
      const reader = new FileReader();
      reader.onload = (e) => (this.previewThumbfile = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  createVideoSchedule() {
    const videotype = this.Videotype?.value;
    const videoid = this.VideoID?.value;
    const scheduletime = this.Scheduletime?.value;
    const title = this.Title?.value;
    const descriptiom = this.Description?.value;
    const chapterid = this.ChapterID?.value;
    const subcategoryid = this.SubcategoryID?.value;
    const categoryid = this.CategoryID?.value;
    const duration = this.Duration?.value;
    const thumbfile = this.thumfilesource?.value;
    const isdemoclass = this.IsdemoClass?.value;
    const isfreeclass = this.IsfreeClass?.value;

    this.videoScheduleservice
      .CreateVideoSchedule(
        videotype,
        videoid,
        scheduletime,
        title,
        descriptiom,
        chapterid,
        subcategoryid,
        categoryid,
        duration,
        thumbfile,
        isdemoclass,
        isfreeclass
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrservice.success(
            'Video Schedule Create Successfully',
            'video Schedule Created'
          );
        },
        error: (error) => {
          this.toastrservice.error(error.message);
        },
      });
  }

  updateVideoSchedule(videScheduleUpdateID: string) {
    const id = videScheduleUpdateID;
    const videotype = this.Videotype?.value;
    const videoid = this.VideoID?.value;
    const scheduletime = this.Scheduletime?.value;
    const title = this.Title?.value;
    const descriptiom = this.Description?.value;
    const chapterid = this.ChapterID?.value;
    const subcategoryid = this.SubcategoryID?.value;
    const categoryid = this.CategoryID?.value;
    const duration = this.Duration?.value;
    const thumbfile = this.thumfilesource?.value;
    const isdemoclass = this.IsdemoClass?.value;
    const isfreeclass = this.IsfreeClass?.value;

    this.videoScheduleservice
      .updateVideoSchedule(
        id,
        videotype,
        videoid,
        scheduletime,
        title,
        descriptiom,
        chapterid,
        subcategoryid,
        categoryid,
        duration,
        thumbfile,
        isdemoclass,
        isfreeclass
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrservice.success(
            'Video Schedule Update Successfully',
            'Video Schedule Update'
          );
        },
        error: (error) => {
          this.toastrservice.error(error.message);
        },
      });
  }

  deleteVideoSchedule(data: any) {
    const id = data.id;

    this.videoScheduleservice.deleteVideoSchedule(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrservice.success(
          'Video Schedule Delete Successfully',
          'Video Schedule Deleted'
        );
      },
      error: (error) => {
        this.toastrservice.error(error.message);
      },
    });
  }

  editVideoSchedule(data: any) {
    const id = data.id;

    this.videoScheduleservice.getVideoSchedule(id).subscribe({
      next: (response) => {
        this.editVideoScheduleId = id;
        this.isUpdateMode = true;

        this.VideoScheduleForm.patchValue({
          id: response.id,
          videotype: response.videoType,
          videoid: response.videoId,
          scheduletime: response.scheduleTime.substring(0, 16),
          title: response.title,
          description: response.description,
          chapterid: response.chapId,
          subcategoryid: response.subCatId,
          categoryid: response.catId,
          duration: response.duration,
          thumbfile: null,
          // isActive : response.isact
          isdemoclass: response.isDemoClass ? 'Yes' : 'No',
          isfreeclass: response.isFreeClass ? 'Yes' : 'No',
        });
      },
      error: (error) => {
        this.toastrservice.error(error.message);
      },
    });
  }

  clearForm() {
    this.editVideoScheduleId = '';
    this.isUpdateMode = false;
    this.VideoScheduleForm.reset();
  }
}
