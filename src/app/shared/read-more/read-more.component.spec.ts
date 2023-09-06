import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMoreComponent } from './read-more.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ReadMoreComponent', () => {
  let component: ReadMoreComponent;
  let fixture: ComponentFixture<ReadMoreComponent>;
  let text = 'Hi there...';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('should have initialize variables', () => {
      expect(component.maxLength).toBe(100);
      expect(component.hideToggle).toBe(true);
      expect(component.isCollapsed).toBe(true);
    });
  })

  describe('ngOnInit', () => {
    it('should be create ngOnInit()', () => {
      expect(component.ngOnInit).toBeTruthy();
    });

    it('should be check ngOnInit() work properly', () => {
      component.ngOnInit();
    });
  });

  describe('toggleView', () => {
    it('should be create toggleView()', () => {
      expect(component.toggleView).toBeTruthy();
    });

    it('should be check toggleView() work properly', () => {
      component.isCollapsed = false;
      expect(component.isCollapsed).toBe(false);
      spyOn(component, 'determineView');
      component.toggleView();
      expect(component.determineView).toHaveBeenCalled();
    });
  });

  describe('determineView', () => {
    it('should be create determineView()', () => {
      expect(component.determineView).toBeTruthy();
    });

    it('should be check determineView() if text varibale have value', () => {
      component.isCollapsed = false
      component.text = text;

      expect(component.text).toBe(text);
      expect(component.text).not.toBe('');
      expect(component.text.length).toBeLessThan(component.maxLength);
      expect(100).toEqual(component.maxLength);

      component.determineView();
      expect(component.isCollapsed).toBe(false);

      component.currentText = component.text;
      expect(component.isCollapsed).toBe(false);
      expect(component.hideToggle).toBe(true);

    });

    it('should be check determineView() if text varibale have no value', () => {
      spyOn(component, 'setText');
      component.text = 'if text varibale have no value...if text varibale have no value...if text varibale have no value....if text varibale have no value';
      component.hideToggle = false

      component.determineView();

      expect(component.text).not.toBe(text);
      expect(component.text.length).not.toBeLessThan(component.maxLength);
      expect(component.text.length).not.toEqual(component.maxLength);
      expect(component.hideToggle).toBe(false);

      component.setText();
    });
  });


  describe('setText', () => {
    it('should be create setText()', () => {
      expect(component.setText).toBeTruthy();
    });

    it('should be check setText() if isCollapsed is true', () => {
      component.text = text;
      expect(component.isCollapsed).toBe(true);
      component.setText();
      component.currentText = component.text.substring(0, component.maxLength) + "...";
    });

    it('should be check setText() if isCollapsed is false', () => {
      component.isCollapsed = false
      expect(component.isCollapsed).toBe(false);
      component.setText();
      component.currentText = component.text;
    });
  });

  describe('ngOnChanges', () => {
    it('should be create ngOnChanges()', () => {
      expect(component.ngOnChanges).toBeTruthy();
    });

    it('should be check ngOnChanges() work properly', () => {
      spyOn(component, 'determineView');
      component.ngOnChanges();
      expect(component.determineView).toHaveBeenCalled();
    });
  });

});
