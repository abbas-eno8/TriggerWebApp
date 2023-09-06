/**
@author : Anjali Tandel
@class : Model
@description : Sort model is created for create enum for sort-direction, icon & model.
**/
/**
 * Author : Anjali Tandel
 * Modified-Date : 04-09-2019
 * Description : Created Enum for Direction-icon.
 */
export enum DirectionIcon {
    up = 'icon-sorting-up',
    down = 'icon-sorting-down',
    updown = 'icon-sorting-updown'
  }
  
  /**
   * Author : Anjali Tandel
   * Modified-Date : 04-09-2019
   * Description : Created Enum for Sort-direction.
   */
  export enum SortDirection {
    Ascending = 1,
    Decending = 2
  }
  
  /**
   * Author : Anjali Tandel
   * Modified-Date : 04-09-2019
   * Description : Created Model for transfer & return data.
   */
  export class Sort<T> {
    constructor(
      public direction: number = 0,
      public property: string = '',
      public sortedPropety: string = '',
      public list: T,
    ) {
      this.direction = SortDirection.Ascending,
        this.property = '',
        this.sortedPropety = '',
        this.list = list
    }
  }
  