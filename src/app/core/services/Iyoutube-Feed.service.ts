import { youtubeFeedListItemModel } from "../domain/Youtube-feed/youtube-feed-list-item-model";
import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";


export abstract class IyouTubeFeedService{

 abstract createYoutubeFeed(catId:string,sCatId:string,videoURL:string,videoTitle:string,thumbnail:string,
 
  homeOrderNo:string, isHomeVideo:string):Observable <SimpleResponse>


  abstract getYouTubeFeedList(SCatId : string) : Observable <youtubeFeedListItemModel[]>

     
}  