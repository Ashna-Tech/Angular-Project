import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable, of } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { ToastrService } from 'ngx-toastr';
import { CkeditorComponent } from '../../components/ckeditor/ckeditor.component';
import { FormsUtilsService } from '../../../services/formsUtils.service';
import { AsyncPipe } from '@angular/common';
import { BlogAuthorListItemModel } from '../../../core/domain/Blog Author/blog-author-List-Item.model';
import { BlogAuthorService } from '../../../services/blogAuthor.service';
import { CommonListItemModel } from '../../../core/domain/common model';
import { BlogCategoryService } from '../../../services/blogCategoryService';
import { BlogMasterService } from '../../../services/blog-Master.service';
import { BlogFAQComponent } from '../blog-faq/blog-faq.component';
import { ExamgroupsService } from '../../../services/examgroups.service';

@Component({
  selector: 'app-blog-master',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BlogFAQComponent,
    DataTableComponent,
    CkeditorComponent,
    AsyncPipe,
  ],
  templateUrl: './blog-master.component.html',
  styleUrl: './blog-master.component.scss',
})
export class BlogMasterComponent implements OnInit {
  summaryId: string = '';

  previewBannerImageUrl: string = '';

  previewThumbnail: string = '';

  isUpdateMode: boolean = false;
  blogMasterForm: FormGroup = new FormGroup({
    authorid: new FormControl(''),
    thumbnail: new FormControl(''),
    thumbnailSource: new FormControl(''),
    blogTitle: new FormControl('', [Validators.required]),
    blogHeading: new FormControl('', [Validators.required]),
    blogContent: new FormControl('', [Validators.required]),
    blogTag: new FormControl('', [Validators.required]),
    banner: new FormControl(''),
    bannerSource: new FormControl(''),
    readingTime: new FormControl('', [Validators.required]),
    isIndex: new FormControl('Yes', [Validators.required]),
    seoTitle: new FormControl('', [Validators.required]),
    seoKeywords: new FormControl('', [Validators.required]),
    seoDescription: new FormControl('', [Validators.required]),
    isFeaturePost: new FormControl('Yes', [Validators.required]),
    ishowindividualPage: new FormControl('Yes', [Validators.required]),
    groupId: new FormControl('', [Validators.required]),
    catId: new FormControl('', [Validators.required]),
  });

