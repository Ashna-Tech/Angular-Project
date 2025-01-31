import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { Observable, of } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { ReviewService } from '../../../services/review.service';
import { ToastrService } from 'ngx-toastr';
import { ExamgroupsListIdwithnameModel } from '../../../core/domain/Examgroups/examgroups-list-idwithname.model';
import { MatOption } from '@angular/material/core';
import { AsyncPipe } from '@angular/common';
import { ExamgroupsService } from '../../../services/examgroups.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DataTableComponent,
    MatOption,
    AsyncPipe,
    MatSelectModule,
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent implements OnInit {
  isUpdateMode: boolean = false;

  ReviewForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', []),
    imageSource: new FormControl('', []),
    exam: new FormControl('', [Validators.required]),
    rollNumber: new FormControl('', [Validators.required]),
    review: new FormControl('', [Validators.required]),
    examGroup: new FormControl([]), // Array of ExamGroup
    rank: new FormControl('', [Validators.required]),
    isActive: new FormControl('', []),
  });

  dataObs: Observable<any[]> = of([]);
  tableCols: TableColType[] = [];
  editReviewId: string = '';

  previewImageUrl: string = '';

  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  examgroupList$: Observable<ExamgroupsListIdwithnameModel[]> | undefined;

  constructor(
    private reviewService: ReviewService,
    private toastrService: ToastrService,
    private examGroupsService: ExamgroupsService
  ) { }

  ngOnInit(): void {
    this.examgroupList$ = this.examGroupsService.getExamgroupsListIdwithname();
    this.dataObs = this.reviewService.GetReviewList();
    this.dataObs = of([]);
    this.tableCols = [
      { title: 'Name', data: 'name', type: 'text' },
      { title: 'Exam', data: 'exam', type: 'text' },
      { title: 'Roll No.', data: 'rollNo', type: 'text' },
      { title: 'Review', data: 'review', type: 'text' },
      { title: 'Active Status', data: 'isActive', type: 'toggle' },
    ];
  }

  get Name() {
    return this.ReviewForm.get('name');
  }

  get Image() {
    return this.ReviewForm.get('image');
  }

  get Imagesource() {
    return this.ReviewForm.get('imageSource');
  }

  get Exam() {
    return this.ReviewForm.get('exam');
  }

  get Rollnumber() {
    return this.ReviewForm.get('rollNumber');
  }

  get Review() {
    return this.ReviewForm.get('review');
  }

  get Rank() {
    return this.ReviewForm.get('rank');
  }

  createReview() {
    const name = this.Name?.value;
    const image = this.Imagesource?.value;
    const exam = this.Exam?.value;
    const rollnumber = this.Rollnumber?.value;
    const review = this.Review?.value;
    const rank = this.Rank?.value;
    const examGroup: number[] = (this.ReviewForm.get('examGroup') as FormArray)
      .value;

    this.reviewService
      .CreateReview(name, image, exam, rollnumber, review, examGroup, rank)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Review Created Successfully',
            'Review Created'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  onReviewImageUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.ReviewForm.patchValue({
        imageSource: file,
      });

      const reader = new FileReader();
      reader.onload = (e) => (this.previewImageUrl = reader.result as string);

      reader.readAsDataURL(file);
    }
  }

  updateReview(ReviewUpdateId: string) {
    const id = ReviewUpdateId;
    const examGroup: number[] = (this.ReviewForm.get('examGroup') as FormArray)
      .value;
    const name = this.Name?.value;
    const image = this.Imagesource?.value;
    const exam = this.Exam?.value;
    const rollnumber = this.Rollnumber?.value;
    const review = this.Review?.value;
    const rank = this.Rank?.value;

    this.reviewService
      .UpdateReview(id, examGroup, name, image, exam, rollnumber, review, rank)
      .subscribe({
        next: (response) => {
          if (this.dttable) {
            this.dttable.reloadTable();
          }
          this.toastrService.success(
            'Review Upadted Successfully',
            'Review Update'
          );
        },
        error: (error) => {
          this.toastrService.error(error.message);
        },
      });
  }

  deleteReview(data: any) {
    const id = data.id;

    this.reviewService.DeleteReview(id).subscribe({
      next: (response) => {
        if (this.dttable) {
          this.dttable.reloadTable();
        }
        this.toastrService.success(
          'Review Deleted Successfully',
          'Delete Review'
        );
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  editReview(data: any) {
    const id = data.id;

    this.reviewService.GetReview(id).subscribe({
      next: (response) => {
        this.editReviewId = id;
        this.isUpdateMode = true;

        this.ReviewForm.patchValue({
          id: response.id,
          name: response.name,
          image: null,
          exam: response.exam,
          rollNumber: response.rollNo,
          review: response.review,
          rank: response.rank,
          examGroup: response.examGroup,
        });
      },
      error: (error) => {
        this.toastrService.error(error.message);
      },
    });
  }

  clearForm() {
    this.editReviewId = '';
    this.isUpdateMode = false;
    this.ReviewForm.reset();
  }
}
