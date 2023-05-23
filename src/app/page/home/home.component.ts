import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../service/data.service";
import {NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {JobFormComponent} from "../../component/job-form/job-form.component";
import {HazardModel, JobModel, SafeguardModel, StepModel} from "../../model/job.model";
import {NgForm} from "@angular/forms";
import {AreYouSureComponent} from "../../component/are-you-sure/are-you-sure.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobs: JobModel[] | any[] = [];
  loading = true
  editMode = false;
  // showAddStepForm = false;
  addStepFormInstance = 'addStepFormInstance_'
  addHazardFormInstance = 'addHazardFormInstance_'
  addSafeguardFormInstance = 'addSafeguardFormInstance_'

  editStepFormInstance = 'editStepFormInstance_'
  editHazardFormInstance = 'editHazardFormInstance_'
  editSafeguardFormInstance = 'editSafeguardFormInstance_'


  @ViewChild('safeguardTitle') safeguardTitle: ElementRef | any;

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

  createNewJob(content: any) {
    const modalRef = this.modalService.open(JobFormComponent);
    modalRef.componentInstance.doEmitData.subscribe((receivedEntry: any) => {
      console.log(receivedEntry);
      this.jobs.push(receivedEntry);
    })
  }

  deleteJob(job: JobModel|any) {
    const modalRef = this.modalService.open(AreYouSureComponent);
    modalRef.componentInstance.entity = {dialogTitle: 'Job Deletion', label: job.title}
    modalRef.componentInstance.doDeleteEmitter.subscribe((res: boolean) => {
      if(res) {
        this.dataService.deleteStep(job.id).subscribe({
          next: (res) => {
            console.log(res);
            // @ts-ignore
            jobs.splice(jobs.findIndex(j => j.id == job.id), 1)
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  editJobInstance = 'editJobInstance_'
  editJob(job: any) {
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
            console.log(res);
            // @ts-ignore
            job.steps?.splice(i, 1)
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }

  editHazard(hazardId: number) {
    this.editHazardFormInstance = 'editHazardFormInstance_' + hazardId
  }
  deleteHazard(hazard: HazardModel|any, step: StepModel, i:number) {
    const modalRef = this.modalService.open(AreYouSureComponent);
    modalRef.componentInstance.entity = {dialogTitle: 'Hazard Deletion', label: hazard.title}
    modalRef.componentInstance.doDeleteEmitter.subscribe((res: boolean) => {
      if(res) {
        this.dataService.deleteHazard(hazard.id).subscribe({
          next: (res) => {
            console.log(res);
            // @ts-ignore
            step.hazards?.splice(i, 1)
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    })
  }
  editSafeguard(safeguardId: number) {
    this.editSafeguardFormInstance = 'editSafeguardFormInstance_' + safeguardId
  }
  deleteSafeguard(safeguard: SafeguardModel|any, hazard: HazardModel, i:number) {
    const modalRef = this.modalService.open(AreYouSureComponent);
    modalRef.componentInstance.entity = {dialogTitle: 'Safeguard Deletion', label: safeguard.title}
    modalRef.componentInstance.doDeleteEmitter.subscribe((res: boolean) => {
      if(res) {
        this.dataService.deleteSafeguard(safeguard.id).subscribe({
          next: (res) => {
            console.log(res);
            // @ts-ignore
            hazard.safeguards?.splice(i, 1)
          },
          error: (err) => {
            console.log(err);
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

    console.log(this.addHazardFormInstance);
  }

  toggleSafeguardForm(i: any) {
    this.addSafeguardFormInstance = 'addSafeguardFormInstance_' + i
  }

  errors: any[] = []
  doAddNewJob(event: any) {
    console.log(event);
    this.jobs.push(event);
  }

  doAddStep(form: NgForm, job:JobModel|any) {
    console.log(form);
    // this.loading = true;
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
    this.addStepFormInstance = 'addStepFormInstance_'
  }


  doAddHazard(form: NgForm, step:StepModel|any) {
    console.log(form);
    // this.loading = true;
    if(form.value.hazardTitle == '') {
      this.errors.push({message: 'Title is required'})
      return
    }

    console.log(form.value.hazardTitle);

    let data = {
      title: form.value.hazardTitle,
      stepId: step.id
    }
    console.log(data);

    this.dataService.addHazard(data).subscribe({
      next: (res: any) => {
        console.log(res)
        if(step.hazards) {
          step.hazards.push(res.data);
        } else {
          step.hazards = []
          step.hazards.push(res.data);
        }

        this.loading = false
      },
      error: (err) => {
        console.log(err)
        this.loading = false
      }
    })
  }

  doAddSafeguard(form:NgForm, hazard: HazardModel|any) {
    console.log(form);
    // this.loading = true;
    if(form.value.safeguardTitle == '') {
      this.errors.push({message: 'Title is required'})
      return
    }

    console.log(form.value.hazardTitle);

    let data = {
      title: form.value.safeguardTitle,
      hazardId: hazard.id
    }
    console.log(data);

    this.dataService.addSafeguard(data).subscribe({
      next: (res: any) => {
        console.log(res)
        if(hazard.safeguards) {
          hazard.safeguards.push(res.data);
        } else {
          hazard.safeguards = []
          hazard.safeguards.push(res.data);
        }

        this.loading = false
      },
      error: (err) => {
        console.log(err)
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
        console.log(err);
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
        console.log(err);
      }
    })
  }

  doUpdateSafeguard(form: NgForm, hazard: HazardModel, safeguardId: number, i: number) {
    let data: any = {
      id: safeguardId,
      title: form.value.editSafeguardTitle,
      hazardId: hazard.id
    }

    // @ts-ignore
    hazard.safeguards[i].title = form.value.editSafeguardTitle

    this.dataService.updateSafeguard(data).subscribe({
      next: (res) => {
        console.log(res);
        this.editSafeguardFormInstance = 'editSafeguardFormInstance_'
      },
      error: (err) => {
        console.log(err);
    }
    })
  }

}
