/**
@author : Anjali Tandel
@class : SortByFieldService
@description : SortByFieldService common service for sort list based on field.
**/
import { Injectable } from '@angular/core';
import { LangaugeType } from '../../../core/magic-string/common.model';
import { Sort, SortDirection, DirectionIcon } from './sort';

@Injectable()
export class SortByFieldService {
  constructor() { }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 04-09-2019
   * Description : Sort list based on paasing parameter & return model.
   */
  public sort(model: Sort<any>): Sort<any> {
    if (model.property === model.sortedPropety) {
      if (model.direction === SortDirection.Ascending) {
        model.direction = SortDirection.Decending
      } else {
        model.direction = SortDirection.Ascending
      }
    } else {
      model.direction = SortDirection.Ascending
    }
    model.list = model.list.sort(
      (a, b) => (model.direction === SortDirection.Ascending)
        ? this._sortAlphanumeric(a[model.sortedPropety] + '', b[model.sortedPropety] + '')
        : this._sortAlphanumeric(b[model.sortedPropety] + '', a[model.sortedPropety] + '')
    );
    model.property = model.sortedPropety;
    return model;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 04-09-2019
   * Description : Set sort-direction class based on sorting.
   */
  public getDirecionIcon(property: string, model: Sort<any>): string {
    if (model.sortedPropety === property) {
      if (model.direction === SortDirection.Ascending) {
        return DirectionIcon.up;
      } else {
        return DirectionIcon.down;
      }
    } else {
      return DirectionIcon.updown;
    }
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 04-09-2019
   * Description : Function for sorting.
   */
  public _sortAlphanumeric(a: string, b: string): number {
    return a.localeCompare(b, LangaugeType.English, { numeric: true });
  }

  public sortByField(list, field) {
    return list.sort(
      (a, b) => (SortDirection.Ascending)
        ? this._sortAlphanumeric(a[field] + '', b[field] + '')
        : this._sortAlphanumeric(b[field] + '', a[field] + '')
    );
  }

  public sortByFieldDecending(list, field: string) {
    return list.sort((a, b) =>
      (a[field] > b[field] ? -1 : 1));
  }
}
