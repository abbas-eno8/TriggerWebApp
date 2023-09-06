/**
@author : Mihir Patel
@class : singleSignOn function
@description :singleSignOn function is created for get domain which is calling at app .
**/
import { EnvironmentConfigService } from './environment-config/environment-config.service';

export function singleSignOn(environmentConfigService: EnvironmentConfigService): () => Promise<any> {
    // Initializes the environment variables
    // environmentConfigService.initializeApplicationEnvironment(window.location.host);
    // Authenticates the user.
    return () => new Promise(function(resolve, reject) {
        // Save Data
        resolve('');
    });
}
