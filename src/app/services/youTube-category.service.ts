import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { youTubeCategoryModel } from "../core/domain/youtube/youtube-category.model";
import { youTubeCategoryListModel } from "../core/domain/youtube/youtube-category-list.model";
import { baseUrl } from "../../environement";
import { Observable,map } from "rxjs";
import { IyouTubeCategoryService } from "../core/services/IYouTube-category.service";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { youTubeCategoryEntity } from "../entity/youtube/youtube-category.entity";
import { youTubeCategoryListEntity } from "../entity/youtube/youtube-category.-List.entity";
import { CommonListItemModel } from "../core/domain/common model";
import { CommonModelListEntity } from "../entity/Common-model-list entity";


@Injectable({
    providedIn:'root'
})


export class youtubeCategoryService extends IyouTubeCategoryService{
  
    constructor(private http:HttpClient){
        super();
    }

    override createYouTubeCategory(name: string, displayName: string, orderNo: string, isHomeCategory: string): Observable<SimpleResponse> {

        
        const url = `${baseUrl}/api/YoutubeCategory`;
        

        return this.http.post<SimpleResponse>(url,{name:name,displayName:displayName,orderNo:orderNo,isHomeCategory:(isHomeCategory == "Yes")})
        .pipe(
        map(response =>{
                if(response.status){
                    return response.data;
                }else{
                    throw new Error(response.msg);
                }
            })
        )

}

override getYouTubeCategoryList(): Observable<youTubeCategoryListModel[]> {
    
const url = `${baseUrl}/api/YoutubeCategory`;

return this.http.get<youTubeCategoryListEntity>(url).pipe(
    map(response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)


 }
override updateYouTubeCategory(id: string, name: string, displayName: string, orderNo: string, isHomeCategory: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/YoutubeCategory/${id}`;

return this.http.put<SimpleResponse>(url,{id:id,name:name,displayName:displayName,orderNo : orderNo,isHomeCategory:(isHomeCategory =="Yes")}).pipe(
    map(response =>{
        if(response.status){
            return response;
        }else{
            throw new Error(response.msg);
        }
    })
)
    
    
}
override removeyouTubeCategory(id: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/YoutubeCategory/${id}`;

return this.http.delete<SimpleResponse>(url).pipe(
    map(response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)

}

override getyouTubeCategory(id: string): Observable<youTubeCategoryModel> {
    
const url = `${baseUrl}/api/YoutubeCategory/${id}`;
    
    return this.http.get<youTubeCategoryEntity>(url).pipe(
        map(response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
        })
    )
}

override getYouTubeCategoryListIdwithName(): Observable<CommonListItemModel[]> {
    
    const url = `${baseUrl}/api/YoutubeCategory/IdWithName`;
    
    return this.http.get<CommonModelListEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error (response.msg);
            }
        })
    )
}
}
 
