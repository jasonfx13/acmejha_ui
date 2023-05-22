import {Component, Input, OnInit} from '@angular/core';
import {JobModel} from "../../model/job.model";
import {FormArray, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-safeguards-form',
  templateUrl: './safeguards-form.component.html',
  styleUrls: ['./safeguards-form.component.scss']
})
export class SafeguardsFormComponent implements OnInit {
  @Input() job: JobModel | any;
  initialized = false

  safeGuardsForm = this.fb.group({
    safeguards: this.fb.array([])
  })

  get safeguards() {
    return this.safeGuardsForm.get('safeguards') as unknown as FormArray;

  }

  addSafeguard() {
    this.safeguards.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    console.log(this.job);

    if(this.job && this.job.steps && this.job.steps.length > 0) {

      this.job.steps.forEach((step: any) => {
        this.safeguards.push(this.fb.control(step.title));
      })
      this.safeguards.push(this.fb.control(''));
      this.initialized = true;
    } else {
      this.safeguards.push(this.fb.control(''));
      this.initialized = true;
    }
  }

  onSubmit() {
    console.log(this.safeguards.value)
  }

}
