import { iColumnType } from '../../@types';
import { TableCell } from './styles';
import { get } from 'lodash';

interface iTableCellProps<T> {
  item: T;
  column: iColumnType<T>;
}

export function TableRowCell<T>({
  item,
  column,
}: iTableCellProps<T>): JSX.Element {
  const value = get(item, column.key);
  return (
    <TableCell>{column.render ? column.render(column, item) : value}</TableCell>
  );
}

