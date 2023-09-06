// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  // production: false,

  // /**  Basic configuration data */
  // client_id: '',
  // environment_name: 'Local Environment',

  // /** Authority related configuration data */
  // authorityClientId: 'Trigger',
  // authorityClientApi: 'TriggerApi',
  // authorityUrl: 'https://devauth.truvelop.com/',

  // /** Angular Port related configuration data */
  // angularUrl: 'http://localhost:4200/',
  // /**  Backend API related configuration data */
  // baseUrl: 'https://devend.truvelop.com/api/',
  // /**  Marketing Url related configuration data */
  // marketingUrl: 'https://dev.truvelop.com/',
  // /**  version related configuration data */
  // version: '1.0.2-SNAPSHOT'

  production: false,

  /**  Basic configuration data */
  client_id: "",
  environment_name: "QA Environment",

  /** Authority related configuration data */
  authorityClientId: "Trigger",
  authorityClientApi: "TriggerApi",
  authorityUrl: "http://betaauth.truvelop.com/",
  //authorityUrl: "http://20.237.74.248/",
  //authorityUrl: "https://localhost:5000/",

  /** Angular Port related configuration data */
  angularUrl: "https://azuretriggerwebapp.azurewebsites.net/",
  //angularUrl: "https://azuretriggerwebapp.azurewebsites.net/",
  //angularUrl: "https://azuretriggerwebapp.azurewebsites.net",
  /**  Backend API related configuration data */
  baseUrl: "http://betaend.truvelop.com/api/",
  //baseUrl: "http://52.152.254.123/api/",
  /**  Marketing Url related configuration data */
  marketingUrl: "https://qa.truvelop.com/",
  /**  version related configuration data */
  version: "1.0.2-SNAPSHOT",
};

