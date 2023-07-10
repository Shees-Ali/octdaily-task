import { Component, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BasePage } from 'src/app/base/base';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent extends BasePage {
  addTaskForm: FormGroup<any>;

  constructor(injector: Injector, public activeModal: NgbActiveModal) {
    super(injector);
    this.addTaskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  async save() {
    console.log(this.addTaskForm.value);
    console.log(this.addTaskForm);
    if (!this.addTaskForm.valid) {
      return;
    }

    const formValue = this.addTaskForm.value;
    formValue['id'] = Date.now();
    const res = await this.network.addTask(formValue);
    if (res) {
      console.log(res);
      this.activeModal.close('Saved');
    }
  }

  dismiss(reason: string) {
    this.activeModal.dismiss(reason);
  }
}
