import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { PricingFAQListModel } from "../domain/Pricing-FAQ/pricing-faq-list.model";
import { PricingFAQModel } from "../domain/Pricing-FAQ/pricing-faq-model";

export abstract class IPricingFAQService{

abstract createPricingFAQ(question : string, answer : string, orderNo : string) : Observable <SimpleResponse>


abstract getPricingFAQList() : Observable <PricingFAQListModel[]>


abstract updatePricingFAQ(id : string, question : string, answer : string, orderNo : string) : Observable <SimpleResponse>


abstract deletePricingFAQ(id : string) : Observable <SimpleResponse>


abstract getPricingFAQ(id : string) : Observable <PricingFAQModel>

} 