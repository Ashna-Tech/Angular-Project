import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable,map } from 'rxjs';
import { blogLeftImgService } from '../../../services/blog left img.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-blog-left-image',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent],
  templateUrl: './blog-left-image.component.html',
  styleUrl: './blog-left-image.component.scss'
})
export class BlogLeftImageComponent implements OnInit {


  isUpdateMode: boolean  = false;
  blogLeftImgForm : FormGroup = new FormGroup({
    image : new  FormControl('',[]),
    imageSource : new FormControl('',[]),
    linkurl : new FormControl('',[Validators.required]),
    status : new FormControl('Yes',[Validators.required]),
  });

dataObs: Observable<any>|undefined;
tableCols: TableColType[] = [];
editBlogLeftImgID : string = '';

previewImageUrl:string = '';


@ViewChild('dttable') dttable : DataTableComponent | undefined;

constructor(private blogLeftImgService :blogLeftImgService , private toastrService:ToastrService){}

ngOnInit(): void {

  this.dataObs = this.blogLeftImgService.getBlogLeftImgList();
  
  this.tableCols = [

 {title : 'Image',data : 'img', type :'text'},
 {title :'Status',data:'isActive',type:'active-inactive'},
  ];
}

get blogLeftImg(){
  return this.blogLeftImgForm.get('image')
}
get ImageSource(){
  return this.blogLeftImgForm.get('imageSource')
}
get blogLeftImgLinkurl(){
  return this.blogLeftImgForm.get('linkurl')
}
get status(){
  return this.blogLeftImgForm.get('status')
}

createBlogLeftImg() {
  const blogLeftImg = this.ImageSource?.value;
  const blogLeftImgLinkurl= this.blogLeftImgLinkurl?.value;
  const status = this.status ?.value

this.blogLeftImgService.createBlogLeftImg(blogLeftImg,blogLeftImgLinkurl,status).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Created BlogLeftImg Successfully!!','create BlogLeft Image');
  }),
  error :(error =>{
    this.toastrService.error(error.message);
  })
})

  }


  onBannerImageUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogLeftImgForm.patchValue({
        'imageSource': file
      });

      const reader = new FileReader();
      reader.onload = e => this.previewImageUrl = reader.result as string;
  
      reader.readAsDataURL(file);
    }
  }

  updateCategory(blogLeftImgID:string) {

    const id = blogLeftImgID;
    const img = this.ImageSource?.value;
    const linkURL = this.blogLeftImgLinkurl?.value; 
    const status = this.status?.value;
  
    this.blogLeftImgService.updateBlogLeftImg(id,img,linkURL,status).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable();
        }
        this.toastrService.success('Updated BlogLeft image Successfully !!','Update BlogLeft Image');
      }),
      error : (error =>{
        this.toastrService.error(error.message);
      })
    })
    }

    deleteBlogLeftImg(data : any) {
       const id = data.id ;

       this.blogLeftImgService.removeBlogLeftImg(id).subscribe({
        next : (response =>{
          if(this.dttable){
            this.dttable.reloadTable();
          }
          this.toastrService.success('Delete blogLeft Image Successfully !!','Delete  Blog Left Image');
        }),
        error : (error =>{
          this.toastrService.error(error.message);
        })
       })
      }


editBlogLeftImg(data : any) {
 
  const id = data.id ;

  this.blogLeftImgService.getBlogLeftImg(id).subscribe({
    next : (response =>{
    
      this.editBlogLeftImgID = id ;
      this.isUpdateMode =true;

      this.blogLeftImgForm.patchValue({
        id : response.id,
        image : null,
        linkurl :response.linkURL,
        status : response.isActive ? "Yes" : "No"
      });
    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })
}

clearForm() {
this.isUpdateMode = false;
this.editBlogLeftImgID = '';
this.blogLeftImgForm.reset();
}

}