import { BlogAuthorListItemModel } from "../../core/domain/Blog Author/blog-author-List-Item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface BlogAuthorListItemEntity extends ResponseModel <BlogAuthorListItemModel[]>{}