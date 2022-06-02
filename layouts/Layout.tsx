import Head from 'next/head';
import {FunctionComponent} from 'react';

interface Props {
  children: JSX.Element;
}

const Layout: FunctionComponent<Props> = ({children}: Props) => (
  <>
    <Head>
      <meta data-rh="true" charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="shortcut icon" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta data-rh="true" property="og:site_name" content="Best Surfing Spots" />
    </Head>
    {children}
  </>
);

export default Layout;
