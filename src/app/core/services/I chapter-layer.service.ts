import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { ChapterLayerListModel } from "../domain/Chapter-Layer/chapter-layer-list-model";
import { ChapterLayerModel } from "../domain/Chapter-Layer/chapter-layer-model";

export abstract class IchapterLayerService {

    abstract CreateChapterLayer(layer : string , chapterId : string, description : string) : Observable <SimpleResponse>
    

    abstract getChapterLayerList() : Observable <ChapterLayerListModel[]>

    abstract UpdateChapterLayer(id : string, layer : string, chapterId : string, description : string) :
     Observable <SimpleResponse>

    abstract deleteChapterLayer(id : string) : Observable <SimpleResponse>

    abstract getChapterLayer(id : string) : Observable <ChapterLayerModel>

}