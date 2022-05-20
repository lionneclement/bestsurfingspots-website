import type {GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {useState} from 'react';
import {graphqlClient} from '../graphql/GraphqlClient';
import {COUNTRY_ISO} from '../graphql/query/CountryIsoQuery';
import {HomeCountryIso} from '../graphql/types/CountryIso';

export const getServerSideProps = async (): Promise<GetStaticPropsResult<{countryIso: HomeCountryIso[]}>> => {
  const countryIsoResult = await graphqlClient.query<{countryIso: HomeCountryIso[]}>({
    query: COUNTRY_ISO
  });

  return {props: {countryIso: countryIsoResult.data.countryIso}};
};

const Home: NextPage<{countryIso: HomeCountryIso[]}> = ({countryIso}) => {
  const [continentActiveId, setContinentActiveId] = useState<number>();
  const defaultMaxCostOfLiving = 10000;
  const [maxCostOfLiving, setMaxCostOfLiving] = useState<number>(defaultMaxCostOfLiving);

  const onContinentClicked = (continentId: number) => {
    setContinentActiveId(continentId === continentActiveId ? undefined : continentId);
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
                {[
                  {name: '🌎 Northern America', id: 1},
                  {name: '💃 Latin America', id: 2},
                  {name: '🇪🇺 Europe', id: 3},
                  {name: '🌍 Africa', id: 4},
                  {name: '⛩ Asia', id: 5},
                  {name: '🏄 Oceania', id: 7}
                ].map(({name, id}, index) => {
                  return (
                    <div
                      onClick={() => onContinentClicked(id)}
                      style={continentActiveId === id ? {background: '#0c717e', color: 'white'} : {}}
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
          <table className="divide-y divide-gray-200 mt-6 col-span-2 w-[60%]">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost of living
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Languages
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Continent
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {countryIso.map(({emoji, name, cost_of_livings, language_country_isos, continent}, index) => {
                if (
                  (!continentActiveId || continentActiveId === continent.id) &&
                  maxCostOfLiving > cost_of_livings[0].single_person
                )
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {emoji} {name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">€ {cost_of_livings[0].single_person}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{language_country_isos[0].language.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{continent.name}</td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Home;
