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

  addTask(task: any) {
    return this.httpPostResponse('addTask', task);
  }

  getTasks() {
    return this.httpGetResponse('getTasks');
  }

  getTaskDetails(id: string) {}

  updateTask(id: string, task: any) {}

  deleteTask(id: string) {}

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

  httpPostResponse(
    key: any,
    data: any,
    id = null,
    showloader = false,
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

  httpGetResponse(
    key: any,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json',
    returnAllResponse = false
  ) {
    return this.httpResponse(
      'get',
      key,
      {},
      id,
      showloader,
      showError,
      contenttype,
      returnAllResponse
    );
  }

  httpPutResponse(key: any, data: any, id = null) {
    return new Promise((resolve, reject) => {
      this.api.put(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  httpPatchResponse(key: any, data: any, id = null) {
    return new Promise<any>((resolve, reject) => {
      this.api.patch(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  httpDeleteResponse(key: any) {
    return new Promise<any>((resolve, reject) => {
      this.api.delete(key).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // default 'Content-Type': 'application/json',
  httpResponse(
    type = 'get',
    key: any,
    data: any,
    id = null,
    showloader = false,
    showError = true,
    contenttype = 'application/json',
    returnAllResponse = false
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
          if (res.bool !== true) {
            if (showError) {
              this.utility.presentSuccessToast(res.message);
            }

            if (returnAllResponse) {
              resolve(res);
              return;
            }
            reject(null);
          } else {
            if (returnAllResponse) {
              resolve(res);
              return;
            }
            resolve(res.data);
          }
        },
        (err) => {
          console.log('err', err);

          this.utility.hideLoader();
          if (showError) {
            if (err.error) {
              this.utility.presentFailureToast(err.error.message);
              if (err.error.message == 'Authentication Failed') {
                this.router.navigate(['/']);
              }
            } else {
              this.utility.presentFailureToast(err.message);
            }

            if (returnAllResponse) {
              resolve(err);
              return;
            }

            reject(null);
          }

          if (returnAllResponse) {
            resolve(err);
            return;
          }
        }
      );
    }).catch((err) => {
      console.log(err);
    });
  }
}
