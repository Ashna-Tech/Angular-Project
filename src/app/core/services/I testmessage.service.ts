import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { TestmessageListModel } from "../domain/Test-Message/testmessageList.model";
import { TestmessageModel } from "../domain/Test-Message/testmessage.model";

export abstract class ItestMessageService{

abstract createTestmessage(examTypeId : string, title : string, message : string, link : string,
    isLoginRequired : string ) : Observable <SimpleResponse>

abstract getTestmessageList() : Observable <TestmessageListModel[]>

abstract updateTestmessage(id : string, examTypeId : string, title : string, message : string, link : string,
    isLoginRequired : string ) : Observable <SimpleResponse>

abstract deleteTestmessage(id : string) : Observable <SimpleResponse>

abstract getTestmessage(id : string) : Observable <TestmessageModel>
}