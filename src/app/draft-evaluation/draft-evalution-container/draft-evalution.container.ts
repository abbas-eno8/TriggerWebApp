/**
 * @author Shahbaz Shaikh
 * @description This is draft evaluation contanier file for server call
 */
import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// --------------------------------------------------- //
import { DraftEvaulationService } from '../service/draft-evaulation.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { UserModel } from '../../core/model/user';
import { ActionType, ApiResponse, SendMail, Success_Title, Success_Type } from '../../core/magic-string/common.model';
import { CommonService } from '../../core/services/common/common.service';
import { LoaderService } from '../../core/loader/loader.service';
import { EvaluationSavedAndMailNotSent, EvaluationSavedAndMailSent } from '../../shared/modals/shared-model';

@Component({
  selector: 'trigger-draft-evalution-container',
  templateUrl: './draft-evalution.container.html'
})
export class DraftEvalutionContainerComponent implements OnInit {

  /** Store the Evaluation Draft List */
  public evaulationDraftList: any;
  /** Store the Delete Evaluation List */
  public deleteEvaluation: any;
  /** Store the Email Preview Object */
  public emailPreview: any;
  /** Store the Score Card Details Object */
  public scoreCardDetails: any;

  /** Store the User Model */
  private user: UserModel;
  /** Store Send Email Object */
  private sendMailObject: SendMail;
  /** Store Mail send or not */
  private isSendMail: boolean;
  /** create for destroy  */
  private destroy: Subject<boolean>;

  constructor(
    private draftEvaulationService: DraftEvaulationService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private commonService: CommonService
  ) {
    this.destroy = new Subject();
    this.user = this.globalResponseHandlerService.getUser();
  }

  ngOnInit() {
    this.getEvaulationDraftList();
  }

  /**
   * Get the Evaluation draft list from server
   */
  private getEvaulationDraftList(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.draftEvaulationService.getDraftEvaulationList(this.user.userId).pipe(takeUntil(this.destroy)).subscribe((response: ApiResponse) => {
      if (this.globalResponseHandlerService.getApiResponse(response)) {
        this.evaulationDraftList = response.data;
      } else {
        this.evaulationDraftList = [];
        this.loaderService.emitIsLoaderShown(false);
      }
    });
  }

  /**
   *  Author : Shahbaz Shaikh
   * Created-Date : 17-03-2022
   * @param response 
   */
  public onDeleteEvaluation(response): void {
    this.loaderService.emitIsLoaderShown(true);
    this.draftEvaulationService.deleteComment(response).pipe(takeUntil(this.destroy)).subscribe((response: ApiResponse) => {
      if (this.globalResponseHandlerService.getApiResponse(response, true, true)) {
        this.deleteEvaluation = response.data;
      }
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 17-03-2022
   * Description : Get email preview
   * @param evaluation Get the evaluation
   */
  public getEmailPreview(evaluation): void {
    this.loaderService.emitIsLoaderShown(true)
    this.draftEvaulationService.getEmailPreview(evaluation.assessmentId, evaluation.empId).pipe(takeUntil(this.destroy)).subscribe((response) => {
      if (this.globalResponseHandlerService.getApiResponse(response)) {
        this.sendMailObject = new SendMail(response.data[0].assessmentId, ActionType.TriggerAnEmployee, response.data[0].employeeEmail, response.data[0].emailContent);
        this.emailPreview = response.data[0];
      }
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Description : Publish new evaluation
   * @param evaluation Get the evaluation
   */
  public onPublishEvaluation(evaluation): void {
    this.loaderService.emitIsLoaderShown(true);
    this.isSendMail = evaluation.isSendMail;
    this.draftEvaulationService.publishAssessment(evaluation.formValue).pipe(takeUntil(this.destroy)).subscribe((response) => {
      if (this.globalResponseHandlerService.getApiResponse(response, true, true)) {
        this.scoreCardDetails = response.data[0];
        if (this.isSendMail) {
          // this.sendEmailAssessment();
          this.toasterService.pop(Success_Type, Success_Title, EvaluationSavedAndMailSent);
        } else {
          this.toasterService.pop(Success_Type, Success_Title, EvaluationSavedAndMailNotSent);
        }
      }
    });
  }

  /**
  * Author : Shahbaz Shaikh
  * Created-Date : 17-03-2022
  * Descripation : Send email to user
  */
  private sendEmailAssessment(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.commonService.sendMail(this.sendMailObject).pipe(takeUntil(this.destroy)).subscribe(
      (sendMail) => {
        if (this.globalResponseHandlerService.getApiResponse(sendMail, true)) {
          this.loaderService.emitIsLoaderShown(false);
        }
      });
  }

  /** destroy */
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
