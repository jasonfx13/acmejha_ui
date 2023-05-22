import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {JobModel} from "../../model/job.model";
@Component({
  selector: 'app-create-steps-form',
  templateUrl: './create-steps-form.component.html',
  styleUrls: ['./create-steps-form.component.scss']
})
export class CreateStepsFormComponent implements OnInit {
  createStepsForm = this.fb.group({
      steps: this.fb.array([
        {
          title: new FormControl('', Validators.required),
        }
      ])
  });
  @Input() job: JobModel | any
  title = '';
  constructor(
    private fb: FormBuilder
  ) { }
  @Input() editMode = false
  ngOnInit(): void {
    console.log(this.job);
    this.initializeForm()
  }

  onAddStep() {
    // @ts-ignore
    this.steps.push(this.fb.control(''));

    // (<FormArray>this.createStepsForm.get('steps')).push(
    //   new FormGroup({
    //     'title': new FormControl(null, Validators.required),
    //     // @ts-ignore
    //     'jobId': new FormControl(this.job.id, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    //   })
    // );
  }
  // steps = []
  private initializeForm() {
    let jobSteps = [...this.job.steps]
    // @ts-ignore
    // this.steps = [...this.job.steps]
    //
    // if(this.steps.length > 0) {
    //
    // }

    console.log(jobSteps);
    let stepControls = []
    // @ts-ignore
    if(jobSteps.length > 0) {
      for (let step of jobSteps) {
        console.log(step);
        stepControls.push({
          title: step.title
        })
      }
      // @ts-ignore
      this.createStepsForm = this.fb.group({
        steps: this.fb.array(stepControls)

      })

    } else {
      // @ts-ignore
      this.createStepsForm = this.fb.group({
        steps: this.fb.array([
          this.fb.control(        {
            title: new FormControl('', Validators.required),
          })
        ])

      })
    }






    /*
    if(this.steps.length > 0) {
      // @ts-ignore
      for (let step of this.steps) {
        console.log(step);
        // @ts-ignore

        jobSteps.push(
          // @ts-ignore
          new FormGroup({
            // @ts-ignore
            title: new FormControl(step.title)
          })
        )
      }

    } else {
      jobSteps.push(
        // @ts-ignore
        new FormGroup({
          title: new FormControl('')
        })
      )
    }
    this.createStepsForm = new FormGroup({
      'steps': jobSteps
    })
  */

    console.log(this.steps);

    // let jobSteps = new FormArray([]);
    // if(this.editMode) {
    //   // @ts-ignore
    //   if (this.job['steps']) {
    //     // @ts-ignore
    //     for (let step of this.job.steps) {
    //       // @ts-ignore
    //       jobSteps.push(
    //         // @ts-ignore
    //         new FormGroup({
    //           'title': new FormControl(step.title, Validators.required),
    //           // @ts-ignore
    //           'jobId': new FormControl(this.job.id)
    //         })
    //       );
    //     }
    //   }
    // }
    //
    // console.log(jobSteps);
    // this.createStepsForm = new FormGroup({
    //   'title': new FormControl(this.title, Validators.required),
    // });
    //
    // this.fb.group({
    //   steps: this.fb.array([
    //     this.fb.control('')
    //   ])
    // })
  }

  get steps() {
    // @ts-ignore
    return this.createStepsForm.controls['steps'] as FormArray
  }

  // get lessons() {
  //   // return this.form.controls["lessons"] as FormArray;
  // }
  // get steps() {
  //   return this.createStepsForm.get('steps') as FormArray;
  // }

  onDeleteStep(i: any) {
    console.log(i);
  }

  onSubmit() {
    console.log(this.createStepsForm.value);
  }

  stepsForm: any;
  addSteps() {
    this.stepsForm = this.fb.group({
      title: ['', Validators.required],
    });

    this.steps.push(this.stepsForm);
    // @ts-ignore
    // this.steps.push(this.fb.control(''));

  }

}
