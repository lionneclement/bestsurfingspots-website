import {useMemo} from 'react';
import {Column, useSortBy, useTable} from 'react-table';
import {SurfAreaById} from '../graphql/types/SurfArea';

export const SurfAreaTable = ({surfArea}: {surfArea: SurfAreaById}) => {
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
  );
};
