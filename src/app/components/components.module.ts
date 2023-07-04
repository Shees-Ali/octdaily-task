import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task/add-task.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AddTaskComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
  ]
})
export class ComponentsModule { }
