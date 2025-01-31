import { Component,OnInit,ViewChild } from '@angular/core';
import { FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { CuetBlogService } from '../../../services/cuet-blog-.service';
import { ToastrService } from 'ngx-toastr';
import { CkeditorComponent } from '../../components/ckeditor/ckeditor.component';
import { FormsUtilsService } from '../../../services/formsUtils.service';




@Component({
  selector: 'app-cuet-blog',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,CkeditorComponent],
  templateUrl: './cuet-blog.component.html',
  styleUrl: './cuet-blog.component.scss'
})


export class CuetBlogComponent implements OnInit{


  isUpdateMode: boolean = false;
  cuetBlogForm: FormGroup = new FormGroup({
    thumbnail : new FormControl('',[]),
    thumbnailSource : new FormControl('',[]),
    blogtitle : new FormControl('',[Validators.required]),
    blogheading : new FormControl('',[Validators.required]),
    blogcontent1 : new FormControl('',[Validators.required]), 
    blogcontent2 : new FormControl('',[Validators.required]),
    bannerimg : new FormControl('',[]),
    bannerImgSource : new FormControl('',[]),
    seotitle : new FormControl('',Validators.required),
    seoKeywords : new FormControl('',[Validators.required]),
    seodescription : new FormControl('',[Validators.required]),
    alttext : new FormControl('',[Validators.required])
  });
  dataObs: Observable<any>|undefined;
  tableCols: TableColType[] = [] ;
  editCuetBlogId : string = ''; 
  
  previewThumbnailImg : string = "";

  previewBannerImg: string = "";


  @ViewChild('dttable') dttable : DataTableComponent | undefined ;

@ViewChild(' blogcontent1') blogContentcomp1 : CkeditorComponent| undefined ;

@ViewChild('blogcontent2') blogContentcomp2 : CkeditorComponent | undefined


