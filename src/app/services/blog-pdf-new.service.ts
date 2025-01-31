import { Injectable } from "@angular/core";
import { IblogPdfNewService } from "../core/services/I blog-pdf-New.service";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { blogPdfNewModel } from "../core/domain/blog Pdfnew/blogpdfNew.model";
import { baseUrl } from "../../environement";
import { HttpClient } from "@angular/common/http";
import { blogpdfNewListItemEntity } from "../entity/blog pdf-New/blog-pdf-new-listitem.entity";
import { blogPdfNewListItemModel } from "../core/domain/blog Pdfnew/blogpdfnew-list.item.model";
import { blogPdfNewEntity } from "../entity/blog pdf-New/blog-pdf-New.entity";


@Injectable({
    providedIn : 'root'
})

export class blogPdfNewService extends IblogPdfNewService{
    

    constructor(private http:HttpClient){
        super()
    }

override createBlogPdfnew(pdfTitle: string, pdfFile: string): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/BlogPdfNew`;

    const data = new FormData();
    data.append('pdfTitle',pdfTitle );
    data.append('pdfFile',pdfFile );
 return this.http.post <SimpleResponse>(url, data).pipe(
    map (response =>{
     if(response.status){
        return response.data;
     }else { 
        throw new Error(response.msg);
     }
    })
 )
    

}

override getblogPdfnewList(): Observable<blogPdfNewListItemModel[]> {

    const url = `${baseUrl}/api/BlogPdfNew`;

    return this.http.get <blogpdfNewListItemEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
    
}

override updateBlogPdfnew(id: string, pdfTitle: string, pdfFile: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/BlogPdfNew/${id}`;
const data = new FormData();
data.append('Id',id)
data.append('pdfTitle',pdfTitle );
data.append('pdfFile',pdfFile );


return this.http.put <SimpleResponse>(url,data).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
            
    })
)

}

override removeBlogPdfNew(id: string): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/BlogPdfNew/${id}`;

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

override getBlogPdfNew(id: string): Observable<blogPdfNewModel> {
    
    const url = `${baseUrl}/api/BlogPdfNew/${id}`;

    return this.http.get<blogPdfNewEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}

// override getBlogPdfNewListIdWithName(): Observable<BlogPdfNewListIdWithNameModel[]> {
   
//     const url = `${baseUrl}/api/BlogPdfNew/IdWithName`;
//     return this.http.get<BlogPdfNewListIdWithNameEntity>(url).pipe(
//         map (response =>{
//             if(response.status){
//                 return response.data;
//             }else{
//                 throw new Error(response.msg);
//             }
//         })
//     )

// }

}