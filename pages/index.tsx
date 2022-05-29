import type {GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {useState} from 'react';
import {HomeTable} from '../components/table/HomeTable';
import {ListBoxUI} from '../components/ui/ListBoxUI';
import {continentData, costOfLivingData} from '../data/TableData';
import {graphqlClient} from '../graphql/GraphqlClient';
import {HOME_COUNTRY_ISO} from '../graphql/query/CountryIsoQuery';
import {HomeCountryIso} from '../graphql/types/CountryIso';

interface Props {
  countryIso: HomeCountryIso[];
}

export const getServerSideProps = async (): Promise<GetStaticPropsResult<Props>> => {
  const countryIsoResult = await graphqlClient.query<{countryIso: HomeCountryIso[]}>({
    query: HOME_COUNTRY_ISO
  });

  return {props: {countryIso: countryIsoResult.data.countryIso}};
};

const Home: NextPage<Props> = ({countryIso}) => {
  const [continentSelected, setContinentSelected] = useState(continentData[0]);
  const [costOfLivingSelected, setCostOfLivingSelected] = useState(costOfLivingData[0]);

  return (
    <>
      <Head>
        <meta name="description" content="The best places to surf in the world" />
      </Head>
      <main className="container my-10">
        <h1 className="text-center text-primary font-bold text-4xl">Best Surfing Spots</h1>
        <p className="text-center text-gray-400 font-medium text-lg mt-2">the best places to surf in the world</p>
        <div className="flex justify-around my-6 flex-wrap">
          <ListBoxUI value={continentSelected} setValue={setContinentSelected} data={continentData} />
          <ListBoxUI value={costOfLivingSelected} setValue={setCostOfLivingSelected} data={costOfLivingData} />
        </div>
        <HomeTable
          countryIso={countryIso}
          costOfLiving={costOfLivingSelected.costOfLiving}
          continentId={continentSelected.id}
        />
      </main>
    </>
  );
};

export default Home;
