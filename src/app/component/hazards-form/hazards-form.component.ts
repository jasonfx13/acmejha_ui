import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobModel, StepModel} from "../../model/job.model";
import {FormArray, FormBuilder} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../service/data.service";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-hazards-form',
  templateUrl: './hazards-form.component.html',
  styleUrls: ['./hazards-form.component.scss']
})
export class HazardsFormComponent implements OnInit {
  @Input() step: StepModel | any;
  @Input() field:string = '';
  @Output() dataEmitter: EventEmitter<any> = new EventEmitter<any>();
  initialized = false
  successMessage = '';
  hazardsAndSafeguardsForm = this.fb.group({
    formControlsArray: this.fb.array([])
  })
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private dataService: DataService,

  ) {
  }
  get controls() {
    return this.hazardsAndSafeguardsForm.get('formControlsArray') as unknown as FormArray;

  }

  addStep() {
    this.controls.push(this.fb.control(''));
  }
  clearForm() {

    this.hazardsAndSafeguardsForm = this.fb.group({
      formControlsArray: this.fb.array([])
    })
    this.controls.push(this.fb.control(''));
  }


  ngOnInit() {
    console.log(this.field);
    console.log(this.step);
    this.controls.push(this.fb.control(''));
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
    this.initialized = false;
    console.log(this.controls.value)
    let formData = this.controls.value
    let data: any[] = [];
    if(formData.length > 0) {
      formData.forEach((d:string) => {
        if(d != '')
          data.push({title: d, stepId: this.step.id})
      })

    }
    this.dataService.bulkAdd(data, this.field).subscribe({
      next: (res) => {
        this.dataEmitter.emit(res)
        this.initialized = true
        this.successMessage = (this.field.charAt(0).toUpperCase() + this.field.slice(1)) + ' addedd successfully'
        this.clearForm()
      },
      error: (err) => {
        console.log(err)
        this.initialized = true
      }
    })


    console.log(data);
  }

  doClose() {
    this.modalService.dismissAll();
  }


}
