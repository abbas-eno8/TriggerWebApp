import { TestBed, inject } from '@angular/core/testing';

import { DimensionService } from './dimension.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EnvironmentConfigService } from '../../core/environment-config/environment-config.service';
import { ApiURL } from '../../core/magic-string/common.model';
import { MasterDimensionModel, AccrdianPlus, Collaspe, AttributeModel } from '../masters.model';

describe('DimensionService', () => {
    let service, environmentConfigService;
    let httpTestingController: HttpTestingController;
    let clientId: number;
    beforeEach(() => {
        environmentConfigService = jasmine.createSpyObj(['getBaseUrl']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DimensionService,
                { provide: EnvironmentConfigService, useValue: environmentConfigService },
            ]
        })
            .compileComponents();
        httpTestingController = TestBed.get(HttpTestingController);
        environmentConfigService.getBaseUrl.and.returnValue('http://localhost:4200/');
        service = TestBed.get(DimensionService);
        clientId = 2;
    });

    it('should be created', inject([DimensionService], (service: DimensionService) => {
        expect(service).toBeTruthy();
    }));

    describe('getDimension', () => {

        it('should be create getDimension()', () => {
            expect(service.getDimension).toBeTruthy();
        });
        it('should call getDimension with correct URL', () => {
            // Act
            service.getDimension().subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Dimension);
            req.flush(DIMENSION);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getDimension().subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.Dimension);
            expect(req.request.method).toBe("GET");
        });
    });

    describe('getDimensionElements', () => {

        it('should be create getDimensionElements()', () => {
            expect(service.getDimensionElements).toBeTruthy();
        });
        it('should call getDimensionElements with correct URL', () => {
            // Act
            service.getDimensionElements(clientId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DimensionElements + clientId);
            req.flush(DIMENSION);
            httpTestingController.verify();
            expect(req.request.method).toBe('GET');
        });

        it('should be GET method', () => {
            service.getDimensionElements(clientId).subscribe();
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DimensionElements + clientId);
            expect(req.request.method).toBe("GET");
        });
    });

    describe('addAttribute', () => {
        it('should be create addAttribute()', () => {
            expect(service.addAttribute).toBeTruthy();
        });

        it('should call addAttribute with correct URL', () => {
            // Act
            service.addAttribute(ADDATTRIBUTE, clientId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DimensionElements + clientId);
            req.flush({ "message": "Team Configuration completed successfully.", "status": 200, "data": {} });
            httpTestingController.verify();
        });
    });

    describe('updateAttribute', () => {
        it('should be create updateAttribute()', () => {
            expect(service.updateAttribute).toBeTruthy();
        });

        it('should call updateAttribute with correct URL', () => {
            // Act
            service.updateAttribute(UPDATEATTRIBUTE, clientId).subscribe();
            // Assert
            const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DimensionElements + clientId);
            req.flush({ "message": "Team Configuration updated successfully.", "status": 200, "data": {} });
            httpTestingController.verify();
        });
    });

    describe('deleteAttribute', () => {

        it('should be create deleteAttribute()', () => {
          expect(service.deleteAttribute).toBeTruthy();
        });
    
        it('should call deleteAttribute with correct URL', () => {
          // Act
          service.deleteAttribute(UPDATEATTRIBUTE, clientId).subscribe();
          // Assert
          const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DimensionElements + clientId + '/' + UPDATEATTRIBUTE.dimensionId + '/' + UPDATEATTRIBUTE.dimensionValueid + '/' + UPDATEATTRIBUTE.updatedBy);
          expect(req.request.method).toBe("DELETE");
          req.flush({ "message": "Team is inactivated successfully.", "status": 200, "data": {} });
          httpTestingController.verify();
        });
    
        it('should be DELETE method', () => {
          service.deleteAttribute(UPDATEATTRIBUTE, clientId).subscribe();
          const req = httpTestingController.expectOne(service.baseUrl + ApiURL.DimensionElements + clientId + '/' + UPDATEATTRIBUTE.dimensionId + '/' + UPDATEATTRIBUTE.dimensionValueid + '/' + UPDATEATTRIBUTE.updatedBy);
          expect(req.request.method).toBe("DELETE");
        });
      });
});

