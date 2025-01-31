import { Injectable } from "@angular/core";
import { ItestMessageService } from "../core/services/I testmessage.service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { TestmessageListEntity } from "../entity/Test-Message/testmessageList.entity";
import { TestmessageListModel } from "../core/domain/Test-Message/testmessageList.model";
import { TestmessageModel } from "../core/domain/Test-Message/testmessage.model";
import { TestmessageEntity } from "../entity/Test-Message/testmessage.entity";

@Injectable({
    providedIn : 'root',
})

export class TestmessageService extends ItestMessageService{

constructor (private http : HttpClient) {
    super()
}

override createTestmessage(examTypeId: string, title: string, message: string, link: string,
     isLoginRequired : string): Observable<SimpleResponse> {
        
    const url = `${baseUrl}/api/TestMessage`;
    return this.http.post <SimpleResponse>(url,{examTypeId : examTypeId, title : title, message : message,
        link : link , isLoginRequired : isLoginRequired === 'Yes'
    }).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )


}

override getTestmessageList(): Observable<TestmessageListModel[]> {
    const url = `${baseUrl}/api/TestMessage`;
    return this.http.get<TestmessageListEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data ;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}

override updateTestmessage(id: string, examTypeId: string, title: string, message: string, link: string,
     isLoginRequired: string): Observable<SimpleResponse> { 
    
    const url = `${baseUrl}/api/TestMessage/${id}`;
    return this.http.put<SimpleResponse>(url,{id : id, examTypeId : examTypeId, title : title, 
        message : message, link : link, isLoginRequired : isLoginRequired === 'Yes'}).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}

override deleteTestmessage(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/TestMessage/${id}`;
    return this.http.delete<SimpleResponse>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}

override getTestmessage(id: string): Observable<TestmessageModel> {
    const url = `${baseUrl}/api/TestMessage/${id}`;
    return this.http.get<TestmessageEntity>(url).pipe(
        map ((response)=>{
            if (response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )


}








}