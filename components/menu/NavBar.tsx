import Link from 'next/link';
import {FunctionComponent} from 'react';
import {LINKEDIN_LINK} from '../../data/Link';

const NavBar: FunctionComponent = () => {
  return (
    <nav className="bg-white py-3 px-6 drop-shadow-md">
      <div className="flex flex-wrap justify-between items-center text-primary">
        <Link href="/">
          <a className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">Best Surfing Spots</span>
          </a>
        </Link>
        <div className="w-full block w-auto">
          <ul className="flex flex-row text-sm font-medium">
            <li>
              <Link href="/">
                <a className="block p-2">Home</a>
              </Link>
            </li>
            <li>
              <Link href={LINKEDIN_LINK}>
                <a target="_blank" className="block p-2">
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
