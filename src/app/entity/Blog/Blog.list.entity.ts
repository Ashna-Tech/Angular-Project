
import { BlogListItemModel } from "../../core/domain/blog/blogListItem.Model";
import { ResponseModel } from "../../core/domain/response.model";

export interface BlogListEntity extends ResponseModel <BlogListItemModel[]>{
    
}