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
  search: string = '';
  sortBy: string = 'name';
  order: string = 'ascending';
  constructor(injector: Injector, private modalService: NgbModal) {
    super(injector);
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  async getAllBooks() {
    const params = {
      search: this.search,
      sortBy: this.sortBy,
      order: this.order
    }
    const books = await this.network.getBooksList(params);
    this.books = books;
  }

  addBook() {
    const modalRef = this.modalService.open(AddBookComponent, {
      centered: true,
      backdrop: 'static',
    });
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
    const modalRef = this.modalService.open(AddBookComponent, {
      centered: true,
      backdrop: 'static',
    });
    modalRef.componentInstance.book = book;
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

  deleteBook(book_id: any) {
    console.log(book_id);
    this.utility.presentConfirm().then(async (res: any) => {
      if (res.isConfirmed) {
        await this.network.deleteBook(book_id);
        this.utility.presentSuccessAlert('Successfully Deleted Book.');
        this.getAllBooks();
      }
    });
  }
}
