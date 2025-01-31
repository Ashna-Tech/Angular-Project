import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { ExamContentListmodel } from "../domain/Test-Content/exam-ContentList.model";
import { ExamContentModel } from "../domain/Test-Content/exam-Content.model";

export abstract class IExamContentService {

abstract CreateExamContent(id : string, aboutExam : string, examPattern : string,bannerExamInfo : string, 
    totalTest : string, totalQuestion : string, totalHrs : string, quizURL : string,scheduleData : string,
    hasSchedule : string ) : Observable <SimpleResponse>
   
abstract GetExamContentList() : Observable <ExamContentListmodel[]>

abstract UpdateExamContent(id : string,aboutExam : string, examPattern : string, bannerExamInfo : string,
    totalTest : string, totalQuestion : string, totalHrs : string, quizURL : string,
    scheduleData : string,hasSchedule : string) : Observable <SimpleResponse>
      
abstract DeleteExamContent(id : string) : Observable <SimpleResponse>

abstract GetExamContent(id : string) : Observable <ExamContentModel>

}