  constructor(private cuetBlogService:CuetBlogService,
  private toastrService:ToastrService,
   private formsUtils:FormsUtilsService){}          
                    

ngOnInit(): void {
  this.dataObs = this.cuetBlogService.getCuetBlogList();
  this.tableCols=[
   {title : 'Blog Title', data : 'blogTitle',type: 'text'},
];
}
 
get cuetBlogThumbnail(){
  return this.cuetBlogForm.get('thumbnail')
}
get cuethumbnailSource(){
  return this.cuetBlogForm.get('thumbnailSource')
}
get cuetBlogTitle(){
  return this.cuetBlogForm.get('blogtitle')
}
get cuetBlogHeading(){
  return this.cuetBlogForm.get('blogheading')
}
get cuetBlogContent1(){
  return this.cuetBlogForm.get('blogcontent1')
}
get cuetBlogContent2(){
  return this.cuetBlogForm.get('blogcontent2')
}
get cuetBlogBannerImage(){
   return this.cuetBlogForm.get('bannerimg')
}
get bannerSource(){
  return this.cuetBlogForm.get('bannerImgSource')
}
get cuetBlogSeotitle(){
  return this.cuetBlogForm.get('seotitle')
}
get cuetBlogSeoKeywords(){
  return this.cuetBlogForm.get('seoKeywords')
}
get cuetBlogSeoDescription(){
  return this.cuetBlogForm.get('seodescription')
}
get cuetBlogAltText(){
  return this.cuetBlogForm.get('alttext')
}

setDatatoFormFromCkeditor(){
  const ckInput = [
   {comp : this.blogContentcomp1 , FormControlName : 'blogcontent1'},
   {comp : this.blogContentcomp2 , FormControlName : 'blogcontent2'}
  ];
  this.formsUtils.setDataFormCkEditorToForm(ckInput , this.cuetBlogForm)
}


createCuetBlog() {
this.setDatatoFormFromCkeditor();
if(this.formsUtils.checkValidationErrors(this.cuetBlogForm)){
  return
}
const cuetBlogThumbnail = this.cuethumbnailSource?.value ;
const cuetBlogTitle = this.cuetBlogTitle?.value ;
const cuetBlogHeading = this.cuetBlogHeading?.value;   
const cuetBlogContent1 = this.cuetBlogContent1?.value ;
const cuetBlogContent2 = this.cuetBlogContent2?.value ;
const cuetBlogBannerImage = this.bannerSource?.value ;
const cuetBlogSeotitle = this.cuetBlogSeotitle?.value ;
const cuetBlogSeoKeywords = this.cuetBlogSeoKeywords?.value ;
const cuetBlogSeoDescription = this.cuetBlogSeoDescription?.value ;
const cuetBlogAltText = this.cuetBlogAltText?.value;


this.cuetBlogService.createCuetBlog(cuetBlogThumbnail,cuetBlogTitle,cuetBlogHeading,cuetBlogContent1,cuetBlogContent2,cuetBlogBannerImage,
  
  cuetBlogSeotitle,cuetBlogSeoKeywords,cuetBlogSeoDescription,cuetBlogAltText).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('create Cuet Blog Successfully !!','Create Cuet Blog')
    }),
    error : (error =>{
      this.toastrService.error(error.message); 
    })
  })
  }

  onThumbnailimg(event: any) {
 if(event.target.files.length >0){
  const file = event.target.files[0];
  this.cuetBlogForm.patchValue({
    'thumbnailSource': file
  });

  const reader = new FileReader(); 
 reader.onload = e => this.previewThumbnailImg = reader.result as string ;

 reader.readAsDataURL(file);
} 
  }

  onBannerImg(event: any) {
    if(event.target.files.length >0){
      const file = event.target.files[0];
      this.cuetBlogForm.patchValue({
        'bannerImgSource' : file
      });
     
      const reader = new FileReader();
      reader.onload = e =>this.previewBannerImg = reader.result as string ; 
      
      reader.readAsDataURL(file);
    }
    }
    
  updateCuetBlog(cuetblogID : string) {
    this.setDatatoFormFromCkeditor();
if(this.formsUtils.checkValidationErrors(this.cuetBlogForm)){
  return
}
   const id = cuetblogID;
   const thumbnail = this.cuethumbnailSource?.value;
   const blogTitle = this.cuetBlogTitle?.value;
   const blogHeading = this.cuetBlogHeading?.value ;
   const blogContent1 = this.cuetBlogContent1?.value;
   const blogContent2 = this.cuetBlogContent2?.value;
   const bannerImg = this.bannerSource?.value;
   const seoTitle = this.cuetBlogSeotitle?.value;
   const seoKeywords = this.cuetBlogSeoKeywords?.value;
   const seoDescription = this.cuetBlogSeoDescription?.value;
   const altText = this.cuetBlogAltText?.value;


   this.cuetBlogService.updateCuetBlog(id,thumbnail,blogTitle,blogHeading,blogContent1,blogContent2,bannerImg,seoTitle,
    
    seoKeywords,seoDescription,altText,).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable();
        }
        this.toastrService.success('Updated cuet Blog Successfully !!', 'Update Cuet Blog');
      }),
      error:(error =>{
        this.toastrService.error(error.message)
      })
    })

    }

deleteCuetBlog(data: any) {
 
  const id = data.id;

  this.cuetBlogService.removeCuetBlog(id).subscribe({
    next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Deleted Cuet Blog Successfully !!','Delete Cuet Blog')
    }),
    error : (error =>{
      this.toastrService.error(error.message)
    })
  })
}


editCuetBlog(data: any) {

  const id = data.id;

this.cuetBlogService.getCuetBlog(id).subscribe({
  next : (response =>{
    this.editCuetBlogId = id;
    this.isUpdateMode = true;

    this.cuetBlogForm.patchValue({
    id : response.id ,
    thumbnail : null ,
    blogtitle : response.blogTitle,
    blogheading : response.blogHeading,
    blogcontent1 : response.blogContent1,
    blogcontent2 : response.blogContent2,
    bannerimg : null,
    seotitle : response.seoTitle,
    seoKeywords : response.seoKeywords,
    seodescription : response.seoDescription,
    alttext : response.altText,
    
     })
  }),
  error : (error =>{
    this.toastrService.error(error.message);
  })
})

  }
clearForm() {
this.editCuetBlogId = '';
this.isUpdateMode = false;
this.cuetBlogForm.reset();
}

}

