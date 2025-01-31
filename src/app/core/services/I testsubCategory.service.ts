import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { TestSubcategoryListmodel } from "../domain/Test-subcategory/testSubcategoryList.model";
import { TestSubcategorymodel } from "../domain/Test-subcategory/testSubcategory.model";
import { CommonListItemModel } from "../domain/common model";

export abstract class ItestSubcategoryService{

abstract CreateTestsubCategory(catId : string, name : string, flag : string) : Observable <SimpleResponse>

abstract GetTestsubCategoryList() : Observable <TestSubcategoryListmodel[]>

abstract UpdateTestsubCategory(id : string, catId : string, name : string, flag : string) : Observable <SimpleResponse>

abstract DeleteTestsubCategory(id : string) : Observable <SimpleResponse>

abstract GetTestsubCategory(id : string) : Observable <TestSubcategorymodel>

abstract GetTestsubCategoryListIdwithName() : Observable <CommonListItemModel[]> 

}
