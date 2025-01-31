import { Observable } from "rxjs";
import { SimpleResponse } from "../domain/simple-response.model";
import { BlogAuthorListItemModel } from "../domain/Blog Author/blog-author-List-Item.model";
import { BlogAuthorModel } from "../domain/Blog Author/blog-author-model";

export abstract class IBlogAuthorService{

abstract createBlogAuthor(name :string, profileImage :string, description:string, 
    faceBookURL:string, twitterURL:string) : Observable <SimpleResponse>

abstract getBlogAuthorList() : Observable <BlogAuthorListItemModel[]>


abstract updateBlogAuthor(id: string,name:string, profileImage:string, description:string,
    faceBookURL:string, twitterURL:string) : Observable <SimpleResponse>


abstract deleteBlogAuthor(id : string) : Observable <SimpleResponse>


abstract getBlogAuthor(id : string) : Observable <BlogAuthorModel>

}

