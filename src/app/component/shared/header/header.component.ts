import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NavigationService} from "../../../service/navigation.service";
import { NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  url = ''
  constructor(
    private navService: NavigationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.url = this.router.url

    this.router.events.subscribe({
      next: (event) => {
        if(event instanceof NavigationEnd) {
          this.url = event.url;
          console.log(event.url)
        }
      }
    })
  }

  toggleSideNav() {
    this.navService.setShowNav(true);
  }

}
