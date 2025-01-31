import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { TopperTimeExamLevelListModel } from "../domain/Topper-Time-Exam-Level/topper-time-examLevel-list.model";
import { TopperTimeExamLevelModel } from "../domain/Topper-Time-Exam-Level/topper-time-examLevel-model";

export abstract class ITopperTimeExamLevelService {

   abstract CreateTopperTimeExamLevel(name : string) : Observable <SimpleResponse> ;

    abstract GetTopperTimeExamLevelList() : Observable <TopperTimeExamLevelListModel[]> ;
   
     abstract UpdateTopperTimeExamLevel(id : string, name : string) : Observable <SimpleResponse>;
     
      abstract GetTopperTimeExamLevel(id : string) : Observable <TopperTimeExamLevelModel> ;

}
