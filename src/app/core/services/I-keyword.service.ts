import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { KeywordListModel } from "../domain/Keyword/keyword-list-item-model";
import { KeywordSelectModel } from "../domain/Keyword/keyword-select-model";

export abstract class IkeywordService {

abstract createKeyword(chapterId : string , name : string , description : string) : Observable <SimpleResponse> 

abstract updateKeyword(id : string , name : string , description : string) : Observable <SimpleResponse> 

abstract getKeywordList(chapterId?:string) : Observable <KeywordListModel[]>

abstract deleteKeyword(id : string) : Observable <SimpleResponse>

abstract getkeywordSelect(id : string) : Observable <KeywordSelectModel>




}