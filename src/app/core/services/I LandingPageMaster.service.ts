import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { LandingPageMasterListmodel } from '../domain/Landing-Page-Master/landingpageMasterList.model';
import { LandingPageMastermodel } from '../domain/Landing-Page-Master/landingPageMaster.model';

export abstract class IlandingPageMasterService {
  abstract CreateLandingPageMaster(
    examGroupId: string,
    name: string,
    description: string,
    seoTitle: string,
    seoKeywords: string,
    seoDescription: string,
    otherDetail: string,
    jsonSchema: string
  ): Observable<SimpleResponse>;


  abstract GetLandingPageMasterList(): Observable<LandingPageMasterListmodel[]>;

  abstract UpdateLandingPageMaster(
    id: string,
    examGroupId: string,
    name: string,
    description: string,
    seoTitle: string,
    seoKeywords: string,
    seoDescription: string,
    otherDetail: string,
    jsonSchema: string
  ): Observable<SimpleResponse>;



  abstract DeleteLandingPageMaster(id: string): Observable<SimpleResponse>;

  abstract GetLandingPageMaster(id: string): Observable<LandingPageMastermodel>;
}
