import { Component, OnInit } from '@angular/core';
import { Experiment } from '../models/experiment';
import { ExperimentService } from '../services/experiment.service';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss']
})
export class ExperimentComponent implements OnInit {

  experiment: Experiment = new Experiment;
  newExperiment: Experiment = new Experiment;

  name: string;

  constructor(
    private expService: ExperimentService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.expService.createExperiment(this.experiment)
    .subscribe( data => {
      this.newExperiment.cost = data.cost;
      this.newExperiment.eventDate = data.eventDate;
      this.newExperiment.executorName = data.executorName;
      this.newExperiment.name = data.name;

      console.log(this.newExperiment.name, this.newExperiment.eventDate, this.newExperiment.executorName, this.newExperiment.cost)

    })
    //form.submit();
 }

}
