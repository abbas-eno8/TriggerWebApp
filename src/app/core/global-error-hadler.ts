/**
@author : Sonal Patil
@class : GlobalErrorHadler
@description :GlobalErrorHadler is created for centralized exception handling.
**/
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { BodyOutputType, Toast, ToasterService } from 'angular2-toaster';
// ----------------------------------------------- //
import { AuthService } from './auth/auth.service';
import { LoaderService } from './loader/loader.service';
import { ErrorMessage } from './magic-string/common-validation-model';
import { ApiResponseStatus, Error_Title, Error_Type } from './magic-string/common.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHadler implements ErrorHandler {
    private _authService?: AuthService;
    constructor(
        private toasterService: ToasterService,
        private injector: Injector,
        private loaderService: LoaderService) {
    }

    handleError(error) {
        this._authService = this.injector.get(AuthService);
        if (error.status === ApiResponseStatus.UnauthorizeAccess) {
            this._authService.redirectToLogin();
            throw error;
        } else if (error.status === ApiResponseStatus.PreconditionFailed) {
            this.loaderService.emitIsLoaderShown(false);
            this.toasterService.pop(Error_Type, Error_Title, error.error.message);
        }
        else {
            if (error.status) {
                // Comment this toaster for hide dev's error, this will uncomment during developnment.
                // console.error(
                //     `Backend returned code ${error.status}, ` +
                //     `body was: ${error.message}`);
                const toast: Toast = {
                    type: Error_Type,
                    title: Error_Title,
                    body: ErrorMessage.InternalServerError,
                    bodyOutputType: BodyOutputType.TrustedHtml,
                };
                this.toasterService.pop(toast)
                this.loaderService.emitIsLoaderShown(false);
            } else {
                // console.log('error : ', error);
                // Comment this toaster for hide dev's error, this will uncomment during developnment.
            }
        }
        //this.loaderService.emitIsLoaderShown(false);
    }
}