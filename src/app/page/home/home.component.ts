import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";
import {NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {CreateJobFormComponent} from "../../component/create-job-form/create-job-form.component";
import {HazardModel, JobModel, SafeguardModel, StepModel} from "../../model/job.model";
import {EditJobFormComponent} from "../../component/edit-job-form/edit-job-form.component";
import {CreateStepsFormComponent} from "../../component/create-steps-form/create-steps-form.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobs: JobModel[] | any[] = [];
  loading = true
  activeIndex = 0;
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
  changePanel(index: number) {
    console.log(index);
    this.activeIndex = index;
  }

  closeResult = '';
  createNewJob(content: any) {
    this.modalService.open(content ).result.then(
      (result) => {
        console.log(result);
        this.closeResult = `Closed with: ${result}`;
      }
      // (reason) => {
      //   console.log(reason);
      //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // },
    );
  }

  editJob(job: any) {
    console.log(job);
    const modalRef = this.modalService.open(EditJobFormComponent);

    modalRef.componentInstance.job = job;

    modalRef.componentInstance.doEmitData.subscribe((receivedEntry: any) => {
      console.log(receivedEntry);
    })

    // modalRef.result.then((result) => {
    //   if (result) {
    //     console.log(result);
    //   }
    // });
  }

  editStep(job: JobModel) {
    const modalRef = this.modalService.open(CreateStepsFormComponent);

    modalRef.componentInstance.job = job
    modalRef.componentInstance.editMode = true

  }

  addSteps(job: JobModel) {
    const modalRef = this.modalService.open(CreateStepsFormComponent);

    modalRef.componentInstance.job = job
    modalRef.componentInstance.editMode = false
  }



  showWassup(event: any) {
    console.log(event);
  }

}
