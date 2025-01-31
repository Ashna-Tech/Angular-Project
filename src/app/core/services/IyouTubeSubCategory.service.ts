import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { youtubeSubcategoryModel } from "../domain/youtube sub-category/youtube-subcategory.model";
import { youtubeSubCategorylistItemModel } from "../domain/youtube sub-category/youtube-subcategory.list.item.model";
import { CommonListItemModel } from "../domain/common model";


export abstract class IyouTubeSubCategoryService{

    abstract createYouTubeSubCategory(catId:string,name:string,videoOrder:number, playListId :string):Observable<SimpleResponse>

    abstract updateYoutubesubCategory(id:string,name:string,videoOrder:number, playListId :string):Observable <SimpleResponse>

    abstract removeYouTubeSubCategory(id:string):Observable<SimpleResponse>

    abstract getYouTubeSubCategorySingle(id:string):Observable<youtubeSubcategoryModel>

    abstract getYouTubeSubcategoryList(CatId : string) : Observable<youtubeSubCategorylistItemModel[]>
    
    abstract getYouTubeSubcategoryListIdwithName(CatId : string) : Observable <CommonListItemModel[]>
        
}
