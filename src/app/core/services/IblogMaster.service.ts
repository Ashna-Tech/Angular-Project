import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { BlogMasterListItemModel } from "../domain/Blog-Master/Blog-Maaster-List-item-Model";
import { BlogMasterModel } from "../domain/Blog-Master/Blog-Master.model";
import { FAQList } from "../domain/Blog-fAQ/blog-FAQ-model";




export abstract class IBlogMasteService {

    abstract createBlogMaster(authorId:string, thumbnail :string, blogTitle:string,blogHeading :string,
        blogContent :string,blogTag :string, banner:string, readingTime:string, isindex :string, seoTitle :string,
         seoKeywords :string, seoDescription :string, isFeaturePost :string, isShowOnIndividualPage:string, 
         groupId:string, catId : string, faq:FAQList[]) :Observable <SimpleResponse>;

        abstract getBlogMasterList() :Observable <BlogMasterListItemModel[]>;


        abstract updateBlogMaster(id : string, authorId:string, thumbnail :string, blogTitle:string,blogHeading :string,
            blogContent :string,blogTag :string, banner:string, readingTime:string, isindex :string, seoTitle :string,
             seoKeywords :string, seoDescription :string, isFeaturePost :string, isShowOnIndividualPage:string, 
             groupId:string, catId : string, faq:FAQList[]) :Observable <SimpleResponse>;
            

            abstract deleteBlogMaster(id : string) :Observable <SimpleResponse>;
                            

            abstract getBlogMaster(id : string) : Observable <BlogMasterModel> 


        }