import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { subCatagoryModel } from "../domain/sub-catagory/sub-catagory.model";
import { subCategoryListModel } from "../domain/sub-catagory/sub-catagory-list.model";
import { CommonListItemModel } from "../domain/common model";


 export abstract class IsubcategoryService {      

    abstract createSubCategory(catId:string,name:string):Observable<SimpleResponse>;

    abstract updateSubCategory(id:string,catId:string,name:string):Observable<SimpleResponse>;

    abstract removeSubCategory(id:string):Observable<SimpleResponse>;

    abstract getSubcategorySingle(id:string):Observable<subCatagoryModel>;

    abstract getSubCategoryList(CatId : string) : Observable <subCategoryListModel[]>
    
    abstract getSubcategoryIdWithName(CatId : string) : Observable <CommonListItemModel[]>



 }

