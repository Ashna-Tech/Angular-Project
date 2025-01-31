import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BlogCategoryService } from '../../../services/blogCategoryService';
import { ToastrService } from 'ngx-toastr';
import { ExamgroupsService } from '../../../services/examgroups.service';
import { ExamgroupsListIdwithnameModel } from '../../../core/domain/Examgroups/examgroups-list-idwithname.model';




@Component({
  selector: 'app-blog-category',
  standalone: true,
  imports: [DataTableComponent,ReactiveFormsModule,AsyncPipe],
  templateUrl: './blog-category.component.html',
  styleUrl: './blog-category.component.scss'
})
export class BlogCategoryComponent implements OnInit {

  isUpdateMode : boolean = false;

  blogCategoryForm: FormGroup= new FormGroup({
    Name : new FormControl('',[Validators.required]),
    groupId : new FormControl('',[Validators.required]),
    activeStatus : new FormControl('Yes',[Validators.required])
  });
  tableCols: TableColType[]=[];
  dataObs: Observable<any>|undefined;
  editBlogCategoryId : string = "";
  
   
  @ViewChild('dttable') dttable: DataTableComponent | undefined;

  GroupListDropdown$ : Observable <ExamgroupsListIdwithnameModel[]> | undefined  


constructor(private BlogCategoryService:BlogCategoryService, 
  private toastrService:ToastrService,
private examGroupsService : ExamgroupsService ){}


ngOnInit(): void {

  this.GroupListDropdown$ = this.examGroupsService.getExamgroupsListIdwithname();

  this.dataObs = this.BlogCategoryService.getBlogCategoryList();
  this.tableCols = [
{title : 'Blog Category', data : 'name', type:'text'},
{title :'Active Status', data : 'isActive', type :'toggle'}
  ];
}

get name(){
   return this.blogCategoryForm.get('Name')
}
get groupid(){
  return this.blogCategoryForm.get('groupId')
}

get IsActiveStatus(){
  return this.blogCategoryForm.get('activeStatus')
}

createBlogCategory() {
const name = this.name?.value;
const groupid = this.groupid?.value;
const activeStatus = this.IsActiveStatus?.value;  

this.BlogCategoryService.createBlogCategory(name,groupid,activeStatus).subscribe({
  next : (response =>{
    console.log(response);
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Created Blog category Successfully !!','Create Blog Category')
  }),
  error : (error =>{
    console.log(error);
    this.toastrService.error(error.message);
  })
})

}

updateBlogCategory(blogId:string){
const id = blogId;
const name = this.name?.value;
const groupid = this.groupid?.value;
const activeStatus = this.IsActiveStatus?.value;

this.BlogCategoryService.updateBlogCategory(id,name,groupid,activeStatus).subscribe({
  next : (response =>{
    console.log(response);
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Update Blog Category Successfully','Update Blog Category');
  }),
  error:(error =>{
    console.log(error);
    this.toastrService.error(error.message);
  })
})

}
editBlogCategory(data: any) {
 const id = data.id;

this.BlogCategoryService.getBlogCategory(id).subscribe({
  next : (response =>{
    console.log(response)
    this.editBlogCategoryId = id ;
    this.isUpdateMode = true;


    this.blogCategoryForm.patchValue({
      id : response.id,
      Name : response.name,
      groupId : response.groupId,
      activeStatus : response.isActive ? "Yes" : "No",
    })
   
  }),
  error : (error =>{
    console.log(error);
    this.toastrService.error(error.message);
  })
})

}
deleteCategory(data:any) {
const id = data.id ;

this.BlogCategoryService.deleteBlogCategory(id).subscribe({
  next : (response =>{
    console.log(response);
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Deleted Category Successfully !!','Delete Category')
  }),
  error : (error =>{
    console.log(error);
    this.toastrService.error(error.message)
  })
})
}
clearForm() {
this.editBlogCategoryId = '';
this.isUpdateMode = false;
this.blogCategoryForm.reset();
}

}
