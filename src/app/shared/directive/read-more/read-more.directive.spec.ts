import { ReadMoreDirective } from './read-more.directive';
import { TestBed } from '@angular/core/testing';

describe('Directive: ReadMoreDirective', () => {
  const directive = new ReadMoreDirective();
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadMoreDirective]
    });
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should create ngOnChanges', () => {
      expect(directive.ngOnChanges).toBeTruthy();
    });
    it('should be check ngOnChanges method work properly', () => {
      spyOn(directive, 'determineView');
      directive.ngOnChanges();
      expect(directive.determineView).toHaveBeenCalled();
    });
  });

  describe('toggleView', () => {
    it('should create toggleView', () => {
      expect(directive.toggleView).toBeTruthy();
    });
    it('should be check toggleView method work properly', () => {
      spyOn(directive, 'determineView');
      directive.toggleView();
      expect(directive.determineView).toHaveBeenCalled();
    });
  });

  describe('setText', () => {
    it('should create setText', () => {
      //expect(directive.setText).toBeTruthy();
      expect(directive['setText']).toBeTruthy();
    });
    it('should be check setText method work properly if isCollapsed is true', () => {
      // let text: string = 'should be check setText method work properly';
      // directive.isCollapsed = true;
      // directive['setText']();
    });

    it('should be check setText method work properly if isCollapsed is false', () => {
      let text: string = 'should be check setText method work properly';
      directive.isCollapsed = false;
      directive['setText']();
      //expect(directive.currentText).toBe(text);
    });
  });
});
