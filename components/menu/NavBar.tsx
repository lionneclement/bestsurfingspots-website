import {useRouter} from 'next/router';
import {FunctionComponent} from 'react';

const NavBar: FunctionComponent = () => {
  const {push} = useRouter();
  const homeClicked = () => push('/');

  return (
    <nav className="bg-white py-3 px-6 drop-shadow-md">
      <div className="flex flex-wrap justify-between items-center text-primary">
        <div className="flex items-center" role="button" onClick={homeClicked}>
          <span className="self-center text-xl font-semibold whitespace-nowrap">Buy and Sell</span>
        </div>
        <div className="w-full block w-auto">
          <ul className="flex flex-row text-sm font-medium">
            <li>
              <div className="block p-2" role="button" onClick={homeClicked}>
                Home
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
