import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export function loginWithFacebook() {
  return new Promise((resolve, reject) => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          reject({reason: 'Cancelled'});
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            // Create a graph request asking for user information with a callback to handle the response.
            function responseInfoCallback(error: Object, res: Object) {
              if (error) {
                console.log('Error fetching data: ' + error.toString());
                reject(error);
              } else {
                console.log('Success fetching data: ', res);
                resolve({...res, ...data});
              }
            }

            const infoRequest = new GraphRequest(
              '/me?fields=id,name,email',
              null,
              responseInfoCallback,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        console.log('error', error);
        reject(error);
      },
    );
  });
}
