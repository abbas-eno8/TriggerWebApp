import { Directive, Component, Input } from '@angular/core';

// @Directive({
//   selector: '[triggerReadMore]'
// })
@Component({
  selector: 'read-more',
  template: `
    <span class="text-comment" [innerHTML]="currentText"></span>
    <a class="d-flex justify-content-end font-semibold cursor-pointer text-secondary text-decoration mt-auto" [class.hidden]="hideToggle" (click)="toggleView()">Read {{isCollapsed? 'more':'less'}}</a>
  `
})

export class ReadMoreDirective {
  @Input() text: string;
  @Input() maxLength: number;
  currentText: string;
  hideToggle: boolean;
  public isCollapsed: boolean;
  constructor() {
    this.maxLength = 100;
    this.hideToggle = true;
    this.isCollapsed = true;
  }

  ngOnChanges() {
    this.determineView();
  }

  public toggleView(): void {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  public determineView(): void {
    this.text = this.text + '';
    if (!this.text || this.text.length <= this.maxLength) {
      this.currentText = this.text;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    this.setText();
  }

  private setText(): void {
    if (this.isCollapsed) {
      this.currentText = this.text.substring(0, this.maxLength) + "...";
    } else {
      this.currentText = this.text;
    }
  }
}
