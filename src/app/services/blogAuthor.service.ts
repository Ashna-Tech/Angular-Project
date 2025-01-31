import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { IBlogAuthorService } from "../core/services/I blog author.service";
import { BlogAuthorListItemModel } from "../core/domain/Blog Author/blog-author-List-Item.model";
import { BlogAuthorModel } from "../core/domain/Blog Author/blog-author-model";
import { baseUrl } from "../../environement";
import { HttpClient } from "@angular/common/http";
import { BlogAuthorListItemEntity } from "../entity/Blog Author/blog-author-list-item.entity";
import { BlogAuthorEntity } from "../entity/Blog Author/blog-author.entity";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn:'root'
})


export class BlogAuthorService extends IBlogAuthorService{
    

    constructor(private http:HttpClient){
        super()
    }

    override createBlogAuthor(name: string, profileImage: string, description: string, faceBookURL: string,
         twitterURL: string): Observable<SimpleResponse> {
        
        const url = `${baseUrl}/api/BlogAuthor`;

      const formData = new FormData();

       formData.append('Name',name);
       formData.append('ProfileImage', profileImage);
       formData.append('Description',description);
       formData.append('FaceBookURL',faceBookURL);
       formData.append('TwitterURL', twitterURL);

       return this.http.post<SimpleResponse>(url,formData).pipe(
        map (response =>{
     if(response.status){
        return response.data;
     }else{
        throw new Error(response.msg);
     }
    })
)
} 

override getBlogAuthorList(): Observable<BlogAuthorListItemModel[]> {

    const url = `${baseUrl}/api/BlogAuthor`;

    return this.http.get<BlogAuthorListItemEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else throw new Error(response.msg);
        })
    )
    
}

override updateBlogAuthor(id: string, name: string, profileImage: string, description: string,
     faceBookURL: string, twitterURL: string): Observable<SimpleResponse> {
    
        const url = `${baseUrl}/api/BlogAuthor/${id}`;
 
        const formData = new FormData();

        formData.append('Id',id);
        formData.append('Name', name);
        formData.append('ProfileImage', profileImage);
        formData.append('Description',description);
        formData.append('FaceBookURL',faceBookURL);
        formData.append('TwitterURL', twitterURL);

        return this.http.put <SimpleResponse>(url,formData).pipe(
            map (response =>{
                if(response.status){
                    return response.data;
                }else{throw new Error(response.msg)
    
                }
            })
        )
    }
    
        
 override deleteBlogAuthor(id: string): Observable<SimpleResponse> {
  
    const url = `${baseUrl}/api/BlogAuthor/${id}`;
     
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

 override getBlogAuthor(id: string): Observable<BlogAuthorModel> {
 
    const url = `${baseUrl}/api/BlogAuthor/${id}`;
  
    return this.http.get <BlogAuthorEntity>(url).pipe(
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




