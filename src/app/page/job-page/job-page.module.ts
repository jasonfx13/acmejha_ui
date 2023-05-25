import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobPageRoutingModule } from './job-page-routing.module';
import { JobPageComponent } from './job-page.component';
import {SharedModule} from "../../component/shared/shared.module";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    JobPageComponent
  ],
  imports: [
    CommonModule,
    JobPageRoutingModule,
    SharedModule,
    NgbDropdownModule
  ]
})
export class JobPageModule { }
