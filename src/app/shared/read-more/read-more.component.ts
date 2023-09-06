import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'trigger-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss']
})
export class ReadMoreComponent implements OnInit {
  @Input() text: string;
  @Input() maxLength: number;
  
  public currentText: string;
  public hideToggle: boolean;
  public isCollapsed: boolean;

  constructor(
  ) {
    this.maxLength = 100;
    this.hideToggle = true;
    this.isCollapsed = true;
  }
  ngOnInit() {
  }

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  determineView() {
    if (!this.text || this.text.length <= this.maxLength) {
      this.currentText = this.text;
      this.isCollapsed = false;
      this.hideToggle = true;
      return;
    }
    this.hideToggle = false;
    this.setText();
  }

  setText() {
    if (this.isCollapsed) {
      this.currentText = this.text.substring(0, this.maxLength) + "...";
    } else {
      this.currentText = this.text;
    }
  }

  ngOnChanges() {
    this.determineView();
  }

}
