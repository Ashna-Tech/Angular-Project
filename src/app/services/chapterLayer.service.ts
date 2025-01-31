import { Observable, map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { IchapterLayerService } from "../core/services/I chapter-layer.service";
import { baseUrl } from "../../environement";
import { HttpClient } from "@angular/common/http";
import { ChapterLayerListEntity } from "../entity/Chapter-Layer/chapter-layer-list-entity";
import { ChapterLayerListModel } from "../core/domain/Chapter-Layer/chapter-layer-list-model";
import { ChapterLayerModel } from "../core/domain/Chapter-Layer/chapter-layer-model";
import { ChapterLayerEntity } from "../entity/Chapter-Layer/chapter-layer-entity";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root',
})

export class ChapterLayerService extends IchapterLayerService{

    constructor(private http : HttpClient){
        super()
    }

override CreateChapterLayer(layer: string, chapterId: string, description: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/ChapterLayer`;
return this.http .post<SimpleResponse>(url,{layer : layer, chapterId : chapterId, description : description}).pipe(
    map ((response)=>{
        if(response.status){
            return response.data ;
        }else {
            throw new Error(response.msg);
        }
    })
)

}


override getChapterLayerList(): Observable<ChapterLayerListModel[]> {
    
    const url = `${baseUrl}/api/ChapterLayer`;
return this.http.get<ChapterLayerListEntity>(url).pipe(
    map ((response)=>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
)
}

override UpdateChapterLayer(id: string, layer: string, chapterId: string, description: string): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/ChapterLayer/${id}`;
    return this.http.put<SimpleResponse>(url,{id : id , layer : layer , chapterId : chapterId,
         description : description}).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}

override deleteChapterLayer(id: string): Observable<SimpleResponse> {
     const url = `${baseUrl}/api/ChapterLayer/${id}`;
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

override getChapterLayer(id: string): Observable<ChapterLayerModel> {
    const url = `${baseUrl}/api/ChapterLayer/${id}`;
    return this.http.get<ChapterLayerEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}






}