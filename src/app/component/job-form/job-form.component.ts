import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgFor} from "@angular/common";
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {JobModel} from "../../model/job.model";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  @Output() doEmitData = new EventEmitter;
  @Input() modal: any;
  job: JobModel | any;
  editMode = false
  errors: any[] = [];

  jobTitle = '';
  jobDescription = '';
  createdBy = ''
  @Input() formStep = 'create-job' // create-job, create-steps, create-hazards, create-safeguards
  processingForm = false;
  constructor(
    private dataService: DataService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    if(this.job) {
      this.jobTitle = this.job.title
      this.jobDescription = this.job.description
      this.createdBy = this.job.createdBy
    }
  }
  doSetProcessing(event: boolean) {
    console.log(event);
    this.processingForm = event
  }
  sucess = false;
  onSubmit(form: NgForm) {
    this.processingForm = true


    let data: any = {
      title: form.value.title,
      description: form.value.description,
      createdBy: form.value.author
    }

    if(data.title == '') {
      this.errors.push({message: 'Title is required'})
      this.processingForm = false
      return
    }

    if(data.createdBy == '') {
      this.errors.push({message: 'Your name is required'})
      this.processingForm = false
      return
    }

    console.log(data);
    if(this.editMode) {
      data.id = this.job.id
      this.dataService.updateJob(data).subscribe({
        next: (res: any) => {
          console.log(res)
          this.job.title = data.title
          this.job.description = data.description
          this.job.createdBy = data.createdBy
          this.doEmitData.emit(this.job)
          this.sucess = true;
          this.processingForm = false;
        },
        error: (err) => {
          console.log(err);
          this.processingForm = false;
        }
      })
    } else {
      this.dataService.addJob(data).subscribe({
        next: (res: any) => {
          console.log(res)
          this.job = res.data
          this.doEmitData.emit(this.job)
          this.sucess = true;
          this.processingForm = false;
        },
        error: (err) => {
          this.processingForm = false;
          console.log(err);
        }
      })
    }




  }
  doClose() {
    this.modalService.dismissAll();
  }

}
