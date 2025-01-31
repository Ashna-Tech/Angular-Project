import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { cuetBlogListItemModel } from "../domain/cuet-blog/cuetBlog-list-Item-Model";
import { CuetBlogModel } from "../domain/cuet-blog/cuet-blog-model";
import { blogListIdWithNameModel } from "../domain/blog/blogListIdWithName.model";



export abstract class IcuetBlogService{


 abstract createCuetBlog(thumbnail : string,blogTitle: string,blogHeading : string, blogContent1 : string, blogContent2 : string,
 
    bannerImg : string, seoTitle : string, seoKeywords: string, seoDescription : string,  altText : string
    
   ) : Observable <SimpleResponse>

  abstract getCuetBlogList() : Observable <cuetBlogListItemModel[]>


abstract updateCuetBlog(id : string, thumbnail : string, blogTitle : string, blogHeading : string, blogContent1 : string,
     
   blogContent2 : string,bannerImg : string, seoTitle : string,  seoKeywords : string, seoDescription : string,
    
   altText : string): Observable <SimpleResponse>

     
 abstract removeCuetBlog(id : string) : Observable <SimpleResponse>


 abstract getCuetBlog(id : string) : Observable <CuetBlogModel>


// abstract getCuetBlogListIdwithName() : Observable <blogListIdWithNameModel[]>

}   




     