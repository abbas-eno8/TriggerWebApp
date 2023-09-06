import { moment } from "ngx-bootstrap/chronos/test/chain";
import { CompareString } from "../../../core/magic-string/common.model";
import { DatexPipe } from "./date-pipe";

describe('DatexPipe', () => {
    let datePipe: DatexPipe;
    //let fixture: PipeTransform<DatexPipe>;

    let pipe = new DatexPipe();
    let value = '02/02/2012';
    let dateFormat = '02/02/2012';
    let InvalidValue = '';

    it('should be create DatexPipe', () => {
        expect(DatexPipe).toBeTruthy();
    });


    // it('return true if date format is MM-DD-YYYY & MM/DD/YYYY', () => {
    //     expect(moment(value, CompareString.Valid_Date_Format, false).isValid()).toBeTruthy();
    //     expect(moment(value, 'MM/DD/YYYY', false).isValid()).toBeTruthy();
    // })

    // it('return false if date format is not MM-DD-YYYY & MM/DD/YYYY', () => {
    //     expect(moment(InvalidValue, CompareString.Valid_Date_Format, true).isValid()).toBeFalsy();
    //     expect(moment(InvalidValue, 'MM/DD/YYYY', true).isValid()).toBeFalsy();
    // })

    // it('return true if date format is MM-DD-YY & MM/DD/YY', () => {
    //     expect(moment('12-12-12', 'MM-DD-YY', false).isValid()).toBeTruthy();
    //     expect(moment('12/12/12', 'MM/DD/YY', false).isValid()).toBeTruthy();
    // })

    // it('return false if date format is not MM-DD-YY & MM/DD/YY', () => {
    //     expect(moment('12-12-2012', 'MM-DD-YY', true).isValid()).toBeFalsy();
    //     expect(moment('12/12/2012', 'MM/DD/YY', true).isValid()).toBeFalsy();
    // })
})