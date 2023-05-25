import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {JobModel} from "../../model/job.model";
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-add-step-form',
  templateUrl: './add-step-form.component.html',
  styleUrls: ['./add-step-form.component.scss']
})
export class AddStepFormComponent implements OnInit {
  @Input() job: JobModel|any;
  @Output() doEmitData: EventEmitter<any> = new EventEmitter<any>();
  errors: any = [];
  successMessage = '';
  @Input() editMode = false
  @ViewChild('stepTitle') stepTitle: ElementRef | undefined
  constructor(
    private modalService: NgbModal,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  doAddStep(form: NgForm) {
    if(form.value.title == '') {
      this.errors.push({message: 'Title is required'})
      return
    }

    let data = {
      title: form.value.title,
      jobId: this.job.id
    }

    this.dataService.addStep(data).subscribe({
      next: (res) => {
        this.doEmitData.emit(res);
        this.successMessage = 'Step Added Sucessfully'
        // @ts-ignore
        this.stepTitle.nativeElement.value = ''
      },
      error: (err) => {
        console.log(err)
        this.errors.push({message: err.error.message})
      }

    })
  }

  doClose() {
    this.modalService.dismissAll();
  }

}
