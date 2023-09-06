import { Component, OnInit } from '@angular/core';
import { GlobalEventsManager } from '../../navbar/globalEventsManager';
import { LoaderService } from '../../loader/loader.service';
import { Encryption } from '../../magic-string/common-validation-model';

@Component({
  selector: 'trigger-unauthorize-page',
  templateUrl: './unauthorize-page.component.html'
})
export class UnauthorizePageComponent implements OnInit {
  public page: string;
  constructor(
    private globalEventsManager: GlobalEventsManager,
    private loaderService: LoaderService) {
    this.globalEventsManager.getNotification(true);
    this.page = sessionStorage.getItem(Encryption.DeepLinkUnAuthorized);
    sessionStorage.setItem(Encryption.DeepLink, null);
    this.loaderService.emitIsLoaderShown(false);
  }

  ngOnInit() {
  }

}
