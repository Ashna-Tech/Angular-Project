
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';  
import { blogPdfNewService } from '../../../services/blog-pdf-new.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-blog-pdf-new',
  standalone: true,
  imports: [DataTableComponent,ReactiveFormsModule],
  templateUrl: './blog-pdf-new.component.html',
  styleUrl: './blog-pdf-new.component.scss'
})
export class BlogPdfNewComponent implements OnInit {

  isUpdateMode: boolean = false;
  blogPdfNewForm : FormGroup = new FormGroup({
    pdftitle : new FormControl('',[Validators.required]),
    pdffile : new FormControl('',[Validators.required])
  });

editBlogPdfNewId :string = '';
tableCols: TableColType[] = [];
dataObs: Observable<any>|undefined;

showPdfFile : string = '';


@ViewChild('dttable') dttable : DataTableComponent | undefined;

constructor (private blogPdfNewService : blogPdfNewService , private toastrService : ToastrService){}

ngOnInit(): void {

  this.dataObs = this.blogPdfNewService.getblogPdfnewList();
  this.tableCols = [

    {title:'Title',data :'pdfTitle',type:'text'},
  ];
}
get newPdfTitle(){
  return this.blogPdfNewForm.get('pdftitle');
}
get newPdfFile(){
  return this.blogPdfNewForm.get('pdffile');
}


createBlogPdfNew(){
  const pdftitle = this.newPdfTitle?.value;
  const pdfFile = this.newPdfFile?.value;


  this.blogPdfNewService.createBlogPdfnew(pdftitle,pdfFile).subscribe({
    next :(response =>{
  
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Created Blog PDF New  Successfully','Create Blog PDF New')
    }) ,
    error: (error =>{
      this.toastrService.error(error.message);
    })
  })
}

onPdfFileUpload(event: any) {
  if(event.target.files.length > 0){
    const file = event?.target.files[0];
    this.blogPdfNewForm.patchValue({
     'pdffile': file
    });

    const reader = new FileReader();
    reader.onload = e => this.showPdfFile = reader.result as string ;

    reader.readAsDataURL(file)
  }

}


updateBlogPdfNew(updatePdfNew : string ) {
 const id = updatePdfNew;
 const pdftitle = this.newPdfTitle?.value;
 const pdfFile = this.newPdfFile?.value;
 

 this.blogPdfNewService.updateBlogPdfnew(id,pdftitle,pdfFile).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Upadted Blog PDF New Succssfully',' Updated Blog PDF New');
  }),
  error : (error =>{
    this.toastrService.error(error.message);
  })
 })
  }

deleteBlogPdfNew(data:any) {
const id = data.id ;

this.blogPdfNewService.removeBlogPdfNew(id).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Deleted Blog PDF New Successfully', 'Delete Blog PDF New');
  }),
  error :(error =>{
    this.toastrService.error(error.message);
  })
})
}
editBlogPdfNew(data : any) {
const id = data.id;

this.blogPdfNewService.getBlogPdfNew(id).subscribe({
  next : (response =>{
    
    this.editBlogPdfNewId = id ;
    this.isUpdateMode =true; 


    this.blogPdfNewForm.patchValue({
      id : response.id,
      pdftitle : response.pdfTitle,
      pdffile : null ,
     
    })
  }),
  error :(error =>{
    this.toastrService.error(error.message);
  })
})
}

clearForm() {
this.isUpdateMode = false;
this.editBlogPdfNewId = ''
this.blogPdfNewForm.reset();

}

  
  

}
