import { Component, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BasePage } from 'src/app/base/base';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent extends BasePage {
  addBookForm: FormGroup<any>;

  constructor(injector: Injector, public activeModal: NgbActiveModal) {
    super(injector);
    this.addBookForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
      completed: [false, Validators.required],
      status: ['', Validators.required],
      completedOn: [{ value: 'TBD', disabled: true }, Validators.required],
    });
  }
  async save() {
    if (!this.addBookForm.valid) {
      this.utility.presentFailureAlert('Please Fill All Fields !', true);
      return;
    }

    const formValue = this.addBookForm.value;
    const res = await this.network.addBook(formValue);
    console.log(res);
    if (res && res.id) {
      this.utility.presentSuccessAlert('Successfully Added Book !');
      this.activeModal.close({
        book_id: res.id,
      });
    }
  }

  setDisabled() {
    const flag =
      this.addBookForm.controls['completed'].value == false ? true : false;
    flag == true
      ? this.addBookForm.controls['completedOn'].disable()
      : this.addBookForm.controls['completedOn'].enable();
  }

  dismiss(reason: string) {
    this.activeModal.dismiss(reason);
  }
}
