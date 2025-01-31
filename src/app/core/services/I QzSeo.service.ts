import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { QzSEOListModel } from '../domain/Qz-SEO/QzSeoList.model';
import { QzSeoModel } from '../domain/Qz-SEO/QzSeo.model';

export abstract class IQzSeoService {
  abstract CreateQzSEO(
    examTypeID: string,
    pageTitle: string,
    kwordMeta: string,
    pageDesc: string
  ): Observable<SimpleResponse>;

  abstract GetQzSEOList(): Observable<QzSEOListModel[]>;

  abstract UpdateQzSEO(
    id: string,
    examTypeID: string,
    pageTitle: string,
    kwordMeta: string,
    pageDesc: string
  ): Observable<SimpleResponse>;

  abstract DeleteQzSEO(id: string): Observable<SimpleResponse>;

  abstract GetQzSEO(id: string): Observable<QzSeoModel>;
}
