/**
@author : Mihir Patel
@class : CoreModule
@description :CoreModule is contained with NavBarModule.
**/
import { NgModule, ErrorHandler, APP_INITIALIZER, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarModule } from './navbar/nav-bar.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// ............................................... //
import { AuthenticationService } from './authentication.service';
import { LoaderService } from './loader/loader.service';
import { AuthGuard } from './auth-guard.service';
import { EnvironmentConfigService } from './environment-config/environment-config.service';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { GlobalErrorHadler } from './global-error-hadler';
import { singleSignOn } from './single-sign-on';
import { ToasterService } from '../../../node_modules/angular2-toaster';
import { UrlEncryptionDecryptionService } from './url-encryption-decryption/url-encryption-decryption.service';
import { GlobalResponseHandlerService } from './global-response-handler/global-response-handler';
import { ScrollService } from './services/scroll.service';
import { ClientService } from '../clients/client-service/client.service';
import { EmployeeService } from './services/employee-service/employee.service';
import { ActionPermissionService } from './services/action-permission/action-permission.service';
import { CommonService } from './services/common/common.service';
import { PlatformCheckComponent } from './component/platform-check/platform-check.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { UnauthorizePageComponent } from './component/unauthorize-page/unauthorize-page.component';
import { DashboardSelectOverlayComponent } from './component/dashboard-select-overlay/dashboard-select-overlay.component';
import { SortByFieldService } from './services/sort-by-field/sort-by-field.service';
import { CustomLoaderService } from './custom-loader/custom-loader.service';
import { ExportExcelService } from './services/export-excel.service';
import { CountryCdeAdapter } from './adapter/CountryCodeAdapter';
@NgModule({
  imports: [
    CommonModule,
    NavBarModule
  ],
  declarations: [
    PageNotFoundComponent,
    UnauthorizePageComponent,
    PlatformCheckComponent,
    DashboardSelectOverlayComponent
  ],
  providers: [
    ScrollService,
    AuthenticationService,
    LoaderService,
    CustomLoaderService,
    AuthGuard,
    AuthService,
    [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      { provide: ErrorHandler, useClass: GlobalErrorHadler }
    ],
    EnvironmentConfigService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: singleSignOn,
    //   multi: true,
    //   deps: [EnvironmentConfigService]
    // },
    ToasterService,
    DatePipe,
    UrlEncryptionDecryptionService,
    GlobalResponseHandlerService,
    ClientService,
    EmployeeService,
    ActionPermissionService,
    CommonService,
    SortByFieldService,
    ExportExcelService,
    CountryCdeAdapter,
  ],
  exports: [
    RouterModule,
    NavBarModule,
    PageNotFoundComponent,
    UnauthorizePageComponent,
    PlatformCheckComponent,
    DashboardSelectOverlayComponent,
  ]
})
export class CoreModule { }
