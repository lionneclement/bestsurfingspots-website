import Head from 'next/head';
import {FunctionComponent} from 'react';

interface Props {
  children: JSX.Element;
}

const Layout: FunctionComponent<Props> = ({children}: Props) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="shortcut icon" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Best Surfing Spots - the best places to surf in the world</title>
    </Head>
    {children}
  </>
);

export default Layout;
