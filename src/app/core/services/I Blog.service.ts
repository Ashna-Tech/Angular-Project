import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { BlogListItemModel } from "../domain/blog/blogListItem.Model";
import { BlogModel } from "../domain/blog/blog.Model";

export abstract class  IBlogService{

abstract createBlog(Thumbnail : string,BlogTitle : string ,BlogHeading : string ,BlogContent1 : string ,BlogContent2 : string, 

  BannerImg : string, CatId : string,SCatId : string,ChapId : string,QuizId : string,SeoTitle : string,

  SeoKeywords : string,SeoDescription : string , AltText : string) : Observable <SimpleResponse> 


 abstract updateBlog(Id: string, Thumbnail:string,BlogTitle: string,BlogHeading : string,BlogContent1 : string, 
    
  BlogContent2 : string,BannerImg :string,CatId : string,SCatId :string,ChapId : string,

  QuizId : string,SeoTitle :string,SeoKeywords : string , SeoDescription : string, AltText : string) : Observable <SimpleResponse>

  

  abstract removeBlog(id : string) : Observable <SimpleResponse>
    


  abstract getBloglist(ChapId : string) : Observable <BlogListItemModel[]>
  
  
   
abstract getBlogSingle(id : string) : Observable <BlogModel> 





// abstract getBlogListIdWithName(ChapId : string) : Observable <blogListIdWithNameModel[]>

} 