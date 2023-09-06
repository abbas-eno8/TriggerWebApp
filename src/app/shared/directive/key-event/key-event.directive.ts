/**
@author : Anjali Tandel
@class : KeyEventDirective
@description : KeyEventDirective created for check validation for ignore first blank space on keydown and paste event based on passing pattern.
**/
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { IgnoreSpaceInitial } from '../../../contact-us/contact-us-model';

@Directive({
  selector: '[triggerKeyEvent]'
})
export class KeyEventDirective {
  @Input() pattern: any;
  constructor(elementRef: ElementRef) {//elementRef.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('keydown', ['$event']) ignoreFirstSpaceOnKey(event) {
    if (event.keyCode === 32 && event.target.selectionStart === 0 && event.keyCode !== 9) {
      event.preventDefault();
    }
    if (this.pattern && event.keyCode !== 8 && event.keyCode !== 9) {
      let inputChar = event.target.value + event.key;
      if (!this.pattern.test(inputChar) && event.keyCode !== 13
        && event.keyCode !== 35
        && event.keyCode !== 36
        && event.keyCode !== 37
        && event.keyCode !== 39) {
        event.preventDefault();
      }
    }
    if ((event.target.value).endsWith(' ') && event.keyCode === 32
      && event.keyCode !== 35
      && event.keyCode !== 36
      && event.keyCode !== 37
      && event.keyCode !== 39) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) ignoreFirstSpaceOnPaste(event) {
    let content = event.clipboardData.getData('text/plain');
    if (!IgnoreSpaceInitial.test(content)) {
      event.preventDefault();
    }
    if (this.pattern && event.keyCode !== 8 && event.keyCode !== 9) {
      let keyValue: string = event.clipboardData.getData('Text');
      if (!this.pattern.test(keyValue)) {
        event.preventDefault();
      }
    }
  }
}
