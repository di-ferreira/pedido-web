import React from 'react';
import { TableHeaderCell, TableHeaderRow } from './styles';
import { iColumnType } from '../../@types/Table';

interface iHeaderProps<T> {
  columns: iColumnType<T>[];
}

function TableHeader<T>({ columns }: iHeaderProps<T>): JSX.Element {
  return (
    <TableHeaderRow>
      {columns.map((column, idx) => (
        <React.Fragment key={idx}>
          {
            <TableHeaderCell
              isHideMobile={column.isHideMobile}
              key={`table-head-cell-${column.title}`}
              min_width={column.width}
            >
              {column.title}
            </TableHeaderCell>
          }
        </React.Fragment>
      ))}
    </TableHeaderRow>
  );
}

export default TableHeader;

