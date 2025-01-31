import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { ExamTypeListItemModel } from "../domain/Exam type/Exam-type-List-item.model";
import { ExamTypeModel } from "../domain/Exam type/Exam-type.model";
import { IdExamTypeListModel } from "../domain/Exam type/id-ExamtypeList.model";

export abstract class IexamTypeService{

abstract createExamType(data:ExamTypeModel) : Observable <SimpleResponse>
    
abstract getExamTypeList(ExamCatId:string) : Observable <ExamTypeListItemModel[]>


abstract updateExamType(data:ExamTypeModel) : Observable <SimpleResponse>


abstract deleteExamType(id : string) : Observable <SimpleResponse>



abstract getExamType(id : string) : Observable <ExamTypeModel>


abstract getExamTypeIdwithName(ExamCatId : string) : Observable <IdExamTypeListModel[]>


}