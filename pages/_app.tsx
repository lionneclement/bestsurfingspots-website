import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import '../styles/globals.css';
import {trackPageView} from '../utils/google-tag';

const MyApp = ({Component, pageProps}: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL): void => {
      trackPageView(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
};

export default MyApp;
