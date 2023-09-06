/**
@author : Mihir Patel
@class : AuthInterceptor
@description :AuthInterceptor is created for check internet connection and pass token to api.
**/
import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";


import { ToasterService } from "angular2-toaster";
// --------------------------------------- //
import { AuthService } from "./auth.service";
import { LoaderService } from "../loader/loader.service";
import { ErrorMessage } from "../magic-string/common-validation-model";
import { Error_Type, Error_Title, ApiURL, Version, CountryCallingApi, AzureUrl } from "../magic-string/common.model";
import { GlobalResponseHandlerService } from "../global-response-handler/global-response-handler";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    token: string;
    version: string;
    constructor(
        private _authService: AuthService,
        private toasterService: ToasterService,
        private loaderService: LoaderService,
        private globalResponseHandlerService: GlobalResponseHandlerService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
       if (window.navigator.onLine) {
            if (req.url === CountryCallingApi || req.url.includes(AzureUrl)) {
                return next.handle(req)
            } else {
                this.version = this.globalResponseHandlerService.getVersion();
                this.token = this._authService.getAuthorizationHeaderValue();
                const request = req.clone({
                    setHeaders: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'api-version': this.version,
                        Authorization: this.token,
                    }
                });
                return next.handle(request)
            }
        }
        else {
            this.toasterService.pop(Error_Type, Error_Title, ErrorMessage.NoInternetConnection);
            this.loaderService.emitIsLoaderShown(false);
        }
    }
}
