import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ExperimentComponent } from './experiment/experiment.component';

import { ExperimentService } from './services/experiment.service';
import { AzureImageService } from './services/azure-image.service';
import { GoogleImageService } from './services/google-image.service';
import { MlComponent } from './ml/ml.component'
import { MlService } from './services/ml.service';
import { MlDemoComponent } from './ml-demo/ml-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExperimentComponent,
    MlComponent,
    MlDemoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: 'experiments/create', component: ExperimentComponent, pathMatch: 'full' },
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'imgAnalysis', component: MlComponent, pathMatch: 'full' },
      { path: 'demo-ml', component: MlDemoComponent, pathMatch: 'full' }
    ])
  ],
  providers: [
    ExperimentService,
    AzureImageService,
    GoogleImageService,
    MlService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
