import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeConverterService {

  constructor() { }

  /**
  * Author : Mihir Patel
  * Create-Date : 18-09-2019
  * Description : Method which takes parameter as UTC date and convert and return in Local Date
  */
  public getLocalDateTimeFromUtcDateTime(date: Date): Date {
    var newDate = new Date(date); // val is in UTC
    var localOffset = newDate.getTimezoneOffset() * 60000;
    var localTime = newDate.getTime() - localOffset;
    newDate.setTime(localTime);
    return newDate;
  }

  /**
  * Author : Mihir Patel
  * Create-Date : 18-09-2019
  * Description : Method which return UTC date time
  */
  public getUtcDateTime(): string {
    let now = new Date();
    let UtcDate = new Date(now).toISOString();
    return UtcDate;
  }
}
