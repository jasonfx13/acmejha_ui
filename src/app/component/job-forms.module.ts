import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobFormComponent } from './job-form/job-form.component';
import {SharedModule} from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StepsFormComponent } from './steps-form/steps-form.component';
import { HazardsFormComponent } from './hazards-form/hazards-form.component';
import { SafeguardsFormComponent } from './safeguards-form/safeguards-form.component';



@NgModule({
  declarations: [
    JobFormComponent,
    StepsFormComponent,
    HazardsFormComponent,
    SafeguardsFormComponent
  ],
  exports: [
    JobFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JobFormsModule { }
