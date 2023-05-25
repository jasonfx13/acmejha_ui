import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../service/data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {JobFormComponent} from "../../component/job-form/job-form.component";
import {HazardModel, JobModel, SafeguardModel, StepModel} from "../../model/job.model";
import {AreYouSureComponent} from "../../component/are-you-sure/are-you-sure.component";
import {HazardsSafeguardsFormComponent} from "../../component/hazards-safeguards-form/hazards-safeguards-form.component";
import {AddStepFormComponent} from "../../component/add-step-form/add-step-form.component";
import {EditFieldFormComponent} from "../../component/edit-field-form/edit-field-form.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobs: JobModel[] | any[] = [];
  loading = true
  editMode = false;
  errors: any[] = [];
  @ViewChild('stepTitle') stepTitle: ElementRef | any;
  @ViewChild('hazardTitle') hazardTitle: ElementRef | any;
  @ViewChild('safeguardTitle') safeguardTitle: ElementRef | any;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadJobs()
  }

  createNewJob(content: any) {
    const modalRef = this.modalService.open(JobFormComponent);
    modalRef.componentInstance.doEmitData.subscribe((receivedEntry: any) => {
      if(receivedEntry)
        this.loadJobs()
    })
  }

  deleteJob(job: JobModel|any) {
    const modalRef = this.modalService.open(AreYouSureComponent);
    modalRef.componentInstance.entity = {dialogTitle: 'Job Deletion', label: job.title}
    modalRef.componentInstance.doDeleteEmitter.subscribe((res: boolean) => {
      if(res) {
        this.dataService.deleteJob(job.id).subscribe({
          next: (res) => {
            // @ts-ignore
            this.jobs.splice(this.jobs.findIndex(j => j.id == job.id), 1)
          },
          error: (err) => {
            this.handleErrors(false, err);
          }
        })
      }
    })
  }
  resetEditingMode() {
    this.editJobInstance = 'editJobInstance_'
  }
  editJobInstance = 'editJobInstance_'

  doAddNewJob(event: any) {
    this.jobs.push(event);
  }

  editJob(job: any) {
    const modalRef = this.modalService.open(JobFormComponent);
    modalRef.componentInstance.job = job;
    modalRef.componentInstance.editMode = true;
    modalRef.componentInstance.doEmitData.subscribe(() => {
    })
  }

  loadJobs() {
    this.dataService.getJobs(true).subscribe({
      next: (res: any) => {
        this.jobs = res.data
        this.loading = false
      },
      error: (err) => {
        this.handleErrors(false, err)
        this.loading = false
      }
    })
  }

  handleErrors(doClear = false, errors:any) {
    this.errors.push({message: errors.error.message})
  }

  clearErrors(i:any, clearAll = false) {
    if(clearAll) {
      this.errors = [];
    } else {
      if(document.getElementById('errorAlertInstance_' + i))
      { // @ts-ignore
        document.getElementById('errorAlertInstance_' + i).remove();
      }
    }

  }
  goToJobPage(job:JobModel) {
    this.router.navigate(['/job/'+job.id])
  }
}
