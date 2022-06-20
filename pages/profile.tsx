import {useAuthUser, withAuthUser, withAuthUserTokenSSR} from 'next-firebase-auth';
import Link from 'next/link';

const Profile = () => {
  const AuthUser = useAuthUser();

  return (
    <>
      <main className="lg:container">
        {AuthUser.email ? (
          <>
            <p>Signed in as {AuthUser.email}</p>
            <button
              type="button"
              onClick={() => {
                AuthUser.signOut();
              }}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <p>You are not signed in.</p>
            <Link href="/auth">
              <a>
                <button type="button">Sign in</button>
              </a>
            </Link>
          </>
        )}
      </main>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Profile);