  editBlogMasterId: string = '';
  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];

  @ViewChild('dttable') dttable: DataTableComponent | undefined;
  @ViewChild('blogContent') blogContentCom: CkeditorComponent | undefined;

  authorListDropdown$: Observable<BlogAuthorListItemModel[]> | undefined;

  CategoryListDropdown$: Observable<CommonListItemModel[]> | undefined;

  groupListDropdown$: Observable<any> | undefined;

  @ViewChild(BlogFAQComponent) blogFaqs: BlogFAQComponent | undefined;

  constructor(
    private blogmasterService: BlogMasterService,
    private toastrService: ToastrService,
    private fromsUtils: FormsUtilsService,
    private blogAuthor: BlogAuthorService,
    private blogcategoryService: BlogCategoryService,
    private examgroupsService: ExamgroupsService
  ) {}

  ngOnInit(): void {
    this.authorListDropdown$ = this.blogAuthor.getBlogAuthorList();

    this.CategoryListDropdown$ =
      this.blogcategoryService.getBlogCategoryIdwithName();

    this.groupListDropdown$ =
      this.examgroupsService.getExamgroupsListIdwithname();

    this.dataObs = this.blogmasterService.getBlogMasterList();

    this.tableCols = [{ title: 'Blog Title', data: 'blogTitle', type: 'text' }];
  }

  get authorId() {
    return this.blogMasterForm.get('authorid');
  }
  get thumbnail() {
    return this.blogMasterForm.get('thumbnail');
  }
  get thumbnailSource() {
    return this.blogMasterForm.get('thumbnailSource');
  }
  get blogTitle() {
    return this.blogMasterForm.get('blogTitle');
  }
  get blogHeading() {
    return this.blogMasterForm.get('blogHeading');
  }
  get blogContent() {
    return this.blogMasterForm.get('blogContent');
  }
  get blogTag() {
    return this.blogMasterForm.get('blogTag');
  }
  get banner() {
    return this.blogMasterForm.get('banner');
  }

  get bannerSource() {
    return this.blogMasterForm.get('bannerSource');
  }
  get readingTime() {
    return this.blogMasterForm.get('readingTime');
  }
  get isindex() {
    return this.blogMasterForm.get('isIndex');
  }
  get seoTitle() {
    return this.blogMasterForm.get('seoTitle');
  }
  get seoKeywords() {
    return this.blogMasterForm.get('seoKeywords');
  }
  get seoDescription() {
    return this.blogMasterForm.get('seoDescription');
  }
  get isFeaturePost() {
    return this.blogMasterForm.get('isFeaturePost');
  }
  get isShowOnindividualPage() {
    return this.blogMasterForm.get('ishowindividualPage');
  }
  get viewCount() {
    return this.blogMasterForm.get('viewCount');
  }
  get groupId() {
    return this.blogMasterForm.get('groupId');
  }

  get catId() {
    return this.blogMasterForm.get('catId');
  }

  setDataToFormFromCkeditor() {
    const ckInputs = [
      { comp: this.blogContentCom, FormControlName: 'blogContent' },
    ];
    this.fromsUtils.setDataFormCkEditorToForm(ckInputs, this.blogMasterForm);
  }

  createBlogMaster() {
    this.setDataToFormFromCkeditor();
    if (this.fromsUtils.checkValidationErrors(this.blogMasterForm)) {
      return;
    }

    const authorId = this.authorId?.value;
    const thumbnail = this.thumbnailSource?.value;
    const blogTitle = this.blogTitle?.value;
    const blogHeading = this.blogHeading?.value;
    const blogContent = this.blogContent?.value;
    const blogTag = this.blogTag?.value;
    const banner = this.bannerSource?.value;
    const readingTime = this.readingTime?.value;
    const isindex = this.isindex?.value;
    const seoTitle = this.seoTitle?.value;
    const seoKeywords = this.seoKeywords?.value;
    const seoDescription = this.seoDescription?.value;
    const isFeaturePost = this.isFeaturePost?.value;
    const isShowOnindividualPage = this.isShowOnindividualPage?.value;
    
    const groupid = this.groupId?.value;
    const catid = this.catId?.value;

    const faqs = this.blogFaqs?.getFaqs();

    // console.log({faqs})

    this.blogmasterService
      .createBlogMaster(
        authorId,
        thumbnail,
        blogTitle,
        blogHeading,
        blogContent,
        blogTag,
        banner,
        readingTime,
        isindex,

        seoTitle,
        seoKeywords,
        seoDescription,
        isFeaturePost,
        isShowOnindividualPage,
        groupid,
        catid,
        faqs
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Created Blog Master succesfully !!',
            'Create Category'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  onBannerImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogMasterForm.patchValue({
        bannerSource: file,
      });
      const reader = new FileReader();
      reader.onload = (e) =>
        (this.previewBannerImageUrl = reader.result as string);

      reader.readAsDataURL(file);
    }
  }

  onThumbnail(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogMasterForm.patchValue({
        thumbnailSource: file,
      });
      const reader = new FileReader();
      reader.onload = (e) => (this.previewThumbnail = reader.result as string);

      reader.readAsDataURL(file);
    }
  }

  updateBlogMaster(blogMasterID: string) {
    this.setDataToFormFromCkeditor();
    if (this.fromsUtils.checkValidationErrors(this.blogMasterForm)) {
      return;
    }
    const id = blogMasterID;
    const authorId = this.authorId?.value;
    const thumbnail = this.thumbnailSource?.value;
    const blogTitle = this.blogTitle?.value;
    const blogHeading = this.blogHeading?.value;
    const blogContent = this.blogContent?.value;
    const blogTag = this.blogTag?.value;
    const banner = this.bannerSource?.value;
    const readingTime = this.readingTime?.value;
    const isIndex = this.isindex?.value;
    const seoTitle = this.seoTitle?.value;
    const seoKeywords = this.seoKeywords?.value;
    const seoDescription = this.seoDescription?.value;
    const isFeaturePost = this.isFeaturePost?.value;
    const isShowOnIndividualPage = this.isShowOnindividualPage?.value;
    const groupid = this.groupId?.value;
    const catid = this.catId?.value;
    const faqs = this.blogFaqs?.getFaqs();

    this.blogmasterService
      .updateBlogMaster(
        id,
        authorId,
        thumbnail,
        blogTitle,
        blogHeading,
        blogContent,
        blogTag,
        banner,
        readingTime,
        isIndex,
        seoTitle,
        seoKeywords,
        seoDescription,
        isFeaturePost,
        isShowOnIndividualPage,
        groupid,
        catid,
        faqs
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Updated blogMaster Successfully !!',
            'Update BlogMaster'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }
  deleteBlogMaster(data: any) {
    const id = data.id;

    this.blogmasterService.deleteBlogMaster(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Deleted Successfully blogMaster !!',
          'Delete blogMaster'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editBlogMaster(data: any) {
    const id = data.id;

    this.blogmasterService.getBlogMaster(id).subscribe({
      next: (response) => {
        this.editBlogMasterId = id;
        this.isUpdateMode = true;

        this.blogFaqs?.updateFaQList(response.faq);

        this.blogMasterForm.patchValue({
          id: response.id,
          authorid: response.authorId,
          thumbnail: null,
          blogTitle: response.blogTitle,
          blogHeading: response.blogHeading,
          blogContent: response.blogContent,
          blogTag: response.blogTag,
          banner: null,
          readingTime: response.readingTime,
          isIndex: response.isIndex ? 'Yes' : 'No',
          seoTitle: response.seoTitle,
          seoKeywords: response.seoKeywords,
          seoDescription: response.seoDescription,
          isFeaturePost: response.isFeaturePost ? 'Yes' : 'No',
          ishowindividualPage: response.isShowOnIndividualPage ? 'Yes' : 'No',
          groupId: response.groupId,
          catId: response.catId,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.editBlogMasterId = '';
    this.isUpdateMode = false;
    this.blogMasterForm.reset();
    this.previewThumbnail = '';
    this.previewBannerImageUrl = '';
    this.blogFaqs?.updateFaQList([]);
    this.blogMasterForm.patchValue({
      thumbnailSource: '',
      bannerSource: '',
    });
  }
}
