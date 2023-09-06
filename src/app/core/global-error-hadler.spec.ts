import { GlobalErrorHadler } from "./global-error-hadler";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed, inject } from "@angular/core/testing";
import { AuthService } from "./auth/auth.service";
import { LoaderService } from "./loader/loader.service";
import { ToasterService } from "angular2-toaster";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { error } from "util";

describe('GlobalErrorHadler', () => {
    let httpTestingController: HttpTestingController;
    let service: GlobalErrorHadler;
    let mockAuthService, mockToasterService, mockloaderService, ERROR;
    let router = {
        navigate: jasmine.createSpy('navigate')
    };
    beforeEach(() => {
        ERROR = {
            'message': "Unauthorized Access",
            'status': 401
        }

        mockAuthService = jasmine.createSpyObj(['redirectToLogin']);
        mockloaderService = jasmine.createSpyObj(['emitIsLoaderShown']);
        mockToasterService = jasmine.createSpyObj(['pop']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                GlobalErrorHadler,
                { provide: AuthService, useValue: mockAuthService },
                { provide: LoaderService, useValue: mockloaderService },
                { provide: ToasterService, useValue: mockToasterService },
            ]
        });
        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(GlobalErrorHadler);
    });
    it('should be created', inject([GlobalErrorHadler], (service: GlobalErrorHadler) => {
        expect(service).toBeTruthy();
    }));

    // it('correctly handles error', inject([GlobalErrorHadler], (service: GlobalErrorHadler) => {
    //     const spy = spyOn(console, 'log');
    //     const error: Error = new Error('ERROR');
    //     service.handleError(error);
    //     expect(spy).toHaveBeenCalledWith('error : ', error);
    // }));

    // it('correctly handles 401 error', inject([GlobalErrorHadler], (service: GlobalErrorHadler) => {

    //     try {
    //         const spy = spyOn(console, 'log');
    //         service.handleError(ERROR);
    //         expect(mockToasterService.pop).toHaveBeenCalledWith('error', 'Error', 'Please Relogin Again');
    //         expect(spy).toHaveBeenCalledWith(ERROR);
    //         expect(mockAuthService.redirectToLogin).toHaveBeenCalled();
    //     }
    //     catch
    //     {
    //         throw error;
            
    //     }
    // }));
});