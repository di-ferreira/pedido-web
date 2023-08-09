import { iColumnType } from '../../../@types/Table';
import { TableCell } from './styles';

interface iTableCellProps<T> {
  item: T;
  column: iColumnType<T>;
}

export function TableRowHeaderCell<T>({
  item,
  column,
}: iTableCellProps<T>): JSX.Element {
  return (
    <>
      {
        <TableCell isHideMobile={column.isHideMobile} min_width={column.width}>
          {column.title}
        </TableCell>
      }
    </>
  );
}

