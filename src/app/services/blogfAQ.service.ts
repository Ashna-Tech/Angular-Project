// import { Injectable } from "@angular/core";
// import { IBlogFAQService } from "../core/services/Iblog-FAQ.service";
// import { HttpClient } from "@angular/common/http";
// import { Observable,map } from "rxjs";
// import { SimpleResponse } from "../core/domain/simple-response.model";
// import { baseUrl } from "../../environement";
// import { BlogFAQListModel } from "../core/domain/Blog-fAQ/blog-FAQ-model";
// import { BlogFAQListEntity } from "../entity/Blog-FAQ/blog-FAQ.entity";

// @Injectable({
//     providedIn:'root'
// })


// export class BlogFAQService extends IBlogFAQService{
  

// constructor(private http:HttpClient){
//     super()
// }
 
// override CreateBlogFAQ(blogId: string, faq: { question: string; answer: string; }[]): Observable<SimpleResponse> {
    
//     const url = `${baseUrl}/api/BlogFAQ`;  
//     const requestBody = {
//         blogId : blogId ,
//         faq : faq 
//     };

//     return this.http.post <SimpleResponse>(url,requestBody).pipe(
//         map(response =>{
//         if(response.status){
//             return response.data;
//         }else{
//             throw new Error(response.msg);
//         }
           
//         })
//     )
    
// }


// override UpdateBlogFAQ(blogId: string, faq: { id: string; question: string; answer: string; }): Observable<SimpleResponse> {
    
//     const url = `${baseUrl}/api/BlogFAQ`;

//     const requestBody = {
//         id : faq.id,
//         blogId : blogId,
//         question : faq.question,
//         answer : faq.answer
//     };

//     return this.http.put <SimpleResponse>(url,requestBody).pipe(
//         map (response =>{
//             if(response.status){
//                 return response.data;
//             }else{
//                 throw new Error(response.msg);
//             }
//         })
//     )
     
//  }



//  override removeBlogFAQ(id: string): Observable<SimpleResponse> {
      
//     const url = `${baseUrl}/api/BlogFAQ/${id}`;   
 
//  return this.http.delete<SimpleResponse>(url).pipe(
//     map (response =>{
//         if(response.status){
//             return response.data;
//     }else{
//             throw new Error(response.msg);
//         }
//     })
//  ) 
// }
   
// override BlogFAQListgetByBlogId(BlogId: string): Observable<BlogFAQListModel[]> {
 
//     const url = `${baseUrl}/api/BlogFAQ/${BlogId}`; 
    
//     return this.http.get <BlogFAQListEntity>(url).pipe(
//         map (response =>{
//             if (response.status){
//                 return response.data;
//             }else{
//                 throw new Error(response.msg);
//             }
//         })
//     )
// }
    


//    }

