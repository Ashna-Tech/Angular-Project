import { Injectable } from "@angular/core";
import { IyouTubeSubCategoryService } from "../core/services/IyouTubeSubCategory.service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { youtubeSubCategorylistItemModel } from "../core/domain/youtube sub-category/youtube-subcategory.list.item.model";
import { youtubeSubcategoryModel } from "../core/domain/youtube sub-category/youtube-subcategory.model";
import { youtubesubcategoryEntity } from "../entity/youtube/youtube-subcatagory.entity";
import { youTubeSubCategoryListItemEntity } from "../entity/youtube-subcategory/youtube-subcategoryListItem.Entity";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { CommonListItemModel } from "../core/domain/common model";
import { CommonModelListEntity } from "../entity/Common-model-list entity";


@Injectable({
    providedIn:'root',
})


export class youTubeSubCategoryService extends IyouTubeSubCategoryService{
    
    
    constructor(private http:HttpClient){ 
        super()
    }

    
    override createYouTubeSubCategory(catId: string, name: string, videoOrder: number, playListId: string): Observable<SimpleResponse> {
        
    const url = `${baseUrl}/api/YoutubeSubCategory`;  
    
    return this.http.post <SimpleResponse>(url,{catId : catId, name : name, videoOrder: videoOrder, playListId : playListId}).pipe(
        map(response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        }) 
    )
       
   }


   
   override updateYoutubesubCategory(id: string, name: string, videoOrder: number, playListId: string): Observable<SimpleResponse> {
       
   const url = `${baseUrl}/api/YoutubeSubCategory/${id}`;
    return this.http.put<SimpleResponse>(url,{id :id , name : name, videoOrder:videoOrder, playListId : playListId}).pipe(
        map(response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
       
   }


   override removeYouTubeSubCategory(id: string): Observable<SimpleResponse> {
       
    const url = `${baseUrl}/api/YoutubeSubCategory/${id}`;
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

   
   override getYouTubeSubCategorySingle(id: string): Observable<youtubeSubcategoryModel> {
        
    const url = `${baseUrl}/api/YoutubeSubCategory/Single/${id}`;

    return this.http.get <youtubesubcategoryEntity>(url).pipe(
        map(response =>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}

   override getYouTubeSubcategoryList(CatId: string): Observable<youtubeSubCategorylistItemModel[]> {
       
    const url = `${baseUrl}/api/YoutubeSubCategory/${CatId}`;
    

    return this.http.get<youTubeSubCategoryListItemEntity>(url).pipe(
      
      map(response =>{
          if(response.status){
              return response.data
          }else{
              throw new Error(response.msg);
          }
      })
    )      
 }

 override getYouTubeSubcategoryListIdwithName(CatId: string): Observable<CommonListItemModel[]> {
        
      const url = `${baseUrl}/api/YoutubeSubCategory/IdWithName/${CatId}`;

      return this.http.get<CommonModelListEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
      )
              } 

}
