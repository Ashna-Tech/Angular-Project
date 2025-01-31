import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { BlogDtlListItemModel } from "../domain/blog Dtl/blog-dtl-list-item.mode";
import { BlogDtlModel } from "../domain/blog Dtl/blog-dtl-.model";
import { BlogDtlListIdWithNameModel } from "../domain/blog Dtl/blogDtlListIdWithName.model";


export abstract class IBlogdtlService{
    

abstract createBlogDtl(blogId : string, pdfTitle : string, pdfName : string) : Observable <SimpleResponse>


abstract getBlogDtlList() : Observable <BlogDtlListItemModel[]>



abstract updateBlogDtl(id : string, blogId : string, pdfTitle : string, pdfName : string) : Observable <SimpleResponse>



abstract removeBlogdtl(id : string) : Observable <SimpleResponse>


abstract getBlogDtl(id : string) : Observable <BlogDtlModel>


abstract getBlogDtlIdWithName() : Observable <BlogDtlListIdWithNameModel[]>



}
