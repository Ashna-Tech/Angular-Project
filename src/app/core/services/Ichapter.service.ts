import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { chapterModel } from '../domain/chapter/chapter.model';
import { CommonListItemModel } from '../domain/common model';
import { chapterListItemModel } from '../domain/chapter/chapter-list-item-model';

export abstract class IchapterService {

  abstract createChapter(name:string,subCatId:string,catId:string,examId:string): Observable<SimpleResponse>

  abstract updateChapter( id:string, name:string,subCatId:string,catId:string,examId:string):Observable<SimpleResponse>

  abstract getChapterList(sCatId:string) : Observable <chapterListItemModel[]>

  abstract removeChapter(id:string): Observable<SimpleResponse>

  abstract getChapterSingle(id:string): Observable<chapterModel>

  abstract getChapterIdwithname(SubCatId : string) : Observable <CommonListItemModel[]> 

}

