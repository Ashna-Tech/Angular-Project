import { Observable } from "rxjs";
import { AddQuestionListSubCatModel } from "../domain/Add-Test-Question/add-question-subcat-info.model";
import { AddQuestionListCategoryModel } from "../domain/Add-Test-Question/add-question-cat-info.model";
import { AddQuestionListModel } from "../domain/Add-Test-Question/add-question-list.model";
import { SimpleResponse } from "../domain/simple-response.model";
import { QuestionListItemModel } from "../../presentation/screens/add-test-question/question-list-item.model";
import { getNewQuestionListDTO } from "../../presentation/screens/add-test-question/get-new-question-list-dto.model";
import { SaveInTestDTO } from "../../presentation/screens/add-test-question/save-in-test-dto.model";
import { ViewAllQuestionDTO } from "../../presentation/screens/add-test-question/view-all-question-dto.model";
import { SelectQuestionModel } from "../domain/Add-Test-Question/select-question.model";
import { CategoryTotalQuestion } from "../domain/Add-Test-Question/category-total-question.model";
import { ViewAddedQuestionListModel } from "../domain/Add-Test-Question/view-added-question.model";
import { updateToperTimeParamsModel } from "../domain/Add-Test-Question/update-toper-time-params.model";
import { ProofReaderQuestionModel } from "../domain/Add-Test-Question/proof-reader-question.model";

export abstract class IAddQuestionService {

    abstract GetAddQuestionCategory(TestId: string): Observable<AddQuestionListCategoryModel[]>;

    abstract GetAddQuestionSubCategory(TestId: string, CatId: string): Observable<AddQuestionListSubCatModel[]>;

    abstract GetAddQuestionList(CatId: string, SubCatId: string, ExamId: string, TestId: string): Observable<AddQuestionListModel[]>;

    abstract UpdateAddQuestion(testId: number, noofQues: number, noofQuesDetailId: string): Observable<SimpleResponse>;

    abstract viewAllQuestions(params:ViewAllQuestionDTO): Observable<QuestionListItemModel[]>;  

    abstract getNewQuestionsList(params:getNewQuestionListDTO):Observable<QuestionListItemModel[]>;

    abstract saveInTest(params:SaveInTestDTO):Observable<SimpleResponse>;

    abstract selectQuestion(id:string, oldId:number):Observable<SelectQuestionModel>;

    abstract getCategoryTotalQues(testId:string, categoryId:string):Observable<CategoryTotalQuestion>;

    abstract getViewAddedQuestionsByCategoryId(testId:string, categoryId:string):Observable<ViewAddedQuestionListModel>;

    abstract updateToperTime(params: updateToperTimeParamsModel): Observable<SimpleResponse>;

    abstract getProofReaderQuestions(search:string, user:string, fromDate:string, toDate:string):Observable<ProofReaderQuestionModel[]>;

    abstract removeQuestionFromTest(testId:string, quesId:string):Observable<SimpleResponse>;

}