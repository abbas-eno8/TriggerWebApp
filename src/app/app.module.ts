/**
@author : Mihir Patel
@class : AppModule
@description :AppModule is imported with all modules which are created.
**/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToasterModule } from 'angular2-toaster'; // Third party library used to
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// ............................................. //
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { ThemeModule } from './core/theme/theme.module';
import { lightTheme } from './core/theme/light-theme';
import { darkTheme } from './core/theme/dark-theme';
//import { TimepickerModule } from 'ngx-bootstrap/timepicker';
//import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToasterModule,
    Ng4LoadingSpinnerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    }),
    CoreModule,
    //TimepickerModule.forRoot(),
    //NgxMaterialTimepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
