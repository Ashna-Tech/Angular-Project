import { CategoryListItemModel } from "../../core/domain/category/category-list-item.model";
import { ResponseModel } from "../../core/domain/response.model";

export interface CategoryListEntity extends ResponseModel<CategoryListItemModel[]> {

}