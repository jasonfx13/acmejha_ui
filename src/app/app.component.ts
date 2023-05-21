import { Component } from '@angular/core';
import {DataService} from "./service/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'acmejha_ui';
  year =  new Date().getFullYear()

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit() {

  }
}
