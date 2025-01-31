import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { VideoScheduleListModel } from "../domain/Video-Schedule/video-schedule-list-model";
import { VideoScheduleModel } from "../domain/Video-Schedule/video-schedule-model";

export abstract class IVideoScheduleService{

abstract CreateVideoSchedule(videoType : string, videoId : string, scheduleTime : string, title : string,
    description : string, chapId : string, subCatId : string, catId : string, duration : string, thumbFile :
    string, isDemoClass: string, isFreeClass: string)  : Observable <SimpleResponse> 

abstract getVideoScheduleList() : Observable <VideoScheduleListModel[]>

abstract updateVideoSchedule(id : string, videoType : string, videoId : string, scheduleTime : string, title :
    string, description : string, chapId : string, subCatId : string, catId : string, duration : string,
    thumbFile : string, isDemoClass: string, isFreeClass: string ) : Observable <SimpleResponse>
    
abstract deleteVideoSchedule(id : string) : Observable <SimpleResponse>

abstract getVideoSchedule(id : string) : Observable <VideoScheduleModel> 
}