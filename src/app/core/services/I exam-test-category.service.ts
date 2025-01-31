import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { ExamTestCategoryListModel } from "../domain/Exam-Test-Category/exam-test-category-list.model";
import { CreateExamTestCategoryParams } from "../domain/Exam-Test-Category/Exam-test-cat-Post-Models";
import { UpdateExamTestCategoryPayload } from "../domain/Exam-Test-Category/Exam-test-category.put.model";
import { ExamTestcatGetTestCategoryModel} from "../domain/Exam-Test-Category/Exam-test-cat-Get-test-categoryListmodel";


export abstract class IexamTestCategoryService{

abstract createExamTestCategory(params : CreateExamTestCategoryParams) : Observable <SimpleResponse>

abstract updateExamTestCategory(payload: UpdateExamTestCategoryPayload): Observable<SimpleResponse> 

abstract getExamTestCategoryExamId(id : string ) : Observable <ExamTestCategoryListModel[]>

abstract ExamTestCategoryGetTestCategory(id : string) : Observable <ExamTestcatGetTestCategoryModel[]>


}