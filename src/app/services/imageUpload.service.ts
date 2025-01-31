import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environement';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  uploadImages(formData: FormData) {
    return this.http.post(`${baseUrl}/api/ImageUpload`,formData)
  }



}