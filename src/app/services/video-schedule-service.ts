import { Injectable } from "@angular/core";
import { IVideoScheduleService } from "../core/services/I video-schedule-service";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { VideoScheduleListModel } from "../core/domain/Video-Schedule/video-schedule-list-model";
import { VideoScheduleListEntity } from "../entity/Video-Schedule/video-schedule-list-entity";
import { VideoScheduleModel } from "../core/domain/Video-Schedule/video-schedule-model";
import { VideoScheduleEntity } from "../entity/Video-Schedule/video-schedule-entity";

@Injectable({
    providedIn : 'root',
})

export class VideoScheduleService extends IVideoScheduleService{

constructor (private http : HttpClient){
    super()
}

override CreateVideoSchedule(videoType: string, videoId: string, scheduleTime: string, title: string, 
    description: string, chapId: string, subCatId: string, catId: string, duration: string, thumbFile: string,
     isDemoClass: string, isFreeClass: string): Observable<SimpleResponse> {
    
        const url = `${baseUrl}/api/VideoSchedule`;

        const formdata = new FormData();

        const isdemoclass = (isDemoClass ==="Yes").toString();
        const isfreeclass = (isFreeClass ==="Yes").toString();

        formdata.append('VideoType', videoType),
        formdata.append('VideoId', videoId),
        formdata.append('ScheduleTime', scheduleTime),
        formdata.append('Title', title),
        formdata.append('Description', description),
        formdata.append('ChapId', chapId),
        formdata.append('SubCatId', subCatId),
        formdata.append('CatId', catId),
        formdata.append('Duration', duration),
        formdata.append('ThumbFile', thumbFile),
        formdata.append('IsDemoClass', isdemoclass),
        formdata.append('IsFreeClass', isfreeclass);

        return this.http.post<SimpleResponse>(url,formdata).pipe(
            map ((response)=>{
                if(response.status){
                    return response.data;
                }else{
                    throw new Error(response.msg)
                }
            })
        )
}

override getVideoScheduleList(): Observable<VideoScheduleListModel[]> {
    
const url = `${baseUrl}/api/VideoSchedule`;
return this.http.get<VideoScheduleListEntity>(url).pipe(
    map ((response)=>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)

}

override updateVideoSchedule(id: string, videoType: string, videoId: string, scheduleTime: string,
     title: string, description: string, chapId: string, subCatId: string, catId: string, duration: string,
      thumbFile: string, isDemoClass: string, isFreeClass: string): Observable<SimpleResponse> {
    
        const url = `${baseUrl}/api/VideoSchedule/${id}`;

        const formdata = new FormData() ;

        const isdemoclass = (isDemoClass ==="Yes").toString();
        const isfreeclass = (isFreeClass ==="Yes").toString() ;

        formdata.append('Id', id),
        formdata.append('VideoType', videoType),
        formdata.append('VideoId', videoId),
        formdata.append('ScheduleTime', scheduleTime),
        formdata.append('Title', title),
        formdata.append('Description', description),
        formdata.append('ChapId', chapId),
        formdata.append('SubCatId', subCatId),
        formdata.append('CatId', catId),
        formdata.append('Duration', duration),
        formdata.append('ThumbFile', thumbFile),
        formdata.append('IsDemoClass', isdemoclass),
        formdata.append('IsFreeClass', isfreeclass);
    
        return this.http.put<SimpleResponse>(url,formdata).pipe(
            map ((response)=>{
                if(response.status){
                    return response.data;
                }else{
                    throw new Error(response.msg);
                }
            })
        )
}


override deleteVideoSchedule(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/VideoSchedule/${id}`;
  return this.http.delete<SimpleResponse>(url).pipe(
    map ((response)=>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
  )
}


override getVideoSchedule(id: string): Observable<VideoScheduleModel> {
    const url = `${baseUrl}/api/VideoSchedule/${id}`
    return this.http.get<VideoScheduleEntity>(url).pipe(
        map ((response)=>{
            if(response.status){
                return response.data ;
            }else {
                throw new Error(response.msg);
            }
        })
    )
}



}



    
