import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'trigger-child-header-view',
  templateUrl: './child-header-view.component.html'
})
export class ChildHeaderViewComponent implements OnInit {
  /** pageTitle is getting from parent component */
  @Input() pageTitle: string;

  constructor() { }
  
  ngOnInit() { }
}
