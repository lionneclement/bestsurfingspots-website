import {FunctionComponent} from 'react';
import Footer from '../components/menu/Footer';
import NavBar from '../components/menu/NavBar';
import Layout from './Layout';

interface Props {
  children: JSX.Element;
}

const DefaultLayout: FunctionComponent<Props> = ({children}) => {
  return (
    <Layout>
      <>
        <NavBar />
        {children}
        <Footer />
      </>
    </Layout>
  );
};

export default DefaultLayout;
