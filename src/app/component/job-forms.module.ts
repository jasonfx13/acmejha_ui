import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobFormComponent } from './job-form/job-form.component';
import {SharedModule} from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HazardsFormComponent } from './hazards-form/hazards-form.component';
import { AddStepFormComponent } from './add-step-form/add-step-form.component';
import { SidePanelComponent } from './side-panel/side-panel.component';


@NgModule({
  declarations: [
    JobFormComponent,
    HazardsFormComponent,
    AddStepFormComponent,
    SidePanelComponent
  ],
    exports: [
        JobFormComponent,
        SidePanelComponent,
    ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class JobFormsModule { }
