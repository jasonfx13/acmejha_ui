import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../service/data.service";
import {NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {JobFormComponent} from "../../component/job-form/job-form.component";
import {HazardModel, JobModel, SafeguardModel, StepModel} from "../../model/job.model";
import {NgForm} from "@angular/forms";
import {AreYouSureComponent} from "../../component/are-you-sure/are-you-sure.component";
import {HazardsFormComponent} from "../../component/hazards-form/hazards-form.component";
import {AddStepFormComponent} from "../../component/add-step-form/add-step-form.component";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('easeIn', [
      transition('void => *', animate(300, keyframes([
        style({
          transform: 'translateX(-300px)',
          opacity: 0,
          height: '*'
        }),
        style({
          transform: 'translateX(0)',
          opacity: 1,
          height: '*'
        })
      ]))),
      transition('* => void', animate(300, keyframes([
        style({
          transform: 'translateX(0)',
          opacity: 1,
          height: '*'
        }),
        style({
          transform: 'translateX(-300px)',
          opacity: 0,
          height: '*',
          color: '#FF0000'
        })
      ]))),
    ])
  ]
})
export class HomeComponent implements OnInit {
  jobs: JobModel[] | any[] = [];
  loading = true
  editMode = false;
  errors: any[] = [];
  addStepFormInstance = 'addStepFormInstance_'
  editStepFormInstance = 'editStepFormInstance_'
  editHazardFormInstance = 'editHazardFormInstance_'
  editSafeguardFormInstance = 'editSafeguardFormInstance_'
  @ViewChild('stepTitle') stepTitle: ElementRef | any;
  @ViewChild('hazardTitle') hazardTitle: ElementRef | any;
  @ViewChild('safeguardTitle') safeguardTitle: ElementRef | any;

  constructor(
    private dataService: DataService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadJobs()
  }

  createNewJob(content: any) {
    const modalRef = this.modalService.open(JobFormComponent);
    modalRef.componentInstance.doEmitData.subscribe((receivedEntry: any) => {
      this.jobs.push(receivedEntry);
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

  editJob(job: any) {
    const modalRef = this.modalService.open(JobFormComponent);
    modalRef.componentInstance.job = job;
    modalRef.componentInstance.editMode = true;
    modalRef.componentInstance.doEmitData.subscribe(() => {
    })
  }

  editStep(stepId: number) {
    this.editStepFormInstance = 'editStepFormInstance_' + stepId
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

  editHazard(hazardId: number) {
    this.editHazardFormInstance = 'editHazardFormInstance_' + hazardId
  }
  addFields(step: StepModel, field:string) {
    let modalRef = this.modalService.open(HazardsFormComponent);

    modalRef.componentInstance.step = step;
    modalRef.componentInstance.field = field;

    modalRef.componentInstance.dataEmitter.subscribe((res:any) => {
      let returnData:any[] = res;
      if(returnData.length > 0) {
        returnData.forEach((d) => {
          // @ts-ignore
          // step[field].push({title:d.title, stepId:d.step_id})
          this.loadJobs();
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
  editSafeguard(safeguardId: number) {
    this.editSafeguardFormInstance = 'editSafeguardFormInstance_' + safeguardId
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

  toggleAddStepForm(i: any) {
    this.addStepFormInstance = 'addStepFormInstance_' + i
    // this.showAddStepForm = !this.showAddStepForm
  }

  doAddNewJob(event: any) {
    this.jobs.push(event);
  }

  doAddStep(job:JobModel|any) {
    const modalRef = this.modalService.open(AddStepFormComponent);

    modalRef.componentInstance.job = job;

    modalRef.componentInstance.doEmitData.subscribe({
      next: (res: any) => {
        if(res) {
          this.loadJobs();
        }
      }
    })
  }
  showSidePanel = false;
  jobToEdit: JobModel|any;
  toggleShowSidePanel(job: JobModel, editMode:boolean) {
    this.jobToEdit = job;
    this.showSidePanel = !this.showSidePanel;
    this.editMode = editMode;
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

  doUpdateStep(form: NgForm, job: JobModel, stepId: number, i:number) {
    let data: any = {
      id: stepId,
      title: form.value.editStepTitle,
      jobId: job.id
    }
    // @ts-ignore
    job.steps[i].title = form.value.editStepTitle

    this.dataService.updateStep(data).subscribe({
      next: (res) => {
        this.editStepFormInstance = 'editStepFormInstance_';
      },
      error: (err) => {
        this.handleErrors(false, err);
      },
      complete: () => {

      }
    })
  }

  doUpdateHazard(form: NgForm, step: StepModel, hazardId: number, i:number) {
    let data: any = {
      id: hazardId,
      title: form.value.editHazardTitle,
      stepId: step.id
    }

    // @ts-ignore
    // step.hazards[i].title = form.value.editHazardTitle

    this.dataService.updateHazard(data).subscribe({
      next: (res) => {
        this.editHazardFormInstance = 'editHazardFormInstance_';
      },
      error: (err) => {
        this.handleErrors(false, err);
      }, complete: () => {

      }
    })
  }

  doUpdateSafeguard(form: NgForm, step: StepModel, safeguardId: number, i: number) {
    let data: any = {
      id: safeguardId,
      title: form.value.editSafeguardTitle,
      stepId: step.id
    }

    // @ts-ignore
    step.safeguards[i].title = form.value.editSafeguardTitle

    this.dataService.updateSafeguard(data).subscribe({
      next: (res) => {
        this.editSafeguardFormInstance = 'editSafeguardFormInstance_'
      },
      error: (err) => {
        this.handleErrors(false, err);
    }
    })
  }
  handleErrors(doClear = false, errors:any) {
    this.errors.push({message: errors.error.message})
  }
  errorAlertInstance = 'errorAlertInstance_'
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

}
