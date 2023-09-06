/**
@author : Anjali Tandel
@class : MemberAccordianPresentation
@description : MemberAccordianPresentation is child presentation for team-member-accordian-list-view.
**/
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// ----------------------------------------------------------- //
import { TeamMembers, TeamMemberColumns } from '../../../team-member-model';
import { MemberPresenter } from '../member-presenter/member.presenter';
import { ScrollService } from '../../../../../core/services/scroll.service';
import { UserModel } from '../../../../../core/model/user';
import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';
import { RoleEnum } from '../../../../../core/magic-string/common.model';

@Component({
  selector: 'trigger-member-accordian-ui',
  templateUrl: './member-accordian.presentation.html',
  styleUrls: ['./member-accordian.presentation.scss']
})
export class MemberAccordianPresentation implements OnInit {
  /** Store the user data */
  public userData: UserModel;
  public isAdminOrSuperAdmin: boolean;
  /** This property is used for current displaying team-members. */
  public filterTeamMembers: TeamMembers[];
  /** This property is used for current displaying configurable columns. */
  public columns: TeamMemberColumns[];
  /** This property is used for checke/uncheck master-checkbox. */
  public isCheckedMasterCheckbox: boolean;
  /** This property is used for Hide/Show master-checkbox. */
  public isDisplayMasterCheckbox: boolean;
  private destroy: Subject<void> = new Subject();
  constructor(
    public memberPresenter: MemberPresenter,
    public scrollService: ScrollService,
    private globalResponseHandlerService: GlobalResponseHandlerService
  ) { 
    this.destroy = new Subject(); 
    this.userData = this.globalResponseHandlerService.getUser();
    this.isAdminOrSuperAdmin = (this.userData.role === RoleEnum.TriggerAdmin || this.userData.role === RoleEnum.Admin) ? true : false;
  }

  ngOnInit() {
    this.isCheckeAndDisplayMasterCheckbox(this.filterTeamMembers);
    this.memberPresenter.bindRecords$.pipe(takeUntil(this.destroy)).subscribe((members: TeamMembers[]) => {
      this.filterTeamMembers = members;
      this.isCheckeAndDisplayMasterCheckbox(members);
    });
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 11-03-2020
   * Description : Created method for set value for is display and check Master-checkbox.
   */
  private isCheckeAndDisplayMasterCheckbox(members: TeamMembers[]): void {
    this.isDisplayMasterCheckbox = this.memberPresenter.isDisplayMasterCheckbox(members);
    this.isCheckedMasterCheckbox = this.memberPresenter.isCheckedMasterCheckbox(members);
  }
}
