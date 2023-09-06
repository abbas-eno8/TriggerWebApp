import { Component, OnInit, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'trigger-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit {
  uploadImage = new EventEmitter();

  public iconUrl: string;
  public imageChangedEvent: string;
  public iconName: string;
  croppedImage: string;
  public isSetClientLogoBtnDisabled: Boolean;
  constructor(public dialogRef: MatDialogRef<CropImageComponent>) {
    this.clear();
  }

  ngOnInit(): void { }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  15-01-2019
   * Descriotion : Create event for image change event
   */
  fileChangeEvent(event: any): void {
    this.isSetClientLogoBtnDisabled = true;
    this.iconName = event.target.files[0].name;
    this.imageChangedEvent = event;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  15-01-2019
   * Descriotion : Create event for cropping uploaded image
   */
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date :  15-01-2019
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
   * Author : Anjali Tandel
   * Modified-Date :  15-01-2019
   * Descriotion : Event for failed to load image
   */
  loadImageFailed(): void {
    console.log('loadImageFailed')
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Create method for initialize variables on click cancel button
   */
  clear(): void {
    this.isSetClientLogoBtnDisabled = false
    this.croppedImage = '';
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Create method for close modal popup on click cancel button 
   */
  onClickCancel(): void {
    this.clear();
  }

  /**
   * Author : Anjali Tandel
   * Modified-Date : 12-03-2019
   * Description : Create method setAsClientLogo() for update client-logo
   */
  setAsClientLogo(): void {
    let url = this.croppedImage.split('base64,')[1];
    let object = {
      'iconUrl': url,
      'image': this.croppedImage,
      'iconName': this.iconName,
    }
    this.uploadImage.emit(object);
  }
}
