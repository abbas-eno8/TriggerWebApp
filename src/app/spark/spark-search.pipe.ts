import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sparkSearch'
})
export class SparkSearchPipe implements PipeTransform {

  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.firstName.toLocaleLowerCase().includes(searchText)
      // return it.firstName.toLocaleLowerCase() === searchText;
      // return it.firstName.charAt(0).toLocaleLowerCase() === searchText;
    });
  }

}
