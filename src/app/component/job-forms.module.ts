import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateJobFormComponent } from './create-job-form/create-job-form.component';
import {SharedModule} from "./shared/shared.module";
import { EditJobFormComponent } from './edit-job-form/edit-job-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateStepsFormComponent } from './create-steps-form/create-steps-form.component';



@NgModule({
  declarations: [
    CreateJobFormComponent,
    EditJobFormComponent,
    CreateStepsFormComponent
  ],
  exports: [
    CreateJobFormComponent,
    EditJobFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ EditJobFormComponent ]
})
export class JobFormsModule { }
