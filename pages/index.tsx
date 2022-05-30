import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useLayoutEffect, useState} from 'react';
import {HomeTable} from '../components/table/HomeTable';
import {ListBoxUI} from '../components/ui/ListBoxUI';
import {continentData, costOfLivingData} from '../data/TableData';
import {graphqlClient} from '../graphql/GraphqlClient';
import {HOME_COUNTRY_ISO} from '../graphql/query/CountryIsoQuery';
import {HomeCountryIso} from '../graphql/types/CountryIso';
import {homeFilterPath, HomeFilterPathTypes, homePathName} from '../helpers/HomeFilterPath';

interface Props {
  countryIso: HomeCountryIso[];
  homeFilter?: HomeFilterPathTypes;
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {slug} = context.query;

  const homeFilter = homeFilterPath(slug);

  if (slug && !homeFilter) return {notFound: true};

  const countryIsoResult = await graphqlClient.query<{countryIso: HomeCountryIso[]}>({
    query: HOME_COUNTRY_ISO
  });

  return {props: {countryIso: countryIsoResult.data.countryIso, homeFilter}};
};

const Home: NextPage<Props> = ({countryIso, homeFilter}) => {
  const {push} = useRouter();
  const [continentSelected, setContinentSelected] = useState(homeFilter?.continent || continentData[0]);
  const [costOfLivingSelected, setCostOfLivingSelected] = useState(homeFilter?.costOfLiving || costOfLivingData[0]);

  useEffect(() => {
    const pathname = homePathName({continentSelected, costOfLivingSelected});
    push({pathname}, undefined, {shallow: true});
  }, [continentSelected, costOfLivingSelected]);

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
