import { Injectable } from "@angular/core";
import { ICategoryService } from "../core/services/Icatagory.service";
import { Observable, map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { HttpClient } from "@angular/common/http";
import { CategoryListEntity } from "../entity/category/category-list-Item.entity";
import { CategoryListItemModel } from "../core/domain/category/category-list-item.model";
import { CategoryModel } from "../core/domain/category/category.model";
import { CategoryEntity } from "../entity/category/category.entity";
import { baseUrl } from "../../environement";
import { CommonListItemModel } from "../core/domain/common model";
import { CommonModelListEntity } from "../entity/Common-model-list entity";


@Injectable({
    providedIn: 'root'
})

export class CategoryService extends ICategoryService{
    
    constructor(private http:HttpClient){
        super();
    }

    override createCategory(name: string, imageIcon: string, iconBackColor: string, shortName: string): Observable<SimpleResponse> {
    
        const url = `${baseUrl}/api/Category`;
        
        const formData = new FormData();
        
       formData.append('name',name);
       formData.append('imageIcon',imageIcon);
       formData.append('iconbackcolor',iconBackColor);
       formData.append('shortname',shortName);
       
 
       return this.http.post<SimpleResponse>(url,formData).pipe( 
       
        
        map(response=>{
            if(response.status){
                return response;
            }else{
                throw new Error(response.msg);
            }
        })
       )

        
    }


    override updateCategory(id: string, name: string,imageIcon:string,iconBackColor:string,shortName:string): Observable<SimpleResponse> {
        
        const url = `${baseUrl}/api/Category `;
 
       const formData = new FormData(); 
       formData.append('id',id);
       formData.append('Name',name);
       formData.append('ImageIcon',imageIcon);
       formData.append('IconBackcolor',iconBackColor);
       formData.append('shortName',shortName);

        return this.http.put<SimpleResponse>(url,formData).pipe(
            map(response=>{
                if(response.status){
                    return response;
                }else{
                    throw new Error(response.msg);
                }
            })
        )


    }
    
    override getCategoryList(): Observable<CategoryListItemModel[]> {

        const url = `${baseUrl}/api/Category`;


        return this.http.get<CategoryListEntity>(url).pipe(
            map(response => {
                if(response.status){
                    return response.data;
                }else{
                    throw new Error(response.msg);
                }
            })
        )
    }

    override getCategoryDetails(id: string): Observable<CategoryModel> {
        
        const url = `${baseUrl}/api/Category/${id}`;

      return this.http.get<CategoryEntity>(url).pipe(
        map(response=>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
      )
    }

    override removeCategory(id: string): Observable<SimpleResponse> {
        
        const url = `${baseUrl}/api/Category/${id}`;

        return this.http.delete<SimpleResponse>(url).pipe(
        map(response=>{
            if(response.status){
                return response;
            }else{
                throw new Error(response.msg);
            }
        })
      )        
    }

    override getCategoryListIDwithName(): Observable<CommonListItemModel[]> {

        const url = `${baseUrl}/api/Category/IdWithName`;
        
        return this.http.get <CommonModelListEntity> (url).pipe(
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
