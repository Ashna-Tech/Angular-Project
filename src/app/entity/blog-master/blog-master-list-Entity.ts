import { BlogMasterListItemModel } from "../../core/domain/Blog-Master/Blog-Maaster-List-item-Model";
import { ResponseModel } from "../../core/domain/response.model";

export interface BlogMasterListEntity extends ResponseModel <BlogMasterListItemModel[]>{

}