let DIMENSION: MasterDimensionModel[] = [{ "id": 1, "dimension": "Role", "attributeModel": [{ "id": 4, "dimensionId": 1, "dimensionValueid": 4, "dimensionValues": "Executive", "isDefault": true, "orderBy": true }, { "id": 48, "dimensionId": 1, "dimensionValueid": -1, "dimensionValues": "Default User", "isDefault": true, "orderBy": false }, { "id": 3, "dimensionId": 1, "dimensionValueid": 3, "dimensionValues": "Manager", "isDefault": true, "orderBy": false }, { "id": 5, "dimensionId": 1, "dimensionValueid": 5, "dimensionValues": "Employee", "isDefault": true, "orderBy": false }, { "id": 12, "dimensionId": 1, "dimensionValueid": 9, "dimensionValues": "Project-Lead", "isDefault": false, "orderBy": false }, { "id": 27, "dimensionId": 1, "dimensionValueid": 10, "dimensionValues": "BA", "isDefault": false, "orderBy": false }, { "id": 33, "dimensionId": 1, "dimensionValueid": 14, "dimensionValues": "TestRole", "isDefault": false, "orderBy": false }, { "id": 34, "dimensionId": 1, "dimensionValueid": 15, "dimensionValues": "Associate", "isDefault": false, "orderBy": false }, { "id": 37, "dimensionId": 1, "dimensionValueid": 16, "dimensionValues": "QATestRole", "isDefault": false, "orderBy": false }, { "id": 40, "dimensionId": 1, "dimensionValueid": 17, "dimensionValues": "HOD", "isDefault": false, "orderBy": false }, { "id": 44, "dimensionId": 1, "dimensionValueid": 18, "dimensionValues": "DB", "isDefault": false, "orderBy": false }, { "id": 45, "dimensionId": 1, "dimensionValueid": 19, "dimensionValues": "CEO", "isDefault": false, "orderBy": false }, { "id": 46, "dimensionId": 1, "dimensionValueid": 20, "dimensionValues": "Tech Lead", "isDefault": false, "orderBy": false }, { "id": 49, "dimensionId": 1, "dimensionValueid": 100, "dimensionValues": "Test", "isDefault": false, "orderBy": false }], "isCollapsed": true, "accrodianIconClass": "icon-minus d-flex align-items-center", "collapseClass": "collapse show" }, { "id": 2, "dimension": "Relation", "attributeModel": [{ "id": 6, "dimensionId": 2, "dimensionValueid": 1, "dimensionValues": "Direct", "isDefault": true, "orderBy": false }, { "id": 7, "dimensionId": 2, "dimensionValueid": 2, "dimensionValues": "Hierarchal", "isDefault": true, "orderBy": false }, { "id": 8, "dimensionId": 2, "dimensionValueid": 3, "dimensionValues": "Indirect", "isDefault": true, "orderBy": false }], "isCollapsed": false, "accrodianIconClass": "icon-pluse d-flex align-items-center", "collapseClass": "collapse" }, { "id": 3, "dimension": "Department", "attributeModel": [{ "id": 38, "dimensionId": 3, "dimensionValueid": 1, "dimensionValues": "Inside", "isDefault": true, "orderBy": false }, { "id": 39, "dimensionId": 3, "dimensionValueid": 2, "dimensionValues": "Outside", "isDefault": true, "orderBy": false }], "isCollapsed": false, "accrodianIconClass": "icon-pluse d-flex align-items-center", "collapseClass": "collapse" }, { "id": 4, "dimension": "Team", "attributeModel": [{ "id": 41, "dimensionId": 4, "dimensionValueid": 1, "dimensionValues": "Connected", "isDefault": true, "orderBy": false }, { "id": 42, "dimensionId": 4, "dimensionValueid": 2, "dimensionValues": "Oversight", "isDefault": true, "orderBy": false }], "isCollapsed": false, "accrodianIconClass": "icon-pluse d-flex align-items-center", "collapseClass": "collapse" }];
let ADDATTRIBUTE: AttributeModel = { "id": 0, "dimensionId": 1, "dimensionValueid": 0, "dimensionValues": "Team Lead", "isDefault": true, "orderBy": false, "createdBy": 145, "updatedBy": 0, "result": 0 }
let UPDATEATTRIBUTE: AttributeModel = { "id": 0, "dimensionId": 1, "dimensionValueid": 0, "dimensionValues": "Team Lead", "isDefault": true, "orderBy": false, "createdBy": 0, "updatedBy": 145, "result": 0 }