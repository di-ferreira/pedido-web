import React from 'react';
import { iColumnType } from '../../@types';
import { TableHeaderCell, TableHeaderRow } from './styles';

interface iHeaderProps<T> {
  columns: iColumnType<T>[];
}

function TableHeader<T>({ columns }: iHeaderProps<T>): JSX.Element {
  return (
    <TableHeaderRow>
      {columns.map((column, idx) => (
        <React.Fragment key={idx}>
          {!column.isHideMobile && (
            <TableHeaderCell
              key={`table-head-cell-${column.title}`}
              style={{ width: column.width }}
            >
              {column.title}
            </TableHeaderCell>
          )}
        </React.Fragment>
      ))}
    </TableHeaderRow>
  );
}

export default TableHeader;

