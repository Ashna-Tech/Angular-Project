import { cuetBlogListItemModel } from "../../core/domain/cuet-blog/cuetBlog-list-Item-Model";
import { ResponseModel } from "../../core/domain/response.model";

export interface CuetBlogListItemEntity extends ResponseModel <cuetBlogListItemModel[]>{}