import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableComponent } from '../../components/data-table/data-table.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable} from 'rxjs';
import { TableColType } from '../../../core/domain/datatable/DataTableCol.model';
import { AsyncPipe } from '@angular/common';
import { sliderImgService } from '../../../services/sliderimage.service';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { examCategoryService } from '../../../services/exam-category.service';
import { CommonListItemModel } from '../../../core/domain/common model';


@Component({
  selector: 'app-sliderimage',
  standalone: true,
  imports: [DataTableComponent,ReactiveFormsModule,AsyncPipe],
  templateUrl: './sliderimage.component.html',
  styleUrl: './sliderimage.component.scss'
})
export class SliderimageComponent implements OnInit {


  isUpdateMode: boolean = false;
  sliderImgForm : FormGroup = new FormGroup({
    showplace : new FormControl('',[Validators.required]),
    showMaincat : new FormControl('',[Validators.required]),
    showExamCat : new FormControl('',[Validators.required]),
    buyPlanid : new FormControl('',[Validators.required]),
    image : new FormControl('',[]),
    imageSource : new FormControl('',[]),
    linkurl : new FormControl('',[Validators.required]),
    actiontype : new FormControl('',[Validators.required]),
    plantype : new FormControl('',[Validators.required]),
    planId : new FormControl('',[Validators.required]),
    mainCat : new FormControl('',[Validators.required]),
    examCat : new FormControl('',[Validators.required]),
    examId : new FormControl('',[Validators.required]),
    testId : new FormControl('',[Validators.required]),
    quizCatId : new FormControl('',[Validators.required]),
    quizCatName : new FormControl('',[Validators.required]),
    quizImgIcon : new FormControl('',[]),
    QuizSourceImageIcon : new FormControl('',[]),
    quizIconBackcolor : new FormControl('#000',[Validators.required]),
    quizSubCatId : new FormControl('',[Validators.required]),
    quizChapId : new FormControl('',[Validators.required]),
    quizChapter : new FormControl('',[Validators.required]),
    quizTestId : new FormControl('',[Validators.required]),
    groupId : new FormControl('',[Validators.required])
  }) 

  dataObs: Observable<any>|undefined;
  tableCols: TableColType[] = [];
  editSlidImgId : string = "";  

  previewImage = "" 

