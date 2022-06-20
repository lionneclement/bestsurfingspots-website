import firebase from 'firebase/app';
import 'firebase/auth';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {hotjar} from 'react-hotjar';
import {graphqlClient} from '../graphql/GraphqlClient';
import {ADD_USER, UPDATE_USER} from '../graphql/mutation/UserMutation';
import {USER} from '../graphql/query/UserQuery';
import {AddUserVariable, UpdateUserVariable, User, UserVariable} from '../graphql/types/User';
import DefaultLayout from '../layouts/DefaultLayout';
import '../styles/globals.css';
import initAuth from '../utils/auth';
import {trackPageView} from '../utils/google-tag';

initAuth();

const MyApp = ({Component, pageProps}: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser?.uid) {
        const {uid, email, displayName, photoURL, providerId} = firebaseUser;
        console.log('providerId: ', providerId);
        const userResult = await graphqlClient.query<{user: User[]}, UserVariable>({
          query: USER,
          variables: {firebase_id: uid},
          fetchPolicy: 'no-cache'
        });

        if (userResult.data.user.length === 0) {
          await graphqlClient.mutate<{user: User}, AddUserVariable>({
            mutation: ADD_USER,
            variables: {firebase_id: uid, email, display_name: displayName, photo_url: photoURL}
          });
        } else {
          graphqlClient.mutate<{product: {id: number}}, UpdateUserVariable>({
            mutation: UPDATE_USER,
            variables: {userId: userResult.data.user[0].id, display_name: displayName, photo_url: photoURL}
          });
        }
      }
    });
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: URL): void => {
      trackPageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    process.env.NEXT_PUBLIC_HOTJAR_SITE_ID && hotjar.initialize(Number(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID), 6);
  }, []);

  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
};

export default MyApp;
