import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { TotalChapterQuesModel } from "../domain/Total-Chapter-Question/total-chapter-qest-model";
import { TotalChapterQuesListItemModel } from "../domain/Total-Chapter-Question/total-chapter-ques.List.model";

export abstract class ITotalChapterQuestionService{

abstract CreateTotalChapterQues(examId : string, categoryId :string, subCategoryId : string, chapterId : string,
    noofQues : number, trending : number ) : Observable <SimpleResponse> ;
 

abstract UpdateTotalChapterQues(examId : string, categoryId : string, subCategoryId : string, chapterId : string,
    noofQues : number, trending : string) : Observable <SimpleResponse> ;    
   
abstract DeleteTotalChapterQues(id : string) : Observable <SimpleResponse> ;


abstract GetTotalChapterQuesList(examId : string, categoryId : string, subCategoryId : string) : Observable <TotalChapterQuesListItemModel[]> ;

abstract getSingleTotalChapterQuest(examId : string, categoryId : string, subCategoryId : string, chapterId : string) : Observable <TotalChapterQuesModel> 

}