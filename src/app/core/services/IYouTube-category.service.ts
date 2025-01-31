import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { youTubeCategoryListModel } from "../domain/youtube/youtube-category-list.model";
import { youTubeCategoryModel } from "../domain/youtube/youtube-category.model";
import { CommonListItemModel } from "../domain/common model";


export abstract class IyouTubeCategoryService{


abstract createYouTubeCategory(name:string,displayName:string,orderNo:string,isHomeCategory:string):Observable<SimpleResponse>;

abstract getYouTubeCategoryList():Observable<youTubeCategoryListModel[]>;

abstract updateYouTubeCategory(id:string, name: string, displayName: string, orderNo : string, isHomeCategory: string): 

Observable<SimpleResponse>;

abstract removeyouTubeCategory(id:string):Observable<SimpleResponse>;

abstract getyouTubeCategory(id:string):Observable<youTubeCategoryModel>;

abstract getYouTubeCategoryListIdwithName() : Observable <CommonListItemModel[]>;

}