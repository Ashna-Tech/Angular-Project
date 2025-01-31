import { blogPDFListItemModel } from "../../core/domain/Blog-pdf/blogpdf-list-Item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface blogPDFListItemEntity extends ResponseModel <blogPDFListItemModel[]>{}