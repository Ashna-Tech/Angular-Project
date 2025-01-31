import { Observable } from 'rxjs';
import { NotificationListItemModel } from '../domain/notification/notification-list-item.model';
import { SimpleResponse } from '../domain/simple-response.model';
import { NotificationModel } from '../domain/notification/notification.model';

export abstract class iNotificationService {


  abstract createNotification(
    title: string,
    msg: string,
    img: string,
    linkUrl: string,
    notificationType: string,
    planType: string,
    plainId: string,
    mainCatId: string,
    examCatId: string,
    examId: string,
    testId: string,
    quizId: string,
    quizSubCatId: string,
    quizChapterId: string,
    quizTestId: string,
    isWithName: string
  ): Observable<SimpleResponse>;

  

  abstract getNotificationList(): Observable<NotificationListItemModel[]>;



  abstract updateNotification(
    id: string,
    title: string,
    msg: string,
    img: string,
    linkUrl: string,
    notificationType: string,
    planType: string,
    plainId: string,
    mainCatId: string,
    examCatId: string,
    examId: string,
    testId: string,
    quizId: string,
    quizSubCatId: string,
    quizChapterId: string,
    quizTestId: string,
    isWithName: string
  ): Observable<SimpleResponse>;



  abstract deleteNotification(id: string): Observable<SimpleResponse>;



  abstract getNotification(id: string): Observable<NotificationModel>;
    
  
}
