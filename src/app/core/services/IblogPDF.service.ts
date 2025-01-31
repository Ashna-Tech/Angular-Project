import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { blogPDFListItemModel } from "../domain/Blog-pdf/blogpdf-list-Item.model";
import { blogPDFModel } from "../domain/Blog-pdf/BlogPdf-model";
import { BlogDtlListIdWithNameModel } from "../domain/blog Dtl/blogDtlListIdWithName.model";

export  abstract class IblogPDFService {

 abstract createBlogPdf(title : string , pdfName : string) : Observable <SimpleResponse>


  abstract getblogPDFList() : Observable <blogPDFListItemModel[]>


abstract updateBlogPDF(id : string, title : string, pdfName : string) : Observable <SimpleResponse>


abstract removeBlogPDF(id : string) : Observable <SimpleResponse>


abstract getBlogPDF(id : string) : Observable <blogPDFModel>


abstract getBlogPdfListIdWitName() : Observable <BlogDtlListIdWithNameModel[]>
}

