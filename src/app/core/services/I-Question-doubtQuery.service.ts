import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { QuestDoubtQueryListModel } from "../domain/Question-Doubt-Query/questdoubt-query-list.model";
import { QuestDoubtQueryModel } from "../domain/Question-Doubt-Query/questiondoubt-query.model";


export abstract class IQuestionDoubtQueryService {

    abstract CreateQuesDoubtQuery(quesDetailId: number, question: string, answer: string): Observable<SimpleResponse>;
 
     abstract UpdateQuesDoubtQuery(id: string, question: string, answer: string): Observable<SimpleResponse>;

      abstract GetQuesDoubtQueryList(QuestionIds : string ): Observable<QuestDoubtQueryListModel[]>;
    
       abstract GetQuesDoubtQuery(id: string): Observable<QuestDoubtQueryModel>;

         abstract DeleteQuesDoubtQuery(id : string) : Observable <SimpleResponse> ;

}