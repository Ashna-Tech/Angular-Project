import { Injectable } from '@angular/core';
import { IlandingPageContentService } from '../core/services/I IandingPageContent.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { LandingPageContentListEntity } from '../entity/Landing-Page-Content/landingPageContentList.entity';
import { LandingPageContentListmodel } from '../core/domain/Landing-Page-Content/landingPageContentList.model';
import { LandingPageContentEntity } from '../entity/Landing-Page-Content/landingPageContent.entity';
import { LandingPageContentmodel } from '../core/domain/Landing-Page-Content/landingPageContent.model';

@Injectable({
  providedIn: 'root',
})
export class LandingPageContentService extends IlandingPageContentService {
  constructor(private http: HttpClient) {
    super();
  }

  override CreateLandingPageContent(
    pageId: string,
    examPatternType: string,
    heading: string,

    examContent: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/LandingPageContent`;

    return this.http
      .post<SimpleResponse>(url, {
        pageId: pageId,
        examPatternType: examPatternType,
        heading: heading,
        examContent: examContent,
      })
      .pipe(
        map((response) => {
          if (response.status) {
            return response.data;
          } else {
            throw new Error(response.msg);
          }
        })
      );
  }


  override GetLandingPageContentList(): Observable<LandingPageContentListmodel[]> {
      
const url = `${baseUrl}/api/LandingPageContent`;

return this.http.get <LandingPageContentListEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)


  }


  override UpadateLandingPageContent(id: string, pageId: string, examPatternType: string, 
    heading: string, examContent: string): Observable<SimpleResponse> {
    
        const url = `${baseUrl}/api/LandingPageContent/${id}` ;

        return this.http.put <SimpleResponse>(url,{id : id , pageId : pageId,
            examPatternType : examPatternType, heading : heading, examContent : examContent,
        }).pipe(
            map (response =>{
                if(response.status){
                    return response.data ;
                }else {
                    throw new Error(response.msg);
                }
            })
        )
  }


  override DeleteLandingPageContent(id: string): Observable<SimpleResponse> {
      
const url = `${baseUrl}/api/LandingPageContent/${id}`;

return this.http.delete <SimpleResponse>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)

  }

override GetLandingPageContent(id: string): Observable<LandingPageContentmodel> {
    
const url = `${baseUrl}/api/LandingPageContent/${id}`;

return this.http.get <LandingPageContentEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else {
            throw new Error(response.msg);
        }
    })
)

}








}
