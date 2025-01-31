import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { BlogCategoryListItemModel } from "../domain/Blog-category/blog-category-lis-item.model";
import { BlogCategoryModel } from "../domain/Blog-category/blog-category.model";
import { BlogCategoryListIdwithnameModel } from "../domain/Blog-category/blog-categorylistIdwithname.model";

export abstract class IBlogCategoryService{

abstract createBlogCategory(name: string,groupId : string, isActive : string) : Observable <SimpleResponse>;

abstract getBlogCategoryList() : Observable <BlogCategoryListItemModel[]>


abstract updateBlogCategory(id: string,name: string,groupId:string,isActive : string) : Observable <SimpleResponse>

abstract deleteBlogCategory(id:string) : Observable <SimpleResponse>


abstract getBlogCategory(id: string) : Observable <BlogCategoryModel>


abstract getBlogCategoryIdwithName() : Observable <BlogCategoryListIdwithnameModel[]>

 }