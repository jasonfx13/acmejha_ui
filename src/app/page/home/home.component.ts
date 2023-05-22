import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";
import {NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {JobFormComponent} from "../../component/job-form/job-form.component";
import {HazardModel, JobModel, SafeguardModel, StepModel} from "../../model/job.model";
import {StepsFormComponent} from "../../component/steps-form/steps-form.component";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobs: JobModel[] | any[] = [];
  loading = true
  constructor(
    private dataService: DataService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.dataService.getJobs(true).subscribe({
      next: (res: any) => {
        console.log(res);
        this.jobs = res.data
        this.loading = false
      },
      error: (err) => {
        console.log(err)
        this.loading = false
      }
    })
  }

  closeResult = '';
  createNewJob(content: any) {
    // this.modalService.open(content ).result.then(
    //   (result) => {
    //     console.log(result);
    //     console.log('push new job');
    //     this.jobs.push(result);
    //   }
    //
    //
    //   // (reason) => {
    //   //   console.log(reason);
    //   //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //   // },
    // );

    const modalRef = this.modalService.open(JobFormComponent);
    modalRef.componentInstance.doEmitData.subscribe((receivedEntry: any) => {
      console.log(receivedEntry);
      this.jobs.push(receivedEntry);
    })
    // modalRef.componentInstance.job = null

  }

  editJob(job: any) {
    console.log(job);
    const modalRef = this.modalService.open(JobFormComponent);

    modalRef.componentInstance.job = job;
    modalRef.componentInstance.editMode = true;

    modalRef.componentInstance.doEmitData.subscribe((receivedEntry: any) => {
      console.log(receivedEntry);
    })

    // modalRef.result.then((result) => {
    //   if (result) {
    //     console.log(result);
    //   }
    // });
  }

  editStep(step: StepModel) {
    // const modalRef = this.modalService.open(JobFormComponent);
    //
    // modalRef.componentInstance.job = job
    // modalRef.componentInstance.editMode = true
    // modalRef.componentInstance.formStep = 'create-steps';
    console.log(step)
  }

  deleteStep(step: StepModel) {

    console.log(step);
  }

  addSteps(job: JobModel) {
    const modalRef = this.modalService.open(JobFormComponent);

    modalRef.componentInstance.job = job
    modalRef.componentInstance.editMode = true
    modalRef.componentInstance.formStep = 'create-steps';
  }
  showAddStepForm = false;
  toggleAddStepForm(job: JobModel) {
    this.showAddStepForm = !this.showAddStepForm
  }


  errors: any[] = []
  doAddNewJob(event: any) {
    console.log(event);
    this.jobs.push(event);
  }

  doAddStep(form: NgForm, job:JobModel|any) {
    console.log(form);
    this.loading = true;
    if(form.value.title == '') {
      this.errors.push({message: 'Title is required'})
      return
    }

    console.log(form.value.title);

    let data = {
      title: form.value.title,
      jobId: job.id
    }
    console.log(data);

    this.dataService.addStep(data).subscribe({
      next: (res: any) => {
        console.log(res)
        if(this.jobs.find((j) => j.id == job.id).steps) {
          this.jobs.find((j) => j.id == job.id).steps.push(res.data);
        } else {
          this.jobs.find((j) => j.id == job.id).steps = []
          this.jobs.find((j) => j.id == job.id).steps.push(res.data);
        }

        this.loading = false
      },
      error: (err) => {
        console.log(err)
        this.loading = false
      }
    })
  }

}
