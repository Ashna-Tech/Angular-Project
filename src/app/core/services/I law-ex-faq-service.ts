import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { LawExFaqListModel } from "../domain/Law-Ex-Faq/law-ex-faq-list.model";
import { LawExfaqModel } from "../domain/Law-Ex-Faq/law-ex-faq-mode";

export abstract class ILawExFaqService{

abstract createLawExfAQ(mId : string, question : string, answer : string) : Observable <SimpleResponse>

abstract getLawExfAQList() : Observable <LawExFaqListModel[]>

abstract updateLawExfAQ(id : string , mId : string, question : string, answer : string) : Observable <SimpleResponse>

abstract deleteLawExfAQ(id : string) : Observable <SimpleResponse>

abstract getLawExfAQ(id : string) : Observable <LawExfaqModel>

}