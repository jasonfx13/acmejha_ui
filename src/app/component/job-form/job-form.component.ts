import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgFor} from "@angular/common";
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  @Output() doEmitData = new EventEmitter;
  @Input() modal: any;

  @Input() formStep = 'create-job' // create-job, create-step, create-hazard, create-safeguard

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.doEmitData.emit('whass up')
    console.log(form)

  }

}
