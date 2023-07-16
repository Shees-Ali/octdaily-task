import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  isLoading: Subject<boolean> = new Subject();

  constructor() {}

  showLoader() {
    this.isLoading.next(true);
  }

  hideLoader() {
    this.isLoading.next(false);
  }

  showAlert(msg: string, title = 'Alert') {}

  presentSuccessAlert(msg: string, showConfirm: boolean = false) {
    Swal.fire({
      icon: 'success',
      title: msg,
      showConfirmButton: showConfirm,
      timer: 1500,
    });
  }

  presentFailureAlert(msg: string, showConfirm: boolean = false) {
    Swal.fire({
      icon: 'error',
      title: msg,
      showConfirmButton: showConfirm,
      timer: 1500,
    });
  }

  presentConfirm(
    text: string = "You won't be able to revert this!",
    confirmTxt: string = 'Yes, delete it!',
    title: string = 'Are you sure?',
  ) {
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmTxt,
      }).then((result) => {
        resolve(result);
      });
    });
  }
}
