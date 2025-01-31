import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { BlogService } from '../../../services/Blog.service';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe } from '@angular/common';
import { CkeditorComponent } from '../../components/ckeditor/ckeditor.component';
import { FormsUtilsService } from '../../../services/formsUtils.service';
import { CommonListItemModel } from '../../../core/domain/common model';
import { CategoryService } from '../../../services/category.service';
import { subCategoryService } from '../../../services/subCategory.service';
import { chapterService } from '../../../services/chapter.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DataTableComponent,
    AsyncPipe,
    CkeditorComponent,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  isUpdateMode: boolean = false;
  blogForm: FormGroup = new FormGroup({
    thumbNail: new FormControl('', []),
    thumbNailSource: new FormControl('', []),
    blogtitle: new FormControl('', [Validators.required]),
    blogheading: new FormControl('', [Validators.required]),
    blogContent1: new FormControl('', [Validators.required]),
    blogContent2: new FormControl('', [Validators.required]),
    bannerImg: new FormControl('', []),
    bannerImgSource: new FormControl('', []),
    catId: new FormControl('', [Validators.required]),
    subcatId: new FormControl('', [Validators.required]),
    chapId: new FormControl('', [Validators.required]),
    quizid: new FormControl('', [Validators.required]),
    seotitle: new FormControl('', [Validators.required]),
    seoKeywords: new FormControl('', [Validators.required]),
    seoDescription: new FormControl('', [Validators.required]),
    altText: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editBlogId: string = '';

  previewThumbnailImg: string = '';

  previewBannerImg: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  @ViewChild('blogcontent1') blogContentcomp1: CkeditorComponent | undefined;

  @ViewChild('blogcontent2') blogContentcomp2: CkeditorComponent | undefined;

  categoryDropdown$: Observable<CommonListItemModel[]> | undefined;

  SubcategoryDropdown$: Observable<CommonListItemModel[]> | undefined;

  ChapterIdListDropdown$: Observable<CommonListItemModel[]> | undefined;

  QuizIdDropdownList$: Observable<any> | undefined;

  constructor(
    private BlogService: BlogService,
    private categoryService: CategoryService,
    private subcateService: subCategoryService,
    private chapterService: chapterService,
    private toastrService: ToastrService,
    private formsUtils: FormsUtilsService
  ) {}

  ngOnInit(): void {
    this.categoryDropdown$ = this.categoryService.getCategoryListIDwithName()

    this.dataObs = of([]);

    this.tableCols = [{ title: 'Blog Title', data: 'blogTitle', type: 'text' }];
  }
  get Thumbnail() {
    return this.blogForm.get('thumbNail');
  }

  get thumbnailSource() {
    return this.blogForm.get('thumbNailSource');
  }

  get BlogTitle() {
    return this.blogForm.get('blogtitle');
  }

  get BlogHeading() {
    return this.blogForm.get('blogheading');
  }
  get blogContent1() {
    return this.blogForm.get('blogContent1');
  }

  get BlogContent2() {
    return this.blogForm.get('blogContent2');
  }

  get BannerImage() {
    return this.blogForm.get('bannerImg');
  }
  get BannerImgSource() {
    return this.blogForm.get('bannerImgSource');
  }

  get CategoryId() {
    return this.blogForm.get('catId');
  }
  get SubCategory() {
    return this.blogForm.get('subcatId');
  }
  get ChapterId() {
    return this.blogForm.get('chapId');
  }

  get QuizId() {
    return this.blogForm.get('quizid');
  }

  get SeoTitle() {
    return this.blogForm.get('seotitle');
  }

  get SeoKeywords() {
    return this.blogForm.get('seoKeywords');
  }

  get SeoDescription() {
    return this.blogForm.get('seoDescription');
  }

  get altText() {
    return this.blogForm.get('altText');
  }

  setDataFormFromCkeditor() {
    const ckInputs = [
      { comp: this.blogContentcomp1, FormControlName: 'blogContent1' },
      { comp: this.blogContentcomp2, FormControlName: 'blogContent2' },
    ];

    this.formsUtils.setDataFormCkEditorToForm(ckInputs, this.blogForm);
  }

  onCategorySelect() {
    const CatId = this.CategoryId?.value;
    this.SubcategoryDropdown$ =
      this.subcateService.getSubcategoryIdWithName(CatId);
  }

  onSubCategorySelect() {
    const sCatId = this.SubCategory?.value;

    this.ChapterIdListDropdown$ =
      this.chapterService.getChapterIdwithname(sCatId);
  }

  onSelectChapter() {
    const ChapId = this.ChapterId?.value;
    this.dataObs = this.BlogService.getBloglist(ChapId);

    setTimeout(() => {
      this.dttable?.reloadTable();
    });
  }

  onSelectQuizId() {}

  createBlog() {
    this.setDataFormFromCkeditor();
    if (this.formsUtils.checkValidationErrors(this.blogForm)) {
      return;
    }
    const thumbnail = this.thumbnailSource?.value;
    const blogTitle = this.BlogTitle?.value;
    const BlogHeading = this.BlogHeading?.value;
    const BlogContent1 = this.blogContent1?.value;
    const BlogContent2 = this.BlogContent2?.value;
    const BannerImg = this.BannerImgSource?.value;
    const CategoryId = this.CategoryId?.value;
    const subCategoryId = this.SubCategory?.value;
    const ChapterId = this.ChapterId?.value;
    const QuizId = this.QuizId?.value;
    const SeoTitle = this.SeoTitle?.value;
    const SeoKeywords = this.SeoKeywords?.value;
    const SeoDescription = this.SeoDescription?.value;
    const AltText = this.altText?.value;

    this.BlogService.createBlog(
      thumbnail,
      blogTitle,
      BlogHeading,
      BlogContent1,
      BlogContent2,
      BannerImg,
      CategoryId,

      subCategoryId,
      ChapterId,
      QuizId,
      SeoTitle,
      SeoKeywords,
      SeoDescription,
      AltText
    ).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Created Blog Successfully !!',
          ' Blog Create'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  onThumbnail(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogForm.patchValue({
        thumbNailSource: file,
      });
      const reader = new FileReader();
      reader.onload = (e) => (this.previewThumbnailImg = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onBannerImg(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogForm.patchValue({
        bannerImgSource: file,
      });
      const reader = new FileReader();
      reader.onload = (e) => (this.previewBannerImg = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  updateBlog(updateBlogId: string) {
    this.setDataFormFromCkeditor();
    if (this.formsUtils.checkValidationErrors(this.blogForm)) {
      return;
    }
    const id = updateBlogId;
    const thumbNail = this.thumbnailSource?.value;
    const blogTitle = this.BlogTitle?.value;
    const blogHeading = this.BlogHeading?.value;
    const blogContent1 = this.blogContent1?.value;
    const blogContent2 = this.BlogContent2?.value;
    const bannerImage = this.BannerImgSource?.value;
    const categoryId = this.CategoryId?.value;
    const subCategory = this.SubCategory?.value;
    const chapterId = this.ChapterId?.value;
    const quizId = this.QuizId?.value;
    const seoTitle = this.SeoTitle?.value;
    const seoKeywords = this.SeoKeywords?.value;
    const seoDescription = this.SeoDescription?.value;
    const altText = this.altText?.value;

    this.BlogService.updateBlog(
      id,
      thumbNail,
      blogTitle,
      blogHeading,
      blogContent1,
      blogContent2,
      bannerImage,

      categoryId,
      subCategory,
      chapterId,
      quizId,
      seoTitle,
      seoKeywords,
      seoDescription,
      altText
    ).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Updated Blog Successfully !!',
          'Blog Update'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  deleteBlog(data: any) {
    const id = data.id;

    this.BlogService.removeBlog(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Deleted Blog Successfully !!',
          'Delete Blog'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }
  editBlog(data: any) {
    const id = data.id;

    this.BlogService.getBlogSingle(id).subscribe({
      next: (response) => {
        this.editBlogId = id;
        this.isUpdateMode = true;

        console.log(response.seoTitle);
        this.blogForm.patchValue({
          id: response.id,
          // thumbNail : null ,
          blogtitle: response.blogTitle,
          blogheading: response.blogHeading,
          blogContent1: response.blogContent1,
          blogContent2: response.blogContent2,
          // bannerImg : null ,
          catId: response.catId,
          subcatId: response.sCatId,
          chapId: response.chapId,
          quizid: response.quizId,
          seotitle: response.seoTitle,
          seoKeywords: response.seoKeywords,
          seoDescription: response.seoDescription,
          altText: response.altText,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.isUpdateMode = false;
    this.editBlogId = '';
    this.blogForm.reset();
  }
}
