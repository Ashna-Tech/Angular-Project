import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { CategoryListItemModel } from "../domain/category/category-list-item.model";
import { CategoryModel } from "../domain/category/category.model";
import { CommonListItemModel } from "../domain/common model";



export abstract class ICategoryService{

    abstract createCategory(name: string, imageIcon:string, iconBackColor :string,shortName:string):Observable<SimpleResponse>

    abstract getCategoryList():Observable<CategoryListItemModel[]>

    abstract updateCategory(id: string, name: string,imageIcon:string,iconBackColor:string,shortName:string):Observable<SimpleResponse>

    abstract removeCategory(id:string):Observable<SimpleResponse>

    abstract getCategoryDetails(id : string ):Observable<CategoryModel>

    abstract getCategoryListIDwithName() :Observable <CommonListItemModel[]> 
}