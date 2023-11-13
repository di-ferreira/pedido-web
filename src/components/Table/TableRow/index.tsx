import { iColumnType } from '../../../@types/Table';
import { TableRowCell } from '../TableRowCell';
import { TableRowHeaderCell } from '../TableRowHeaderCell';
import { TableCellContainer, TableRowItem } from './styles';

interface iTableRowProps<T> {
  data: T[];
  columns: iColumnType<T>[];
}

function TableRow<T>({ data, columns }: iTableRowProps<T>): JSX.Element {
  return (
    <>
      {data.map((item, idx) => (
        <TableRowItem key={`${idx}`}>
          {columns.map((column, columnIndex) => (
            <>
              <TableRowCell key={`table-row-cell-${columnIndex}`} item={item} column={column} />
              <TableCellContainer isHideMobile={column.isHideMobile}>
                <TableRowHeaderCell
                  key={`table-row-header-cell-${columnIndex}`}
                  item={item}
                  column={column}
                />
                <TableRowCell key={`table-row-cell-${columnIndex}`} item={item} column={column} />
              </TableCellContainer>
            </>
          ))}
        </TableRowItem>
      ))}
    </>
  );
}

export default TableRow;
