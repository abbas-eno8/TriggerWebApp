/**
@author : Mihir Patel
@class : FeedbackConfirmationComponent
@description :FeedbackConfirmationComponent is created for overlay modal popup for confirmation fedback of curent score
**/
import { Component, OnInit, Output, EventEmitter, ComponentRef, Input, ViewChild, ElementRef } from '@angular/core';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { ComponentPortal } from '@angular/cdk/portal';
import { SelectScoreComponent } from '../select-score/select-score.component';
import { AssessmentService } from '../assessment.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { TriggerGrade, TriggerScore, TriggerScoreList, AssessmentScore } from '../assessment-model';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-feedback-confirmation',
  templateUrl: './feedback-confirmation.component.html',
  styleUrls: ['./feedback-confirmation.component.scss']
})
export class FeedbackConfirmationComponent implements OnInit {
  //  currentGrade input property define to show current trigger score.
  @Input() trggerScoreDetail: TriggerScore;

  // overlayRef is defined for overlay modal popup.
  private overlayRef: OverlayRef;

  // componentOverlayRef is defined defined and used when create dynamic component.
  private componentOverlayRef: ComponentRef<any>;

  // Output submit emitter for update value overlay popup
  @Output() submit: EventEmitter<boolean>;

  // Output submit emitter for update value overlay popup
  @Output() closeSelectScoreModal: EventEmitter<boolean>;

  // triggerGradeList defined for bind grade list
  public triggerGradeList: TriggerGrade[];

  @ViewChild('positiveButton', {static: false}) public positiveButton: ElementRef;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(public overlay: Overlay,
    private focusTrapFactory: FocusTrapFactory,
    private assessmentService: AssessmentService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private globalEventsManager: GlobalEventsManager) {
    this.submit = new EventEmitter();
    this.closeSelectScoreModal = new EventEmitter();
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.themeEmitter.unsubscribe();
  }
  
  /**
   * Author : Mihir Patel
   * Created-Date : 18-10-2019
   * Description : Create method for submit with current score
   */
  submitScore() {
    let feedbackObj: AssessmentScore = {
      AssessmentId: this.globalResponseHandlerService.getCurrentTriggerScore().assessmentId,
      ScoreFeedback: true,
      ExpectedScoreId: 0,
      FeedbackRemark: ''
    }
    this.assessmentService.submitFeedback(feedbackObj).subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false)) {
          this.submit.emit(true);
        }
      });
  }
  /**
  * Author : Mihir Patel
  * Created-Date : 16-10-2019
  * Description : Create method and call on click no button from modal popup
  */
  rejectScore() {
    this.checkTiggerGradeList()
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 16-10-2019
  * Description : Create method for check trigger grade list is store previously in session or not, if not then call api to get data.
  */
  checkTiggerGradeList() {
    if (!!sessionStorage.getItem(TriggerScoreList)) {
      this.triggerGradeList = JSON.parse(sessionStorage.getItem(TriggerScoreList));
      this.opnSelectScoreModalPopup()
    } else {
      this.getTriggerScore();
    }
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 14-10-2019
   * Description : Create method for get list of all grades
   */
  getTriggerScore(): void {
    this.globalResponseHandlerService.displayLoader(true);
    this.assessmentService.getTriggerScore().subscribe(
      (response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, false)) {
          let scoreList: TriggerGrade[];
          scoreList = response.data.map((score) => ({
            scoreId: score.scoreId,
            scoreRank: score.scoreRank
          }));
          sessionStorage.setItem(TriggerScoreList, JSON.stringify(scoreList));
          this.triggerGradeList = scoreList;
          this.opnSelectScoreModalPopup();
        }
      });
  }

  /**
    * Author : Mihir Patel
    * Created-Date : 14-10-2019
    * Description : Create method for open modal popup for select new score for last assessment
    */
  public opnSelectScoreModalPopup(): void {
    let modalBackground = this.isDarkTheme ? 'modal-background-with-dialog-container' : 'modal-white-background-with-dialog-container';
    let config = new OverlayConfig({
      panelClass: modalBackground,
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    this.overlayRef = this.overlay.create(config);
    this.componentOverlayRef = this.overlayRef.attach(new ComponentPortal(SelectScoreComponent));
    this.componentOverlayRef.instance.scoreList = this.triggerGradeList;
    this.focusTrapFactory.create(this.overlayRef.overlayElement);
    this.componentOverlayRef.instance.cancel.subscribe(status => {
      this.overlayRef.dispose();
      this.closeSelectScoreModal.emit(true)
    });
    this.componentOverlayRef.instance.submit.subscribe(status => {
      this.overlayRef.dispose();
      this.submit.emit(true)
    });
  }
}
