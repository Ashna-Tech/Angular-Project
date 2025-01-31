import { Injectable } from '@angular/core';
import { IBlogdtlService } from '../core/services/I Blog dtl.service';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { BlogDtlModel } from '../core/domain/blog Dtl/blog-dtl-.model';
import { BlogListItemEntity } from '../entity/blog Dtl/blogdtl-list-item.entity';
import { baseUrl } from '../../environement';
import { HttpClient } from '@angular/common/http';
import { BlogDtlListItemModel } from '../core/domain/blog Dtl/blog-dtl-list-item.mode';
import { BlogDtlEntity } from '../entity/blog Dtl/blog-dtl.entity';
import { BlogDtlListIdWithNameModel } from '../core/domain/blog Dtl/blogDtlListIdWithName.model';
import { BlogDtlIdWithNameListEntity } from '../entity/blog Dtl/BlogDtlIdWithNameList.entity';

@Injectable({
  providedIn: 'root',
})
export class BlogDtlService extends IBlogdtlService {
  constructor(private http: HttpClient) {
    super();
  }

  override createBlogDtl(
    blogId: string,
    pdfTitle: string,
    pdfName: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/BlogDtl`;

    const data = new FormData();
    data.append('BlogId', blogId);
    data.append('PdfTitle', pdfTitle);
    data.append('PdfName', pdfName);

    return this.http.post<SimpleResponse>(url, data).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  override getBlogDtlList(): Observable<BlogDtlListItemModel[]> {
    const url = `${baseUrl}/api/BlogDtl`;

    return this.http.get<BlogListItemEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override updateBlogDtl(
    id: string,
    blogId: string,
    pdfTitle: string,
    pdfName: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/blogDtl/${id}`;

    const data = new FormData();

    data.append('Id', id);
    data.append('BlogId', blogId);
    data.append('PdfTitle', pdfTitle);
    data.append('PdfName', pdfName);

    return this.http.put<SimpleResponse>(url, data).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }
  override removeBlogdtl(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/BlogDtl/${id}`;

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

  override getBlogDtl(id: string): Observable<BlogDtlModel> {
    const url = `${baseUrl}/api/BlogDtl/${id}`;

    return this.http.get<BlogDtlEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getBlogDtlIdWithName(): Observable<BlogDtlListIdWithNameModel[]> {
    const url = `${baseUrl}/api/BlogDtl/IdWithName`;
    return this.http.get<BlogDtlIdWithNameListEntity>(url).pipe(
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
