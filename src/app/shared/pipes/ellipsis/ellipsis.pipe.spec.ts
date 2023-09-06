import { EllipsisPipe } from "./ellipsis.pipe";
import { moment } from "ngx-bootstrap/chronos/test/chain";

describe('EllipsisPipe', () => {
    let val: string = '111112222233333444445555566666';
    let value: string = 'Returned value';
    let length: number = 25;
    let result: string = '1111122222333334444455555...';
    const privateTrailingVar: string = 'trailing';
    // We use a “describe” to start our test block with the title matching the tested component name
    describe('Pipe: EllipsisPipe', () => {
        let pipe: EllipsisPipe;

        // initialization code is moved into a beforeEach function.
        beforeEach(() => {
            pipe = new EllipsisPipe();
        });
        // The purpose of the async is to let all the possible asynchronous code to finish before continuing.
        it('should be create transform()', () => {
            expect(pipe).toBeTruthy();
        });

        it('should matches parameter value', () => {
            expect(length).toEqual(jasmine.any(Number));
            expect(value).toEqual(jasmine.any(String));
            expect(val).toEqual(jasmine.any(String));
            expect(result).toEqual(jasmine.any(String));
        });

        it('should check transform() with parameters value', () => {
            expect(val).toBeTruthy();
            expect(length).toBeTruthy();
            expect(privateTrailingVar).toBeTruthy();

            expect(val).not.toBeFalsy();
            expect(length).not.toBeFalsy();
            expect(privateTrailingVar).not.toBeFalsy();

            expect(pipe['trailing']).not.toBeFalsy();
            expect(pipe['trailing']).toBeTruthy();
        });

        it('check if length of value is greater than getting length', () => {
            expect(val.length).toBeGreaterThan(length);
            expect(pipe.transform(val, length)).toBe(result);
            expect(val.substring(0, length) + pipe['trailing']).toBe(result);
        });

        it('check if length of value is less than default length', () => {
            expect(value.length).toBeLessThan(length);
            expect(pipe.transform(value, length)).toBe(value);
        });

        // it('should be create method', () => {
        //     expect(pipe['function']).toBeTruthy();
        // });

        // it('should be check method method work properly', () => {
        //     let spy =  spyOn<any>(pipe, 'function').and.callThrough();
        //     expect(pipe['function']()).toHaveBeenCalled();
        // });
    });
})
// myClass['privateProp'] or for methods: myClass['privateMethod']()
