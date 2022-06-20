import {UserCircleIcon} from '@heroicons/react/solid';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {FunctionComponent, useContext} from 'react';
import {UserContext} from '../../context/UserContext';

const NavBar: FunctionComponent = () => {
  const {user} = useContext(UserContext);
  const {push} = useRouter();
  const homeClicked = () => push('/');
  const authClicked = () => push('/auth');
  const profileClicked = () => push('/profile');

  return (
    <nav className="bg-white py-3 px-6 drop-shadow-md">
      <div className="flex flex-wrap justify-between items-center text-primary">
        <div className="flex items-center" role="button" onClick={homeClicked}>
          <span className="self-center text-xl font-semibold whitespace-nowrap">Buy and Sell</span>
        </div>
        <div className="w-full block w-auto">
          <ul className="flex flex-row text-sm font-medium">
            <li>
              {user?.uid ? (
                <div className="block p-2" role="button" onClick={profileClicked}>
                  {user?.photoURL ? (
                    <Image
                      className="rounded-full"
                      src={user?.photoURL}
                      alt={user?.displayName || ''}
                      height={40}
                      width={40}
                    />
                  ) : (
                    <UserCircleIcon className="h-10 w-10" aria-hidden="true" />
                  )}
                </div>
              ) : (
                <div className="block p-2" role="button" onClick={authClicked}>
                  Sign In
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
