// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=uat` then `environment.dev.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular.json`.

export const environment = {
    production: false,

    /**  Basic configuration data */
    client_id: '',
    environment_name: 'UAT Environment',

    /** Authority related configuration data */
    authorityClientId: 'Trigger',
    authorityClientApi: 'TriggerApi',
    authorityUrl: 'https://uatauth.truvelop.com/',

    /** Angular Port related configuration data */
    angularUrl: 'https://uatapp.truvelop.com/',
    /**  Backend API related configuration data */
    baseUrl: 'https://uatend.truvelop.com/api/',
    /**  Marketing Url related configuration data */
    marketingUrl: 'https://uat.truvelop.com/',
    /**  version related configuration data */
    version: '1.0.2-SNAPSHOT'
};