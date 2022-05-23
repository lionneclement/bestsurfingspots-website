import type {GetServerSidePropsContext, GetStaticPropsResult, NextPage} from 'next';
import Head from 'next/head';
import {useMemo} from 'react';
import {Column, useSortBy, useTable} from 'react-table';
import {graphqlClient} from '../graphql/GraphqlClient';
import {SURF_AREA_BY_ID} from '../graphql/query/SurfAreaQuery';
import {SurfAreaById, SurfAreaByIdVariable} from '../graphql/types/SurfArea';
import {customSlugify} from '../utils/slugify';

interface Props {
  surfArea: SurfAreaById;
}

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {id, slug} = context.query;

  if (!id) return {notFound: true};

  const countryIsoResult = await graphqlClient.query<{surfArea: SurfAreaById}, SurfAreaByIdVariable>({
    query: SURF_AREA_BY_ID,
    variables: {surfAreaId: Number(id)}
  });
  const surfArea = countryIsoResult.data.surfArea;

  if (slug !== customSlugify(surfArea.name)) return {notFound: true};

  return {props: {surfArea: countryIsoResult.data.surfArea}};
};

const SurfArea: NextPage<Props> = ({surfArea}) => {
  const columns: Array<Column<{spot: string; star: string; level: string}>> = useMemo(
    () => [
      {Header: 'Spot', accessor: 'spot'},
      {Header: 'Level', accessor: 'level'},
      {Header: 'Star', accessor: 'star'}
    ],
    []
  );

  const data = useMemo(
    () =>
      surfArea.surf_spots!.map(({name, solid_rating, level_surf_spots}) => {
        return {
          spot: name,
          star: `${solid_rating}/5`,
          level: level_surf_spots?.map(({level}) => level.name).join(' | ') || ''
        };
      }),
    [surfArea]
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data}, useSortBy);
  return (
    <>
      <Head>
        <title>Best Surfing Spots in {surfArea.name}</title>
        <meta name="description" content="the best places to surf in the world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container py-10">
        <h1 className="text-center text-primary font-bold text-4xl">Best Surfing Spots in {surfArea.name}</h1>
        <table {...getTableProps()} className="divide-y divide-gray-200 w-full mt-8">
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup, groupsIndex) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={groupsIndex}>
                {headerGroup.headers.map((column: any, columnIndex) => {
                  return (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={columnIndex}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIndex} className="relative">
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <td {...cell.getCellProps()} key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default SurfArea;
