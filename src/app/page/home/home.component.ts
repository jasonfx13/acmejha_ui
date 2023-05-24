import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../service/data.service";
import {NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {JobFormComponent} from "../../component/job-form/job-form.component";
import {HazardModel, JobModel, SafeguardModel, StepModel} from "../../model/job.model";
import {NgForm} from "@angular/forms";
import {AreYouSureComponent} from "../../component/are-you-sure/are-you-sure.component";
import {HazardsFormComponent} from "../../component/hazards-form/hazards-form.component";

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
  addStepFormInstance = 'addStepFormInstance_'
  addHazardFormInstance = 'addHazardFormInstance_'
  addSafeguardFormInstance = 'addSafeguardFormInstance_'

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
    this.dataService.getJobs(true).subscribe({
      next: (res: any) => {
        this.jobs = res.data
        console.log(this.jobs);
        this.loading = false
      },
      error: (err) => {
        this.handleErrors(false, err)
        this.loading = false
      },
      complete: () => {

      }
    })
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
  editTasks(jobId:number) {
    this.editJobInstance = (this.editJobInstance == 'editJobInstance_' ? 'editJobInstance_' + jobId :'editJobInstance_')

  }
  editJob(job: any) {
    const modalRef = this.modalService.open(JobFormComponent);

    modalRef.componentInstance.job = job;
    modalRef.componentInstance.editMode = true;

    modalRef.componentInstance.doEmitData.subscribe((receivedEntry: any) => {
      console.log(receivedEntry);
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
      console.log(res);

      let returnData:any[] = res;
      if(returnData.length > 0) {
        returnData.forEach((d) => {
          // @ts-ignore
          step[field].push({title:d.title, stepId:d.step_id})
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

  toggleAddHazardsForm(i: any) {
    // @ts-ignore
    this.addHazardFormInstance = 'addHazardFormInstance_' + i;
  }

  toggleSafeguardForm(i: any) {
    this.addSafeguardFormInstance = 'addSafeguardFormInstance_' + i
  }

  doAddNewJob(event: any) {
    this.jobs.push(event);
  }

  doAddStep(form: NgForm, job:JobModel|any) {
    // this.loading = true;
    if(form.value.title == '') {
      this.errors.push({message: 'Title is required'})
      return
    }

    let data = {
      title: form.value.title,
      jobId: job.id
    }

    this.dataService.addStep(data).subscribe({
      next: (res: any) => {
        if(this.jobs.find((j) => j.id == job.id).steps) {
          this.jobs.find((j) => j.id == job.id).steps.push(res.data);
        } else {
          this.jobs.find((j) => j.id == job.id).steps = []
          this.jobs.find((j) => j.id == job.id).steps.push(res.data);
        }

        this.loading = false
      },
      error: (err) => {
        this.handleErrors(false, err);
        this.loading = false
      }
    })
    this.stepTitle.nativeElement.value = '';
    // this.addStepFormInstance = 'addStepFormInstance_'
  }


  doAddHazard(form: NgForm, step:StepModel|any) {
    // this.loading = true;
    if(form.value.hazardTitle == '') {
      this.errors.push({message: 'Title is required'})
      return
    }

    let data = {
      title: form.value.hazardTitle,
      stepId: step.id
    }

    this.dataService.addHazard(data).subscribe({
      next: (res: any) => {
        if(step.hazards) {
          step.hazards.push(res.data);
        } else {
          step.hazards = []
          step.hazards.push(res.data);
        }

        this.loading = false
      },
      error: (err) => {
        this.handleErrors(false, err);
        this.loading = false
      }
    })
    this.hazardTitle.nativeElement.value = ''

  }

  doAddSafeguard(form:NgForm, hazard: HazardModel|any) {
    // this.loading = true;
    if(form.value.safeguardTitle == '') {
      this.errors.push({message: 'Title is required'})
      return
    }

    let data = {
      title: form.value.safeguardTitle,
      hazardId: hazard.id
    }

    this.dataService.addSafeguard(data).subscribe({
      next: (res: any) => {
        if(hazard.safeguards) {
          hazard.safeguards.push(res.data);
        } else {
          hazard.safeguards = []
          hazard.safeguards.push(res.data);
        }

        this.loading = false
      },
      error: (err) => {
        this.handleErrors(false, err);
        this.loading = false
      }
    })

    this.safeguardTitle.nativeElement.value = ''
  }


  doUpdateStep(form: NgForm, job: JobModel, stepId: number, i:number) {
    let data: any = {
      id: stepId,
      title: form.value.editSafeguardTitle,
      jobId: job.id
    }

    // @ts-ignore
    job.steps[i].title = form.value.editSafeguardTitle

    this.dataService.updateSteps(data).subscribe({
      next: (res) => {
        this.editStepFormInstance = 'editStepFormInstance_';
      },
      error: (err) => {
        this.handleErrors(false, err);
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
    step.hazards[i].title = form.value.editHazardTitle

    this.dataService.updateHazard(data).subscribe({
      next: (res) => {
        this.editHazardFormInstance = 'editHazardFormInstance_';
      },
      error: (err) => {
        this.handleErrors(false, err);
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

    console.log(this.errors);
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
