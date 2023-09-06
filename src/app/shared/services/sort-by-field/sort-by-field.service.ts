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

  /** String Date column */
  public dateColumn = ['lastEvaluationDate', 'lastSparkDate'];

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

    let isDateColumn = this.checkColumnName(this.dateColumn, model.sortedPropety);
    if (isDateColumn) {
      model.list = model.list.sort(
        (a, b) =>
          this.sortByDate(a[model.sortedPropety], b[model.sortedPropety], model.direction));
    } else {
      model.list = model.list.sort(
        (a, b) => (model.direction === SortDirection.Ascending)
          ? this._sortAlphanumeric(a[model.sortedPropety] + '', b[model.sortedPropety] + '')
          : this._sortAlphanumeric(b[model.sortedPropety] + '', a[model.sortedPropety] + ''));
    }
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

  public sortByField(list, field: string) {
    return list.sort(
      (a, b) => (SortDirection.Ascending)
        ? this._sortAlphanumeric(a[field], b[field])
        : this._sortAlphanumeric(b[field], a[field])
    );
  }

  public sortByFieldDecending(list, field: string) {
    return list.sort((a, b) =>
      (a[field] > b[field] ? -1 : 1));
  }

  /**
   * Author: Shahbaz Shaikh
   * Date: 24-02-2022
   * This method used for get date and if date is string so it's convert into date object 
   * And sort the date assending and Decending
   * @param firstDateEle get first date
   * @param secondDateEle get second date
   * @param sortDirection Get Assending and Decending enum
   * @returns 
   */
  private sortByDate(firstDateEle: any, secondDateEle: any, sortDirection: SortDirection): number {
    const multiplier: number = sortDirection === SortDirection.Ascending ? 1 : -1;

    if (firstDateEle === '') {
      return multiplier * -1;
    }
    if (secondDateEle === '') {
      return multiplier * 1;
    }
    
    firstDateEle = typeof firstDateEle === "string" ? new Date(firstDateEle) : firstDateEle;
    secondDateEle = typeof secondDateEle === "string" ? new Date(secondDateEle) : secondDateEle;
    let compare = firstDateEle.getTime() === secondDateEle.getTime();
    if (!compare) {
      return (firstDateEle < secondDateEle ? -1 : 1) * multiplier;
    }
    else {
      return 0;
    }
  }

  private checkColumnName(columnArray, columnName) {
    return columnArray.some((item) => {
      return columnName === item;
    });
  }
}
