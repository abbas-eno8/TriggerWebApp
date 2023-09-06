/**
 * @Author : Shahbaz Shaikh
 * @description This is Spark Container Component
 */
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
// --------------------------------------------------- //
import { LoaderService } from '../../core/loader/loader.service';
import { UserModel } from '../../core/model/user';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { SparkService } from '../service/spark.service';
import { BaseResponse, SendMailObject, SparkAnEmployee } from '../spark.model';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-spark-container',
  templateUrl: './spark-container.component.html'
})
export class SparkContainerComponent implements OnInit {
  /** Store the logged in user data */
  public userData: UserModel;
  /** Store the spark details */
  public emailContent: string;
  /** Store the team-members, category, classification list */
  public baseResponse$: Observable<BaseResponse>
  public allTeamMemberList$: Observable<any>
  public teamMember$: Observable<any>;
  /** GroupSparkFilterData */
  public sparkFilterData: any;

  /**Private Property */
  /** Store unsubscribe property */
  private destroy: Subject<void>;
  /** Store the mail object */
  private sendMailObject: SendMailObject;

  constructor(
    private sparkService: SparkService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private globalEventsManager: GlobalEventsManager
  ) {
    this.destroy = new Subject();
    this.userData = this.globalResponseHandlerService.getUser();
  }

  ngOnInit() {
    this.baseResponse();
    this.getGroupSparkFilterData();
    this.getAllTeamMemberList();
  }

  /**
   * Author: Shahbaz Shaikh
   * Description : Get the team-members, category, classification list 
   */
  public baseResponse(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.baseResponse$ = forkJoin([
      // this.sparkService.getTeamMember(this.userData.clientId, this.userData.empId, dimensionId, dimensionValues),
      this.sparkService.getCategories(this.userData.clientId),
      this.sparkService.getClassifications(this.userData.clientId)
    ]).pipe(map((response: object) => {
      this.loaderService.emitIsLoaderShown(false);
      return {
        // teamMember: response[0],
        categories: response[0],
        classifications: response[1]
      };
    }));
  }

  /**
   * Author: Shahbaz Shaikh
   * Description :Save the spark details
   * @param sparkObj Get the spark deatils object
   */
  public saveSpark(sparkObj: SparkAnEmployee): void {
    sparkObj.sparkBy = this.userData.userId;
    sparkObj.createdBy = this.userData.userId;
    this.sparkService.saveSpark(sparkObj).pipe(takeUntil(this.destroy)).subscribe((sparkAnEmployee) => {
      if (this.globalResponseHandlerService.getApiResponse(sparkAnEmployee, !sparkObj.sendSpark, false)) {
        if (sparkObj.sendSpark) {
          this.sendMailObject = {
            employeeSparkDetails: sparkAnEmployee.data.employeeSparkDetails,
            emailContent: sparkAnEmployee.data.emailContent
          };
        } else {
          this.loaderService.emitIsLoaderShown(false);
        }
        this.emailContent = sparkAnEmployee.data.emailContent;
      } else {
        this.loaderService.emitIsLoaderShown(false);
      }
    });
  }

  /**
   * Author : Shahbaz Shaikh
   * Created-Date : 24-01-2020
   * Description : This Method is invoke when user hit send button from sen-mail-confirmation modal-popup from server.
   * @param sendMail Get the value of mail send or not
   */
  public sendMail(sendMail: boolean): void {
    this.sparkService.sendEmail(this.sendMailObject).subscribe(
      (sendMail) => {
        if (this.globalResponseHandlerService.getApiResponse(sendMail, true, false)) {
          this.globalEventsManager.closeModal(true);
        }
      }
    );
  }

  public getGroupSparkFilterData(): void {
    this.sparkService.getFilterElementData(this.userData.clientId).subscribe((response: any) => {
      if (this.globalResponseHandlerService.getApiResponse(response, false)) {
        this.sparkFilterData = response.data;
        // this.sparkFilterData = response.data.dimensionElementsModels.filter((dimensionElementsModels: any) =>
        //   dimensionElementsModels.dimensionId !== 5
        // );
        // this.sparkFilterData = response.data.dimensionElementsModels;
      }
    });
  }

  public getTeamMemberList(dimension): void {
    this.teamMember$ = this.sparkService.getTeamMember(this.userData.clientId, this.userData.empId, dimension.dimensionId, dimension.dimensionValues);
  }

  getAllTeamMemberList() {
    this.allTeamMemberList$ = this.sparkService.getAllTeamMember(this.userData.clientId, this.userData.empId)
  }
}
