import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HazardModel, JobModel, SafeguardModel, StepModel} from "../../model/job.model";
import {DataService} from "../../service/data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AreYouSureComponent} from "../../component/are-you-sure/are-you-sure.component";
import {
  HazardsSafeguardsFormComponent
} from "../../component/hazards-safeguards-form/hazards-safeguards-form.component";
import {EditFieldFormComponent} from "../../component/edit-field-form/edit-field-form.component";
import {AddStepFormComponent} from "../../component/add-step-form/add-step-form.component";
import {JobFormComponent} from "../../component/job-form/job-form.component";

@Component({
  selector: 'app-job-page',
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss']
})
export class JobPageComponent implements OnInit {
  jobId: number = 0;
  loaded = false;
  job:JobModel|any;
  editMode = false;
  errors: any[] = [];
  @ViewChild('stepTitle') stepTitle: ElementRef | any;
  @ViewChild('hazardTitle') hazardTitle: ElementRef | any;
  @ViewChild('safeguardTitle') safeguardTitle: ElementRef | any;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((p: Params) => {
      if(p && p['jobId']) {
        this.jobId = p['jobId']

        this.loadJob();

      }

      console.log(this.jobId)
    })
  }
  editField(data:any, field:string, relativeField:string) {
    // this.editStepFormInstance = 'editStepFormInstance_' + stepId
    const modalRef = this.modalService.open(EditFieldFormComponent);

    modalRef.componentInstance.field = field
    modalRef.componentInstance.data = data
    modalRef.componentInstance.relativeField = relativeField

    modalRef.componentInstance.doLoadJobs.subscribe((res:any) => {
      if(res) {
        this.loadJob();
      }
    })

  }


  loadJob() {
    this.dataService.getJob(this.jobId).subscribe({
      next: (res: any) => {
        this.job = res.data
        this.loaded = true
      },
      error: (err) => {
        this.handleErrors(false, err)
        this.loaded = true
      }
    })
  }

  editJob(job: any) {
    const modalRef = this.modalService.open(JobFormComponent);
    modalRef.componentInstance.job = job;
    modalRef.componentInstance.editMode = true;
    modalRef.componentInstance.doEmitData.subscribe(() => {
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

  doAddStep(job:JobModel|any) {
    const modalRef = this.modalService.open(AddStepFormComponent);

    modalRef.componentInstance.job = job;

    modalRef.componentInstance.doEmitData.subscribe({
      next: (res: any) => {
        if(res) {
          this.loadJob();
        }
      }
    })
  }

  deleteStep(step: StepModel|any, job: JobModel, i:number) {
    const modalRef = this.modalService.open(AreYouSureComponent);
    modalRef.componentInstance.entity = {dialogTitle: 'Step Deletion', label: step.title}
    modalRef.componentInstance.doDeleteEmitter.subscribe((res: boolean) => {
      if(res) {
        this.dataService.deleteStep(step.id).subscribe({
          next: (res) => {
            // @ts-ignore
            job.steps?.splice(i, 1)
          },
          error: (err) => {
            this.handleErrors(false, err);
          }
        })
      }
    })
  }

  addFields(step: StepModel, field:string) {
    let modalRef = this.modalService.open(HazardsSafeguardsFormComponent);
    modalRef.componentInstance.step = step;
    modalRef.componentInstance.field = field;

    modalRef.componentInstance.dataEmitter.subscribe((res:any) => {
      let returnData:any[] = res;
      if(returnData.length > 0) {
        returnData.forEach((d) => {
          // @ts-ignore
          // step[field].push({title:d.title, stepId:d.step_id})
          this.loadJob();
        })
      }
    })
  }

  deleteHazard(hazard: HazardModel|any, step: StepModel, i:number) {
    const modalRef = this.modalService.open(AreYouSureComponent);
    modalRef.componentInstance.entity = {dialogTitle: 'Hazard Deletion', label: hazard.title}
    modalRef.componentInstance.doDeleteEmitter.subscribe((res: boolean) => {
      if(res) {
        this.dataService.deleteHazard(hazard.id).subscribe({
          next: (res) => {
            // @ts-ignore
            step.hazards?.splice(i, 1)
          },
          error: (err) => {
            this.handleErrors(false, err);
          }
        })
      }
    })
  }

  deleteSafeguard(safeguard: SafeguardModel|any, step: StepModel, i:number) {
    const modalRef = this.modalService.open(AreYouSureComponent);
    modalRef.componentInstance.entity = {dialogTitle: 'Safeguard Deletion', label: safeguard.title}
    modalRef.componentInstance.doDeleteEmitter.subscribe((res: boolean) => {
      if(res) {
        this.dataService.deleteSafeguard(safeguard.id).subscribe({
          next: (res) => {
            // @ts-ignore
            step.safeguards?.splice(i, 1)
          },
          error: (err) => {
            this.handleErrors(false, err);
          }
        })
      }
    })
  }

  handleErrors(doClear = false, errors:any) {
    this.errors.push({message: errors.error.message})
  }

}
