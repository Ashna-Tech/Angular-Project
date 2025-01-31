import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { SimilarQuestionListModel } from "../domain/Similar-Question/similar-question-list-model";
import { similarQuestionModel } from "../domain/Similar-Question/similar-question-model";

export abstract class IsimilarQuestionservice{

abstract createSimilarQuestion(testID : string,question : string, optionA : string, optionB : string,
    optionC : string, optionD : string, optionE : string, optionF : string, explanation : string,
    correct : string, flag : string, similarId : string ) : Observable <SimpleResponse> ;



    abstract getSimilarQuestionList() : Observable <SimilarQuestionListModel[]> ;


    abstract updateSimilarQuestion(id : string, testID : string, question : string, optionA : string, 
        optionB : string, optionC : string, optionD : string, optionE : string, optionF : string,
      explanation : string, correct : string, flag : string, similarId : string) : Observable <SimpleResponse> ;


abstract deleteSimilarQuestion(id : string) : Observable <SimpleResponse>;



abstract getSimilarQuestion(id : string) : Observable <similarQuestionModel> ;


}