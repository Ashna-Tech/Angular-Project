import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { ReviewListModel } from '../domain/Review/reviewList.model';
import { ReviewModel } from '../domain/Review/review.model';

export abstract class IreviewService {
  abstract CreateReview(
    name: string,
    image: string,
    exam: string,
    rollNo: string,
    review: string,
    examGroup : number[],
    rank: string
  ): Observable<SimpleResponse>;

  abstract GetReviewList(): Observable<ReviewListModel[]>;

  abstract UpdateReview(
    id: string,
    examGroup : number[],
    name: string,
    image: string,
    exam: string,
    rollNo: string,
    review: string,
    rank: string
  ): Observable<SimpleResponse>;

  abstract DeleteReview(id : string): Observable<SimpleResponse>;

  abstract GetReview(id : string): Observable<ReviewModel>;
}
