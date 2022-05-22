import type {GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {useState} from 'react';
import {HomeTable} from '../components/HomeTable';
import {continentData} from '../data/ContinentData';
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
  const [continentIdActive, setContinentIdActive] = useState<number>();
  const defaultMaxCostOfLiving = 10000;
  const [maxCostOfLiving, setMaxCostOfLiving] = useState<number>(defaultMaxCostOfLiving);

  const onContinentClicked = (continentid: number) => {
    setContinentIdActive(continentid === continentIdActive ? undefined : continentid);
  };

  const onCostOfLivingClicked = (costOfLiving: number) => {
    setMaxCostOfLiving(costOfLiving === maxCostOfLiving ? defaultMaxCostOfLiving : costOfLiving);
  };

  return (
    <>
      <Head>
        <title>Best Surfing Spots</title>
        <meta name="description" content="the best places to surf in the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-center text-primary font-bold text-4xl mt-10">Best Surfing Spots</h1>
        <p className="text-center text-gray-400 font-medium text-lg mt-2">the best places to surf in the world</p>
        <div className="flex">
          <div className="mt-6 w-[30%] h-fit ml-4 mr-6">
            <div>
              <label className="font-medium">Where ?</label>
              <div className="grid grid-rows-2 grid-cols-3 gap-2 mt-2">
                {continentData.map(({name, id}, index) => {
                  return (
                    <div
                      onClick={() => onContinentClicked(id)}
                      style={continentIdActive === id ? {background: '#0c717e', color: 'white'} : {}}
                      role="button"
                      className="py-2 px-2 border rounded-lg text-center flex justify-center items-center"
                      key={index}>
                      <span>{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-6">
              <label className="font-medium">Cost of living ?</label>
              <div className="grid grid-rows-2 grid-cols-2 gap-2 mt-4">
                {[
                  {name: '💰<€1K/mo', costOfLiving: 1000},
                  {name: '💰<€2K/mo', costOfLiving: 2000}
                ].map(({name, costOfLiving}, index) => {
                  return (
                    <div
                      onClick={() => onCostOfLivingClicked(costOfLiving)}
                      style={maxCostOfLiving === costOfLiving ? {background: '#0c717e', color: 'white'} : {}}
                      role="button"
                      className="py-2 px-2 border rounded-lg text-center flex justify-center items-center"
                      key={index}>
                      <span>{name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <HomeTable countryIso={countryIso} costOfLiving={maxCostOfLiving} continentId={continentIdActive} />
        </div>
      </main>
    </>
  );
};

export default Home;
