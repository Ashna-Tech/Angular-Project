import { Injectable } from "@angular/core";
import { IdashboardSliderService } from "../core/services/I dashboard.service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { dashboardModel } from "../core/domain/dashboard slider/dashboard.model";
import { baseUrl } from "../../environement";
import { dashboardListItemEntity } from "../entity/dashboard-Slider/dashboard-List-item.entity";
import { dashboardListItemModel } from "../core/domain/dashboard slider/dashboard-List-Item.model";
import { dashboardEntity } from "../entity/dashboard-Slider/dashboard.entity";


@Injectable({
    providedIn :'root'
})


export class dashboardSliderService extends IdashboardSliderService{



constructor(private http:HttpClient){
    super()
}

override createDashboardSlid(img: string, linkURL: string, groupId: number[]): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/DashboardSlider`;

   const formData = new FormData() ;

   formData.append('Image',img);
   formData.append('LinkURL',linkURL);
  
//    formData.append('GroupId', JSON.stringify(groupId));
   groupId.forEach(id => formData.append('GroupId', id.toString())) ;

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

override getDashboardSlidList(): Observable<dashboardListItemModel[]> {

    const url = `${baseUrl}/api/DashboardSlider`;

    return this.http.get <dashboardListItemEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else {
                throw new Error(response.msg);
            }
        })
    )
    
}

override updateDashboardSlid(id: string, img: string, linkURL: string, groupId: number[]): Observable<SimpleResponse> {
    
const url = `${baseUrl}/api/DashboardSlider/${id}`;

const formdata = new FormData() ;
formdata.append('Id',id),
formdata.append('Image',img);
formdata.append('LinkURL',linkURL);

// formdata.append('GroupId', JSON.stringify(groupId));

groupId.forEach(id => formdata.append('GroupId', id.toString())) ;
  

return this.http.put <SimpleResponse>(url,formdata).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)

}

override removeDashboardSlid(id : string): Observable<SimpleResponse> {

    const url = `${baseUrl}/api/DashboardSlider/${id} `;

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
override getDashboardSlid(id : string): Observable<dashboardModel> {
 
    const url = `${baseUrl}/api/DashboardSlider/${id}`;

    return this.http.get<dashboardEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}

override updateDashboardSlidToggleActive(id : string ,  status: string): Observable<SimpleResponse> {

const url = `${baseUrl}/api/DashboardSlider/ToggleActive/${id}`;

const payload = { id : id , activeStatus : status};
return this.http.put<SimpleResponse>(url,payload).pipe(
    map ((response) =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
)

}

// override getDashboardSlidListIdWithName(): Observable<BlogLeftimgListIdWithNameModel[]> {

// const url = `${baseUrl}/api/DashboardSlider/IdWithName`;
// return this.http.get<BlogLeftImgListIdwithNameEntity>(url).pipe(
//     map (response =>{
//         if(response.status){
//             return response.data ;
//         }else {
//             throw new Error(response.msg);
//         }
//     })
// )

// }

}