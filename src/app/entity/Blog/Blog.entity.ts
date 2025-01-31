import { BlogModel } from "../../core/domain/blog/blog.Model";
import { ResponseModel } from "../../core/domain/response.model";

export interface BlogEntity extends ResponseModel <BlogModel>{}