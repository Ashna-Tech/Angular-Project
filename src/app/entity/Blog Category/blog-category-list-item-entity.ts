import { BlogCategoryListItemModel } from "../../core/domain/Blog-category/blog-category-lis-item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface BlogCategoryListItemEntity extends ResponseModel <BlogCategoryListItemModel[]>{}