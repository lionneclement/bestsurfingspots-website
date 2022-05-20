import type {GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {useMemo, useState} from 'react';
import {Column, useSortBy, useTable} from 'react-table';
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

  const columns: Array<Column<{country: string; 'cost-of-living': string; languages: string; continent: string}>> =
    useMemo(
      () => [
        {
          Header: 'Country',
          accessor: 'country'
        },
        {
          Header: 'Cost of living',
          accessor: 'cost-of-living'
        },
        {
          Header: 'Languages',
          accessor: 'languages'
        },
        {
          Header: 'Continent',
          accessor: 'continent'
        }
      ],
      []
    );

  const data = useMemo(
    () =>
      countryIso.map(({emoji, name, cost_of_livings, language_country_isos, continent}) => {
        return {
          country: `${emoji} ${name}`,
          'cost-of-living': `€ ${cost_of_livings[0].single_person}`,
          languages: language_country_isos[0].language.name,
          continent: continent.name
        };
      }),
    [countryIso]
  );

  const tableInstance = useTable({columns, data}, useSortBy);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;

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
          <table {...getTableProps()} className="divide-y divide-gray-200 mt-6 col-span-2 w-[60%]">
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column: any) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => {
                      return (
                        <td {...cell.getCellProps()} key={index} className="px-6 py-4 whitespace-nowrap">
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
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
