import { Injectable } from "@angular/core";
import { IBlogCategoryService } from "../core/services/I BlogCategory.service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { BlogCategoryModel } from "../core/domain/Blog-category/blog-category.model";
import { baseUrl } from "../../environement";
import { BlogCategoryListItemEntity } from "../entity/Blog Category/blog-category-list-item-entity";
import { BlogCategoryListItemModel } from "../core/domain/Blog-category/blog-category-lis-item.model";
import { BlogCategoryListIdwithnameModel } from "../core/domain/Blog-category/blog-categorylistIdwithname.model";
import { blogCategoryListIdwithnameEntity } from "../entity/Blog Category/blogCategoryListIdwithname Entity";



@Injectable({
    providedIn:'root'
})


export class BlogCategoryService extends IBlogCategoryService{

constructor(private http:HttpClient){
    super()
}

override createBlogCategory(name: string, groupId: string, isActive: string): Observable<SimpleResponse> {
    

    const url = `${baseUrl}/api/BlogCategory`;
 
    return this.http.post <SimpleResponse> (url,{name: name , groupId : groupId , isActive : isActive === "Yes"}).pipe(
        map (response =>{
          if(response.status){
            return response.data;
          } else {
            throw new Error(response.msg);
          }  
        })
    )
    
}


override getBlogCategoryList(): Observable<BlogCategoryListItemModel[]> {
   
    const url = `${baseUrl}/api/BlogCategory`;
   
    return  this.http.get <BlogCategoryListItemEntity>(url).pipe(
        map (response =>{
            if(response.status){
                 return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
    
}

override updateBlogCategory(id: string, name: string, groupId: string, isActive: string): Observable<SimpleResponse> {
        
    const url = `${baseUrl}/api/BlogCategory/${id}`;
    
    return this.http.put <SimpleResponse>(url,{id:id,name: name, groupId : groupId , isActive : isActive ==="Yes"}).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
    
}
override deleteBlogCategory(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/BlogCategory/${id}`;
    return this.http.delete <SimpleResponse>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                    throw new Error(response.msg);
                        }
        })
    )
}
override getBlogCategory(id: string): Observable<BlogCategoryModel> {
const url = `${baseUrl}/api/BlogCategory/${id}`;    
return this.http.get <SimpleResponse>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else throw new Error(response.msg);
    })
)
}

override getBlogCategoryIdwithName(): Observable<BlogCategoryListIdwithnameModel[]> {
 
    const url =  `${baseUrl}/api/BlogCategory/IdWithName`;
return this.http.get<blogCategoryListIdwithnameEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)

}



}

