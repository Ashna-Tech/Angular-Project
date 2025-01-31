import { Injectable } from '@angular/core';
import { IExamgroupService } from '../core/services/I examgroups.service';
import { Observable, map } from 'rxjs';
import { SimpleResponse } from '../core/domain/simple-response.model';
import { baseUrl } from '../../environement';
import { HttpClient } from '@angular/common/http';
import { ExamgroupsListIdwithnameModel } from '../core/domain/Examgroups/examgroups-list-idwithname.model';
import { ExamgroupsListIdwithnameEntity } from '../entity/Examgroups/examgroups-list-idwithname.entity';
import { ExamgroupsModel } from '../core/domain/Examgroups/examgroups.model';
import { ExamgroupsEntity } from '../entity/Examgroups/examgroups-list.entity';
import { ExamGroupsListModel } from '../core/domain/Examgroups/examGroupsList.model';
import { ExamGroupsListEntity } from '../entity/Examgroups/examGroupsList.entity';

@Injectable({
  providedIn: 'root',
})
export class ExamgroupsService extends IExamgroupService {
  constructor(private http: HttpClient) {
    super();
  }

  override createExamgroups(
    name: string,
    shortName: string,
    icon: string,
    image: string,
    url: string,
    categorySearch: string[],
    topicSearch: string[],
    isMockDrill: string
  ): Observable<SimpleResponse> {
    const Url = `${baseUrl}/api/ExamGroups`;

    const formdata = new FormData();
    const isMockdrl = (isMockDrill === 'Yes').toString();

    formdata.append('Name', name);
    formdata.append('ShortName', shortName);
    formdata.append('Icon', icon);
    formdata.append('Image', image);
    formdata.append('Url', url);
    categorySearch.forEach((category) => {
      formdata.append('CategorySearch', category);
    });
    topicSearch.forEach((topic) => {
      formdata.append('TopicSearch', topic);
    });
    formdata.append('IsMockDrill', isMockdrl);

    return this.http.post<SimpleResponse>(Url, formdata).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getExamGroupsList(): Observable<ExamGroupsListModel[]> {
    const url = `${baseUrl}/api/ExamGroups`;
    return this.http.get<ExamGroupsListEntity>(url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override updateExamgroups(
    id: string,
    name: string,
    shortName: string,
    icon: string,
    image: string,
    url: string,
    categorySearch: string[],
    topicSearch: string[],
    isMockDrill: string
  ): Observable<SimpleResponse> {
    const Url = `${baseUrl}/api/ExamGroups/${id}`;

    const formdata = new FormData();
    const isMockdrl = (isMockDrill === 'Yes').toString();
    formdata.append('Id', id);
    formdata.append('Name', name);
    formdata.append('ShortName', shortName);
    formdata.append('Icon', icon);
    formdata.append('Image', image);
    formdata.append('Url', url);
    categorySearch.forEach((category) => {
      formdata.append('CategorySearch', category);
    });
    topicSearch.forEach((topic) => {
      formdata.append('TopicSearch', topic);
    });
    formdata.append('IsMockDrill', isMockdrl);
    return this.http.put<SimpleResponse>(Url, formdata).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override deleteExamgroups(id: string): Observable<SimpleResponse> {
    const Url = `${baseUrl}/api/ExamGroups/${id}`;
    return this.http.delete<SimpleResponse>(Url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getExamgroupsById(id: string): Observable<ExamgroupsModel> {
    const Url = `${baseUrl}/api/ExamGroups/${id}`;
    return this.http.get<ExamgroupsEntity>(Url).pipe(
      map((response) => {
        if (response.status) {
          return response.data;
        } else {
          throw new Error(response.msg);
        }
      })
    );
  }

  override getExamgroupsListIdwithname(): Observable<ExamgroupsListIdwithnameModel[]> {
    const Url = `${baseUrl}/api/ExamGroups/IdWithName`;
    
    return this.http.get<ExamgroupsListIdwithnameEntity>(Url).pipe(
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
