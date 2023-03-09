import { iColumnType } from '../../@types';
import { TableRowCell } from '../TableRowCell';
import { TableRowItem } from './styles';

interface iTableRowProps<T> {
  data: T[];
  columns: iColumnType<T>[];
}

function TableRow<T>({ data, columns }: iTableRowProps<T>): JSX.Element {
  return (
    <>
      {data.map((item, itemIndex) => (
        <TableRowItem key={`table-body-${itemIndex}`}>
          {columns.map((column, columnIndex) => (
            <TableRowCell
              key={`table-row-cell-${columnIndex}`}
              item={item}
              column={column}
            />
          ))}
        </TableRowItem>
      ))}
    </>
  );
}

export default TableRow;

