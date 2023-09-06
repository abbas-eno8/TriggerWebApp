/**
@author : Anjali Tandel
@class : SearchPipe
@description :SearchPipe is implemented for search functionality.
**/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {
  transform(list: any[], searchText?: string, fieldsArray?: any[]): any[] {

    //IF NO LIST DATA
    if (!list || !list.length) return [];

    //IF NO SEARCHDATA
    if (!searchText) return list;

    //CONVERT TO LOWER CASE
    searchText = searchText.toLowerCase();

    // Assuming entire array has same keys in its objects, get an array of keys.
    const keys = fieldsArray;
    if (keys.length <= 0) {
      return list;
    }
    // Logic to go through all the objects and find the objects whose value matches uppercased filter.
    list = (list.filter((v) => v && keys.some(
      (k) => v[k] === undefined || v[k] === null ? false : v[k].toString().toLowerCase().indexOf(searchText) >= 0))
    );
    return list;
  }

}
