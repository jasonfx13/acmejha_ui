import {NgModule} from "@angular/core";

import {BrowserModule} from "@angular/platform-browser";

import {HeaderComponent} from "./header/header.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { FooterComponent } from './footer/footer.component';
import {SideNavComponent} from "./side-nav/side-nav.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SideNavComponent
  ]
})
export class SharedModule {}
