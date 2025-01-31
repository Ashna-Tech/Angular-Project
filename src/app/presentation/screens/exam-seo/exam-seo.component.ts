import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl,Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe} from '@angular/common';
import { Observable } from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { ViewChild } from '@angular/core';
import { IdExamTypeListModel } from '../../../core/domain/Exam type/id-ExamtypeList.model';
import { ExamSeoService } from '../../../services/Exam-seo-service';
import { ToastrService } from 'ngx-toastr';
import { ExamtypeService } from '../../../services/exam-type.service';
import { examMasterService } from '../../../services/exam-master.service';
import { examCategoryService } from '../../../services/exam-category.service';
import { examMasterListIdnameModel } from '../../../core/domain/exam-master-category/exam-masterList-Id-name.model';
import { CommonListItemModel } from '../../../core/domain/common model';

@Component({
  selector: 'app-exam-seo',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,AsyncPipe],
  templateUrl: './exam-seo.component.html',
  styleUrl: './exam-seo.component.scss'
})
export class ExamSeoComponent {


  isUpdateMode : boolean = false ;
 
  ExamSeoForm : FormGroup = new FormGroup({
    maincategory : new FormControl('',[]),
    examCategory : new FormControl('',[]),
    id : new FormControl('',[Validators.required]),
    pagetitle : new FormControl('',[Validators.required]),
    keyword : new FormControl('',[Validators.required]),
    description : new FormControl('',[Validators.required]),
    metaTag : new FormControl('',[Validators.required]),
    reviewcount : new FormControl('',[Validators.required]),
    rating : new FormControl('',[Validators.required]),
  });

dataObs: Observable<any>|undefined;
tableCols: TableColType [] =[] ;
editExamSeoId : string = '';

@ViewChild('dttable') dttable : DataTableComponent | undefined ;

MainCategoryListDropdown$ : Observable <examMasterListIdnameModel[]> | undefined ;

ExamCategoryListDropdown$ : Observable <CommonListItemModel[]> | undefined ;

ExamTypeListDropdown$ : Observable <IdExamTypeListModel[]> | undefined

constructor(private ExamSeoService : ExamSeoService,
  private examMasterService : examMasterService,
  private examCategoryService : examCategoryService,
 private toastrService : ToastrService,
 private examtypeservice : ExamtypeService
){}

ngOnInit(): void {
  // Call Main Category
 this.MainCategoryListDropdown$ = this.examMasterService.getexamMasterListIdwithName();

this.dataObs = this.ExamSeoService.getExamSeoList();

this.tableCols = [
{title : 'Page Title', data :'pageTitle', type : 'text'},
{title : 'Keyword', data : 'keyword', type :'text'},
{title : 'Description', data : 'description', type :'text'},
{title : 'Meta Tag', data : 'metaTag', type :'text'},
{title : 'Review Count', data :'reviewCount', type : 'text'},
{title : 'Value', data : 'rating', type :'text'},
];
}

//Call Exam Category on select MainCategory ===>>
onSelectMaincategory(){
  const MainCatId = this.ExamSeoForm.get('maincategory')?.value ;
this.ExamCategoryListDropdown$ = this.examCategoryService.getExamCategoryListIdwithname(MainCatId) ;
}


onSelectExamCategory(){
const ExamCatId = this.ExamSeoForm.get('examCategory')?.value;
this.ExamTypeListDropdown$ = this.examtypeservice.getExamTypeIdwithName(ExamCatId);


setTimeout(() => {
 this.dttable?.reloadTable(); 
});

}

get MainCategory(){
  return this.ExamSeoForm.get('maincategory') ;
}

get ExamCategory(){
  return this.ExamSeoForm.get('examCategory')
}

get ID(){
  return this.ExamSeoForm.get('id')
}

get Pagetitle(){
  return this.ExamSeoForm.get('pagetitle')
}

get Keyword(){
  return this.ExamSeoForm.get('keyword')
}

get Description(){
  return this.ExamSeoForm.get('description')
}

get MetaTag(){
  return this.ExamSeoForm.get('metaTag')
}

get Reviewcount(){
  return this.ExamSeoForm.get('reviewcount')
}

get Rating(){
  return this.ExamSeoForm.get('rating')
}

createExamSeo() { 
  const maincategory = this.MainCategory?.value ;
  const examCategory = this.ExamCategory?.value;
  const id = this.ID?.value;
  const pagetitle = this.Pagetitle?.value;
  const keyword = this.Keyword?.value;
  const description = this.Description?.value;
  const metatag = this.MetaTag?.value ;
  const reviewcount = this.Reviewcount?.value;
  const rating = this.Rating?.value;

    this.ExamSeoService.createExamSeo(id,pagetitle,keyword,description,metatag,
    reviewcount,rating).subscribe({
      next : (response =>{
        if(this.dttable){
          this.dttable.reloadTable();
        }
        this.toastrService.success('Exam Seo Create Successfully', ' Exam Seo created');
      }),
      error : (error =>{
        this.toastrService.error(error.message);
      })
    })


  }

  updateExamSeo(ExamSeoUpdateId : string) {
  const id = ExamSeoUpdateId ;
  const pagetitle = this.Pagetitle?.value;
  const keyword = this.Keyword?.value ;
  const description = this.Description?.value; 
  const metatag = this.MetaTag?.value;
  const reviewcount = this.Reviewcount?.value;
  const rating= this.Rating?.value;

this.ExamSeoService.updateExamSeo(id,pagetitle,keyword,description,metatag,reviewcount,
  rating).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Exam Seo Update Successfully', 'Exam Seo Updated');

    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })
    
    }

  
  deleteExamSeo(data : any) {
  
  const id = data.id ;
  
this.ExamSeoService.deleteExamSeo(id).subscribe({
  next : (response =>{
    if(this.dttable){
      this.dttable.reloadTable();
    }
    this.toastrService.success('Exam Seo Delete Successfully', 'Exam Seo Delete');
  }),
  error : (error =>{
    this.toastrService.error(error.message);
  })
})
  }
  
  editExamSeo(data : any) {

  const id = data.id ;

  this.ExamSeoService.getExamSeo(id).subscribe({
    next : (response=>{
      
this.editExamSeoId = id ;
this.isUpdateMode = true ;


this.ExamSeoForm.patchValue({
  id : response.id,
  pagetitle : response.pageTitle,
  keyword : response.keyword,
  description : response.description,
  metaTag : response.metaTag,
  reviewcount : response.reviewCount,
  rating : response.rating
});
    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })
  
}
clearForm() {

  this.editExamSeoId = '';
  this.isUpdateMode = false;
  this.ExamSeoForm.reset();
}

}
