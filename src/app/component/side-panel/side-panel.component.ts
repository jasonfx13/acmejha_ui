import {Component, Input, OnInit} from '@angular/core';
import {JobModel} from "../../model/job.model";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  @Input() job: JobModel|any;
  @Input() editMode = false;
  constructor() { }

  ngOnInit(): void {
  }

}
