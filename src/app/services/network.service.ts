import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(
    public api: ApiService,
    public router: Router,
    public utility: UtilityService
  ) {}

  // Network call for adding a book
  addBook(book: any) {
    return this.httpPostResponse('books', book);
  }

  // Network call for getting all books
  getBooksList(obj: any) {
    const params = this.serialize(obj);
    let url = 'books' + (params ? '?' + params : '');
    return this.httpGetResponse(url);
  }

  // Network call for getting a book
  getBookDetail(id: string) {
    return this.httpGetResponse('books/' + id);
  }

  // Network call for updating a book
  updateBook(id: string, book: any) {
    return this.httpPutResponse('books/' + id, book);
  }

  // Network call for deleting a book
  deleteBook(id: string) {
    return this.httpDeleteResponse('books/' + id);
  }

  // Function for making url string from object of url params.
  serialize = (obj: any) => {
    const str: any[] = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        let f: string =
          encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]);
        str.push(f);
      }
    }
    return str.join('&');
  };

  // Function for POST method
  httpPostResponse(
    key: any,
    data: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'post',
      key,
      data,
      id,
      showloader,
      showError,
      contenttype
    );
  }

  // Function for GET method
  httpGetResponse(
    key: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'get',
      key,
      {},
      id,
      showloader,
      showError,
      contenttype
    );
  }

  // Function for PUT method
  httpPutResponse(key: any, data: any, id = null) {
    return new Promise<any>((resolve, reject) => {
      this.api.put(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Function for PATCH method
  httpPatchResponse(key: any, data: any, id = null) {
    return new Promise<any>((resolve, reject) => {
      this.api.patch(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Function for DELETE method
  httpDeleteResponse(key: any) {
    return new Promise<any>((resolve, reject) => {
      this.api.delete(key).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Main function for makinf HTTP calls.
  httpResponse(
    type = 'get',
    key: any,
    data: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (showloader === true) {
        this.utility.showLoader();
      }

      const url = key + (id ? '/' + id : '');

      const seq =
        type === 'get' ? this.api.get(url, {}) : this.api.post(url, data);

      seq.subscribe(
        (res: any) => {
          if (showloader === true) {
            this.utility.hideLoader();
          }
          resolve(res);
        },
        (err) => {
          this.utility.hideLoader();
          this.utility.presentFailureAlert(err.error.title);
          reject(err.error);
        }
      );
    }).catch((err) => {
      console.log(err);
    });
  }
}
