import { Injectable } from '@angular/core';
import { IBlogMasteService } from '../core/services/IblogMaster.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { BlogMasterListItemModel } from '../core/domain/Blog-Master/Blog-Maaster-List-item-Model';
import { BlogMasterModel } from '../core/domain/Blog-Master/Blog-Master.model';
import { baseUrl } from '../../environement';
import { BlogMasterListEntity } from '../entity/blog-master/blog-master-list-Entity';
import { BlogMasterEntity } from '../entity/blog-master/blog-Master.Entity';
import { FAQList } from '../core/domain/Blog-fAQ/blog-FAQ-model';

@Injectable({
  providedIn: 'root',
})
export class BlogMasterService extends IBlogMasteService {
  faqData: any;

  constructor(private http: HttpClient) {
    super();
  }

  override createBlogMaster(
    authorId: string,
    thumbnail: string,
    blogTitle: string,
    blogHeading: string,
    blogContent: string,
    blogTag: string,
    banner: string,
    readingTime: string,
    isindex: string,
    seoTitle: string,
    seoKeywords: string,
    seoDescription: string,
    isFeaturePost: string,
    isShowOnIndividualPage: string,
    groupId: string,
    catId: string,
    faq: FAQList[]
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/BlogMaster`;

    const formData = new FormData();

    const isIndex = (isindex === 'Yes').toString();
    const isFeatPost = (isFeaturePost === 'Yes').toString();
    const showIndivPage = (isShowOnIndividualPage === 'Yes').toString();
    formData.append('AuthorId', authorId);
    formData.append('Thumbnail', thumbnail);
    formData.append('BlogTitle', blogTitle);
    formData.append('BlogHeading', blogHeading);
    formData.append('BlogContent', blogContent);
    formData.append('BlogTag', blogTag);
    formData.append('Banner', banner);
    formData.append('ReadingTime', readingTime);
    formData.append('IsIndex', isIndex);
    formData.append('SeoTitle', seoTitle);
    formData.append('SeoKeywords', seoKeywords);
    formData.append('SeoDescription', seoDescription);
    formData.append('IsFeaturePost', isFeatPost);
    formData.append('IsShowOnIndividualPage', showIndivPage);
    formData.append('GroupId', groupId);
    formData.append('CatId', catId);

    faq.forEach((faq, index) => {
      formData.append(`faq[${index}][question]`, faq.question);
      formData.append(`faq[${index}][answer]`, faq.answer);
    });

    return this.http.post<SimpleResponse>(url, formData).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getBlogMasterList(): Observable<BlogMasterListItemModel[]> {
    const url = `${baseUrl}/api/BlogMaster`;

    return this.http.get<BlogMasterListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override updateBlogMaster(
    id: string,
    authorId: string,
    thumbnail: string,
    blogTitle: string,
    blogHeading: string,
    blogContent: string,
    blogTag: string,
    banner: string,
    readingTime: string,
    isindex: string,
    seoTitle: string,
    seoKeywords: string,
    seoDescription: string,
    isFeaturePost: string,
    isShowOnIndividualPage: string,
    groupId: string,
    catId: string,
    faq: FAQList[]
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/BlogMaster/${id}`;

    const formData = new FormData();

    const isIndex = (isindex === 'Yes').toString();
    const isFeatPost = (isFeaturePost === 'Yes').toString();
    const showIndivPage = (isShowOnIndividualPage === 'Yes').toString();
    formData.append('Id', id), formData.append('AuthorId', authorId);
    formData.append('Thumbnail', thumbnail);
    formData.append('BlogTitle', blogTitle);
    formData.append('BlogHeading', blogHeading);
    formData.append('BlogContent', blogContent);
    formData.append('BlogTag', blogTag);
    formData.append('Banner', banner);
    formData.append('ReadingTime', readingTime);
    formData.append('IsIndex', isIndex);
    formData.append('SeoTitle', seoTitle);
    formData.append('SeoKeywords', seoKeywords);
    formData.append('SeoDescription', seoDescription);
    formData.append('IsFeaturePost', isFeatPost);
    formData.append('IsShowOnIndividualPage', showIndivPage);
    formData.append('GroupId', groupId);
    formData.append('CatId', catId);

    
    faq.forEach((faq, index) => {
        formData.append(`faq[${index}][question]`, faq.question);
        formData.append(`faq[${index}][answer]`, faq.answer);
      });


    return this.http.put<SimpleResponse>(url, formData).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override deleteBlogMaster(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/BlogMaster/${id}`;

    return this.http.delete<SimpleResponse>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getBlogMaster(id: string): Observable<BlogMasterModel> {
    const url = `${baseUrl}/api/BlogMaster/${id}`;

    return this.http.get<BlogMasterEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
}
