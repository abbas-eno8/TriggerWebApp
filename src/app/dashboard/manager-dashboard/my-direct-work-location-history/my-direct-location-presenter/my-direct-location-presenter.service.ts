import { Injectable } from '@angular/core';
import { WorkLocationHistory } from '../my-direct-location-model';

@Injectable({
  providedIn: 'root'
})
export class MyDirectLocationPresenter {

  constructor() { }

  public bindTodayLocation(data: any): WorkLocationHistory[] {
    let locations: WorkLocationHistory[];
    locations = data.map((t, index) => (
      this.bindSpark(t)
    ));
    return locations;
  }

  private bindSpark(data: any): WorkLocationHistory {
    const location: WorkLocationHistory = new WorkLocationHistory(
      data.empid,
      data.workLocation,
      data.firstName,
      data.lastName,
      data.workLocation ? this.getDate(data.workDate) : '',
      data.empImgPath,
    );
    return location;
  }

  private getDate(date): string {
    let hours = new Date().getHours() - new Date(date).getHours();
    let minutes = new Date().getMinutes() - new Date(date).getMinutes();
    let dateString: string;
    if (hours > 0) {
      if (minutes > 0) {
        if (hours > 1 && minutes === 1) {
          dateString = (hours + ' hrs ' + minutes + ' min ago');
        } else if (hours === 1 && minutes > 1) {
          dateString = (hours + ' hr ' + minutes + ' mins ago');
        } else {
          dateString = (hours + ' hrs ' + minutes + ' mins ago');
        }
      } else {
        dateString = hours > 1 ? hours + ' hours ago' : hours + ' hour ago';
      }
    } else {
      dateString = minutes > 1 ? minutes + ' minutes ago' : minutes + ' minute ago';
    }
    return dateString;
  }
}
