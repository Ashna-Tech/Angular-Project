import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { AsyncPipe } from '@angular/common';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { Observable } from 'rxjs';
import { LawExMagazineService } from '../../../services/law-ex-magazine.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'jquery';


@Component({
  selector: 'app-law-ex-magazine',
  standalone: true,
  imports: [ReactiveFormsModule,DataTableComponent,AsyncPipe],
  templateUrl: './law-ex-magazine.component.html',
  styleUrl: './law-ex-magazine.component.scss'
})


export class LawExMagazineComponent implements OnInit {


  isUpdateMode : boolean = false ;
  LawExMagazineForm : FormGroup = new FormGroup({
    mid : new FormControl('',[]),
    issue : new FormControl('',[Validators.required]),
    testid : new FormControl('',[]),
    issuefortnightly : new FormControl('',[Validators.required]),
    issuemonth : new FormControl('',[Validators.required]),
    coverstory : new FormControl('',[Validators.required]),
    inbrief : new FormControl('',[Validators.required]),
    keyhighlights : new FormControl('',[Validators.required]),
    pdfFilename : new FormControl('',[]),
    bannerimage : new FormControl('',[]), 
    bannerimagesource : new FormControl('',[]),      
    seokeywords : new FormControl('',[Validators.required]),
    seodescription : new FormControl('',[Validators.required]),
  });

dataObs: Observable<any>|undefined;
tableCols : TableColType [] = [] ;
editLawExMagazineId : string = '';

previewBannerImg: string = '';

showpdfFileName : string = '' ;

@ViewChild('dttable') dttable : DataTableComponent | undefined

MidListDropdown$ : Observable <any[]> | undefined 

TestListDropdown$ : Observable <any[]> | undefined 

constructor(private LawExMagazineservice : LawExMagazineService,
  private toastrService : ToastrService
){}

ngOnInit(): void {
  
this.dataObs = this.LawExMagazineservice.getLawExMagazineList();

this.tableCols = [
// {title : 'Issue', data :'issue', type :'text'},
// {title :'Issue Fortnightly', data : 'issueFortnightly', type :'text'},  
{title : 'Issue Month', data : 'issueMonth', type :'text'},
{title : 'Active Status', data : 'isActive', type :'toggle'},
// {title : 'Cover Story', data :'coverStory', type :'text'},
// {title : 'In Brief', data :'inBrief', type :'text'},
// {title : 'Key Highlights', data :'keyHighlights', type :'text'},
// {title : 'Seo Keywords', data :'seoKeywords', type :'text'},
// {title :'Seo Description', data :'seoDescription', type :'text'}
];

}

get MID(){
  return this.LawExMagazineForm.get('mid')
}

get Issue(){
return this.LawExMagazineForm.get('issue')
}

get Testid(){
  return this.LawExMagazineForm.get('testid')
}

get Issuefortnightly(){
  return this.LawExMagazineForm.get('issuefortnightly')
}

get Issuemonth(){
  return this.LawExMagazineForm.get('issuemonth')
}

get Coverstory(){
  return this.LawExMagazineForm.get('coverstory')
}

get Inbrief(){
  return this.LawExMagazineForm.get('inbrief')
}

get Keyhighlights(){
  return this.LawExMagazineForm.get('keyhighlights')
}

get Pdffilename(){
  return this.LawExMagazineForm.get('pdfFilename')
}

get Bannerimage(){
  return this.LawExMagazineForm.get('bannerimage')
}

get Banneimgsource(){
  return this.LawExMagazineForm.get('bannerimagesource');
}

get Seokeywords(){
  return this.LawExMagazineForm.get('seokeywords')
}

get Seodescription(){
  return this.LawExMagazineForm.get('seodescription')
}   


onBannerImgUpload(event:any) {
  if (event.target.files.length>0){
    const file = event.target.files[0];
    this.LawExMagazineForm.patchValue({
    'bannerimagesource' : file
    });
    const reader = new FileReader();
    reader.onload = e=> this.previewBannerImg = reader.result as string ;
    reader.readAsDataURL(file);
  }

}


onPdfFileNameUpload(event: any) {
  if (event.target.files.length > 0) {
    const file = event?.target.files[0];
    this.LawExMagazineForm.patchValue({
      'pdfFilename' : file
    });

    const reader = new FileReader();
    reader.onload = e => this.showpdfFileName = reader.result as string ;

    reader.readAsDataURL(file)
  }
}

createLawExMagazine() {

  const mid = this.MID?.value;
  const issue = this.Issue?.value ;
  const testid = this.Testid?.value ;
  const issuefortnightly = this.Issuefortnightly?.value;
  const issuemonth = this.Issuemonth?.value;
  const coverstory = this.Coverstory?.value ;
  const inbrief = this.Inbrief?.value ;
  const keyhighlights = this.Keyhighlights?.value;
  const pdffilename = this.Pdffilename?.value;
  const Bannerimage = this.Banneimgsource?.value;
  const seokeywords = this.Seokeywords?.value;
  const seodescription = this.Seodescription?.value ;

this.LawExMagazineservice.createLawExMagazine(mid,issue,testid,issuefortnightly,issuemonth,coverstory,
  inbrief,keyhighlights,pdffilename,Bannerimage,seokeywords,seodescription).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Law Exam Magazine Created Successfully','Law Exam Magazine Created')
    }),
    error : (error =>{
      this.toastrService.error(error.message);
      
    })
    
  })
    
}


