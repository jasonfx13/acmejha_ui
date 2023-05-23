import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.scss']
})
export class AreYouSureComponent implements OnInit {
  @Input() modal:any;
  @Input() entity:any = {};
  @Output() doDeleteEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  doYesDelete() {
    this.doDeleteEmitter.emit(true);
    this.doClose();
  }

  doClose() {
    this.modalService.dismissAll();
  }

}
