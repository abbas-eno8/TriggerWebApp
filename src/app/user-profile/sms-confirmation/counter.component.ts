
import {map,  take } from 'rxjs/operators';
/**
@author : Anjali Tandel
@class : CounterComponent
@description :CounterComponent is created for countdown timer which we are using in sms-confirmtaion page.
**/
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription ,  interval } from 'rxjs';

import { CounterStateCompleted, CounterStateAborted } from './sms-confirmation-model';

@Component({
    selector: 'counter',
    template: `<div class="counter-parent">
        <span>{{currentValue}}</span>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
    @Input() startAt = 1;
    @Input() showTimeRemaining = true;
    @Output() counterState = new EventEmitter();
    public currentValue : string;
    private currentSubscription: Subscription;

    constructor(private changeDetector: ChangeDetectorRef) { }

    /**
     * Author : Anjali Tandel
     * Modified-Date :  24-05-2019
     * Description : Create function for start Countdown timer.
     */
    public start(): void {
        this.currentValue = this.formatValue(this.startAt);
        this.changeDetector.detectChanges();

        const t: Observable<number> = interval(1000);
        this.currentSubscription = t.pipe(take(this.startAt)).pipe(map(v => this.startAt - (v + 1))).subscribe(v => {
            this.currentValue = this.formatValue(v);
            this.changeDetector.detectChanges();
        }, err => {
            this.counterState.error(err);
        }, () => {
            this.currentSubscription.unsubscribe();
            this.currentValue = '00:00';
            this.counterState.emit(CounterStateCompleted);
            this.changeDetector.detectChanges();
        });
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date :  24-05-2019
     * Description : Create function for set format of Minutes and Seconds which we are displaying.
     */
    private formatValue(value: number): string {
        const minutes = Math.floor(value / 60);
        const formattedMinutes = '' + (minutes > 9 ? minutes : '0' + minutes);
        const seconds = value % 60;
        const formattedSeconds = '' + (seconds > 9 ? seconds : '0' + seconds);

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    /**
     * Author : Anjali Tandel
     * Modified-Date :  24-05-2019
     * Description : Create function for stop Countdown timer.
     */
    public stop(): void {
        this.currentSubscription.unsubscribe();
        this.counterState.emit(CounterStateAborted);
    }
}
