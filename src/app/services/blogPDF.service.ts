import { Injectable } from '@angular/core';
import { IblogPDFService } from '../core/services/IblogPDF.service';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { blogPDFListItemModel } from '../core/domain/Blog-pdf/blogpdf-list-Item.model';
import { blogPDFModel } from '../core/domain/Blog-pdf/BlogPdf-model';
import { baseUrl } from '../../environement';
import { blogPDFListItemEntity } from '../entity/blogPDF/blogPDF-List-Item.entity';
import { blogPDFEntity } from '../entity/blogPDF/blogPDF-entity';
import { BlogDtlListIdWithNameModel } from '../core/domain/blog Dtl/blogDtlListIdWithName.model';
import { BlogDtlIdWithNameListEntity } from '../entity/blog Dtl/BlogDtlIdWithNameList.entity';

@Injectable({
  providedIn: 'root',
})
export class blogPDFService extends IblogPDFService {
  constructor(private http: HttpClient) {
    super();
  }

  override createBlogPdf(
    title: string,
    pdfName: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/BlogPdf`;
    const data = new FormData();
    data.append('Title', title);
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

  override getblogPDFList(): Observable<blogPDFListItemModel[]> {
    const url = `${baseUrl}/api/BlogPdf`;

    return this.http.get<blogPDFListItemEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override updateBlogPDF(
    id: string,
    title: string,
    pdfName: string
  ): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/BlogPdf/${id}`;

    const data = new FormData();
    data.append('Id', id);
    data.append('Title', title);
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

  override removeBlogPDF(id: string): Observable<SimpleResponse> {
    const url = `${baseUrl}/api/BlogPdf/${id}`;

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

  override getBlogPDF(id: string): Observable<blogPDFModel> {
    const url = `${baseUrl}/api/BlogPdf/${id}`;

    return this.http.get<blogPDFEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getBlogPdfListIdWitName(): Observable<BlogDtlListIdWithNameModel[]> {
    const url = `${baseUrl}/api/BlogPdf/IdWithName`;
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
