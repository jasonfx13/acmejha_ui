import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgFor} from "@angular/common";
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-job-form',
  templateUrl: './create-job-form.component.html',
  styleUrls: ['./create-job-form.component.scss']
})
export class CreateJobFormComponent implements OnInit {
  @Output() doEmitData = new EventEmitter;
  @Input() modal: any;

  editMode = false

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
