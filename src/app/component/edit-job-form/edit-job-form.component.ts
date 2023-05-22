import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {HazardModel, JobModel, SafeguardModel, StepModel} from "../../model/job.model";
import {DataService} from "../../service/data.service";
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-edit-job-form',
  templateUrl: './edit-job-form.component.html',
  styleUrls: ['./edit-job-form.component.scss']
})
export class EditJobFormComponent implements OnInit {
  loading = false;
  @Input() job: JobModel | any;
  @Output() doEmitData: EventEmitter<any> = new EventEmitter;
  @ViewChild('modal') modal: ElementRef | undefined;
  step = 'edit-job'; // edit-job | edit-steps | edit-hazards | edit-safeguards
  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.job);

  }

  doClose() {
    this.modalService.dismissAll();
  }

  passBack() {
    this.activeModal.close(this.job);
  }

  doSaveAndContinue(form: NgForm, nextStep: string) {
    this.step = nextStep


  }

  processChanges(form: NgForm) {

  }

  onSubmit(form: NgForm) {
    this.loading = true;
    let editedJob: any = {
      id: this.job.id,
      title: form.value.title,
      description: form.value.description,
      createdBy: form.value.createdBy
    }

    console.log(editedJob);

    this.dataService.updateJob(editedJob).subscribe({
      next: (res) => {
        console.log(res);
        this.doEmitData.emit(editedJob);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    })

    console.log(editedJob);



  }

  editJob(job:JobModel) {

  }

  doEdit(step: StepModel | HazardModel | SafeguardModel | undefined) {

  }

  editHazard(hazard:HazardModel) {

  }

  editSafeguard(safeguard:SafeguardModel) {

  }

}
