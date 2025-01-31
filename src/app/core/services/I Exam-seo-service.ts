import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { ExamseoListModel } from "../domain/Tz-Seo/Exam-seo-list-model";
import { ExamSeoModel } from "../domain/Tz-Seo/Exam-seo-model";


export abstract class IExamSeoService{

abstract createExamSeo(id : string, pageTitle : string, keyword : string, description : string,
    metaTag : string, reviewCount : string, rating : string ) : Observable <SimpleResponse>

abstract updateExamSeo(id : string, pageTitle : string, keyword : string, description : string,metaTag 
    :string, reviewCount : string, rating : string ) : Observable <SimpleResponse>
    
abstract getExamSeoList() : Observable <ExamseoListModel[]> 

abstract deleteExamSeo(id : string) : Observable <SimpleResponse>

abstract getExamSeo(id : string) : Observable <ExamSeoModel>

}