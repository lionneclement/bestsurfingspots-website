import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid';
import type {GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {Fragment, useState} from 'react';
import {HomeTable} from '../components/HomeTable';
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
        <title>Best Surfing Spots</title>
        <meta name="description" content="the best places to surf in the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1 className="text-center text-primary font-bold text-4xl mt-10">Best Surfing Spots</h1>
        <p className="text-center text-gray-400 font-medium text-lg mt-2">the best places to surf in the world</p>
        <div className="flex justify-around my-6 flex-wrap">
          <div className="relative w-72 z-20">
            <Listbox value={continentSelected} onChange={setContinentSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="font-medium inline-flex w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  <span className="block truncate">{continentSelected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {continentData.map((data, id) => (
                      <Listbox.Option
                        key={id}
                        className={({active}) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-primary text-white' : 'text-gray-900'
                          }`
                        }
                        value={data}>
                        {({selected}) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {data.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="relative w-72 z-10">
            <Listbox value={costOfLivingSelected} onChange={setCostOfLivingSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="font-medium inline-flex w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  <span className="block truncate">{costOfLivingSelected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {costOfLivingData.map((data, id) => (
                      <Listbox.Option
                        key={id}
                        className={({active}) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-primary text-white' : 'text-gray-900'
                          }`
                        }
                        value={data}>
                        {({selected}) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {data.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
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
