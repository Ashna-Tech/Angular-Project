import { Injectable } from "@angular/core"
import { IcuetBlogService } from "../core/services/I cuet-blog.service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { cuetBlogListItemModel } from "../core/domain/cuet-blog/cuetBlog-list-Item-Model";
import { CuetBlogModel } from "../core/domain/cuet-blog/cuet-blog-model";
import { baseUrl } from "../../environement";
import { CuetBlogListItemEntity } from "../entity/cuet-blog/cuet-blog-list-item.entity";
import { CuetBlogEntity } from "../entity/cuet-blog/cuet-blog-entity";


@Injectable({
    providedIn:'root'
})


export class CuetBlogService extends IcuetBlogService{


constructor(private http:HttpClient){
    super()
}

override createCuetBlog(thumbnail: string, blogTitle: string, blogHeading: string, blogContent1: string,
     blogContent2: string, bannerImg: string, seoTitle: string, seoKeywords: string, seoDescription: string,
      altText: string): Observable<SimpleResponse> {
       
       const url = `${baseUrl}/api/CuetBlog`;

       const formData = new FormData();

       formData.append('thumbnail',thumbnail);
        formData.append('blogTitle',blogTitle);
        formData.append('blogHeading',blogHeading);
        formData.append('blogContent1',blogContent1);
        formData.append('blogContent2',blogContent2) ;
        formData.append('bannerImg',bannerImg) ;
        formData.append('seoTitle',seoTitle);
        formData.append('seoKeywords',seoKeywords);
        formData.append('seoDescription',seoDescription);
        formData.append('altText',altText) ;

    return this.http.post <SimpleResponse>(url,formData).pipe(                       
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
)

}


override getCuetBlogList(): Observable<cuetBlogListItemModel[]> {

    const url = `${baseUrl}/api/CuetBlog`;

    return this.http.get <CuetBlogListItemEntity>(url).pipe(
        map (response =>{
            if(response.status){
            return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
    
}

override updateCuetBlog(id: string, thumbnail: string, blogTitle: string, blogHeading: string, blogContent1:
     string, blogContent2: string, bannerImg: string, seoTitle: string, seoKeywords: string, seoDescription: 
     string, altText: string): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/CuetBlog/${id}`;

      const formdata = new FormData() ;
       formdata.append('id',id);
       formdata.append('thumbnail',thumbnail);
        formdata.append('blogTitle',blogTitle);
        formdata.append('blogHeading',blogHeading);
        formdata.append('blogContent1',blogContent1);
        formdata.append('blogContent2',blogContent2) ;
        formdata.append('bannerImg',bannerImg) ;
        formdata.append('seoTitle',seoTitle);
        formdata.append('seoKeywords',seoKeywords);
        formdata.append('seoDescription',seoDescription);
        formdata.append('altText',altText) ;


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
    

override removeCuetBlog(id: string): Observable<SimpleResponse> {

    const url = `${baseUrl}/api/CuetBlog/${id}`;

    return this.http.delete <SimpleResponse>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )

    
}



override getCuetBlog(id: string): Observable<CuetBlogModel> {
        
    const url = `${baseUrl}/api/CuetBlog/${id}`;

        return this.http.get <CuetBlogEntity>(url).pipe(
            map (response =>{
                if(response.status){
                    return response.data;
                }else{
                    throw new Error(response.msg);
                }
            })
        )



}

// override getCuetBlogListIdwithName(): Observable<blogListIdWithNameModel[]> {

//     const url = `${baseUrl}/api/CuetBlog/IdWithName`;
//     return this.http.get<BlogListIdwithNameEntity>(url).pipe(
//         map (response =>{
//             if(response.status){
//                 return response.data ;
//             }else{
//                  throw new Error(response.msg);
//             }
//         })
//     )

    }



