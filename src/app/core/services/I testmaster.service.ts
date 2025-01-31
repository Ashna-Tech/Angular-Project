import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { getTestListParams } from '../domain/Test-Master/get-test-list-params.model';
import { TestListItemModel } from '../domain/Test-Master/test-list-item.model';
import { updateTestStatusParams } from '../domain/Test-Master/update-test-status-params.model';
import { Language } from "../enums/Language.enum";
import { TestMasterModel } from '../domain/Test-Master/test-master.model';

export abstract class ITestMasterService {
  abstract CreateTestMaster(data: FormData): Observable<SimpleResponse>;

  abstract UpdateTestMaster(data: FormData): Observable<SimpleResponse>;

  abstract DeleteTestMaster(id: string): Observable<SimpleResponse>;

  abstract getUnlaunchedTestList(params:getTestListParams): Observable<TestListItemModel[]>;

  abstract changeStatus(params:updateTestStatusParams): Observable<SimpleResponse>;

  abstract getlaunchedTestList(params:getTestListParams): Observable<TestListItemModel[]>;

  abstract activateAndDeleteTest(id:string, isActive:boolean, isDelete:boolean):Observable<SimpleResponse>;

  abstract getTestYears():Observable<{name:number}[]>;   
  
  abstract UpdateTestLanguageTestMaster(id: number, lang: Language ): Observable<SimpleResponse>;

  abstract UpdateTestPdfTestMaster(id: number, pdfUrl: string, pdfUrlH: string, englishPdf: string, hindiPdf: string): Observable<SimpleResponse>;

  abstract getTestById(id:string):Observable<TestMasterModel>;

}