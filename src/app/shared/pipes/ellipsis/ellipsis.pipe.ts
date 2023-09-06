/**
@author : Anjali Tandel
@class : EllipsisPipe
@description : EllipsisPipe is created for .
**/
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
// An interface that is implemented by pipes in order to perform a transformation.
// Angular invokes the transform method with the value of a binding as the first argument, 
// and any parameters as the second argument in list form.
export class EllipsisPipe implements PipeTransform {
  private trailing: string = '...';
  transform(value: string, len: number = 25): string {
    if (value && value.length > len) {
      return value.substring(0, len) + this.trailing;
    } else {
      return value;
    }
  }
}
