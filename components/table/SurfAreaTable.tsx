import {StarIcon as StartIconOutline} from '@heroicons/react/outline';
import {StarIcon as StartIconSolid} from '@heroicons/react/solid';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {Column, useSortBy, useTable} from 'react-table';
import {SurfAreaById} from '../../graphql/types/SurfArea';
import {customSlugify} from '../../utils/slugify';

export const SurfAreaTable = ({surfArea}: {surfArea: SurfAreaById}) => {
  const {push} = useRouter();
  const columns: Array<Column<{spot: string; star: number}>> = useMemo(
    () => [
      {Header: 'Spot', accessor: 'spot'},
      {Header: 'Star', accessor: 'star'}
    ],
    []
  );

  const data = useMemo(
    () =>
      surfArea.surf_spots!.map(({name, solid_rating, id}) => {
        return {
          spot: name,
          star: solid_rating || 0,
          id
        };
      }),
    [surfArea]
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data}, useSortBy);

  return (
    <table {...getTableProps()} className="divide-y divide-gray-200 w-full mt-8">
      <thead className="bg-gray-50">
        {headerGroups.map((headerGroup) => {
          const restHeaderGroup = headerGroup.getHeaderGroupProps();
          return (
            <tr {...restHeaderGroup} key={restHeaderGroup.key}>
              {headerGroup.headers.map((column: any) => {
                const restColumn = column.getHeaderProps(column.getSortByToggleProps());
                return (
                  <th
                    key={restColumn.key}
                    {...restColumn}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column.render('Header')}
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={rowIndex}
              role="button"
              onClick={() =>
                push(
                  customSlugify(
                    // @ts-ignore
                    `/surf-spot/${row.cells[0].row.original.id}-${row.cells[0].row.original.spot.replace('/', '')}`
                  )
                )
              }>
              {row.cells.map((cell, cellIndex) => {
                return (
                  <td {...cell.getCellProps()} key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                    {cell.column.id === 'star' ? (
                      <div className="flex">
                        {Array.from({length: 5}, (_, i) => i + 1).map((index) =>
                          index <= (cell.value || 0) ? (
                            <StartIconSolid key={index} className="h-5 w-5 text-primary" />
                          ) : (
                            <StartIconOutline key={index} className="h-5 w-5 text-primary" />
                          )
                        )}
                      </div>
                    ) : (
                      <Link
                        href={customSlugify(
                          // @ts-ignore
                          `/surf-spot/${cell.row.original.id}-${cell.row.original.spot.replace('/', '')}`
                        )}>
                        <a title={cell.value.spot}>
                          <h2>{cell.render('Cell')}</h2>
                        </a>
                      </Link>
                    )}
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
