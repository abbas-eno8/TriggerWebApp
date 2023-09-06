/**
@author : Anjali Tandel
@class : MemberDesktopPresentation
@description : MemberDesktopPresentation is child presentation for team-member-desktop-list-view.
**/
import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// ---------------------------------------- //
import { TeamMembers, TeamMemberColumns } from '../../../team-member-model';
import { MemberPresenter } from '../member-presenter/member.presenter';
import { ScrollService } from '../../../../../core/services/scroll.service';
import { UserModel } from '../../../../../core/model/user';
import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';
import { RoleEnum } from '../../../../../core/magic-string/common.model';

@Component({
  selector: 'trigger-member-desktop-ui',
  templateUrl: './member-desktop.presentation.html',
  styleUrls: ['./member-desktop.presentation.scss']
})
export class MemberDesktopPresentation implements OnInit {
  /** Store the user data */
  public userData: UserModel;
  public isAdmin: boolean;
  public isSuperAdmin: boolean;
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
    this.isSuperAdmin = this.userData.role === RoleEnum.TriggerAdmin ? true : false;
    this.isAdmin =  this.userData.role === RoleEnum.Admin ? true : false;
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
