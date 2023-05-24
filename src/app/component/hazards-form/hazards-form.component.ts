import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobModel} from "../../model/job.model";
import {FormArray, FormBuilder} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-hazards-form',
  templateUrl: './hazards-form.component.html',
  styleUrls: ['./hazards-form.component.scss']
})
export class HazardsFormComponent implements OnInit {
  @Input() job: JobModel | any;
  @Output() doEmmiteAddedHazard: EventEmitter<any> = new EventEmitter<any>();
  initialized = false

  hazardsForm = this.fb.group({
    hazards: this.fb.array([])
  })
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal

  ) {
  }
  get hazards() {
    return this.hazardsForm.get('hazards') as unknown as FormArray;

  }

  addHazard() {
    this.hazards.push(this.fb.control(''));
  }
  clearForm() {

    this.hazardsForm = this.fb.group({
      hazards: this.fb.array([])
    })
    this.hazards.push(this.fb.control(''));
  }


  ngOnInit() {
    console.log(this.job);
    this.hazards.push(this.fb.control(''));
    this.initialized = true;
    // if(this.job && this.job.steps && this.job.steps.length > 0) {
    //
    //   this.job.steps.forEach((step: any) => {
    //     this.hazards.push(this.fb.control(step.title));
    //   })
    //   this.hazards.push(this.fb.control(''));
    //   this.initialized = true;
    // } else {
    //   this.hazards.push(this.fb.control(''));
    //   this.initialized = true;
    // }
  }

  onSubmit() {
    console.log(this.hazards.value)
  }

  doClose() {
    this.modalService.dismissAll();
  }


}
