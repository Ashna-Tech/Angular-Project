import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { detailsListItemModel } from "../domain/details/details-list-item.model";
import { detailsModel } from "../domain/details/details.model";
import { detailsListIdWithNameModel } from "../domain/details/detailsListIdwithName.model";
import { DirectQuestionModel } from "../domain/details/direct-question.model";

export abstract class  IDetailsService{

    abstract createDetails(model:detailsModel) :Observable <SimpleResponse>

    abstract getDetailsList() : Observable <detailsListItemModel[]>

    abstract updateDetails(data:detailsModel) : Observable <SimpleResponse>
        
        

    abstract removeDetails(id : string) :Observable <SimpleResponse> 


    abstract getDetails(id : string) : Observable <detailsModel>


    abstract getDetailsListIdWithName() : Observable <detailsListIdWithNameModel[]>;

    abstract createDirectQuestion(model:DirectQuestionModel):Observable<SimpleResponse>;
}