import { Injectable } from "@angular/core";
import { IBlogLeftImgService } from "../core/services/I blog left img.service";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { blogLeftImgModel } from "../core/domain/Blog left img/blogLeftImg-model";
import { baseUrl } from "../../environement";
import { HttpClient } from "@angular/common/http";
import { blogLeftImgListItemEntity } from "../entity/blog Left img/blog-Left-Img-list-Item.entity";
import { blogLeftImgListItemModel } from "../core/domain/Blog left img/blogLeft-Img-list-item.model";
import { blogLeftImgEntity } from "../entity/blog Left img/blog-left-img-entity";


@Injectable({
    providedIn : 'root'
})


export class blogLeftImgService extends IBlogLeftImgService{


    
constructor (private http:HttpClient){
    super()
}

override createBlogLeftImg(img: string, linkURL: string, isActive: string): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/BlogLeftImg`;
    const formData = new FormData();

    const isAct = (isActive === "Yes").toString();
    formData.append('Img', img);
    formData.append('LinkURL', linkURL);
    formData.append('IsActive', isAct);
    
    return this.http.post <SimpleResponse>(url,formData).pipe(
        map (response =>{
         if(response.status){
            return response.data;
         }else{
            throw new Error(response.msg);
         }
        })
    )
}

override getBlogLeftImgList(): Observable<blogLeftImgListItemModel[]> {
    
    const url = `${baseUrl}/api/BlogLeftImg`;

    return this.http.get <blogLeftImgListItemEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg)
            }
        })
    )
}

override updateBlogLeftImg(id: string, img: string, linkURL: string, isActive: string): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/BlogLeftImg/${id}`;
 
    const formdata = new FormData() ;

    const isAct = (isActive === "Yes").toString();
    formdata.append('Id',id);
    formdata.append('Img', img);
    formdata.append('LinkURL', linkURL);
    formdata.append('IsActive', isAct);


    return this.http.put <SimpleResponse>(url,formdata).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg)
            }
        })
    )
}

override removeBlogLeftImg(id: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/BlogLeftImg/${id}`;

return this.http.delete<SimpleResponse>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)
}

override getBlogLeftImg(id: string): Observable<blogLeftImgModel> {
    
    const url = `${baseUrl}/api/BlogLeftImg/${id}`;

    return this.http.get <blogLeftImgEntity>(url).pipe(
        map(response =>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}


}


















