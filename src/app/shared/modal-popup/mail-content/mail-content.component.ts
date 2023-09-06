
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ToasterService } from "angular2-toaster";
// ---------------------------------------------------------- //
import { Actions, Error_Title, Error_Type } from "../../../core/magic-string/common.model";
import { LoaderService } from "../../../core/loader/loader.service";
import { ActionPermissionService, canAdd } from "../../../core/services/action-permission/action-permission.service";
import { emailPreviewDropDownList, emailPreviewDropDownListForSubmitOnly } from "../../../assessment/assessment-model";

@Component({
  selector: "trigger-mail-content",
  templateUrl: "./mail-content.component.html",
  styleUrls: ["./mail-content.component.scss"]
})
export class MailContentComponent implements OnInit {

  public data: any;
  public dynamicContent: SafeHtml;
  public isDropDown: boolean;
  public dropDownList: any[];
  public submitType: FormControl;

  @Output() public sendMail: EventEmitter<boolean>;
  @Output() public cancel: EventEmitter<boolean>;
  @Output() public submit: EventEmitter<any>;

  constructor(
    private sanitizer: DomSanitizer,
    private loaderService: LoaderService,
    private toasterService: ToasterService,
    private actionPermissionService: ActionPermissionService
  ) {
    
    this.submitType = new FormControl(null, Validators.required);
    this.sendMail = new EventEmitter();
    this.cancel = new EventEmitter();
    this.submit = new EventEmitter();
    if(this.actionPermissionService.isCheckCommonPermission(Actions.EvaluationsInDrafts, canAdd)) {
      this.dropDownList = emailPreviewDropDownList;
    } else {
      this.dropDownList = emailPreviewDropDownListForSubmitOnly;
    }
  }
  
  ngOnInit() {
    this.isDropDown = !!this.data.isShowDropDown ? true : false;
    this.dynamicContent = this.sanitizer.bypassSecurityTrustHtml(this.data.dynamicContent);
  }

  public onClickCancel(): void {
    this.cancel.emit(true);
  }

  public onClickSend(): void {
    this.loaderService.emitIsLoaderShown(true);
    this.sendMail.emit(true);
  }

  public changeType(value: string): void {
    this.submitType.setValue(value);
  }

  public onSubmit(): void {
    if (this.submitType.valid) {
      const submitType = this.submitType.value;
      this.submit.emit(submitType);
    } else {
      this.toasterService.pop(Error_Type, Error_Title, 'Please select one option.');
    }
  }
}