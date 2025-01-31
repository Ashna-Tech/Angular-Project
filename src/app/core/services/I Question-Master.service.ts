import { Observable } from 'rxjs';
import { SimpleResponse } from '../domain/simple-response.model';
import { QuestionMasterListItemModel } from '../domain/Question-Master/Qmaster-list-item.Model';
import { QuestionMastermodel } from '../domain/Question-Master/Qmaster.model';
import { UpdateQuestionMasterDTO } from '../domain/Question-Master/update-question-master.model';

export abstract class IQuestionMasterService {
  abstract createQuestionMaster(model: QuestionMastermodel): Observable<string>;

  abstract getQuestionMasterList(): Observable<QuestionMasterListItemModel[]>;

  abstract upadateQuestionMaster(data:UpdateQuestionMasterDTO): Observable<string>;

  abstract removeQuestionMaster(id: string): Observable<SimpleResponse>;

  abstract getQuestionMaster(id: string): Observable<QuestionMastermodel>;
}
