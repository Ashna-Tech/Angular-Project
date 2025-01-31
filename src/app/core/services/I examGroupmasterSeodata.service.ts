import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { ExamGroupMasterSeodataListmodel } from '../domain/Exam-Group-Master-Seo-Data/examGroupmasterSeodataList.model';
import { ExamGroupmasterSeoDatamodel } from '../domain/Exam-Group-Master-Seo-Data/examGroupmasterSeodata.model';

export abstract class IExamGroupmasterSeodataService {
  abstract CreateExamGroupmasterSeoData(
    seoTitle: string,
    seoKeywords: string,
    seoDescription: string,
    jsonSchema: string,
    otherData: string
  ): Observable<SimpleResponse>;

  abstract GetExamGroupmasterListSeodata(): Observable<
    ExamGroupMasterSeodataListmodel[]
  >;

  abstract UpdateExamGroupmasterSeodata(
    id: string,
    seoTitle: string,
    seoKeywords: string,
    seoDescription: string,
    jsonSchema: string,
    otherData: string
  ): Observable<SimpleResponse>;

  
  abstract DeleteExamGroupmasterSeodata(id : string): Observable<SimpleResponse>;

  abstract GetExamGroupmasterSeodata(id : string): Observable<ExamGroupmasterSeoDatamodel>;
}
