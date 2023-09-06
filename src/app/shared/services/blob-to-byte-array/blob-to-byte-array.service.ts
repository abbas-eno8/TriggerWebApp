import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class BlobToByteArrayService {

  constructor() { }

  getImageByteArray(imageUrl): any {
    this.getBase64ImageFromURL(imageUrl).subscribe(base64data => {
      // let  base64Image = 'data:image/jpg;base64,' + base64data;
      let base64Image = 'data:image/jpg;base64,' + base64data;;
      return base64Image

    });
  }
  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url; img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  convertFileToBase64(file: File) {
    return Observable.create((observer: Observer<any>) => {
      
      const myReader = new FileReader();
      myReader.readAsDataURL(file);

      myReader.onload = () => {
        observer.next(myReader.result);
        observer.complete();
      };
      myReader.onerror = (err) => {
        observer.error(err);
      };
    });
  }

  /**
   * This method remove the prefix data image from base64 image path
   * @param base64Image 
   * @returns 
   */
  removePrefixDataImage(base64Image: string): string {
    return base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  }
}
