/**
 * description :HeaderViewComponent is created for shared header view.
 * @author : Anjali Tandel
 * @class : HeaderViewComponent
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UrlEncryptionDecryptionService } from '../../core/url-encryption-decryption/url-encryption-decryption.service';
import { HeaderParameter } from '../../core/magic-string/common.model';

@Component({
  selector: 'trigger-header-view',
  templateUrl: './header-view.component.html'
})
export class HeaderViewComponent implements OnInit {
  /** pageTitle is getting from parent component */
  @Input() pageTitle: string;
  /** pageTitle is getting from parent component */
  @Input() HeaderViewParameter: HeaderParameter[];
  constructor(private urlEncryptionDecryptionService: UrlEncryptionDecryptionService) { }

  ngOnInit(): void { }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  09-04-2019
   * Description : This method is created for redirect to respective route url which will get by route parameter.
   */
  public onClick(route: string): void {
    this.urlEncryptionDecryptionService.urlEncryption('0', route);
  }
}
