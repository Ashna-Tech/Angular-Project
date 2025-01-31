import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { iNotificationService } from "../core/services/inotification.service";
import { NotificationListItemModel } from "../core/domain/notification/notification-list-item.model";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { Observable,map } from "rxjs";
import { baseUrl } from "../../environement";
import { NotificationListItemEntity } from "../entity/notification/notification-list-item.entity";
import { NotificationModel } from "../core/domain/notification/notification.model";

@Injectable({
    providedIn: 'root'
})

export class NotificationService  extends iNotificationService{

constructor(private http:HttpClient){
    super()
}

override createNotification(title: string, msg: string, img: string, linkUrl: string, notificationType: string,
    
    planType: string, plainId: string, mainCatId: string,examCatId: string, examId: string, testId: string,

    quizId: string, quizSubCatId: string, quizChapterId: string, quizTestId: string,  isWithName: string)
    
         :Observable<SimpleResponse> {

   const url = `${baseUrl}/api/Notification`;
   
   const formData = new FormData();
 
   formData.append('Title',title);
   formData.append('Msg', msg);
   formData.append('Img',img);
   formData.append('LinkUrl',linkUrl);
   formData.append('NotificationType',notificationType);
   formData.append('PlanType',planType);
   formData.append('PlainId',plainId);
   formData.append('MainCatId',mainCatId)
   formData.append('ExamCatId',examCatId)
   formData.append('ExamId',examId);
   formData.append('TestId',testId);
   formData.append('QuizId',quizId);
   formData.append('QuizSubCatId',quizSubCatId);
   formData.append('QuizChapterId',quizChapterId);
   formData.append('QuizTestId',quizTestId);
   formData.append('IsWithName',isWithName)

  return this.http.post <SimpleResponse>(url,formData).pipe(
        
                    map (response =>{
                        if(response.status){
                            return response.data;
                        }else {
                            throw new Error(response.msg);
                        }
                    })
                )


                }


override getNotificationList(): Observable <NotificationListItemModel[]> {

    const url = `${baseUrl}/api/Notification`;

return this.http.get <NotificationListItemEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error (response.msg);
        }
    })
)
}

override updateNotification(id: string, title: string, msg: string, img: string, linkUrl: string, notificationType: string,
    
planType: string, plainId: string,mainCatId: string, examCatId: string, examId: string, testId: string,quizId: string, 

quizSubCatId: string, quizChapterId: string,quizTestId: string, isWithName: string): Observable<SimpleResponse> { 


    const url = `${baseUrl}/api/Notification/${id}`;
    
    const formData = new FormData() ;
 
   formData.append('Id',id)
   formData.append('Title',title);
   formData.append('Msg', msg);
   formData.append('Img',img);
   formData.append('LinkUrl',linkUrl);
   formData.append('NotificationType',notificationType);
   formData.append('PlanType',planType);
   formData.append('PlainId',plainId);
   formData.append('MainCatId',mainCatId)
   formData.append('ExamCatId',examCatId)
   formData.append('ExamId',examId);
   formData.append('TestId',testId);
   formData.append('QuizId',quizId);
   formData.append('QuizSubCatId',quizSubCatId);
   formData.append('QuizChapterId',quizChapterId);
   formData.append('QuizTestId',quizTestId);
   formData.append('IsWithName',isWithName)
    
    
    return this.http.put <SimpleResponse> (url,formData).pipe(
             
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error (response.msg);
            }
        })
    )


}

override deleteNotification(id: string): Observable<SimpleResponse> {

    const url = `${baseUrl}/api/Notification/${id}`;
     
  return this.http.delete <SimpleResponse>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error (response.msg);
        }
    })
)

}

override getNotification(id: string) : Observable<NotificationModel> {
    

    const url = `${baseUrl}/api/Notification/${id}`;

    return this.http.get <SimpleResponse>(url).pipe(
            map (response=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error (response.msg);
            }
        })
    )
}

}
