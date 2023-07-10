import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  async showLoader(msg = 'Please wait...') {}

  async hideLoader() {}

  showAlert(msg: any, title = 'Alert') {}

  presentToast(msg: any) {}

  presentSuccessToast(msg: any) {}

  presentFailureToast(msg: any) {}

  presentConfirm() {}
}
