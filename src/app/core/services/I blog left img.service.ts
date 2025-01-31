import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { blogLeftImgListItemModel } from "../domain/Blog left img/blogLeft-Img-list-item.model";
import { blogLeftImgModel } from "../domain/Blog left img/blogLeftImg-model";

export abstract class IBlogLeftImgService{


abstract createBlogLeftImg(img: string,linkURL: string ,isActive : string) : Observable <SimpleResponse>
    

abstract getBlogLeftImgList() :Observable <blogLeftImgListItemModel[]>

 
abstract updateBlogLeftImg(id : string,img : string, linkURL :string,isActive: string) : Observable <SimpleResponse>


abstract removeBlogLeftImg(id : string) : Observable <SimpleResponse>


abstract getBlogLeftImg(id : string) : Observable <blogLeftImgModel>                                                    


}