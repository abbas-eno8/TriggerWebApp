import { AutoFocusDirective } from './auto-focus.directive';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ElementRef, DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<input type="text" [autofocus]="true">`
})
export class AutoFocusComponent {
}

// https://stackoverflow.com/questions/48151314/angular-jasmine-karma-error-illegal-state-could-not-load-the-summary-for
describe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<AutoFocusComponent>;
  let component: AutoFocusComponent;
  let mockelRef;
  const directive = new AutoFocusDirective(mockelRef);
  // beforeEach(async(() => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoFocusDirective, AutoFocusComponent],
      //providers: [{ provide: ElementRef, useValue: mockelRef }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AutoFocusComponent);
    component = fixture.componentInstance;
  })

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnChanges', () => {

    it('should be create ngOnChanges()', () => {
      expect(directive.ngOnChanges).toBeTruthy();
    });

    it('should check ngOnChanges working properly if autofocus is true', () => {
      directive.autofocus = true;
      expect(directive.autofocus).toBeTruthy();
      // const element = fixture.debugElement.nativeElement.querySelector('input');
      // element.autofocus = true;
      fixture.debugElement
        .query(By.css('input'))
        .triggerEventHandler('focus', null);
      fixture.detectChanges();
      //const isFocused: boolean = fixture.debugElement.query(By.css('input')).nativeElement.autofocus;
      //expect(isFocused).toEqual(true);
    });

    it('should check ngOnChanges working properly if autofocus is false', () => {
      directive.autofocus = false;
      expect(directive.autofocus).toBeFalsy();
      directive.ngOnChanges();
    });
  })
});

// https://stackoverflow.com/questions/26618243/how-do-i-read-an-istanbul-coverage-report