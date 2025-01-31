import { HttpClient } from '@angular/common/http';
import { ITestMasterService } from '../core/services/I testmaster.service';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { Injectable } from '@angular/core';
import { getTestListParams } from '../core/domain/Test-Master/get-test-list-params.model';
import { TestListItemModel } from '../core/domain/Test-Master/test-list-item.model';
import { ResponseModel } from '../core/domain/response.model';
import { updateTestStatusParams } from '../core/domain/Test-Master/update-test-status-params.model';
import { Language } from '../core/enums/Language.enum';
import { TestMasterModel } from '../core/domain/Test-Master/test-master.model';

@Injectable({
  providedIn: 'root',
})
export class TestMasterService extends ITestMasterService {
  constructor(private http: HttpClient) { 
    super();
  }

  override CreateTestMaster(data: FormData): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestMaster`;

    return this.http.post<SimpleResponse>(url, data).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateTestMaster(data: FormData): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestMaster`;
   
    return this.http.put<SimpleResponse>(url, data).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override DeleteTestMaster(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestMaster/${id}`;
    return this.http.delete<SimpleResponse>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override UpdateTestLanguageTestMaster(id: number, lang: Language): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestMaster/UpdateTestLang`;
    return this.http.put<SimpleResponse>(url, { id, lang }).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getlaunchedTestList(params: getTestListParams): Observable<TestListItemModel[]> {
    const url = `${baseUrl}/api/TestMaster/launched/${params.ExamId}/${params.Year}`;
    
    return this.http.get<ResponseModel<TestListItemModel[]>> (url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }


  override changeStatus(params: updateTestStatusParams): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestMaster/UpdateTestStatus`;

    return this.http.put<SimpleResponse>(url, params).pipe(
      map((response) => {
        if (response.status) {
          return response;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override activateAndDeleteTest(id: string, isActive: boolean, isDelete: boolean): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestMaster/UpdateTestDeleteActive`;

    return this.http.put<SimpleResponse>(url, {id, isActive, isDelete}).pipe(
      map((response) => {
        if (response.status) {
          return response;
        }
        
        throw new Error(response.msg);
      })
    )
  }


  override UpdateTestPdfTestMaster(id: number, pdfUrl: string, pdfUrlH: string, englishPdf: string, hindiPdf: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestMaster/UpdateTestPdf`;

    const formdata = new FormData();

    formdata.append('Id', id.toString()),
      formdata.append('PdfUrl', pdfUrl),
      formdata.append('PdfUrlH', pdfUrlH),
      formdata.append('EnglishPdf', englishPdf),
      formdata.append('HindiPdf', hindiPdf);

    return this.http.put<SimpleResponse>(url, formdata).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getTestYears(): Observable<{ name: number; }[]> {
    const url = `${baseUrl}/api/TestMaster/GetTestYears`;

    return this.http.get<ResponseModel<{ name: number; }[]>> (url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getUnlaunchedTestList(params: getTestListParams): Observable<TestListItemModel[]> {
    const url = `${baseUrl}/api/TestMaster/Unlaunched/${params.ExamId}`;
    
    return this.http.get<ResponseModel<TestListItemModel[]>> (url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getTestById(id: string): Observable<TestMasterModel> {
    const url = `${baseUrl}/api/TestMaster/Single/${id}`;
    
    return this.http.get<ResponseModel<TestMasterModel>> (url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
}
