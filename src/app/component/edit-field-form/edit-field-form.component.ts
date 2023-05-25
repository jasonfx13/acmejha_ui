import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-edit-field-form',
  templateUrl: './edit-field-form.component.html',
  styleUrls: ['./edit-field-form.component.scss']
})
export class EditFieldFormComponent implements OnInit {
  @Input() data:any
  @Input() field:any
  @Input() relativeField:string='';
  @Output() doLoadJobs: EventEmitter<any> = new EventEmitter<any>()
  title:any = '';
  errors: any[] = [];
  loaded = false;
  constructor(
    private modalService: NgbModal,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.loaded = true;
    this.title = {...this.data}.title


  }

  onSubmit(form: NgForm) {
    this.loaded = false;
    let data = {
      id: this.data.id,
      title: form.value.title,
      [this.relativeField]: this.data[this.relativeField]
    }

    this.loaded = true;
    this.dataService.editField(data, this.field).subscribe({
      next: (res) => {
        this.doLoadJobs.emit(true);
      },
      error: (err) => {
        this.errors.push({message: err.error.message})
      }
    })
  }

  doClose() {
    this.modalService.dismissAll();
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
}
