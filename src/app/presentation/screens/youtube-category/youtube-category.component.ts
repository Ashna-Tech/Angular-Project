import { Component,OnInit,ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { youtubeCategoryService } from '../../../services/youTube-category.service';
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-youtube-category',
    standalone: true,
    templateUrl: './youtube-category.component.html',
    styleUrl: './youtube-category.component.scss',
    imports: [FormsModule, ReactiveFormsModule, DataTableComponent]
})
export class YoutubeCategoryComponent implements OnInit {

  isUpdateMode : boolean = false;
  youTubeCategoryForm :FormGroup = new FormGroup({
    name: new FormControl('',  [Validators.required]),
    displayName : new FormControl('',[Validators.required]),
    orderNo: new FormControl(0,[Validators.required]),
    isHomeCategory: new FormControl('Yes',[Validators.required])
  });
  dataObs:Observable<any> | undefined;
  tableCols: TableColType[] = [];
  editYouTubeCategoryId : string = '';


  @ViewChild('dttable') dttable:DataTableComponent | undefined;


constructor(private youtubeCategoryService:youtubeCategoryService,private toastrService:ToastrService){}

ngOnInit(): void {
  this.dataObs = this.youtubeCategoryService.getYouTubeCategoryList();
  this.tableCols = [
    {title:'Name',data:'name',type:'text'},
    {title:'Display Name ',data:'displayName',type:'text'},
    {title : 'Order No. ', data :'orderNo',type : 'text'},
    {title:'Is Home Category',data:'isHomeCategory',type:'text'},
    
  ];
}
get youTubeCategoryName(){
return this.youTubeCategoryForm.get('name');
}
get youTubeDisplayName(){
  return this.youTubeCategoryForm.get('displayName');
}
get youTubeOrderNo(){
  return this.youTubeCategoryForm.get('orderNo');
}
get youTubeIsHomeCategory(){
  return this.youTubeCategoryForm.get('isHomeCategory');
}

createYouTubeCategory(){
  const Name = this.youTubeCategoryName?.value;
  const displayName = this.youTubeDisplayName?.value;
  const orderNo = this.youTubeOrderNo?.value;
  const isHomeCategory = this.youTubeIsHomeCategory?.value;
 
this.youtubeCategoryService.createYouTubeCategory(Name,displayName,orderNo,isHomeCategory).subscribe({
  next :(_response =>{
    if(this.dttable)
      this.dttable.reloadTable();
    this.toastrService.success('YouTube Categorycreated Successfully!!!','Create Youtube Category');
  }),
  error:(error =>{
    this.toastrService.error(error.message);
  })
})

this.youTubeCategoryForm.patchValue({
    name: "",
    displayName :"", 
    orderNo: "",
    isHomeCategory :"" 
})
}



updateYoutubeCategory(_youtubeId:string){
  const id = _youtubeId;
  const name = this.youTubeCategoryName?.value;
  const displayName = this.youTubeDisplayName?.value;
  const isHomeCategory = this.youTubeIsHomeCategory?.value;
  const orderNo = this.youTubeOrderNo?.value;

  this.youtubeCategoryService.updateYouTubeCategory(id,name,displayName,orderNo,isHomeCategory).subscribe({
    next : (_response =>{
        if(this.dttable)
          this.dttable.reloadTable();
        this.toastrService.success('Update Youtube Category successfully','Update Youtube')
    }),
    error:(error =>{
      this.toastrService.error(error.message);
    })
  })
  
}

deleteYouTubeCategory(data:any) {
  const id = data.id;

  this.youtubeCategoryService.removeyouTubeCategory(id).subscribe({
    next : (_response =>{
      if(this.dttable)
        this.dttable.reloadTable();
      this.toastrService.success('Delete YouTube Category Success !','Delete Youtube Category');
    }),
    error:(error=>{
      this.toastrService.error(error.message);
    })
  })
  }

clearForm(){
  this.editYouTubeCategoryId = '';
  this.isUpdateMode = false;
  this.youTubeCategoryForm.reset();
}

editYouTubeCategory(data:any){
const id = data.id;

this.youtubeCategoryService.getyouTubeCategory(id).subscribe({
  next:(response =>{
    
  this.editYouTubeCategoryId = id;
  this.isUpdateMode = true;

    this.youTubeCategoryForm.patchValue({
      id : response.id,
      name:response.name,
      displayName:response.displayName,
      orderNo : response.orderNo,
      isHomeCategory:response.isHomeCategory ? "Yes" : "No",      
    })
  }),
  error:(error =>{
    this.toastrService.error(error.message);
  })
})
}
}
