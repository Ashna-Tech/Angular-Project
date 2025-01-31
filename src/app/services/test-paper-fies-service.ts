import { Injectable } from "@angular/core";
import { ItestPaperFilesService } from "../core/services/I test-paper-files-service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { TestPaperFilesListEntity } from "../entity/Test-Paper-Files/test-paper-files-list.entity";
import { TestPaperFilesListModel } from "../core/domain/Test-Paper-Files/test-paper-files-list.model";
import { TestPaperFilesModel } from "../core/domain/Test-Paper-Files/test-paper-files-model";
import { TestPaperFilesEntity } from "../entity/Test-Paper-Files/test-paper-files-entity";


@Injectable({
    providedIn : 'root',
})

export class TestPaperFilesService extends ItestPaperFilesService{

constructor (private http : HttpClient){
    super()
}

override createTestPaperFiles(catId: string, subCatId: string, name: string, testFile: string, 
    flag: string, typeName: string, ansSheet: string): Observable<SimpleResponse> {
    
     const url = `${baseUrl}/api/TestPaperFiles`;

          const data = new FormData(); 
          data.append('CatId',catId);
          data.append('SubCatId',subCatId);
          data.append('Name', name);
          data.append('TestFile', testFile);
          data.append('Flag', flag);
          data.append('TypeName', typeName);
          data.append('AnsSheet', ansSheet);

        return this.http.post<SimpleResponse>(url,data).pipe(
            map ((response)=>{
                if(response.status){
                    return response.data;
                }else{
                    throw new Error(response.msg);
                }
            })
        )
}


override getTestPaperFilesList(): Observable<TestPaperFilesListModel[]> {
     const url = `${baseUrl}/api/TestPaperFiles`;
     return this.http.get<TestPaperFilesListEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
     )
}

override updateTestPaperFiles(id: string, catId: string, subCatId: string, name: string, testFile: string,
     flag: string, typeName: string, ansSheet: string): Observable<SimpleResponse> {
    
        const url = `${baseUrl}/api/TestPaperFiles/${id}`;

        const data = new FormData() ;
        data.append('Id',id) ;
        data.append('CatId',catId);
        data.append('SubCatId',subCatId);
        data.append('Name', name);
        data.append('TestFile', testFile);
        data.append('Flag', flag);
        data.append('TypeName', typeName);
        data.append('AnsSheet', ansSheet);

return this.http.put<SimpleResponse>(url,data).pipe(
    map ((response)=>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
)

}


override deleteTestPaperFiles(id: string): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/TestPaperFiles/${id}`;
    return this.http.delete<SimpleResponse>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}

override getTestPaperFiles(id: string): Observable<TestPaperFilesModel> {
    const url = `${baseUrl}/api/TestPaperFiles/${id}`;
    return this.http.get<TestPaperFilesEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else {
               throw new Error(response.msg);
            }
        })
    )
}



}