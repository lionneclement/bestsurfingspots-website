import {FunctionComponent} from 'react';
import Footer from '../components/menu/Footer';
import Layout from './Layout';

interface Props {
  children: JSX.Element;
}

const DefaultLayout: FunctionComponent<Props> = ({children}) => {
  return (
    <Layout>
      <>
        {children}
        <Footer />
      </>
    </Layout>
  );
};

export default DefaultLayout;
