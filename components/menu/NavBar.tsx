import Link from 'next/link';
import {FunctionComponent} from 'react';
import {LINKEDIN_LINK} from '../../data/Link';

const NavBar: FunctionComponent = () => {
  return (
    <nav className="bg-white px-2 sm:px-4 py-3 drop-shadow-md">
      <div className="container flex flex-wrap justify-between items-center mx-auto text-primary">
        <Link href="/">
          <a className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">Best Surfing Spots</span>
          </a>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link href="/">
                <a className="block py-2 px">Home</a>
              </Link>
            </li>
            <li>
              <Link href={LINKEDIN_LINK}>
                <a target="_blank" className="block py-2 px-4">
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