updateLawExMagazine(lawExmagazineUpdateId : string) {

const id = lawExmagazineUpdateId ;
const mid = this.MID?.value;
const issue = this.Issue?.value;
const testid = this.Testid?.value;
const issuefortnightly = this.Issuefortnightly?.value;
const issuemonth = this.Issuemonth?.value;
const coverstory = this.Coverstory?.value;
const inbrief = this.Inbrief?.value;
const keyhighlights = this.Keyhighlights?.value;
const pdffilename = this.Pdffilename?.value;
const bannerimage = this.Banneimgsource?.value;
const seokeywords = this.Seokeywords?.value
const seodescription = this.Seodescription?.value;


this.LawExMagazineservice.updateLawExMagazine(id,mid,issue,testid,issuefortnightly,issuemonth,coverstory,
  inbrief,keyhighlights,pdffilename,bannerimage,seokeywords,seodescription).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Law Exam Magazine Updated Successfully','Law Exam Magazine Update');
    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })

}

deleteLawExMagazine(data : any) {

  const id = data.id ;

  this.LawExMagazineservice.deleteLawExMagazine(id).subscribe({
    next : (response =>{
      if(this.dttable){
        this.dttable.reloadTable();
      }
      this.toastrService.success('Law Exam Magazine Delete Successfully', 'Law Exam Magazine Deleted');
    }),
    error : (error =>{
      this.toastrService.error(error.message);
    })
  })

  }
  

  editLawExMagazine(data : any) {
    
    const id = data.id ;

    this.LawExMagazineservice.getLawExMagazine(id).subscribe({
      next : (response =>{

    this.editLawExMagazineId = id ;
    this.isUpdateMode = true ;


    this.LawExMagazineForm.patchValue({
      id : response.id, 
      mid : response.mId,
      issue : response.issue,
      testid : response.testId,
      issuefortnightly : response.issueFortnightly,
      issuemonth : response.issueMonth,
      coverstory : response.coverStory,
      inbrief : response.inBrief,
      keyhighlights : response.keyHighlights,
      pdfFilename : null,
      bannerimage : null,      
      seokeywords : response.seoKeywords,
      seodescription : response.seoDescription,
    })
      }),
      error : (error =>{
        this.toastrService.error(error.message);
      })
    })


    }


    clearForm() {

      this.editLawExMagazineId = '';
      this.isUpdateMode = false ;
      this.LawExMagazineForm.reset();
      
      }
      
      }
      