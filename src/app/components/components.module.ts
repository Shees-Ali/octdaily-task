import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book/add-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [AddBookComponent, LoaderComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    LoaderComponent
  ]
})
export class ComponentsModule {}
