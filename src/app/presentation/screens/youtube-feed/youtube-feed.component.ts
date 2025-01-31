import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from "../../components/data-table/data-table.component";
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { youtubeFeedService } from '../../../services/youtube-feed.service';
import { AsyncPipe } from '@angular/common';
import { youTubeSubCategoryService } from '../../../services/youTubeSubCategory.service';
import { youtubeCategoryService } from '../../../services/youTube-category.service';
import { CommonListItemModel } from '../../../core/domain/common model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-youtube-feed',
  standalone: true,
  templateUrl: './youtube-feed.component.html',
  styleUrl: './youtube-feed.component.scss',
  imports: [DataTableComponent, ReactiveFormsModule, AsyncPipe]
})
export class YoutubeFeedComponent implements OnInit {


  isUpdateMode: boolean = false;
  youTubeFeedForm: FormGroup = new FormGroup({
    catid: new FormControl('', [Validators.required]),
    sCatId: new FormControl('', [Validators.required]),
    videoUrl: new FormControl('', [Validators.required]),
    videoTitle: new FormControl('', [Validators.required]),
    thumbNail: new FormControl('', [Validators.required]),
    homeorderNo: new FormControl('', [Validators.required]),
    isHomeVideo: new FormControl('Yes', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  // previewThumbnail: string = "";

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  youtubeCategoryDropDown$: Observable<CommonListItemModel[]> | undefined;

  youtubeSubCatDropDown$: Observable<CommonListItemModel[]> | undefined;

  constructor(private youtubeFeedService: youtubeFeedService,

    private youtubeCategoryservice: youtubeCategoryService,

    private youtubeSubCategoryService: youTubeSubCategoryService,

    private toastrService: ToastrService

  ) { }

  ngOnInit(): void {

    this.youtubeCategoryDropDown$ = this.youtubeCategoryservice.getYouTubeCategoryListIdwithName();

    this.dataObs = of([])

    this.tableCols = [
      { title: 'Thumbnail', data: 'thumbnail', type: 'text' },
    ];

  }

  get CategoryID() {
    return this.youTubeFeedForm.get('catid');
  }

  get SubCatID() {
    return this.youTubeFeedForm.get('sCatId');
  }

  get VideoURL() {
    return this.youTubeFeedForm.get('videoUrl');
  }
  get VideoTitle() {
    return this.youTubeFeedForm.get('videoTitle');
  }

  get ThumbNail() {
    return this.youTubeFeedForm.get('thumbNail');
  }
  get HomeOrderNo() {
    return this.youTubeFeedForm.get('homeorderNo');
  }

  get HomeVideo() {
    return this.youTubeFeedForm.get('isHomeVideo');
  }

  onSelectcatId() {
    const CatId = this.CategoryID?.value
    this.youtubeSubCatDropDown$ = this.youtubeSubCategoryService.getYouTubeSubcategoryListIdwithName(CatId);
  }

  onSelectSubcategory() {

    const SCatId = this.youTubeFeedForm.get('sCatId')?.value;
    this.dataObs = this.youtubeFeedService.getYouTubeFeedList(SCatId);

    setTimeout(() => {
      this.dttable?.reloadTable();
    });

  }

  createCategoryYoutubeFeed() {
    const catid = this.CategoryID?.value;
    const subCatId = this.SubCatID?.value;
    const videourl = this.VideoURL?.value;
    const videotitle = this.VideoTitle?.value;
    const thumbnail = this.ThumbNail?.value;
    const homeorderNo = this.HomeOrderNo?.value;
    const HomeVideo = this.HomeVideo?.value;

    this.youtubeFeedService.createYoutubeFeed(catid, subCatId, videourl, videotitle, thumbnail, homeorderNo, HomeVideo).subscribe({
      next: (_response => {
        if (this.dttable)
          this.dttable.reloadTable();
        this.toastrService.success('Youtube Feed Created Successfully! !!', 'Created Youtube feed')
      }),
      error: (error => {
        this.toastrService.error(error.message)
      })
    })
  }

  clearForm() {
    this.isUpdateMode = false;
    this.youTubeFeedForm.reset();

  }


}










