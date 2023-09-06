// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.dev.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular.json`.

export const environment = {
  production: true,

  /**  Basic configuration data */
  client_id: '',
  environment_name: 'PROD Environment',

  /** Authority related configuration data */
  authorityClientId: 'Trigger',
  authorityClientApi: 'TriggerApi',
  authorityUrl: 'https://auth.truvelop.com/',

  /** Angular Port related configuration data */
  angularUrl: 'https://app.truvelop.com/',
  /**  Backend API related configuration data */
  baseUrl: 'https://endpoint.truvelop.com/api/',
  /**  Marketing Url related configuration data */
  marketingUrl: 'https://www.truvelop.com/',
  /**  version related configuration data */
  version: '1.0.2-SNAPSHOT'
};