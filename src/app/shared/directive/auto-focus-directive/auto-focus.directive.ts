/**
@author : Anjali Tandel
@class : AutoFocusDirective
@description :AutoFocusDirective is created add dynamic focus on input type.
**/
import { Directive, ElementRef, Input, Component } from '@angular/core';
// https://stackoverflow.com/questions/41873893/angular2-autofocus-input-element
// [autofocus] //will focus
// [autofocus]="true" //will focus
// [autofocus]="false" //will not focus
@Directive({
  selector: '[autofocus]'
})
export class AutoFocusDirective {
  /** Created private variable having boolean value which is using in set focus on input */
  //private focus = true;
  // constructor(private elementRef: ElementRef) { }

  // /** autofocus is used as attribute in HTML which have true/false value */
  // @Input() set autofocus(condition: boolean) {
  //   // this.focus = condition !== false;
  //   // if (this.focus) {
  //   //   this.elementRef.nativeElement.focus();
  //   // }
  //   if (condition) {
  //     this.elementRef.nativeElement.focus();
  //   }
  // }

  @Input() autofocus: boolean;
  constructor(private elementRef: ElementRef) { }

  ngOnChanges(): void {
    if (this.autofocus) {
      this.elementRef.nativeElement.focus();
    }
  }
}
// https://codecraft.tv/courses/angular/unit-testing/jasmine-and-karma/
