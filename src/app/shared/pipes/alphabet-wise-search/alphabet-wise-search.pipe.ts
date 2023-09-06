import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabetWiseSearch'
})
export class AlphabetWiseSearchPipe implements PipeTransform {

  transform(record: any[], searchText: any): any {
    if (!record) return [];
    if (searchText === 'All') return record;
    //CONVERT TO LOWER CASE
    searchText = searchText.toLowerCase();
    //IF NO SEARCHDATA
    if (!searchText) return record;

    record = record.filter((e) => searchText.toLowerCase() === e.firstName
      .charAt(0).toLowerCase());
    return record;
  }

}
