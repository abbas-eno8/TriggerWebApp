import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { Router } from '@angular/router';
import { Encryption } from '../magic-string/common-validation-model';

@Injectable()
export class UrlEncryptionDecryptionService {
  public userId: string = '';
  public options = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
  constructor(
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private router: Router
    ) {
    this.getUserId();
  }

  getUserId() {
    let userData = this.globalResponseHandlerService.getUserData();
    this.userId = userData.userId;
  }

  urlEncryption(parameter: string, route?: string) {
    let encryptedKey = CryptoJS.AES.encrypt(parameter.toString(), this.userId.toString(), this.options);
    let ciphertext = encryptedKey.ciphertext.toString();
    sessionStorage.setItem(Encryption.UrlEncryptionKey, encryptedKey.toString());
    sessionStorage.setItem(Encryption.UrlCiphertext, ciphertext);
    if (parseInt(parameter) === 0) {
      this.router.navigate([route]);
    } else {
      this.router.navigate([route], { queryParams: { 'id': ciphertext } });
    }
  }

  urlDecryption(parameter) {
    let ciphertext = sessionStorage.getItem(Encryption.UrlCiphertext);
    let plaintext = '';
    if (this.userId && parameter === ciphertext) {
      let encryptionKey = sessionStorage.getItem(Encryption.UrlEncryptionKey);
      let decrypted = CryptoJS.AES.decrypt(encryptionKey, this.userId.toString(), this.options);
      plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    }
    return plaintext;
  }
}
