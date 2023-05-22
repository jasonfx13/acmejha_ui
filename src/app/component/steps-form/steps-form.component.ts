import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {JobModel, StepModel} from "../../model/job.model";
import {DataService} from "../../service/data.service";
@Component({
  selector: 'app-steps-form',
  templateUrl: './steps-form.component.html',
  styleUrls: ['./steps-form.component.scss']
})
export class StepsFormComponent implements OnInit {
  @Input() job: JobModel | any;
  @Input() modal: any;
  processing = true
  editMode = false

  @Output() doEmittProcessing: EventEmitter<any> = new EventEmitter<any>()
  stepsForm = this.fb.group({
    steps: this.fb.array([])
  })

  get steps() {
    return this.stepsForm.get('steps') as unknown as FormArray;

  }

  addStep() {
    this.steps.push(this.fb.control(''));
  }

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
  }

  ngOnInit() {
    console.log(this.job);

    if(this.job && this.job.steps && this.job.steps.length > 0) {
      this.editMode = true
      this.job.steps.forEach((step: any) => {
        this.steps.push(this.fb.control(step.title));
      })
      this.steps.push(this.fb.control(''));
      this.processing = false;
    } else {
      this.editMode = false
      this.steps.push(this.fb.control(''));
      this.processing = false;
    }
  }

  onSubmit() {
    this.processing = true
    let stepFormValues = this.stepsForm.value.steps as Array<any>
    let steps: StepModel[] = []

    console.log(stepFormValues);

    // @ts-ignore
    stepFormValues.forEach((step) => {
      steps.push({
        id: step.id,
        title: step,
        jobId: this.job.id
      })
    })

    if(this.editMode) {
      let stepsToAdd = steps.filter((step) => {
        return step.id == null
      })

      let stepsToEdit = steps.filter((step) => {

      })

      console.log(stepsToAdd);
      // steps.forEach((step, i) => {
      //   this.dataService.updateSteps(step)
      // })
      this.processing = false;
    } else {
      this.dataService.addSteps(steps).subscribe({
        next: (res) => {
          console.log(res);
          this.job.steps = res
          this.processing = false

        },
        error: (err) => {
          console.log(err);
          this.processing = false
        }
      })
    }
  }


}
