import { iColumnType } from '../../@types';
import { TableHeaderCell, TableHeaderRow } from './styles';

interface iHeaderProps<T> {
  columns: iColumnType<T>[];
}

function TableHeader<T>({ columns }: iHeaderProps<T>): JSX.Element {
  return (
    <TableHeaderRow>
      {columns.map((column, columnIndex) => (
        <TableHeaderCell
          key={`table-head-cell-${columnIndex}`}
          style={{ width: column.width }}
        >
          {column.title}
        </TableHeaderCell>
      ))}
    </TableHeaderRow>
  );
}

export default TableHeader;

