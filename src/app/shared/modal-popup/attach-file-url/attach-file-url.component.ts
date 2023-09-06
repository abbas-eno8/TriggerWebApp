/**
@author : Mihir Patel
@class : AttachFileUrlComponent
@description : AttachFileUrlComponent is shared component for open modal popup and selcet file or add cloud url.
**/
import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { Error_Type, Error_Title, FileTypes, FileMaxSize, Base64SplitString, Regex } from '../../../core/magic-string/common.model';
import { ToasterService } from 'angular2-toaster';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidation } from '../../Validation/custom.validation';
import { ErrorMessage } from '../../../core/magic-string/common-validation-model';

@Component({
  selector: 'trigger-attach-file-url',
  templateUrl: './attach-file-url.component.html',
  styleUrls: ['./attach-file-url.component.scss']
})
export class AttachFileUrlComponent implements OnInit {
  // Output cancel emitter for cancel overlay popup
  @Output() cancel: EventEmitter<boolean>;
  // Output update emitter for update value overlay popup
  @Output() update: EventEmitter<object>;
  @Input() data: any;

  public urlRegularExpression: any
  cloudUrlForm: any;
  private isDropFile: boolean;

  constructor(
    private toaster: ToasterService,
    private fb: FormBuilder,
    private customValidation: CustomValidation
  ) {
    this.isDropFile = false;
    this.cancel = new EventEmitter();
    this.update = new EventEmitter();
    this.urlRegularExpression = new RegExp(Regex.CloudUrl);

  }



  ngOnInit() {
    if (this.data.isEditMode) {
      this.editForm(this.data)
    } else {
      this.createForm()
    }

  }

  /**
   * Author : Sonal Patil
   * Modified by : Anjali Tandel
   * Modified-Date : 03-12-2019
   * Description : For drag over & leave event
   */
  @HostListener('dragleave', ['$event'])
  @HostListener('dragover', ['$event']) public onDragLeave(evt) {
    this.onDragEvent(evt);
  }

  /**
   * Author : Sonal Patil
   * Modified by : Anjali Tandel
   * Modified-Date : 03-12-2019
   * Description : For drag leave event
   */
  @HostListener('drop', ['$event']) public onDrop(evt) {
    this.onDragEvent(evt);
    this.isDropFile = true;
    this.addAttachment(evt);
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 03-12-2019
   * Description : For drag leave event
   */
  private onDragEvent(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  createForm() {
    //  Create form

    this.cloudUrlForm = this.fb.group({
      cloudUrl: ['', [Validators.pattern(this.urlRegularExpression)]],
    });
  }

  editForm(data) {
    this.cloudUrlForm = this.fb.group({
      cloudUrl: [data.cloudUrl, [Validators.pattern(this.urlRegularExpression)]],
    });
  }
  /**
 * Author : Mihir Patel
 * Created-Date : 20-09-2019
 * Descriotion : Create method for emit value for close overlay modal popup.
 */
  cancelSelection(): void {
    this.cancel.emit(true)
  }

  /**
 * Author : Mihir Patel
 * Created-Date : 23-09-2019
 * Descriotion : Create method for add attachment file and emit value to parent component
 */
  public addAttachment(event): void {
    const files = !this.isDropFile ? event.target.files : event.dataTransfer.files;
    if (files && this.customValidation.validateExtension(files, FileTypes) && this.customValidation.validateSize(files, FileMaxSize)) {
      let fileName = files.item(0).name;
      var file: File = files[0];
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        let fileData = myReader.result + '';
        let fileContent = fileData.split(Base64SplitString)[1];
        let attachmentObj: AttchmentObject = {
          isCloudUrl: false,
          attachFileName: fileName,
          attachFileContent: fileContent,
          CloudFilePath: ''
        }
        this.update.emit(attachmentObj)
      }
      myReader.readAsDataURL(file);
    }
    this.isDropFile = false;
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 20-09-2019
   * Descriotion : Create method for emit selcetd file name object to component.
   */
  submitSelection(): void {
    if (this.data.isEditMode) {
      if (this.cloudUrlForm.controls.cloudUrl.value && !this.cloudUrlForm.get('cloudUrl').valid) {
        this.toaster.pop(Error_Type, Error_Title, ErrorMessage.EnterValidCloudUrl);
      } else {
        let attachmentObj: AttchmentObject = {
          isCloudUrl: true,
          attachFileName: '',
          attachFileContent: '',
          CloudFilePath: this.cloudUrlForm.controls.cloudUrl.value
        }
        this.update.emit(attachmentObj)
      }

    } else {
      if (!this.cloudUrlForm.controls.cloudUrl.value) {
        this.toaster.pop(Error_Type, Error_Title, ErrorMessage.EnterSingleValue);
      } else if (!this.cloudUrlForm.get('cloudUrl').valid) {
        this.toaster.pop(Error_Type, Error_Title, ErrorMessage.EnterValidCloudUrl);
      } else {
        let attachmentObj: AttchmentObject = {
          isCloudUrl: true,
          attachFileName: '',
          attachFileContent: '',
          CloudFilePath: this.cloudUrlForm.controls.cloudUrl.value
        }
        this.update.emit(attachmentObj)
      }

    }

  }
  // Ignore space when pasting the code
  public ignoreSpace(event: any) {
    this.customValidation.IgnoreSpace(event);
  }
}


/**
* Author : Mihir Patel
* Created-Date : 23-09-2019
* Descriotion : Create interface for check fields of attachment obect
*/
export interface AttchmentObject {
  isCloudUrl: boolean,
  attachFileName: string,
  attachFileContent: string,
  CloudFilePath: string
}