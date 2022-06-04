import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {hotjar} from 'react-hotjar';
import {isProduction} from '../helpers/Env';
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

  useEffect(() => {
    isProduction() &&
      process.env.NEXT_PUBLIC_HOTJAR_SITE_ID &&
      hotjar.initialize(Number(process.env.NEXT_PUBLIC_HOTJAR_SITE_ID), 6);
  }, []);

  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
};

export default MyApp;
