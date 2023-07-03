import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskComponent } from '../components/add-task/add-task.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private modalService: NgbModal) { }

  addTask() {
    const modalRef = this.modalService.open(AddTaskComponent);


  }
}
