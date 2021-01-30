import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
GoogleSignin.configure();
export function loginWithGoogle() {
  return new Promise((resolve, reject) => {
    GoogleSignin.signIn()
      .then((data) => {
        GoogleSignin.getTokens()
          .then(({accessToken}) => {
            const info = {
              ...data,
              accessToken: accessToken,
            };
            resolve(info);
          })
          .catch(() => reject({reason: 'Get token failed'}));
      })
      .catch((error) => {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          reject({reason: 'Cancelled'});
        } else if (error.code === statusCodes.IN_PROGRESS) {
          reject({reason: 'In Progress'});
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          reject({reason: 'Google Play Services not available'});
        } else {
          reject({reason: 'Unknown'});
        }
      });
  });
}
