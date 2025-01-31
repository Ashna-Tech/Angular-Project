import { Component,ViewChild,OnInit } from '@angular/core';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';
import { ReactiveFormsModule,FormControl,FormGroup} from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { ToastrService } from 'ngx-toastr';
import { NotificationType } from '../../../core/enums/Notification-Type.enum';
import {SendTo } from '../../../core/enums/Send-to-enum';
import { SendType } from '../../../core/enums/Send-Type.enum';
import { ExamGroup } from '../../../core/enums/ExamGroups.enum';



@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {

  isUpdateMode : boolean = false;
  notificationForm : FormGroup = new FormGroup({
    sendTo : new FormControl('',[]),
    sendType : new FormControl('',[]),
    email : new FormControl('',[]),
    examgroup : new FormControl('',[]),
    isActive : new FormControl('Yes',[]),
    notificationType : new FormControl('',[]),
    title : new FormControl('',[]),
    message : new FormControl('',[]),
    image : new FormControl('',[]),
    imageSource : new FormControl('',[]),

  })

dataObs: Observable<any>|undefined;
tableCols: TableColType[] = [];
editNotificationId: string = "";

previewImg: string = ''; // property for preview image 

SelectApp = SendTo ; // Enum for Send To 

Sendtype = SendType ; //Enum for Send Type 

ExamGroup = ExamGroup ; //Enum for ExamGroup

NotificationTypeEnum = NotificationType ; // Enum for Notification Type 

 @ViewChild('dttable') dttable : DataTableComponent | undefined 

constructor(private notificationService : NotificationService,
private toastrService : ToastrService,
){}

ngOnInit(): void {
  this.dataObs = this.notificationService.getNotificationList()
 this.tableCols = [
  {title :'Title', data :'title', type : 'text'},
  {title : 'Message', data : 'msg', type : 'text'},
 ];
}


get SendTo(){
  return this.notificationForm.get('sendTo')
}

get SendType(){
  return this.notificationForm.get('sendType')
}

get Email(){
  return this.notificationForm.get('email')
} 

get Examgroup(){
  return this.notificationForm.get('examgroup')
}

get Isactive(){
  return this.notificationForm.get('isActive')
}

get NotificationType(){
  return this.notificationForm.get('notificationType')
}

get Title(){
  return this.notificationForm.get('title')
}
get Message(){
  return this.notificationForm.get('message')
}

get Image(){
  return this.notificationForm.get('image')
}
get ImageSource(){
  return this.notificationForm.get('imageSource')
}

createNotification() {
  const sendto = this.SendTo?.value ;
  const sendtype = this.SendType?.value ;
  const email = this.Email?.value ;
  const examgroup = this.Examgroup?.value ;
  const isactive = this.Isactive?.value ;
  const notificationtype = this.NotificationType?.value ;
  const title = this.Title?.value ;
  const message = this.Message?.value ;
  const image = this.ImageSource?.value ;

// this.notificationService.createNotification().subscribe({
//   next : (response =>{
//     if(this.dttable){
//       this.dttable.reloadTable();
//       this.toastrService.success('Create Notification Successfully !!','Created Notification')
//     }
//   }),
//   error : (error =>{
//     this.toastrService.error(error.message)
//   })
// })

this.notificationForm.patchValue({
    title : "",
    msg : "",
    linkurl : "",
    notificationTyp :"", 
    planTyp : "",
    iswithname : "",  
})

  }
  onUploadImage(event: any) {
    if(event.target.files.length>0){
      const file = event.target.files[0] ;
      this.notificationForm.patchValue({
      'imageSource' : file 
      });
      const reader = new FileReader();
      reader.onload = e=> this.previewImg = reader.result as string ;
      reader.readAsDataURL(file);
    }
  
  }
    
  updateNotification(NotficationId: string) {
    const id = NotficationId ;
    const sendto = this.SendTo?.value ;
    const sendtype = this.SendType?.value ;
    const email = this.Email?.value ;
    const examgroup = this.Examgroup?.value ;
    const isactive = this.Isactive?.value ;
    const notificationtype = this.NotificationType?.value ;
    const title = this.Title?.value ;
    const message = this.Message?.value ;
    const image = this.ImageSource?.value ;
  

// this.notificationService.updateNotification(id,sendto,sendtype,email,examgroup,isactive,notificationtype,title,message,image ).subscribe({
//     next : (response =>{
//       if(this.dttable){
//         this.dttable.reloadTable();
//         this.toastrService.success('Update Notificatuon Successfully  !!','Update Notification')
//       }
//     }),
//     error : (error =>{
//       this.toastrService.error(error.message);
//     })
//   })
    }

deleteNotification(data : any) {

  const id = data.id ;

  this.notificationService.deleteNotification(id).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
        this.toastrService.success('Delete Notification Successfully !!','Delete Notification')
      }
    })
    
  })
}

editNotification(data : any) {
 
  const id = data.id ;

this.notificationService.getNotification(id).subscribe({
  next : (response =>{
    this.editNotificationId = id ;
    this.isUpdateMode = true ;

this.notificationForm.patchValue({
  // id : 
  // sendTo : 
  // sendType : 
  // email : 
  // examgroup :
  // isActive : 
  // notificationType : 
  // title : 
  // message :
  // image : 
})
  }),
  error : (error =>{
    this.toastrService.error(error.message)
  })
})

}
clearForm() {
this.editNotificationId = "";
this.isUpdateMode = false ;
this.notificationForm.reset();

}



}


