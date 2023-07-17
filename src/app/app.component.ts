import { Component } from '@angular/core';
import { UtilityService } from './services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoader: boolean = true;
  constructor(
    public utilityService: UtilityService
  ) {
    utilityService.isLoading.subscribe((res) => {
      this.showLoader = res;
    });
  }
}
