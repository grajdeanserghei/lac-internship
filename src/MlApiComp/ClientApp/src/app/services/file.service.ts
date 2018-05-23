import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MlFile } from '../models/MlFile';
import 'rxjs/Rx';

@Injectable()
export class FileService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:62528/api/file';
  }

  postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(this.baseUrl, formData)
      .map((data) => { return data; })
      .catch((err: HttpErrorResponse) => {
        console.error('An error occurred:', err.error);
        return Observable.empty<any>();
      });
  }

  putFile(file: MlFile): Observable<any> {
    var endpoint = this.baseUrl + '/' + file.id;
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient
      .put(endpoint, file, httpOptions)
      .map(() => { return true; })
      .catch((err: HttpErrorResponse) => {
        console.error('An error occurred:', err.error);
        return Observable.empty<any>();
      });
  }

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.baseUrl)
      .map((data) => { return data; })
      .catch((err: HttpErrorResponse) => {
        console.error('An error occurred:', err.error);
        return Observable.empty<any>();
      });
  }
}
