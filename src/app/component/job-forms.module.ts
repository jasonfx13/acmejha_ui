import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobFormComponent } from './job-form/job-form.component';
import {SharedModule} from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    JobFormComponent],
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
