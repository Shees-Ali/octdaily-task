import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BasePage } from 'src/app/base/base';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent extends BasePage implements OnInit {
  addBookForm: FormGroup<any>;
  @Input() book: any;
  bookID: any;
  constructor(injector: Injector, public activeModal: NgbActiveModal) {
    super(injector);
    this.addBookForm = this.formBuilder.group({
      bookName: ['', Validators.required],
      category: ['', Validators.required],
      author: ['', Validators.required],
      completed: [false, Validators.required],
      status: ['', Validators.required],
      completedOn: ['TBD', Validators.required],
    });
  }

  ngOnInit() {
    if (this.book) {
      this.bookID = this.book.id;
      delete this.book.id;
      this.addBookForm.setValue(this.book);
    }
  }

  async save() {
    if (!this.addBookForm.valid) {
      this.utility.presentFailureAlert('Please Fill All Fields !', true);
      return;
    }
    if (this.bookID) {
      const formValue = this.addBookForm.value;
      const res = await this.network.updateBook(this.bookID, formValue);
      this.activeModal.close({
        book_id: this.bookID,
      });
      this.utility.presentSuccessAlert('Successfully Updated Book !');
    } else {
      const formValue = this.addBookForm.value;
      const res = await this.network.addBook(formValue);
      if (res && res.id) {
        this.activeModal.close({
          book_id: res.id,
        });
        this.utility.presentSuccessAlert('Successfully Added Book !');
      }
    }
  }

  async dismiss(reason: string) {
    if (this.addBookForm.touched && !this.bookID) {
      const res = await this.utility.presentConfirm(
        'If you quit data that you have entered will be lost',
        'Yes Quit'
      );
      if (!res) {
        return;
      }
    }
    this.activeModal.dismiss(reason);
  }
}
