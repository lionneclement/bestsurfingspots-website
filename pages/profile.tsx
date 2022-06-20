import {AuthAction, useAuthUser, withAuthUser} from 'next-firebase-auth';
import Head from 'next/head';
import Image from 'next/image';

const Profile = () => {
  const {photoURL, displayName, signOut, email} = useAuthUser();

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <main className="container">
        <h1 className="mt-6 text-primary font-bold text-4xl">Profile</h1>
        <div className="flex flex-col items-center mt-10">
          {photoURL && <Image className="rounded-full" src={photoURL} alt={displayName || ''} height={96} width={96} />}
          {displayName && <span className="font-semibold text-lg">{displayName}</span>}
          {email && <span>{email}</span>}
          <button
            onClick={() => signOut()}
            className="mt-10 rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white">
            Sign Out
          </button>
        </div>
      </main>
    </>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Profile);
