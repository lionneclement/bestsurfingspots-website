import Head from 'next/head';
import {useRouter} from 'next/router';
import {FunctionComponent} from 'react';

const NotFound: FunctionComponent = () => {
  const {push} = useRouter();
  return (
    <>
      <Head>
        <title>Page not found</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="container my-4 mt-20 text-center">
        <h1 className="text-[14rem]">404</h1>
        <span className="text-lg block">
          <strong>whoops</strong>, nothing to see here ...
        </span>
        <button
          onClick={() => push('/')}
          className="mt-10 rounded-lg bg-primary font-medium text-lg text-white text-center py-4 px-16 cursor-pointer">
          Back to home
        </button>
      </main>
    </>
  );
};

export default NotFound;
