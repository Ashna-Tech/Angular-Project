import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {ILawExMagazineService} from "../core/services/I law-ex-magazine.service";
import { Observable,map } from "rxjs";
import { SimpleResponse } from "../core/domain/simple-response.model";
import { baseUrl } from "../../environement";
import { LawExamMagazineListEntity } from "../entity/Law-Exam-Magazine/law-exam-magazine-list.entity";
import { LawExamMagazineListModel } from "../core/domain/Law-Exam-Magazine/law-exam-magazine.list.model";
import { LawExamMagazineModel } from "../core/domain/Law-Exam-Magazine/law-exam-magazine-model";
import { LawExamMagazineEntity } from "../entity/Law-Exam-Magazine/law-exam-magazine-entity";
import { formatDate } from "@angular/common";
import { SeokeywordPageService } from "./seoKeywordPage.service";


@Injectable({
    providedIn : 'root',
})



export class LawExMagazineService extends ILawExMagazineService{

constructor(private http : HttpClient){
    super()
}

override createLawExMagazine(mId: string, issue: string, testId: string, issueFortnightly: string,
     issueMonth: string, coverStory: string, inBrief: string, keyHighlights: string, pdfFileName: string, 
     bannerImage: string, seoKeywords: string, seoDescription: string): Observable<SimpleResponse> {
    
        const url = `${baseUrl}/api/LawExMagazine`;

        const formdata = new FormData() ;
        
        formdata.append('MId', mId);
        formdata.append('Issue', issue);
        formdata.append('TestId', testId) ;
        formdata.append('IssueFortnightly',issueFortnightly) ;
        formdata.append('IssueMonth', issueMonth) ;
        formdata.append('CoverStory', coverStory) ;
        formdata.append('InBrief', inBrief) ;
        formdata.append('KeyHighlights', keyHighlights) ;
        formdata.append('PdfFileName', pdfFileName) ;
        formdata.append('BannerImage', bannerImage) ;
        formdata.append('SeoKeywords',seoKeywords) ;
        formdata.append('SeoDescription', seoDescription);   
                
        return this.http.post<SimpleResponse>(url,formdata).pipe(
                map ((response)=>{
                    if(response.status){
                        return response.data ;
                    }else{
                        throw new Error(response.msg);
                    }
                })
            )
        }
        
 override getLawExMagazineList(): Observable<LawExamMagazineListModel[]> {
     const url = `${baseUrl}/api/LawExMagazine`;
return this.http.get<LawExamMagazineListEntity>(url).pipe(
    map (response =>{
        if(response.status){
            return response.data;
        }else{
            throw new Error(response.msg);
        }
    })
)

 }       

override updateLawExMagazine(id: string, mId: string, issue: string, testId: string, issueFortnightly: string,
     issueMonth: string, coverStory: string, inBrief: string, keyHighlights: string, pdfFileName: string,
      bannerImage: string, seoKeywords: string, seoDescription: string): Observable<SimpleResponse> {
    
        const url = `${baseUrl}/api/LawExMagazine/${id}`;

        const formdata = new FormData();
 
        formdata.append('Id', id);
        formdata.append('MId', mId);
        formdata.append('Issue', issue);
        formdata.append('TestId', testId),
        formdata.append('IssueFortnightly', issueFortnightly);
        formdata.append('IssueMonth', issueMonth),
        formdata.append('CoverStory', coverStory);
        formdata.append('InBrief', inBrief);
        formdata.append('KeyHighlights', keyHighlights);
        formdata.append('PdfFileName', pdfFileName) ;
        formdata.append('BannerImage', bannerImage);
        formdata.append('SeoKeywords', seoKeywords);
        formdata.append('SeoDescription', seoDescription);
        

        return this.http.put<SimpleResponse>(url,formdata).pipe(
            map (response =>{
                if(response.status){
                    return response.data;
                }else{
                    throw new Error(response.msg);
                }
            })
        )
}


override deleteLawExMagazine(id: string): Observable<SimpleResponse> {
     const url = `${baseUrl}/api/LawExMagazine/${id}`;
     return this.http.delete<SimpleResponse>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data ;
            }else {
                throw new Error(response.msg);
            }
        })
     )
}


override getLawExMagazine(id: string): Observable<LawExamMagazineModel> {
    const url = `${baseUrl}/api/LawExMagazine/${id}`;
    return this.http.get<LawExamMagazineEntity>(url).pipe(
        map (response =>{
            if(response.status){
                return response.data ;
            }else{
                throw new Error(response.msg);
            }
        })
    )
}



}