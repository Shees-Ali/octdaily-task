import { Component, Injector, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBookComponent } from '../components/add-book/add-book.component';
import { BasePage } from '../base/base';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent extends BasePage implements OnInit {
  books: any[] = [];
  constructor(injector: Injector, private modalService: NgbModal) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  async getAllBooks() {
    const books = await this.network.getReadingList();
    this.books = books;
  }

  addBook() {
    const modalRef = this.modalService.open(AddBookComponent);
    modalRef.result
      .then((res) => {
        if (res.book_id) {
          this.getAllBooks();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editBook(book: any) {
    console.log(book);
  }

  deleteBook(book_id: any) {
    console.log(book_id);
    this.utility.presentConfirm().then(async (res: any) => {
      if (res.isConfirmed) {
        await this.network.deleteBook(book_id);
        this.utility.presentSuccessAlert("Successfully Deleted Book.");
        this.getAllBooks();
      }
    });
  }
}
