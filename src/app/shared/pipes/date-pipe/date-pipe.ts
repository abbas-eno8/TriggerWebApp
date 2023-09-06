/**
@author : Anjali Tandel
@class : DatexPipe
@description :DatexPipe is created for date format.
**/

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { CompareString } from '../../../core/magic-string/common.model';
import { isUndefined } from 'underscore';

@Pipe({
    name: 'datex'
})

export class DatexPipe implements PipeTransform {
    transform(value: any, format: string = ""): string {
        if (isUndefined(value))
            return null
        else {
            /* MM-DD-YYYY, MM-DD-YY, M-D-YYYY, M-D-YY, MM-D-YYYY, M-DD-YYYY, MM-D-YY, M-DD-YY*/
            var momentDate = '';
            if (moment(value, CompareString.Valid_Date_Format, true).isValid() || moment(value, 'MM/DD/YYYY', true).isValid()) {
                momentDate = moment(value, CompareString.Valid_Date_Format).format(CompareString.Valid_Date_Format);
            } else if (moment(value, 'MM-DD-YY', true).isValid() || moment(value, 'MM/DD/YY', true).isValid()) {
                momentDate = moment(value, 'MM-DD-YY').format(CompareString.Valid_Date_Format);
            } else if (moment(value, 'M-D-YYYY', true).isValid() || moment(value, 'M/D/YYYY', true).isValid()) {
                momentDate = moment(value, 'M-D-YYYY').format(CompareString.Valid_Date_Format);
            } else if (moment(value, 'M-D-YY', true).isValid() || moment(value, 'M/D/YY', true).isValid()) {
                momentDate = moment(value, 'M-D-YY').format(CompareString.Valid_Date_Format);
            } else if (moment(value, 'MM-D-YYYY', true).isValid() || moment(value, 'MM/D/YYYY', true).isValid()) {
                momentDate = moment(value, 'MM-D-YYYY').format(CompareString.Valid_Date_Format);
            } else if (moment(value, 'M-DD-YYYY', true).isValid() || moment(value, 'M/DD/YYYY', true).isValid()) {
                momentDate = moment(value, 'M-DD-YYYY').format(CompareString.Valid_Date_Format);
            } else if (moment(value, 'M-DD-YY', true).isValid() || moment(value, 'M/DD/YY', true).isValid()) {
                momentDate = moment(value, 'M-DD-YY').format(CompareString.Valid_Date_Format);
            } else if (moment(value, 'MM-D-YY', true).isValid() || moment(value, 'M/D/YY', true).isValid()) {
                momentDate = moment(value, 'MM-D-YY').format(CompareString.Valid_Date_Format);
            } else {
                momentDate = CompareString.Invalid_Date;
            }
            return momentDate;
        }

    }
}
