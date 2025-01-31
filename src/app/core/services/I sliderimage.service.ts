import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { sliderImgListitemModel } from '../domain/slider-image/slider-image-ListItemModel';
import { sliderImgModel } from '../domain/slider-image/slider-image.model';

export abstract class IsliderImgService {

 abstract createSliderImg(showPlace : string, showMainCatId: string, showExamCatId : string, buyPlanIds : string,img : string,

    linkURL : string, actionType : string, planType : string, planId : string, mainCatId : string , examCatId : string ,   

    examId : string, testId : string ,quizCatId : string , quizCategoryName : string, quizImageIcon : string,  

    quizIconBackColor : string, quizSubCatId : string , quizChapterId : string , quizChapter :string , quizTestId : string ,
    
    groupId : string ): Observable<SimpleResponse> 

  
    abstract getSliderImgList() : Observable <sliderImgListitemModel[]>



abstract updateSliderImg(id : string , showPlace : string , showMainCatId : string , showExamCatId : string ,    

buyPlanIds : string , img : string , linkURL : string , actionType : string , planType : string , planId : string , 
    
mainCatId : string , examCatId : string , examId : string , testId : string , quizCatId : string ,  
            
quizCategoryName : string , quizImageIcon : string , quizIconBackColor : string , quizSubCatId : string ,   

quizChapterId : string , quizChapter : string , quizTestId : string , groupId : string ) : Observable <SimpleResponse>   


abstract deleteSliderImage(id : string) : Observable <SimpleResponse> 


abstract getSliderImg(id : string) : Observable <sliderImgModel>

}