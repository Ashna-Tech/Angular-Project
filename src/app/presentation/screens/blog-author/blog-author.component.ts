import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { BlogAuthorService } from '../../../services/blogAuthor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-author',
  standalone: true,
  imports: [DataTableComponent, ReactiveFormsModule],
  templateUrl: './blog-author.component.html',
  styleUrl: './blog-author.component.scss',
})
export class BlogAuthorComponent implements OnInit {
  isUpdateMode: boolean = false;
  blogAuthorForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    profileImage: new FormControl('', []),
    profileImageSource: new FormControl('', []),
    description: new FormControl('', [Validators.required]),
    facebookUrl: new FormControl('', [Validators.required]),
    twitterUrl: new FormControl('', [Validators.required]),
  });

  dataObs: Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editBlogAuthorCategoryId: string = '';

  ShowProfileImg: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  constructor(
    private blogAuthorService: BlogAuthorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataObs = this.blogAuthorService.getBlogAuthorList();

    this.tableCols = [{ title: 'Author Name', data: 'name', type: 'text' }];
  }

  get name() {
    return this.blogAuthorForm.get('name');
  }

  get profileImage() {
    return this.blogAuthorForm.get('profileImage');
  }

  get profileImageSource() {
    return this.blogAuthorForm.get('profileImageSource');
  }
  get description() {
    return this.blogAuthorForm.get('description');
  }
  get facebookURL() {
    return this.blogAuthorForm.get('facebookUrl');
  }
  get twitterURL() {
    return this.blogAuthorForm.get('twitterUrl');
  }

  createBlogAuthorCategory() {
    const Name = this.name?.value;
    const ProfileImage = this.profileImageSource?.value;
    const Description = this.description?.value;
    const FaceBookUrl = this.facebookURL?.value;
    const TwitterUrl = this.twitterURL?.value;

    this.blogAuthorService
      .createBlogAuthor(
        Name,
        ProfileImage,
        Description,
        FaceBookUrl,
        TwitterUrl
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Created Blog Authour Successfully !!',
            'Create Author'
          );
        },
        error: (error) => {
          console.log(error);
          this.toastrService.error(error.message);
        },
      });
  }

  onUploadProfileImg(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogAuthorForm.patchValue({
        profileImageSource: file,
      });

      const reader = new FileReader();
      reader.onload = (e) => (this.ShowProfileImg = reader.result as string);

      reader.readAsDataURL(file);
    }
  }

  updateBlogAuthorCategory(blogAuthorID: string) {
    const id = blogAuthorID;
    const name = this.name?.value;
    const profileImage = this.profileImage?.value;
    const Description = this.description?.value;
    const faceBookURL = this.facebookURL?.value;
    const twitterURL = this.twitterURL?.value;

    this.blogAuthorService
      .updateBlogAuthor(
        id,
        name,
        profileImage,
        Description,
        faceBookURL,
        twitterURL
      )
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Update Blog Author Successfully !!',
            'Update Blog Author'
          );
        },
        error: (error) => {
          console.log(error);
          this.toastrService.error(error.message);
        },
      });
  }

  deleteBlogAuthorCategory(data: any) {
    const id = data.id;

    this.blogAuthorService.deleteBlogAuthor(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Deleted Blog Author Successfully !!',
          'Delete Blog Author'
        );
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error(error.message);
      },
    });
  }

  editBlogAuthorCategory(data: any) {
    const id = data.id;

    this.blogAuthorService.getBlogAuthor(id).subscribe({
      next: (response) => {
        this.editBlogAuthorCategoryId = id;
        this.isUpdateMode = true;

        this.blogAuthorForm.patchValue({
          id: response.id,
          name: response.name,
          profileImage: null,
          description: response.description,
          facebookUrl: response.faceBookURL,
          twitterUrl: response.twitterURL,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.editBlogAuthorCategoryId = '';
    this.isUpdateMode = false;
    this.blogAuthorForm.reset();
  }
}
