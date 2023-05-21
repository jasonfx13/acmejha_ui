import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {NgbAccordionModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../component/shared/shared.module";
import {JobFormModule} from "../../component/job-form/job-form.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbAccordionModule,
    SharedModule,
    JobFormModule
  ]
})
export class HomeModule { }
