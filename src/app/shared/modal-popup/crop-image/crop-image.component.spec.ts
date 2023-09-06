import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropImageComponent } from './crop-image.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';

describe('CropImageComponent', () => {
  let component: CropImageComponent;
  let fixture: ComponentFixture<CropImageComponent>;
  let matDialogRef;
  let object = {
    'iconUrl': 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABLCAYAAACGGCK3AAAVD',
    'image': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABLCAYAAACGGCK3AAAVD',
    'iconName': '1Rivet.png',
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CropImageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // describe('ngOnInit', () => {

  //   it('should be create ngOnInit()', () => {
  //     expect(component.ngOnInit).toBeTruthy();
  //   });

  //   it('should check ngOnInit working properly', () => {
  //     spyOn(component, 'clear');
  //     component.ngOnInit();
  //     expect(component.clear).toHaveBeenCalled();
  //   });
  // });

  // describe("should test output emitter with subscriber", () => {

  //   it('should test the uploadImage emitter with a simple subscribe', async(() => {
  //     component.uploadImage.subscribe(event => {
  //       expect(event)
  //     });
  //   }));
  // })

  // describe("fileChangeEvent()", () => {

  //   it('should be create fileChangeEvent()', () => {
  //     expect(component.fileChangeEvent).toBeTruthy();
  //   });

  //   it('should be check fileChangeEvent() work properly', async(() => {
  //     component.isSetClientLogoBtnDisabled = true;
  //     // component.fileChangeEvent(event);
  //     // expect(component.isSetClientLogoBtnDisabled).toBe(true);
  //     // spyOn(component, 'fileChangeEvent').and.callThrough();
  //     //expect(component.imageChangedEvent).toEqual(event);
  //   }));
  // })

  // describe("imageCropped()", () => {

  //   it('should be create imageCropped()', () => {
  //     expect(component.imageCropped).toBeTruthy();
  //   });

  //   it('should be check imageCropped() work properly', async(() => {

  //   }));
  // })

  // describe("imageLoaded()", () => {

  //   it('should be create imageLoaded()', () => {
  //     expect(component.imageLoaded).toBeTruthy();
  //   });

  //   it('should be check imageLoaded() work properly', async(() => {
  //     component.imageLoaded();
  //   }));
  // })

  // describe("loadImageFailed()", () => {

  //   it('should be create loadImageFailed()', () => {
  //     expect(component.clear).toBeTruthy();
  //   });

  //   it('should be check loadImageFailed() work properly', async(() => {
  //     component.loadImageFailed();
  //   }));
  // })

  // describe("clear()", () => {

  //   it('should be create clear()', () => {
  //     expect(component.clear).toBeTruthy();
  //   });

  //   it('should be check clear() work properly', async(() => {
  //     component.isSetClientLogoBtnDisabled = false;
  //     component.croppedImage = '';
  //     component.clear();
  //     expect(component.isSetClientLogoBtnDisabled).toBe(false);
  //     expect(component.croppedImage).toBe('');
  //   }));
  // })

  // describe("onClickCancel()", () => {

  //   it('should be create onClickCancel()', () => {
  //     expect(component.onClickCancel).toBeTruthy();
  //   });

  //   it('should be check onClickYes() work properly', async(() => {
  //     spyOn(component, 'clear');
  //     component.onClickCancel();
  //     expect(component.clear).toHaveBeenCalled();
  //   }));
  // })

  // describe("setAsClientLogo()", () => {

  //   it('should be create setAsClientLogo()', () => {
  //     expect(component.setAsClientLogo).toBeTruthy();
  //   });

  //   it('should be check setAsClientLogo() work properly', async(() => {

  //     spyOn(component.uploadImage, 'emit');
  //     component.setAsClientLogo();
  //     expect(component.uploadImage.emit).toHaveBeenCalledWith(object);
  //   }));
  // })
});
