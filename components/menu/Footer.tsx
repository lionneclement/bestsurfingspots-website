import Link from 'next/link';
import {FunctionComponent} from 'react';
import {LINKEDIN_LINK} from '../../data/Link';

const Footer: FunctionComponent = () => {
  return (
    <footer className="p-6 bg-white text-primary shadow-2xl">
      <div className="md:flex md:items-center md:justify-between">
        <span className="text-sm sm:text-center">
          © 2022{' '}
          <Link href="/">
            <a className="hover:underline">BestSurfingSpots™</a>
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm sm:mt-0">
          <li>
            <Link href="/">
              <a className="mr-4 hover:underline md:mr-6">Home</a>
            </Link>
          </li>
          <li>
            <Link href={LINKEDIN_LINK}>
              <a target="_blank" className="mr-4 hover:underline md:mr-6">
                Contact
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
