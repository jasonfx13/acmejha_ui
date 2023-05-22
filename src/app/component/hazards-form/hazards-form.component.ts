import {Component, Input, OnInit} from '@angular/core';
import {JobModel} from "../../model/job.model";
import {FormArray, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-hazards-form',
  templateUrl: './hazards-form.component.html',
  styleUrls: ['./hazards-form.component.scss']
})
export class HazardsFormComponent implements OnInit {
  @Input() job: JobModel | any;
  initialized = false

  hazardsForm = this.fb.group({
    hazards: this.fb.array([])
  })

  get hazards() {
    return this.hazardsForm.get('hazards') as unknown as FormArray;

  }

  addHazard() {
    this.hazards.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    console.log(this.job);

    if(this.job && this.job.steps && this.job.steps.length > 0) {

      this.job.steps.forEach((step: any) => {
        this.hazards.push(this.fb.control(step.title));
      })
      this.hazards.push(this.fb.control(''));
      this.initialized = true;
    } else {
      this.hazards.push(this.fb.control(''));
      this.initialized = true;
    }
  }

  onSubmit() {
    console.log(this.hazards.value)
  }


}
