import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { ExamFAQListModel } from "../domain/Exam-FAQ/exam-faq-list.model";
import { ExamFAQModel } from "../domain/Exam-FAQ/exam-faq.model";

export abstract class IexamFAQService{

abstract createExamFAQ(examId : string, question : string, answer : string, orderNo : number) : Observable <SimpleResponse>

abstract updateExamFAQ(id : string, examId : string, question : string, answer : string, orderNo : number) : Observable <SimpleResponse>

abstract deleteExamFAQ(id : string) : Observable <SimpleResponse>

abstract getExamFAQList(id : string ) : Observable <ExamFAQListModel[]>

abstract getExamFAQSingle(id : string) : Observable <ExamFAQModel> 
}
