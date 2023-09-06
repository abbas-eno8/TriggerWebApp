/**
@author : Mihir Patel
@class : FocusInitDirective
@description :FocusInitDirective is created add dynamic focus on input type for cdk overlay.
**/
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[triggerFocusInit]'
})
export class FocusInitDirective {

  @Input() autofocus: boolean;
  constructor(private elementRef: ElementRef) { }

  public ngAfterContentInit() {

    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 300);

  }
}
