/**
  @author : Mihir Patel
  @class : ProfileUploadComponent
  @description :ProfileUploadComponent create for crop and upload image
**/
import { Component, OnInit, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef } from '@angular/material';
import { LoaderService } from '../../core/loader/loader.service';
import { UserProfileService } from '../user-profile-service/user-profile.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';

@Component({
  selector: 'trigger-profile-upload',
  templateUrl: './profile-upload.component.html',
  styleUrls: ['./profile-upload.component.scss']
})
export class ProfileUploadComponent implements OnInit {
  uploadImage = new EventEmitter();
  public userData: any;
  public userId: number;
  public employeeId: number;
  public companyId: number;
  public iconUrl: string;
  public imageChangedEvent: string;
  public iconName: string;
  croppedImage: string;
  public isSetClientLogoBtnDisabled: Boolean;
  constructor(
    public dialogRef: MatDialogRef<ProfileUploadComponent>,
    private loaderService: LoaderService,
    private userProfileService: UserProfileService,
    private globalResponseHandlerService: GlobalResponseHandlerService) { }

  ngOnInit(): void {
    this.userData = this.globalResponseHandlerService.getUserData();
    this.userId = this.userData.userId;
    this.employeeId = this.userData.loginEmpId;
    this.companyId = this.userData.clientId;
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 14-05-2019
   * Descriotion : Create event for image change event
   */
  fileChangeEvent(event: any): void {
    this.isSetClientLogoBtnDisabled = true;
    this.iconName = event.target.files[0].name;
    this.imageChangedEvent = event;
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 14-05-2019
   * Descriotion : Create event for cropping uploaded image
   */
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 14-05-2019
   * Descriotion : Image loaded issue in IE & Edge
   */
  imageLoaded(): void {
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
          var dataURL = this.toDataURL(type, quality).split(',')[1];
          setTimeout(function () {

            var binStr = atob(dataURL),
              len = binStr.length,
              arr = new Uint8Array(len);

            for (var i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i);
            }
            callback(new Blob([arr], { type: type || 'image/png' }));
          });
        }
      });
    }
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 14-05-2019
   * Descriotion : Event for failed to load image
   */
  loadImageFailed(): void {
    console.log('loadImageFailed')
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 14-05-2019
   * Description : Create method for initialize variables on click cancel button
   */
  clear(): void {
    this.isSetClientLogoBtnDisabled = false
    this.croppedImage = '';
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 14-05-2019
   * Description : Create method for close modal popup on click cancel button 
   */
  onClickCancel(): void {
    this.clear();
  }

  /**
   * Author : Mihir Patel
   * Created-Date : 14-05-2019
   * Description : Create method setAsUserProfile() for update user profile
   */
  setAsUserProfile(): void {
    let url = this.croppedImage.split('base64,')[1];
    this.loaderService.emitIsLoaderShown(true);
    let bodyObj = {
      empid: this.employeeId,
      companyId: this.companyId,
      empImgPath: this.iconName,
      empImage: url
    }
    this.userProfileService.updateProfile(this.userId, bodyObj).subscribe(
      (updateProfileResponse: any) => {
        if (this.globalResponseHandlerService.getApiResponse(updateProfileResponse, true)) {
          let imageResponse = updateProfileResponse.data[0].empImgPath;
          this.globalResponseHandlerService.setUserProfile(imageResponse);
          this.uploadImage.emit(imageResponse);           
        }
      }
    );
  }
}