  previewQuizImageIcon = ""

@ViewChild('dttable') dttable : DataTableComponent | undefined 

ShowExamListDropDown$ : Observable <any> | undefined 

showMainCatIdListDropDown$ : Observable <any> | undefined

planIdListDropDown$ : Observable <any> | undefined 

buyPlanListDropDown$ : Observable <any> | undefined 

mainCategoryListDropDown$ : Observable <CommonListItemModel[]> | undefined 

examCategoryListDropDown$: Observable <any> | undefined

examIdListDropDown$: Observable<any>| undefined 

testIdListDropDown$ : Observable <any> | undefined 

quizCategoryListDropDown$ : Observable <any> | undefined 

quizSubCatListDropDown$  : Observable <any> | undefined 

quizTestListDropDown$ : Observable <any> | undefined 
  
quizChapterListDropDown$ : Observable <any> | undefined 

groupListDropDown$ : Observable <any> | undefined 

constructor (private sliderImgService :sliderImgService, 
  private toastrService : ToastrService,
  private examcategoryservice : examCategoryService
){}

ngOnInit(): void {

  this.dataObs = this.sliderImgService.getSliderImgList();

  this.tableCols = [
    {title :'Show Place', data : 'showPlace', type :'text'},
    {title : 'Quiz Category Name', data : 'quizCategoryName', type :'text'},
  ];
}

get ShowPlace(){
  return this.sliderImgForm.get('showplace')
}
get ShowMainCategory(){
  return this.sliderImgForm.get('showMaincat')
}
get ShowExamCategory(){
  return this.sliderImgForm.get('showExamCat')
}
get ShowBuyPlaId(){
  return this.sliderImgForm.get('buyPlanid')
}
get Image(){
  return this.sliderImgForm.get('image')
} 
get ImageSource(){
  return this.sliderImgForm.get('imageSource')
}
get LinkUrl(){
  return this.sliderImgForm.get('linkurl')
}
get ActionType(){
  return this.sliderImgForm.get('actiontype')
}
get PlanType(){
  return this.sliderImgForm.get('plantype')
}
get PlanId(){
  return this.sliderImgForm.get('planId')
}
get MainCategory(){
  return this.sliderImgForm.get('mainCat')
} 
get ExamCategory(){
  return this.sliderImgForm.get('examCat')
}
get ExamId(){
  return this.sliderImgForm.get('examId')
}
get TestId(){
  return this.sliderImgForm.get('testId')
}
get QuizCategoryId(){
  return this.sliderImgForm.get('quizCatId')
}
get QuizCategoryName(){
  return this.sliderImgForm.get('quizCatName')
}
get QuizImageIcon(){
  return this.sliderImgForm.get('quizImgIcon')
}
get QuizSoureImgIcon(){
  return this.sliderImgForm.get('QuizSourceImageIcon')
}
get QuizIconBackColor(){
  return this.sliderImgForm.get('quizIconBackcolor')
}
get QuizSubCategoryId(){
  return this.sliderImgForm.get('quizSubCatId')
}
get QuizChapterId(){
  return this.sliderImgForm.get('quizChapId')
}
get QuizChapter(){
  return this.sliderImgForm.get('quizChapter')
}
get QuizTestId(){
  return this.sliderImgForm.get('quizTestId')
}
get GroupId(){
  return this.sliderImgForm.get('groupId')
}




onSelectShowExamCategory() {
throw new Error('Method not implemented.');
}


onSelectShowmainCategory() {
throw new Error('Method not implemented.');
}


onSelectPlanId() {
throw new Error('Method not implemented.');
}

onSelectBuyPlanids() {
throw new Error('Method not implemented.');
}


onSelectMainCategory() {
throw new Error('Method not implemented.');
}


onSelectExamCategory() {
throw new Error('Method not implemented.');
}
onSelectExam() {
throw new Error('Method not implemented.');
}

onSelectTest() {
throw new Error('Method not implemented.');
}
onSelectQuizCategory() {
throw new Error('Method not implemented.');
}       
onSelectQuizSubCategory() {
throw new Error('Method not implemented.');
}

onSelectQuizTest() {
throw new Error('Method not implemented.');
}
onSelectQuizChapter() {
throw new Error('Method not implemented.');
}

onSelectGroup() {
throw new Error('Method not implemented.');
}


createSlidImg() {
const Showplace = this.ShowPlace?.value;
const showMaincategory = this.ShowMainCategory?.value
const ShowExamcategory = this.ShowExamCategory?.value
const BuyPlanId = this.ShowBuyPlaId?.value 
const Image = this.ImageSource?.value
const Linkurl = this.LinkUrl?.value 
const ActionType = this.ActionType?.value
const PlanType = this.PlanType?.value
const PlanId = this.PlanId?.value
const MainCategory = this.MainCategory?.value
const ExamCategory = this.ExamCategory?.value
const ExamId = this.ExamId?.value
const Testid = this.TestId?.value
const QuizCategoryId = this.QuizCategoryId?.value
const QuizCategoryName = this.QuizCategoryName?.value
const QuizImgicon = this.QuizSoureImgIcon?.value
const QuizIconbackColor = this.QuizIconBackColor?.value
const QuizSubCategoryId = this.QuizSubCategoryId?.value
const QuizChapterId  = this.QuizChapterId?.value
const QuizChapter = this.QuizChapter?.value
const QuizTestId = this.QuizTestId?.value
const GroupId = this.GroupId?.value

this.sliderImgService.createSliderImg(Showplace,showMaincategory,ShowExamcategory,BuyPlanId,Image,Linkurl,ActionType,

PlanType,PlanId,MainCategory,ExamCategory,ExamId,Testid,QuizCategoryId,QuizCategoryName,QuizImgicon,QuizIconbackColor,

QuizSubCategoryId,QuizChapterId,QuizChapter,QuizTestId,GroupId).subscribe({
next : (response =>{
if(this.dttable)
this.dttable.reloadTable();
this.toastrService.success('Image Slider Created Successfully !!', 'Create Image Slider')
}),
error :(error =>{
this.toastrService.error(error.message)
})
})


this.sliderImgForm.patchValue({
  showplace : "", 
    linkurl : "",
    actiontype : "",
    plantype : "",
    quizCatName : "",
    quizChapter : "",

})

}
onShowImage(event: any) {
  if(event.target.files.length>0){
   const file = event.target.files[0];
   this.sliderImgForm.patchValue({
    'imageSource' : file
   });
   const reader = new FileReader();
   reader.onload = e=> this.previewImage = reader.result as string ;
   reader.readAsDataURL(file);
  }
}

onShowQuizImgIcon(event: any) {
  if(event.target.files.length>0){
   const file = event.target.files[0];
   this.sliderImgForm.patchValue({
    'QuizSourceImageIcon' : file
   });
   const reader = new FileReader();
   reader.onload = e=> this.previewQuizImageIcon = reader.result as string ;
   reader.readAsDataURL(file);
  }
}


updateSlideImg(IdSliderImg: string) {

  const id = IdSliderImg 
  const Showplace = this.ShowPlace?.value;
  const showMaincategory = this.ShowMainCategory?.value
  const ShowExamcategory = this.ShowExamCategory?.value
  const BuyPlanId = this.ShowBuyPlaId?.value 
  const Image = this.ImageSource?.value
  const Linkurl = this.LinkUrl?.value 
  const ActionType = this.ActionType?.value
  const PlanType = this.PlanType?.value
  const PlanId = this.PlanId?.value
  const MainCategory = this.MainCategory?.value
  const ExamCategory = this.ExamCategory?.value
  const ExamId = this.ExamId?.value
  const Testid = this.TestId?.value
  const QuizCategoryId = this.QuizCategoryId?.value
  const QuizCategoryName = this.QuizCategoryName?.value
  const QuizImgicon = this.QuizSoureImgIcon?.value
  const QuizIconbackColor = this.QuizIconBackColor?.value
  const QuizSubCategoryId = this.QuizSubCategoryId?.value
  const QuizChapterId  = this.QuizChapterId?.value
  const QuizChapter = this.QuizChapter?.value
  const QuizTestId = this.QuizTestId?.value
  const GroupId = this.GroupId?.value

  
  this.sliderImgService.updateSliderImg(id,Showplace,showMaincategory,ShowExamcategory,BuyPlanId,Image,Linkurl,ActionType,

    PlanType,PlanId,MainCategory,ExamCategory,ExamId,Testid,QuizCategoryId,QuizCategoryName,QuizImgicon,QuizIconbackColor,
    
    QuizSubCategoryId,QuizChapterId,QuizChapter,QuizTestId,GroupId).subscribe({
      next : (response =>{
        if(this.dttable)
          this.dttable.reloadTable();
        this.toastrService.success('Update Image Slider Successfully !!','Update Image Slider')
      }),
      error: (error =>{
        this.toastrService.error(error.message)
      })
    })
  }
  
