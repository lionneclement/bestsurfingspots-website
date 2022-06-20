import firebase from 'firebase/app';
import 'firebase/auth';
import {useEffect, useState} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const FirebaseAuth = () => {
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true);
    }
  }, []);
  return (
    <div>{renderAuth ? <StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={firebase.auth()} /> : null}</div>
  );
};

export default FirebaseAuth;
