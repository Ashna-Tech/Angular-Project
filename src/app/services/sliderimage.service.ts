import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IsliderImgService } from "../core/services/I sliderimage.service";
import { Observable , map  } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { sliderImgModel } from "../core/domain/slider-image/slider-image.model";
import { sliderImgListitemModel } from "../core/domain/slider-image/slider-image-ListItemModel";
import { baseUrl } from "../../environement";
import { sliderImgListEntity } from "../entity/slider-image/slider-image-list.entity";
import { error } from "jquery";
import { FormGroup } from "@angular/forms";
import { sliderImgEntity } from "../entity/slider-image/slider-image.entity";



@Injectable({
    providedIn : 'root'
})

export class sliderImgService extends IsliderImgService {

constructor (private http : HttpClient ){
    super()
}

override createSliderImg(showPlace: string, showMainCatId: string, showExamCatId: string, buyPlanIds: string, img: string,
    
linkURL: string, actionType: string, planType: string, planId: string, mainCatId: string, examCatId: string, examId: string, 

testId: string, quizCatId: string, quizCategoryName: string, quizImageIcon: string, quizIconBackColor: string,

quizSubCatId: string, quizChapterId: string, quizChapter: string, quizTestId: string, groupId: string): Observable<SimpleResponse> {
        

const url = `${baseUrl}/api/SliderImage`

const formData = new FormData();

formData.append('ShowPlace',showPlace)
formData.append('ShowMainCatId',showMainCatId)
formData.append('ShowExamCatId',showExamCatId)
formData.append('BuyPlanIds',buyPlanIds)
formData.append('Img',img)
formData.append('LinkURL',linkURL)
formData.append('ActionType',actionType)
formData.append('PlanType',planType)
formData.append('PlanId',planId)
formData.append('MainCatId',mainCatId)
formData.append('ExamCatId',examCatId)
formData.append('ExamId',examId)
formData.append('TestId',testId)
formData.append('QuizCatId',quizCatId)
formData.append('QuizCategoryName',quizCategoryName)
formData.append('QuizImageIcon',quizImageIcon)
formData.append('QuizIconBackColor',quizIconBackColor)
formData.append('QuizSubCatId',quizSubCatId)
formData.append('QuizChapterId',quizChapterId)
formData.append('QuizChapter',quizChapter)
formData.append('QuizTestId',quizTestId)
formData.append('GroupId',groupId)

return this.http.post <SimpleResponse>(url,formData).pipe(
    map(response =>{
        if(response.status){
            return response.data 
        }else{
            throw new Error(response.msg)
        }

    } )
)

    }
        


override getSliderImgList(): Observable<sliderImgListitemModel[]> {
    
const url = `${baseUrl}/api/SliderImage`

return this.http.get<sliderImgListEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data
        }else{
            throw new Error(response.msg)
        }
    })
)

}   

override updateSliderImg(id: string, showPlace: string, showMainCatId: string, showExamCatId: string, buyPlanIds: string, 
    
img: string, linkURL: string, actionType: string, planType: string, planId: string, mainCatId: string, examCatId: string,

examId: string, testId: string, quizCatId: string, quizCategoryName: string, quizImageIcon: string, quizIconBackColor: string,

quizSubCatId: string, quizChapterId: string, quizChapter: string, quizTestId: string, groupId: string): Observable<SimpleResponse> {

const url = `${baseUrl}/api/SliderImage/${id}`

const formData = new FormData();

formData.append('Id',id)
formData.append('ShowPlace',showPlace)
formData.append('ShowMainCatId',showMainCatId)
formData.append('ShowExamCatId',showExamCatId)
formData.append('BuyPlanIds',buyPlanIds)
formData.append('Img',img)
formData.append('LinkURL',linkURL)
formData.append('ActionType',actionType)
formData.append('PlanType',planType)
formData.append('PlanId',planId)
formData.append('MainCatId',mainCatId)
formData.append('ExamCatId',examCatId)
formData.append('ExamId',examId)
formData.append('TestId',testId)
formData.append('QuizCatId',quizCatId)
formData.append('QuizCategoryName',quizCategoryName)
formData.append('QuizImageIcon',quizImageIcon)
formData.append('QuizIconBackColor',quizIconBackColor)
formData.append('QuizSubCatId',quizSubCatId)
formData.append('QuizChapterId',quizChapterId)
formData.append('QuizChapter',quizChapter)
formData.append('QuizTestId',quizTestId)
formData.append('GroupId',groupId)
    

return this.http.put <SimpleResponse>(url,formData).pipe(
    map (response =>{
        if(response.status){
            return response.data ;
        }else {
            throw new Error(response.msg)
        }
    })
)

}



override deleteSliderImage(id: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/SliderImage/${id}`

return this.http.delete <SimpleResponse>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data
        }else {
            throw new Error(response.msg)
        }
    })
)

}


override getSliderImg(id: string): Observable<sliderImgModel> {
    
    const url = `${baseUrl}/api/SliderImage/${id}`

return this.http.get <sliderImgEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data
        }else{
            throw new Error(response.msg)
        }

    })
)

}


}