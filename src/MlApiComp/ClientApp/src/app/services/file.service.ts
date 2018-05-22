import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class FileService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:62528/api/file';
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = this.baseUrl;
    const formData: FormData = new FormData();
    var headers = null;
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData, { headers: headers })
      .map(() => { return true; })
      .catch((err: HttpErrorResponse) => {
        console.error('An error occurred:', err.error);
      });
  }
}
