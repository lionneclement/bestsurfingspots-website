import {useEffect, useMemo} from 'react';
import {Column, useFilters, useSortBy, useTable} from 'react-table';
import {continentData} from '../data/ContinentData';
import {HomeCountryIso} from '../graphql/types/CountryIso';

export const HomeTable = ({
  countryIso,
  costOfLiving,
  continentId
}: {
  countryIso: HomeCountryIso[];
  costOfLiving: number;
  continentId?: number;
}) => {
  const costOfLivingFilter = (rows: {original: {costofliving: string}}[], _: string[], costofliving: number) =>
    rows.filter((row) => Number(row.original.costofliving.replace('€ ', '')) <= costofliving);

  const continentFilter = (rows: {original: {continent: string}}[], _: string[], continentId: number) => {
    console.log('continentId: ', continentId);
    const continentName = continentData.filter(({id})=> id === continentId)[0].name;
    console.log('continentName: ', continentName);
    return rows.filter((row) => continentName.includes(row.original.continent));
  };

  const columns: Array<Column<{country: string; costofliving: string; languages: string; continent: string}>> = useMemo(
    () => [
      {Header: 'Country', accessor: 'country'},
      {
        Header: 'Cost of living',
        accessor: 'costofliving',
        filter: costOfLivingFilter
      },
      {Header: 'Languages', accessor: 'languages'},
      {Header: 'Continent', accessor: 'continent', filter: continentFilter}
    ],
    []
  );

  const data = useMemo(
    () =>
      countryIso.map(({emoji, name, cost_of_livings, language_country_isos, continent}) => {
        return {
          country: `${emoji} ${name}`,
          costofliving: `€ ${cost_of_livings[0].single_person}`,
          languages: language_country_isos[0].language.name,
          continent: continent.name
        };
      }),
    [countryIso]
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setFilter} = useTable(
    {columns, data},
    useFilters,
    useSortBy
  );

  useEffect(() => setFilter('costofliving', costOfLiving), [costOfLiving]);

  useEffect(() => setFilter('continent', continentId), [continentId]);

  return (
    <table {...getTableProps()} className="divide-y divide-gray-200 mt-6 col-span-2 w-[60%]">
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
            <tr {...row.getRowProps()} key={rowIndex}>
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
  );
};