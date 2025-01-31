import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IyouTubeFeedService } from "../core/services/Iyoutube-Feed.service";
import { youtubeFeedListItemModel } from "../core/domain/Youtube-feed/youtube-feed-list-item-model";
import { youtubeFeedListItemEntity } from "../entity/Youtube-feed/youtube-feed-list-item.entity";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { Observable,map } from "rxjs";


@Injectable({
    providedIn:'root',
})

export class youtubeFeedService extends IyouTubeFeedService {

constructor(private http:HttpClient){
    super();
}


    override createYoutubeFeed(catId: string, sCatId: string, videoURL: string, videoTitle: string, thumbnail: string,
         homeOrderNo: string, isHomeVideo: string): Observable<SimpleResponse> {
        
         const url = `${baseUrl}/api/YoutubeFeed`;

    
       const formData = new FormData();

        const HomeVideo = (isHomeVideo ==="Yes").toString();
        formData.append('CatId',catId);
        formData.append('SCatId',sCatId);
        formData.append('VideoURL',videoURL);
        formData.append('VideoTitle',videoTitle);
        formData.append('Thumbnail',thumbnail);
        formData.append('HomeOrderNo',homeOrderNo);
        formData.append('IsHomeVideo',HomeVideo);

   
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
        
   

override getYouTubeFeedList(SCatId: string): Observable<youtubeFeedListItemModel[]> {
    
    const url = `${baseUrl}/api/YoutubeFeed/${SCatId}`;
    return this.http.get<youtubeFeedListItemEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data;
            }else{
                throw new Error (response.msg)
            }
        })
    )
}


}
