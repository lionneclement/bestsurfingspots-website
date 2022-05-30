import Head from 'next/head';
import {FunctionComponent} from 'react';

const NotFound: FunctionComponent = () => (
  <>
    <Head>
      <title>Error Page</title>
      <meta name="robots" content="noindex" />
    </Head>
    <main className="container my-4 my-md-5">
      <h1>404 - Error Page</h1>
    </main>
  </>
);

export default NotFound;
