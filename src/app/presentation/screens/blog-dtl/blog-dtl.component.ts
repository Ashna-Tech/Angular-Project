import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { BlogDtlService } from '../../../services/blog dtl.service';
import { ToastrService } from 'ngx-toastr';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-blog-dtl',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,AsyncPipe],
  templateUrl: './blog-dtl.component.html',
  styleUrl: './blog-dtl.component.scss'
})
export class BlogDtlComponent implements OnInit {


  isUpdateMode: boolean = false;
  blogDtlForm: FormGroup = new FormGroup({
    blogId : new FormControl('',[Validators.required]),
    pdfTitle : new FormControl('',[Validators.required]),
    pdfName : new FormControl('',[Validators.required])
  });

dataObs: Observable<any>|undefined;
tableCols: TableColType[] =[];
editBlogDtlID: string ='';

showPDFNameFile : string = "" 

@ViewChild ('dttable') dttable : DataTableComponent | undefined ;

blogListDropDown$ : Observable <any> |  undefined 

constructor(private blogDtlService:BlogDtlService, private toastrService:ToastrService){}

ngOnInit(): void {
  this.dataObs = this.blogDtlService.getBlogDtlList();
  this.tableCols = [
    {title:'PDF Title', data:'pdfTitle',type:'text'},
    {title : 'PDF Name',data :'pdfName',type:'text'}
  ]
}
 get blogDtlId(){
  return this.blogDtlForm.get('blogId')
 }
get blogPdfTitle(){
  return this.blogDtlForm.get('pdfTitle')
}
get blogDtlPdfName(){
  return this.blogDtlForm.get('pdfName')
}

onPdfNameFileUpload(event : any){
if(event.target.files.length >0){
  const file = event?.target.files[0] ;
  this.blogDtlForm.patchValue({
 'pdfName' : file
  });

const reader = new FileReader() ;
reader.onload = e => this.showPDFNameFile = reader.result as string ;

reader.readAsDataURL(file)

}

}
  
createBlogDtl() {
  const blogDtl = this.blogDtlId?.value
  const blogPdfTitle = this.blogPdfTitle?.value
  const blogDtlPdfName = this.blogDtlPdfName?.value

this.blogDtlService.createBlogDtl(blogDtl,blogPdfTitle,blogDtlPdfName).subscribe({
  next :(response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Created Blog Detail Successfully !!','Create Blog Detail');
  }),error:(error =>[
    this.toastrService.error(error.message)
  ])
})
  }
  updateBlogDtl(blogDtlID:string) {
 const id = blogDtlID;
 const blogId = this.blogDtlId?.value ;
 const pdfTitle = this.blogPdfTitle?.value;
 const pdfName = this.blogDtlPdfName?.value;  


this.blogDtlService.updateBlogDtl(id,blogId,pdfTitle,pdfName).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success(' Updated Blog Detail Succesfully !!','Update Blog Detail')
  }),
  error:(error =>{
    this.toastrService.error(error.message);
  })
})
    }
deleteBlogDtl(data: any) {
 
  const id = data.id ;

this.blogDtlService.removeBlogdtl(id).subscribe({
  next :(response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Deleted Blog Detail Successfully !!','Delete Blog Details')
  }),
  error: (error =>{
    this.toastrService.error(error.message);
  })
})

}

editBlogDtl(data: any) {
  
  const id = data.id ;
 
  this.blogDtlService.getBlogDtl(id).subscribe({
    next : (response =>{
      
      this.editBlogDtlID = id ;
      this.isUpdateMode = true;
      
  
this.blogDtlForm.patchValue({
  id : response.id,
  blogId :response.blogId,
  pdfTitle : response.pdfTitle,
  pdfName : null 
})
    }),
    error:(error =>{
      this.toastrService.error(error.message);
    })
  })

  }


clearForm() {
  this.editBlogDtlID = '';
  this.isUpdateMode = false;
  this.blogDtlForm.reset();
}





}

