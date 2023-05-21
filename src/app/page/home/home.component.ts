import { Component, OnInit } from '@angular/core';
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobs: any[] = [];
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.getJobs(true).subscribe({
      next: (res: any) => {
        console.log(res);
        this.jobs = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
