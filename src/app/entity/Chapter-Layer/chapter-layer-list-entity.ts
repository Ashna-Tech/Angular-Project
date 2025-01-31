import { ChapterLayerListModel } from "../../core/domain/Chapter-Layer/chapter-layer-list-model";
import { ResponseModel } from "../../core/domain/response.model";

export interface ChapterLayerListEntity extends ResponseModel <ChapterLayerListModel[]> {}