import { Injectable } from '@angular/core';
import { IchapterService } from '../core/services/Ichapter.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { chapterModel } from '../core/domain/chapter/chapter.model';
import { chapterEntity } from '../entity/chapter/chapter.entity';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { CommonListItemModel } from '../core/domain/common model';
import { CommonModelListEntity } from '../entity/Common-model-list entity';
import { chapterListItemModel } from '../core/domain/chapter/chapter-list-item-model';
import { chapterListEntity } from '../entity/chapter/chapter-list-entity';

@Injectable({
  providedIn: 'root',
})
export class chapterService extends IchapterService {
  
  constructor(private http: HttpClient) {
    super();
  }


  override createChapter(name: string, subCatId: string, catId: string, examId: string): Observable<SimpleResponse> {
       
    const url = `${baseUrl}/api/Chapter`;

    return this.http.post<SimpleResponse>(url, { name: name, subCatId: subCatId,catId: catId, examId: examId,}).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );

  }

override updateChapter(id: string, name: string, subCatId: string, catId: string, examId: string): Observable<SimpleResponse> {
  
    const url = `${baseUrl}/api/Chapter`;
    
        return this.http.put<SimpleResponse>(url, {id: id,name: name, subCatId: subCatId,catId: catId,examId: examId}).pipe(
    
            map((response) => {
              console.log(response);
              if (response.status) {
                return response.data;
              } else {
                throw new Error(response.msg);
              }
            })
          )
  }


  
  override getChapterList(sCatId:string): Observable<chapterListItemModel[]> {
    const url = `${baseUrl}/api/Chapter?SCatId=${sCatId}`;

    return this.http.get<chapterListEntity>(url).pipe(
      map (response =>{
        if(response.status){
          return response.data;
        }else {
          throw new Error(response.msg);
        }
      })
    )  
  }
    

  override removeChapter(id: string): Observable<SimpleResponse> {
    
    const url = `${baseUrl}/api/Chapter/${id}`;

        return this.http.delete<SimpleResponse>(url).pipe(
          map((response) => {
            console.log(response);
            if (response.status) {
              return response.data;
            } else {
              throw new Error(response.msg);
            }
          })
        )
      }
  
  override getChapterSingle(id: string): Observable<chapterModel> {
    
    const url = `${baseUrl}/api/Chapter/Single/${id}`;
    return this.http.get <chapterEntity>(url).pipe(
      map (response =>{
        if(response.status){
          return response.data;
        }else {
          throw new Error(response.msg);
        }
      })
    )
    }


  override getChapterIdwithname(SubCatId: string): Observable<CommonListItemModel[]> {
 
    const url = `${baseUrl}/api/Chapter/IdWithName/${SubCatId}`;
    return this.http.get<CommonModelListEntity>(url).pipe(
      map (response =>{
        if(response.status){
          return response.data;
        }else{
          throw new Error(response.msg)
        }
      })
    )
  }

}
