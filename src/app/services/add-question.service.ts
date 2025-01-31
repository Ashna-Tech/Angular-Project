import { Injectable } from "@angular/core";
import { IAddQuestionService } from "../core/services/I-Add-Question.service";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "../../environement";
import { AddQuestionListCatEntity } from "../entity/Add-Test-Question/add-question-cat.info.entity";
import { Observable, map } from "rxjs";
import { AddQuestionListCategoryModel } from "../core/domain/Add-Test-Question/add-question-cat-info.model";
import { AddQuestionListSubcatEntity } from "../entity/Add-Test-Question/add-question-subcate-info.entity";
import { AddQuestionListSubCatModel } from "../core/domain/Add-Test-Question/add-question-subcat-info.model";
import { AddQuestionListEntity } from "../entity/Add-Test-Question/add-Question-List.entity";
import { AddQuestionListModel } from "../core/domain/Add-Test-Question/add-question-list.model";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { getNewQuestionListDTO } from "../presentation/screens/add-test-question/get-new-question-list-dto.model";
import { QuestionListItemModel } from "../presentation/screens/add-test-question/question-list-item.model";
import { ResponseModel } from "../core/domain/response.model";
import { SaveInTestDTO } from "../presentation/screens/add-test-question/save-in-test-dto.model";
import { ViewAllQuestionDTO } from "../presentation/screens/add-test-question/view-all-question-dto.model";
import { SelectQuestionModel } from "../core/domain/Add-Test-Question/select-question.model";
import { CategoryTotalQuestion } from "../core/domain/Add-Test-Question/category-total-question.model";
import { ViewAddedQuestionListModel } from "../core/domain/Add-Test-Question/view-added-question.model";
import { updateToperTimeParamsModel } from "../core/domain/Add-Test-Question/update-toper-time-params.model";
import { ProofReaderQuestionModel } from "../core/domain/Add-Test-Question/proof-reader-question.model";


@Injectable({
    providedIn: 'root',
})

export class AddQuestionService extends IAddQuestionService {

    constructor(private http: HttpClient) {
        super()
    }


    override GetAddQuestionCategory(TestId: string): Observable<AddQuestionListCategoryModel[]> {
        const url = `${baseUrl}/api/AddQuestion/CategoryInfo/${TestId}`;

        return this.http.get<AddQuestionListCatEntity>(url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }


    override GetAddQuestionSubCategory(TestId: string, CatId: string): Observable<AddQuestionListSubCatModel[]> {

        const url = `${baseUrl}/api/AddQuestion/SubCategoryInfo/${TestId}/${CatId}`;
        return this.http.get<AddQuestionListSubcatEntity>(url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )

    }


    override GetAddQuestionList(CatId: string, SubCatId: string, ExamId: string, TestId: string): Observable<AddQuestionListModel[]> {
        const url = `${baseUrl}/api/AddQuestion/ChapterQuesNo/${CatId}/${SubCatId}/${ExamId}/${TestId}`;
        return this.http.get<AddQuestionListEntity>(url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }


    override UpdateAddQuestion(testId: number, noofQues: number, noofQuesDetailId: string): Observable<SimpleResponse> {

        const url = `${baseUrl}/api/AddQuestion/UpdateChapterQuesNo`;
        return this.http.put<SimpleResponse>(url, { testId: testId, noofQues: noofQues, noofQuesDetailId: noofQuesDetailId }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )

    }

    override viewAllQuestions(params:ViewAllQuestionDTO): Observable<QuestionListItemModel[]> {
        const url = `${baseUrl}/api/AddQuestion/ViewAllQuestions`;

        return this.http.post<ResponseModel<QuestionListItemModel[]>>(url, params).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }


    override getNewQuestionsList(params: getNewQuestionListDTO): Observable<QuestionListItemModel[]> {
        const url = `${baseUrl}/api/AddQuestion/GetNewQuestions`;

        return this.http.post<ResponseModel<QuestionListItemModel[]>>(url, params).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }

    override saveInTest(params: SaveInTestDTO): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/AddQuestion/SaveInTest`;

        return this.http.post<SimpleResponse> (url, params).pipe(
            map((response) => {
                if (response.status) {
                    return response;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }

    override selectQuestion(id: string, oldId: number): Observable<SelectQuestionModel> {
        const qId = (!oldId) ? id : '';
        const url = `${baseUrl}/api/AddQuestion/SelectQuestion?oldId=${oldId}&Id=${qId}`;

        return this.http.get<ResponseModel<SelectQuestionModel>> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }

    override getCategoryTotalQues(testId: string, categoryId: string): Observable<CategoryTotalQuestion> {
        const url = `${baseUrl}/api/AddQuestion/GetCategoryTotalQues/${testId}/${categoryId}`;

        return this.http.get<ResponseModel<CategoryTotalQuestion>> (url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }


    override getViewAddedQuestionsByCategoryId(testId: string, categoryId: string): Observable<ViewAddedQuestionListModel> {
        const url = `${baseUrl}/api/AddQuestion/ViewAddedQuestionsByCate/${testId}/${categoryId}`;    

        return this.http.get<ResponseModel<ViewAddedQuestionListModel>>(url).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        );
    }

    override updateToperTime(params: updateToperTimeParamsModel): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/AddQuestion/UpdateToperTime`;

        return this.http.put<SimpleResponse>(url, params).pipe(
            map((response) => {
                if (response.status) {
                    return response;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }

    override getProofReaderQuestions(search: string, user: string, fromDate: string, toDate: string): Observable<ProofReaderQuestionModel[]> {
        const url = `${baseUrl}/api/AddQuestion/ProofreaderQuestions`;

        return this.http.post<ResponseModel<ProofReaderQuestionModel[]>>(url, { search, user, fromDate, toDate }).pipe(
            map((response) => {
                if (response.status) {
                    return response.data;
                } else {
                    throw new Error(response.msg);
                }
            })
        );
    }

    override removeQuestionFromTest(testId: string, quesId: string): Observable<SimpleResponse> {
        const url = `${baseUrl}/api/AddQuestion/RemoveQuestionFromTest/${testId}/${quesId}`;

        return this.http.delete<SimpleResponse>(url).pipe(
            map((response) => {
                if (response.status) {
                    return response;
                } else {
                    throw new Error(response.msg);
                }
            })
        )
    }
}