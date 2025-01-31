import { blogPDFListItemModel } from "../../core/domain/Blog-pdf/blogpdf-list-Item.model";
import { blogPdfNewListItemModel } from "../../core/domain/blog Pdfnew/blogpdfnew-list.item.model";
import { ResponseModel } from "../../core/domain/response.model";


export interface blogpdfNewListItemEntity extends ResponseModel <blogPdfNewListItemModel[]>{};