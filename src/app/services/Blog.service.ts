import { Injectable } from "@angular/core";
import { IBlogService } from "../core/services/I Blog.service";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { HttpClient } from "@angular/common/http";
import { BlogEntity } from "../entity/Blog/Blog.entity";
import { BlogListEntity } from "../entity/Blog/Blog.list.entity";
import { BlogModel } from "../core/domain/blog/blog.Model";
import { BlogListItemModel } from "../core/domain/blog/blogListItem.Model";


@Injectable({
    providedIn:'root'
})


export class BlogService extends IBlogService{

constructor (private http:HttpClient){
    super()
}

override createBlog(Thumbnail: string, BlogTitle: string, BlogHeading: string, BlogContent1: string, BlogContent2: string,

     BannerImg: string, CatId: string, SCatId: string, ChapId: string, QuizId: string, SeoTitle: string,
     
     SeoKeywords: string, SeoDescription : string, AltText: string): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/Blog`;

    const formData = new FormData();
   
    formData.append('Thumbnail',Thumbnail);
    formData.append('BlogTitle',BlogTitle);
    formData.append('BlogHeading',BlogHeading);
    formData.append('BlogContent1',BlogContent1);
    formData.append('BlogContent2',BlogContent2)
    formData.append('BannerImg',BannerImg);
    formData.append('CatId',CatId);
    formData.append('SCatId',SCatId);
    formData.append('ChapId',ChapId);
    formData.append('QuizId',QuizId);
    formData.append('SeoTitle',SeoTitle);
    formData.append('SeoKeywords',SeoKeywords);
    formData.append('SeoDescription',SeoDescription);
    formData.append ('AltText',AltText); 

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


override updateBlog(Id: string, Thumbnail: string, BlogTitle: string, BlogHeading: string, BlogContent1: string, BlogContent2: string,
    
    BannerImg: string, CatId: string, SCatId: string, ChapId: string, QuizId: string, SeoTitle: string, SeoKeywords: string, 
    
    SeoDescription: string, AltText: string): Observable<SimpleResponse> {
    

        const url = `${baseUrl}/api/Blog/${Id}`;

        const formData = new FormData();
        formData.append('Id',Id);
        formData.append('Thumbnail',Thumbnail);
        formData.append('Blogtitle',BlogTitle);
        formData.append('Blogheading',BlogHeading);
        formData.append('Blogcontent1',BlogContent1);
        formData.append('Blogcontent2',BlogContent2);
        formData.append('Bannerimage',BannerImg);
        formData.append('CatId',CatId);
        formData.append('ScatId',SCatId);
        formData.append('ChapId',ChapId);
        formData.append('QuizId',QuizId);
        formData.append('Seotitle',SeoTitle);
        formData.append('Seokeywords', SeoKeywords);
        formData.append('Seodescription', SeoDescription);
        formData.append('Alttext',AltText)


    return this.http.put<SimpleResponse>(url,formData).pipe (
        map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)                  
}



override removeBlog(Id: string): Observable<SimpleResponse> {
 
    const url = `${baseUrl}/api/Blog/${Id}`;

    return this.http.delete<SimpleResponse>(url).pipe(
        map(response =>{
            if(response.status){
                return response.data;
            }else{
                 throw new Error(response.msg);
            }
        })
    )
}

override getBloglist(ChapId: string): Observable<BlogListItemModel[]> {
    
    const url = `${baseUrl}/api/Blog/${ChapId}`;
return this.http.get<BlogListEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
             throw new Error(response.msg)
        }
    })
)   
}

override getBlogSingle(Id: string): Observable<BlogModel> {

    const url = `${baseUrl}/api/Blog/Single/${Id}`;
 
    return this.http.get<BlogEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
    
}

// override getBlogListIdWithName(ChapId: string): Observable<blogListIdWithNameModel[]> {
    
// const url = `${baseUrl}/api/Blog/IdWithName/${ChapId}`;

// return this.http.get<BlogListIdwithNameEntity>(url).pipe(
//     map (response =>{
//         if(response.status){
//             return response.data;
//         }else {
//              throw new Error(response.msg); 
//         }
//     })
// ) 
}