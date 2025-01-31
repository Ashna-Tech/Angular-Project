import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { LandingPageContentListmodel } from '../domain/Landing-Page-Content/landingPageContentList.model';
import { LandingPageContentmodel } from '../domain/Landing-Page-Content/landingPageContent.model';

export abstract class IlandingPageContentService {
  abstract CreateLandingPageContent(
    pageId: string,
    examPatternType: string,
    heading: string,
    examContent: string
  ): Observable<SimpleResponse>;

  abstract GetLandingPageContentList(): Observable<
    LandingPageContentListmodel[]
  >;

  abstract UpadateLandingPageContent(
    id: string,
    pageId: string,
    examPatternType: string,
    heading: string,
    examContent: string
  ): Observable<SimpleResponse>;

  abstract DeleteLandingPageContent(id: string): Observable<SimpleResponse>;

  abstract GetLandingPageContent(
    id: string
  ): Observable<LandingPageContentmodel>;
}
