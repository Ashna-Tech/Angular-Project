import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { LawExamMagazineListModel } from "../domain/Law-Exam-Magazine/law-exam-magazine.list.model";
import { LawExamMagazineModel } from "../domain/Law-Exam-Magazine/law-exam-magazine-model";

export abstract class ILawExMagazineService{

abstract createLawExMagazine(mId : string, issue : string, testId : string, issueFortnightly : string,
issueMonth : string, coverStory : string, inBrief : string, keyHighlights : string, pdfFileName : string,
bannerImage : string, seoKeywords : string, seoDescription : string ) : Observable <SimpleResponse> 

abstract getLawExMagazineList() : Observable <LawExamMagazineListModel[]>


abstract updateLawExMagazine(id : string, mId : string, issue : string, testId : string, issueFortnightly :
    string, issueMonth : string, coverStory : string, inBrief : string, keyHighlights : string,
    pdfFileName : string, bannerImage : string, seoKeywords : string, seoDescription : string
) : Observable <SimpleResponse>


abstract deleteLawExMagazine(id : string) : Observable <SimpleResponse>

abstract getLawExMagazine(id : string) : Observable <LawExamMagazineModel>

}