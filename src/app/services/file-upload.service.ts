import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

    constructor(private http: HttpClient) {}

    uploadFile(file: File, uploadUrl: string): Observable<number> {
        const formData = new FormData();
        formData.append('file', file);
    
        const req = new HttpRequest('POST', uploadUrl, formData, {
            reportProgress:true,    
        });
    
        return this.http.request(req).pipe(
          map(event => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                if (event.total) {
                  return Math.round((100 * event.loaded) / event.total);
                }
                return 0;
              case HttpEventType.Response:
                return 100; // Complete the upload with 100% progress
              default:
                return 0;
            }
          })
        );
    }

  uploadFileXHR(file: File, uploadUrl: string): Observable<number> {
    return new Observable(observer => {
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          const percentComplete = evt.loaded / evt.total;
          observer.next(percentComplete * 100);
        }
      }, false);

      xhr.addEventListener('load', () => {
        observer.complete(); // Complete the observer when upload is finished
      });

      xhr.addEventListener('error', () => {
        observer.error('Upload failed');
      });

      xhr.open('POST', uploadUrl, true);

      const formData = new FormData();
      formData.append('file', file);
      xhr.send(formData);
    });
  }
}
