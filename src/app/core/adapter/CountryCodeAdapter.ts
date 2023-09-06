
import { Injectable } from '@angular/core';
import { CountryCode } from '../model/user';
import { CommonService } from '../services/common/common.service';
import { Adapter } from './adpater';

@Injectable()
export class CountryCdeAdapter implements Adapter<any> {
    /** return response */
    // constructor(
    //     private commonService: CommonService,
    // ) {

    // }
    public toResponse(items: any): CountryCode {
        let newarray: any = []
        items.forEach((item: any, i: number) => {
            let countryCode: string = '';
            if (Object.keys(item.idd).length !== 0) {
                if (item.idd.suffixes.length && item.idd.suffixes.length === 1) {
                    countryCode = `${item.idd.root}${item.idd.suffixes[0]}`;
                } else {
                    countryCode = `${item.idd.root}`;
                }
                const countryObj: CountryCode = new CountryCode(item.name.common, countryCode, item.flags.svg);
                let o = Object.assign({}, item);
                o.countryObj = countryObj;
                newarray.push(o);
            }
            else {
                delete items[i];
            }
        });

        return newarray.sort((a, b) => a.countryObj.countryCode - b.countryObj.countryCode)
    }

}
