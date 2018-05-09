import { Injectable } from '@angular/core';
import { Experiment } from '../models/experiment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ExperimentService {

  experimentUrl: string = "http://localhost:50651/api/experiments";

  constructor(
    private http: HttpClient
  ) { }

  createExperiment(experiment: Experiment): Observable<Experiment> {

    return this.http.post<Experiment>(this.experimentUrl, experiment);


  }

}