  deleteSlidImg(data : any) {
     
  const id = data.id ;
  this.sliderImgService.deleteSliderImage(id).subscribe({
    next : (response =>{
      if(this.dttable)
        this.dttable.reloadTable();
      this.toastrService.success('Deleted Successfully Slider Image !!','Delete Slider Image')
    }),
    error: (error =>{
      this.toastrService.error(error.message)
    })
  }) 
    }

    editSlidImg(data : any) {
     
      const id = data.id ;
       this.sliderImgService.getSliderImg(id).subscribe({
        next : (response =>{
          this.editSlidImgId = id 
          this.isUpdateMode = true
        
        
this.sliderImgForm.patchValue({
    id : response.id,
    showplace : response.showPlace,
    showMaincat : response.showMainCatId,
    showExamCat : response.showExamCatId,
    buyPlanid : response.buyPlanIds,
    image : null ,
    linkurl : response.linkURL,
    actiontype : response.actionType,
    plantype : response.planType,
    planId : response.planId,
    mainCat : response.mainCatId,
    examCat : response.examCatId,
    examId : response.examId,
    testId : response.testId,
    quizCatId : response.quizCatId,
    quizCatName : response.quizCategoryName,
    quizImgIcon : null ,
    quizIconBackcolor : response.quizIconBackColor,
    quizSubCatId : response.quizSubCatId,
    quizChapId : response.quizChapterId,
    quizChapter : response.quizChapter,
    quizTestId : response.quizTestId ,
    groupId : response.groupId
  })

        }),
        error : (error =>{
          this.toastrService.error(error.message)
        })
       })


      }
      
      clearForm() {
       this.editSlidImgId = " ";
       this.isUpdateMode = false ;
       this.sliderImgForm.reset();
      
        
      }
    }