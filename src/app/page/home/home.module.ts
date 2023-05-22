import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {NgbAccordionModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../component/shared/shared.module";
import {JobFormsModule} from "../../component/job-forms.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbAccordionModule,
    SharedModule,
    JobFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ]
})
export class HomeModule { }
