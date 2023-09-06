/**
@author : Mihir Patel
@class : EnvironmentConfigService
@description :EnvironmentConfigService is created for get domain url from single-sign-on service.
**/
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// --------------------------------------- //
import { EnvironmentConfig } from './environment-config.model';
import { version } from './version';
import { Api } from '../magic-string/common.model';

/** This file not use anywhere */
/** This use only in spec file so this file not deleted */
@Injectable()
export class EnvironmentConfigService {
  // public environment: EnvironmentConfig;
  // public environmentDetails: Subject<EnvironmentConfig>;

  constructor() {
    // this.environmentDetails = new Subject<EnvironmentConfig>();
    // this.environment = new EnvironmentConfig();
  }

  /**
   * Initializes the environment variables based on the current url in the browser's address bar. After succesfull initialization, it emits the environment details
   * to the components who has subscribed to it environmentDetails
   * @param url The current url in the browser's address bar.
   */
  // initializeApplicationEnvironment(url: any) {
  //   // let environmentName: string = '';
  //   // let rolePrefix: string = '';
  //   // Special condition to support development on localhost. Fetches the url from address bar
  //   // if (url.includes('localhost')) {
  //   //   this.environment.baseUrl = 'https://qaend.truvelop.com/';
  //   //   this.environment.authorityUrl = 'https://qaauth.truvelop.com/';
  //   //   this.environment.angularUrl = 'http://localhost:4200/';
  //   //   this.environment.marketingUrl = 'https://qa.truvelop.com/';

  //   //   // this.environment.baseUrl = 'https://devend.truvelop.com';
  //   //   // this.environment.authorityUrl = 'https://devauth.truvelop.com/';
  //   //   // this.environment.angularUrl = 'http://localhost:4200/';
  //   //   // this.environment.marketingUrl = 'https://qa.truvelop.com/';

  //   //   // this.environment.baseUrl = 'https://devend.truvelop.com';
  //   //   // this.environment.authorityUrl = 'https://devauth.truvelop.com/';
  //   //   // this.environment.angularUrl = 'http://localhost:4200/';
  //   //   // this.environment.marketingUrl = 'https://dev.truvelop.com/';
  //   // }
  //   // else if (url.includes('qaapp.truvelop.com')) {
  //   //   this.environment.baseUrl = 'https://qaend.truvelop.com';
  //   //   this.environment.authorityUrl = 'https://qaauth.truvelop.com/';
  //   //   this.environment.angularUrl = 'https://qaapp.truvelop.com/';
  //   //   this.environment.marketingUrl = 'https://qa.truvelop.com/';
  //   // }
  //   // else if (url.includes('devapp.truvelop.com')) {
  //   //   this.environment.baseUrl = 'https://devend.truvelop.com';
  //   //   this.environment.authorityUrl = 'https://devauth.truvelop.com/';
  //   //   this.environment.angularUrl = 'https://devapp.truvelop.com/';
  //   //   this.environment.marketingUrl = 'https://dev.truvelop.com/';
  //   // }
  //   // else if (url.includes('uatapp.truvelop.com')) {
  //   //   this.environment.baseUrl = 'https://uatend.truvelop.com';
  //   //   this.environment.authorityUrl = 'https://uatauth.truvelop.com/';
  //   //   this.environment.angularUrl = 'https://uatapp.truvelop.com/';
  //   //   this.environment.marketingUrl = 'https://uat.truvelop.com/';
  //   // }
  //   // else if (url.includes('app.truvelop.com')) { // For PRODUCTION-VM2
  //   //   this.environment.baseUrl = 'https://endpoint.truvelop.com';
  //   //   this.environment.authorityUrl = 'https://auth.truvelop.com/';
  //   //   this.environment.angularUrl = 'https://app.truvelop.com/';
  //   //   this.environment.marketingUrl = 'https://www.truvelop.com/';
  //   // }
  //   // else if (url.includes('lbapp.trigger123.com')) { // For Load balancing branch
  //   //   this.environment.baseUrl = 'https://lbend.trigger123.com';
  //   //   this.environment.authorityUrl = 'https://lbauth.trigger123.com/';
  //   //   this.environment.angularUrl = 'https://lbapp.trigger123.com/';
  //   //   this.environment.marketingUrl = 'https://lb.trigger123.com/';
  //   // }
  //   // else if (url.includes('uatapp.trigger123.com')) { // For UAT-VM2
  //   //   this.environment.baseUrl = 'https://uatend.trigger123.com';
  //   //   this.environment.authorityUrl = 'https://uatauth.trigger123.com/';
  //   //   this.environment.angularUrl = 'https://uatapp.trigger123.com/';
  //   //   this.environment.marketingUrl = 'https://uat.trigger123.com/';
  //   // }
  //   // else if (url.includes('qaapp.trigger123.com')) { // For QA-VM2
  //   //   this.environment.baseUrl = 'https://qaend.trigger123.com';
  //   //   this.environment.authorityUrl = 'https://qaauth.trigger123.com/';
  //   //   this.environment.angularUrl = 'https://qaapp.trigger123.com/';
  //   //   this.environment.marketingUrl = 'https://qa.trigger123.com/';
  //   // }
  //   // else if (url.includes('devapp.trigger123.com')) { // For DEV ENVIRONMENT PHASE-2
  //   //   this.environment.baseUrl = 'https://devend.trigger123.com';
  //   //   this.environment.authorityUrl = 'https://devauth.trigger123.com/';
  //   //   this.environment.angularUrl = 'https://devapp.trigger123.com/';
  //   //   this.environment.marketingUrl = 'https://dev.trigger123.com/';
  //   // }
  //   // else if (url.includes('app.trigger123.com')) { // For PRODUCTION-VM2
  //   //   this.environment.baseUrl = 'https://endpoint.trigger123.com';
  //   //   this.environment.authorityUrl = 'https://auth.trigger123.com/';
  //   //   this.environment.angularUrl = 'https://app.trigger123.com/';
  //   //   this.environment.marketingUrl = 'https://www.trigger123.com/';
  //   // }

  //   // this.environment.authorityClientId = 'Trigger';
  //   // this.environment.authorityClientApi = 'TriggerApi';
  //   // this.environment.name = environmentName;
  //   // this.environment.rolePrefix = rolePrefix;
  //   // this.environment.version = version;
  //   // this.emitEnvironmentDetails(this.environment);
  // }

  // getBaseUrl() {
  //   return this.environment.baseUrl + Api.Version;
  // }
  // getAuthorityUrl() {
  //   return this.environment.authorityUrl;
  // }
  // getAuthorityClientId() {
  //   return this.environment.authorityClientId;
  // }
  // getAuthorityClientApi() {
  //   return this.environment.authorityClientApi;
  // }
  // getAngularUrl() {
  //   return this.environment.angularUrl;
  // }
  // getMarketingUrl() {
  //   return this.environment.marketingUrl;
  // }
  
  /**
   * Emits environment details which is passed as the parameter
   * @param environment The environment object to be emitted
   */
  // emitEnvironmentDetails(environment: EnvironmentConfig) {
    // this.environmentDetails.next(environment);
  // }
}
