import {useRouter} from 'next/router';
import {FunctionComponent} from 'react';

const Footer: FunctionComponent = () => {
  const {push} = useRouter();
  const homeClicked = () => push('/');

  return (
    <footer className="p-6 bg-white text-primary shadow-2xl">
      <div className="md:flex md:items-center md:justify-between">
        <div className="hover:underline" role="button" onClick={homeClicked}>
          <span className="text-sm sm:text-center">© 2022 BestSurfingSpots™ . All Rights Reserved.</span>
        </div>
        {/* <ul className="flex flex-wrap items-center mt-3 text-sm sm:mt-0">
          <li>
            <Link href="/">
              <a className="mr-4 hover:underline md:mr-6">Home</a>
            </Link>
          </li>
        </ul> */}
      </div>
    </footer>
  );
};

export default Footer;
