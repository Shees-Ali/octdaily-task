import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  async showLoader(msg = 'Please wait...') {}

  async hideLoader() {}

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
    title: string = 'Are you sure?',
    text: string = "You won't be able to revert this!",
    confirmTxt: string = 'Yes, delete it!'
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
