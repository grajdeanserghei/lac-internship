import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/switch';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AzureImageService } from '../services/azure-image.service';
import { GoogleImageService } from '../services/google-image.service';

@Injectable()
export class MlService {

  constructor(private azure: AzureImageService,
    private google: GoogleImageService) { }

  predictGoogle(image: File): Observable<string> {
    let reader = new FileReader();
    let base46Image = '';

    let result = Observable.fromEvent(reader, 'load').map(() => {
      return this.sendToGoogleApi(reader.result);
    });

    reader.readAsDataURL(image);

    return result.switch();
  }

  predictAzure(image: File): Observable<string> {
    let reader = new FileReader();
    let base46Image = '';

    let result = Observable.fromEvent(reader, 'load').map(() => {
      return this.azure.getInformation(reader.result).map(response => JSON.stringify(response));
    });

    reader.readAsArrayBuffer(image);

    return result.switch();
  }

  private sendToGoogleApi(encodedImage: string): Observable<string> {
    var photo = encodedImage;//.substring(23);
    var body = {
      "requests": [
        {
          "image": {
            "content": photo.substring(23)
          },
          "features": [
            {
              "type": "LABEL_DETECTION",
            },

            {
              "type": "FACE_DETECTION"
            },

            {
              "type": "LANDMARK_DETECTION"
            },

            {
              "type": "SAFE_SEARCH_DETECTION"
            }
          ]
        }
      ]

    }

    return this.google.getGoogleImageInformation(JSON.stringify(body)).map(response => {
      return JSON.stringify(response);
    });
  }

}
