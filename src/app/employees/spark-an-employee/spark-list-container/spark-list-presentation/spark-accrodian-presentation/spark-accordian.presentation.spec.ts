import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SparkAccrodianPresentation } from './spark-accrodian.presentation';
import { SparkListPresenter } from '../../spark-list-presenter/spark-list-presenter';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Spark, SparkAnEmployee } from '../../../spark-an-employee-model';
import { of } from 'rxjs';
import { ScrollService } from '../../../../../core/services/scroll.service';

describe('SparkAccrodianPresentation', () => {
    let component: SparkAccrodianPresentation;
    let fixture: ComponentFixture<SparkAccrodianPresentation>;
    let presenter, scrollService;
    let teamId: number;
    let property: string;
    beforeEach(async(() => {
        presenter = jasmine.createSpyObj(['sort', 'getDirecionIcon', 'onClickPaginationPanel', 'scrollTop', 'editModal', 'deleteModal', 'previewModal']);
        teamId = 2;
        property = 'activityDays';
        TestBed.configureTestingModule({
            declarations: [SparkAccrodianPresentation],
            providers: [{ provide: SparkListPresenter, useValue: presenter },
            { provide: ScrollService, useValue: scrollService }],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SparkAccrodianPresentation);
        component = fixture.componentInstance;
        component = new SparkAccrodianPresentation(presenter, scrollService)
        //fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {

        it('should be create ngOnInit', () => {
            expect(component.ngOnInit).toBeTruthy();
        });

        // it('should check ngAfterViewInit.bindDataSource working properly', () => {
        //   component.ngOnInit();
        // });
    });

    describe('ngAfterViewInit', () => {

        it('should be create ngAfterViewInit', () => {
            expect(component.ngAfterViewInit).toBeTruthy();
        });

        it('should check ngAfterViewInit.bindDataSource working properly', () => {
            spyOn<any>(component, 'bindDataSource').and.returnValue(of([]));
            component.ngAfterViewInit();
        });
    });

    describe('expansionPanel', () => {

        it('should be create expansionPanel', () => {
            expect(component.expansionPanel).toBeTruthy();
        });

        it('should check expansionPanel method working properly', () => {
            component.expansionPanel(true);
        });
    });


    describe('sort', () => {

        it('should be create sort', () => {
            expect(component.sort).toBeTruthy();
        });

        it('should check sort method working properly', () => {
            //component.teams = TEAMS;
            //let filteredTeams: any[] = presenter.sort(property,TEAMS);
            //component.sort(property);


            spyOn<any>(component, 'bindDataSource').and.returnValue(of([]));
            component.sort(property);
            //expect(presenter.sort).toHaveBeenCalledWith(property,TEAMS);
            //expect(component.teams.length).toEqual(filteredTeams.length);
        });
    });

    describe('getDirecionIcon', () => {

        it('should be create getDirecionIcon', () => {
            expect(component.getDirecionIcon).toBeTruthy();
        });

        it('should check getDirecionIcon method working properly', () => {
            component.getDirecionIcon(property);
            expect(presenter.getDirecionIcon).toHaveBeenCalledWith(property);
        });
    });

    describe('onClickPaginationPanel', () => {

        it('should be create onClickPaginationPanel', () => {
            expect(component.onClickPaginationPanel).toBeTruthy();
        });

        it('should check onClickPaginationPanel method working properly', () => {
            component.onClickPaginationPanel();
            expect(presenter.onClickPaginationPanel).toHaveBeenCalled;
        });
    });

    describe('pageChanged', () => {

        it('should be create pageChanged', () => {
            expect(component.pageChanged).toBeTruthy();
        });

        it('should check pageChanged method working properly', () => {
            spyOn<any>(component, 'bindDataSource').and.returnValue(of([]));
            component.pageChanged('');
        });
    });

    describe('editModal', () => {

        it('should be create editModal', () => {
            expect(component.editModal).toBeTruthy();
        });

        it('should check editModal method working properly', () => {
            component.editModal(SPARK);
            expect(presenter.editModal).toHaveBeenCalledWith(SPARK);
        });
    });

    describe('deleteModal', () => {

        it('should be create deleteModal', () => {
            expect(component.deleteModal).toBeTruthy();
        });

        it('should check deleteModal method working properly', () => {
            component.deleteModal(SPARK);
            expect(presenter.deleteModal).toHaveBeenCalledWith(Spark, SPARK);
        });
    });

    describe('previewModal', () => {

        it('should be create previewModal', () => {
            expect(component.previewModal).toBeTruthy();
        });

        it('should check previewModal method working properly', () => {
            component.previewModal(SPARK);
            expect(presenter.previewModal).toHaveBeenCalledWith(SPARK);
        });
    });
});

let SPARK: SparkAnEmployee = { "empId": 17, "sparkId": 5, "categoryId": 1, "category": "Performance", "sparkDate": "Tue Jan 21 2020 18:00:04 GMT+0530 (India Standard Time)", "sparkBy": 1, "givenBy": "Kalpesh Admin", "sparkByFirstName": "Kalpesh", "sparkByLastName": "Admin", "spark": "", "classificationId": 2, "classification": "Praise", "attachmentName": "", "path": "", "attachmentPath": "", "cloudFilePath": "", "isEnabledAction": true, "isEditable": true, "isDeletable": true, "isPreviewFile": false, "classifications": [], "categories": [], "createdBy": 0, "updatedBy": 0, "sparkByImgPath": "", "profileName": "KA", "sendSpark": false, "sparkPrivacy": 1, "isSparkSent": false };
