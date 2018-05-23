import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MlService } from '../services/ml.service';
import { FileService } from '../services/file.service';
import { MlFile } from '../models/MlFile';

@Component({
  selector: 'app-ml',
  templateUrl: './ml.component.html',
  styleUrls: ['./ml.component.scss']
})
export class MlComponent {

  previewPath: string;
  googleApiResponse: string;
  azureApiResponse: string;
  fileUpload: File;
  file: MlFile;

  constructor(private mlservice: MlService, private fileUploadService: FileService) { }

  onFileSelected(event) {

    this.fileUpload = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewPath = e.target.result;
    }
    this.uploadFileToDatabase();

    reader.readAsDataURL(this.fileUpload);
  }

  uploadFileToDatabase() {
    this.fileUploadService.postFile(this.fileUpload)
      .subscribe(data => {
        this.file = data;
      }, error => {
        console.log(error);
      });
  }

  getImageInformation() {
    this.mlservice.predictGoogle(this.fileUpload)
      .subscribe(data => {
        this.googleApiResponse = data;
        this.file.googleApiResult = data;
        this.persistImageInformation();
      });

    this.mlservice.predictAzure(this.fileUpload)
      .subscribe(data => {
        this.azureApiResponse = data;
        this.file.azureApiResult = data;
        this.persistImageInformation();
      });
  }

  persistImageInformation() {
    this.fileUploadService.putFile(this.file)
      .subscribe(data => {
      }, error => {
        console.log(error);
      });
  }
}
