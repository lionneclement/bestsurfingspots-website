import {AuthAction, withAuthUser} from 'next-firebase-auth';
import Head from 'next/head';
import FirebaseAuth from '../components/firebase/FirebaseAuth';

const Auth = () => (
  <>
    <Head>
      <title>Sign In</title>
      <meta name="robots" content="noindex,nofollow" />
    </Head>
    <main className="container text-center">
      <h1 className="mt-6 text-primary font-bold text-4xl">Sign in to BestSurfingSpots</h1>
      <span className="mt-2 block font-medium">Sign In to your account to find used Surfboards in Bali, Indonesia</span>
      <div className="mt-12">
        <FirebaseAuth />
      </div>
    </main>
  </>
);

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER
})(Auth);
