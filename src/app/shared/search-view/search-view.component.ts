/**
 * description :SearchViewComponent is sharable component which is created for implement search functionality.
 * @author : Anjali Tandel
 * @class : SearchViewComponent
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchPipePipe } from '../pipes/search-pipe.pipe';

@Component({
  selector: 'trigger-search-view',
  templateUrl: './search-view.component.html'
})
export class SearchViewComponent implements OnInit {
  /** filteredClients created for display client list in html */
  public _searchText: string;
  /** getting placeholder value from parent component */
  @Input() placeHolder: string;
  /** searchFields are fields which are getting from parent component which we used in search functionality */
  @Input() searchFields: any;
  /** list variable used to get all list from parent component and used in search functionality */
  @Input() list: any;
  /** EventEmitter is created for bind serached records and emit event in parent component */
  @Output() bindRecords: EventEmitter<string> = new EventEmitter();

  constructor(private searchPipePipe: SearchPipePipe) { }

  ngOnInit(): void { }

  /** created get method for return search variables */
  get searchText() {
    return this._searchText;
  }

  /** created set method for return search variables */
  set searchText(search: string) {
    this._searchText = search;
    this.bindRecords.emit(this.searchText ? this.searchPipePipe.transform(this.list, this.searchText, this.searchFields) : this.list);
  }
}
