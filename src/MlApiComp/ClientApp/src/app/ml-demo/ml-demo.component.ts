import { Component, OnInit } from '@angular/core';
import { MlService } from '../services/ml.service';


@Component({
  selector: 'app-ml-demo',
  templateUrl: './ml-demo.component.html',
  styleUrls: ['./ml-demo.component.scss']
})
export class MlDemoComponent implements OnInit {

  status: string;
  image: string;
  selectedFile: Blob;

  googleResponse: string;
  azureResponse: string;

  demoList: string[];

  constructor(private service: MlService) {
    this.status = "Not selected";

    this.demoList = new Array<string>();
    this.demoList.push("Hello 1");
    this.demoList.push("Hello 2");
    this.demoList.push("Hello 3");
  }


  ngOnInit() {
  }

  onFileSelected($event) {
    this.selectedFile = $event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e) => {
      this.image = reader.result;
    };

    reader.readAsDataURL($event.target.files[0]);
  }

  onCallApi() {
    this.service.predictGoogle(this.selectedFile)
      .subscribe(response => this.googleResponse = response);

    this.service.predictAzure(this.selectedFile)
      .subscribe(response => this.azureResponse = response);
  }
}
