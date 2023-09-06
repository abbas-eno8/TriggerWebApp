import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// -------------------------------------------- //
import { environment } from '../../../../environments/environment';
import { Route } from '../../magic-string/common.model';
import { Encryption } from '../../magic-string/common-validation-model';
import { LoaderService } from '../../loader/loader.service';
import { EnvironmentConfigService } from '../../environment-config/environment-config.service';
import { CommonRedirectionServiceService } from '../../services/common-redirection-service/common-redirection-service.service';

@Component({
  selector: 'trigger-platform-check',
  templateUrl: './platform-check.component.html',
  styleUrls: ['./platform-check.component.scss']
})
export class PlatformCheckComponent implements OnInit {
  public deviceLink: string;
  constructor(
    private router: Router,
    private commonRedirectionServiceService: CommonRedirectionServiceService,
    private loaderService: LoaderService,
    private environmentConfigService: EnvironmentConfigService) {
    this.deviceLink = JSON.parse(sessionStorage.getItem(Encryption.MobileLink));
  }

  ngOnInit() {
  }

  onClickNo() {
    this.loaderService.emitIsLoaderShown(true);
    this.router.navigate([Route.Client]);

  }

  onClickYes() {
    let encryptedString = JSON.parse(sessionStorage.getItem(Encryption.DeepLink));
    let link = environment.angularUrl + '?data=' + encryptedString['data'];
    setTimeout(function () { window.location.replace(this.deviceLink); }, 25);
    window.location.replace(link)
  }
}
