import { HttpClient } from "@angular/common/http";
import { IkeywordService } from "../core/services/I-keyword.service";
import { Observable,map} from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { KeywordListModel } from "../core/domain/Keyword/keyword-list-item-model";
import { KeywordListEntity } from "../entity/keyword/keyword-list-entity";
import { KeywordSelectModel } from "../core/domain/Keyword/keyword-select-model";
import { KeywordSelectEntity } from "../entity/keyword/keyword-entity";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn :'root',
})


export class KeywordService extends IkeywordService {

constructor (private http : HttpClient){
    super()
}

override createKeyword(chapterId: string, name: string, description: string): Observable<SimpleResponse> {
     
const url = `${baseUrl}/api/Keyword`

return this.http.post<SimpleResponse>(url,{chapterId : chapterId, name : name, description : description}).pipe (
    map ((response) =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)
}

override updateKeyword(id: string, name: string, description: string): Observable<SimpleResponse> {
     const url = `${baseUrl}/api/Keyword`;
     return this.http.put<SimpleResponse>(url,{id : id, name : name, description : description}).pipe(
        map ((response) =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
     )
}

override getKeywordList(chapterId?:string): Observable<KeywordListModel[]> {
    const url = chapterId ? `${baseUrl}/api/Keyword?Id=${chapterId}` : `${baseUrl}/api/Keyword`;
    
    return this.http.get<KeywordListEntity>(url).pipe (
        map ((response)=>{
            if(response.status){
                return response.data ;
            }else{
                throw new Error(response.msg);
            }
        })
    )

}

override deleteKeyword(id: string): Observable<SimpleResponse> {
  const url = `${baseUrl}/api/Keyword/${id}`;
  return this.http.delete<SimpleResponse>(url).pipe(
    map ((response) =>{
        if(response.status){
            return response.data ;
        }else{
            throw new Error(response.msg);
        }
    })
  )    
}

override getkeywordSelect(id: string): Observable<KeywordSelectModel> {
    const url = `${baseUrl}/api/Keyword/select/${id}`;
    return this.http.get<KeywordSelectEntity>(url).pipe(
        map((response) =>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}



}