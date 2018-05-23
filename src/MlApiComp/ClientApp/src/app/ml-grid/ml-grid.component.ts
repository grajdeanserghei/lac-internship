import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { MlFile } from '../models/MlFile';

@Component({
  selector: 'app-ml-grid',
  templateUrl: './ml-grid.component.html',
  styleUrls: ['./ml-grid.component.scss']
})
export class MlGridComponent implements OnInit {

  fileList: MlFile[];

  constructor(private fileService: FileService) {
   
  }

  ngOnInit() {
    this.populateGrid();
  }

  populateGrid() {
    this.fileService.getAll()
      .subscribe(data => {
        this.fileList = data;
      }, error => {
        console.log(error);
      });
  }
}
