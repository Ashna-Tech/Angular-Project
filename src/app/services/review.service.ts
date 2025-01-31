import { Injectable } from '@angular/core';
import { IreviewService } from '../core/services/I review.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { ReviewListEntity } from '../entity/Review/reviewList.entity';
import { ReviewListModel } from '../core/domain/Review/reviewList.model';
import { ReviewModel } from '../core/domain/Review/review.model';
import { ReviewEntity } from '../entity/Review/review.entity';

@Injectable({
  providedIn: 'root',
})
export class ReviewService extends IreviewService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateReview(
    name: string,
    image: string,
    exam: string,
    rollNo: string,
    review: string,
    examGroup: number[],
    rank: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/Review`;

    const formdata = new FormData();
    formdata.append('Name', name),
      formdata.append('Image', image),
      formdata.append('Exam', exam),
      formdata.append('RollNo', rollNo),
      formdata.append('Review', review),
      formdata.append('Rank', rank);
    //Append examgroup array
    examGroup.forEach((group) => {
      formdata.append('ExamGroup', group.toString());
    });

    return this.http.post<SimpleResponse>(url, formdata).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateReview(
    id: string,
    examGroup: number[],
    name: string,
    image: string,
    exam: string,
    rollNo: string,
    review: string,
    rank: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/Review`;

    const formdata = new FormData();
    formdata.append('Id', id),
      //Append examgroup array
      examGroup.forEach((group) => {
        formdata.append('ExamGroup', group.toString());
      });
    formdata.append('Name', name),
      formdata.append('Image', image),
      formdata.append('Exam', exam),
      formdata.append('RollNo', rollNo),
      formdata.append('Review', review),
      formdata.append('Rank', rank);
    return this.http.put<SimpleResponse>(url, formdata).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override GetReviewList(): Observable<ReviewListModel[]> {
    const url = `${baseUrl}/api/Review`;

    return this.http.get<ReviewListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override DeleteReview(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/Review/${id}`;

    return this.http.delete<SimpleResponse>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override GetReview(id: string): Observable<ReviewModel> {
    const url = `${baseUrl}/api/Review/${id}`;

    return this.http.get<ReviewEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
}
