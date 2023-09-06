/**
@author : Mihir Patel
@class : PageNotFoundComponent
@description :PageNotFoundComponent is created to show page when route not found.
**/
import { Component, OnInit } from '@angular/core';
// ----------------------------------------------- //

@Component({
  selector: 'trigger-page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {
  constructor() { }
  
  ngOnInit() {
  }
}
