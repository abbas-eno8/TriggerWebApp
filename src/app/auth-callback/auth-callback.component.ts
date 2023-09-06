import { Component, OnInit } from '@angular/core';
//  ................................................ //
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'authority-auth-callback',
  templateUrl: './auth-callback.component.html'
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private _auth: AuthService
  ) { }
  ngOnInit() {
    this._auth.completeAuthentication();
  };
}
