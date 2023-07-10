import { Component, Injector, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { BasePage } from '../base/base';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent extends BasePage implements OnInit {
  constructor(injector: Injector, private modalService: NgbModal) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  async getAllTasks() {
    const tasks = await this.network.getTasks();
    console.log(tasks);
  }

  addTask() {
    const modalRef = this.modalService.open(AddTaskComponent);
  }
}
