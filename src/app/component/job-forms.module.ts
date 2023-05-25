import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobFormComponent } from './job-form/job-form.component';
import {SharedModule} from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HazardsSafeguardsFormComponent } from './hazards-safeguards-form/hazards-safeguards-form.component';
import { AddStepFormComponent } from './add-step-form/add-step-form.component';
import { EditFieldFormComponent } from './edit-field-form/edit-field-form.component';


@NgModule({
  declarations: [
    JobFormComponent,
    HazardsSafeguardsFormComponent,
    AddStepFormComponent,
    EditFieldFormComponent,
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
