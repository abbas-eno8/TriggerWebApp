/**
@author : Anjali Tandel
@class : TeamsHeaderPresentation
@description : TeamsHeaderPresentation is created for header-presentation.
**/
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Route } from '../../../../core/magic-string/common.model';
import { UrlEncryptionDecryptionService } from '../../../../core/url-encryption-decryption/url-encryption-decryption.service';

@Component({
  selector: 'trigger-teams-header-ui',
  templateUrl: './teams-header.presentation.html',
  preserveWhitespaces: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsHeaderPresentation implements OnInit {
  
  @Input() isTeamAddable: boolean;
  
  constructor(
    private urlEncryptionDecryptionService: UrlEncryptionDecryptionService
    ) { }

  ngOnInit() { }

  /**
   * Author : Anjali Tandel
   * Created-Date : 06-09-2019
   * Description : Click event for add-team.
   */
  public addTeam(): void {
    this.urlEncryptionDecryptionService.urlEncryption('0', Route.AddTeam);
  }
}
