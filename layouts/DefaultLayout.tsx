import Head from 'next/head';
import {FunctionComponent} from 'react';
import Footer from '../components/menu/footer';
import NavBar from '../components/menu/NavBar';
import Layout from './Layout';

interface Props {
  children: JSX.Element;
}

const DefaultLayout: FunctionComponent<Props> = ({children}) => {
  return (
    <Layout>
      <>
        <Head>
          <title>Kelvin - Conseils écologiques, recettes Do It Yourself, suivi de votre impact</title>
        </Head>
        <NavBar />
        {children}
        <Footer />
      </>
    </Layout>
  );
};

export default DefaultLayout;
