import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { blogPdfNewListItemModel } from "../domain/blog Pdfnew/blogpdfnew-list.item.model";
import { blogPdfNewModel } from "../domain/blog Pdfnew/blogpdfNew.model";


export abstract class IblogPdfNewService {


 abstract createBlogPdfnew(pdfTitle : string, pdfFile : string) : Observable <SimpleResponse> 


 abstract getblogPdfnewList() : Observable <blogPdfNewListItemModel[]>


 abstract updateBlogPdfnew(id : string, pdfTitle : string,pdfFile : string) : Observable <SimpleResponse>


 abstract removeBlogPdfNew(id : string) : Observable <SimpleResponse>


 abstract getBlogPdfNew(id : string) : Observable <blogPdfNewModel>


//  abstract getBlogPdfNewListIdWithName() : Observable <BlogPdfNewListIdWithNameModel[]>

}