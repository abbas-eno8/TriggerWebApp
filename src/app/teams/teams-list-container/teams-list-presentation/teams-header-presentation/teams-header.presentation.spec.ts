import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamsHeaderPresentation } from './teams-header.presentation';
import { Router } from '@angular/router';
import { UrlEncryptionDecryptionService } from '../../../../core/url-encryption-decryption/url-encryption-decryption.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Route } from '../../../../core/magic-string/common.model';

describe('TeamsHeaderPresentationComponent', () => {
  let component: TeamsHeaderPresentation;
  let fixture: ComponentFixture<TeamsHeaderPresentation>;
  let mockurlEncryptionDecryptionService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async(() => {
    mockurlEncryptionDecryptionService = jasmine.createSpyObj(['urlEncryption']);
    TestBed.configureTestingModule({
      declarations: [ TeamsHeaderPresentation ],
      providers: [
        { provide: Router, useValue: router },
        { provide: UrlEncryptionDecryptionService, useValue: mockurlEncryptionDecryptionService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsHeaderPresentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('should be create ngOnInit', () => {
      expect(component.ngOnInit).toBeTruthy();
    });
  });

  describe('addTeam', () => {

    it('should be create addTeam', () => {
      expect(component.addTeam).toBeTruthy();
    });

    it('should check addTeam working properly', () => {
      component.addTeam();
      expect(mockurlEncryptionDecryptionService.urlEncryption).toHaveBeenCalledWith('0', Route.AddTeam);
    });
  });

});
