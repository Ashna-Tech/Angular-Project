import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,map } from "rxjs";
import { IsubcategoryService } from "../core/services/Isub-catagory.service";
import { subCatagoryModel } from "../core/domain/sub-catagory/sub-catagory.model";
import { subCategoryListModel } from "../core/domain/sub-catagory/sub-catagory-list.model";
import { subCategoryEntity } from "../entity/sub-catagory/sub-category.entity";
import { subCategoryListEntity } from "../entity/sub-catagory/sub-category-List.entity";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { CommonListItemModel } from "../core/domain/common model";
import { CommonModelListEntity } from "../entity/Common-model-list entity";


@Injectable({
    providedIn:'root'
})
export class subCategoryService extends  IsubcategoryService{
  
    constructor (private http:HttpClient){
        super();
    }

    override createSubCategory(catId: string, name: string): Observable<SimpleResponse> {
        
        const url = `${baseUrl}/api/SubCategory`;

        return this.http.post<SimpleResponse>(url,{catId:catId,name:name}).pipe(
            map(response =>{
                console.log(response);
                if(response.status){
                    return response.data;
                }else{
                    throw new Error(response.msg)
                }
            })
        )
       
   }

 override updateSubCategory(id: string, catId: string, name: string): Observable<SimpleResponse> {
       
    const url = `${baseUrl}/api/SubCategory/${id}`;

    return this.http.put<SimpleResponse>(url,{id : id,catId : catId, name : name}).pipe(
        map(response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg)
            }
        })
    )
  }

  override removeSubCategory(id: string): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/SubCategory/${id}` ;
       return this.http.delete<SimpleResponse>(url).pipe(
           map(response=>{
               if(response.status){
                   return response.data ;
               }else{
                   throw new Error(response.msg);
               }
                   
           })
       )
     }
  

     override getSubcategorySingle(id:string): Observable<subCatagoryModel> {
        const url = `${baseUrl}/api/SubCategory/Single/${id}`;
        return this.http.get<subCategoryEntity>(url).pipe(
        map(response=>{
         if(response.status){
             return response.data;
         }else{
             throw new Error(response.msg);
         }
        })
        )
       }

       
  override getSubCategoryList(CatId: string): Observable<subCategoryListModel[]> {
      
    const url = `${baseUrl}/api/SubCategory/${CatId}`;
    
    return this.http.get<subCategoryListEntity>(url).pipe(
        map(response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg)
            }
        })
    )
  }

  
  override getSubcategoryIdWithName(CatId: string): Observable<CommonListItemModel[]> {
     
    const url =`${baseUrl}/api/SubCategory/IdWithName/${CatId}`;
    return this.http.get<CommonModelListEntity>(url).pipe(
     map (response =>{
          if(response.status){
             return response.data;
         }else{
             throw new Error (response.msg);
         }
     })
    )
 
 }
 
}
