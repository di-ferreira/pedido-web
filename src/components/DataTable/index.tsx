import { iColumnType, iTablePagination } from '../../@types/Table';
import TableHeader from './TableHeader';
import { TablePagination } from './TablePagination';
import TableRow from './TableRow';
import { MessageNoData, TableBody, TableWrapper } from './styles';

type iTableDataProps<T> = {
  pagination?: iTablePagination;
  ErrorMessage: string;
  columns: iColumnType<T>[];
  TableData: T[];
};

export function DataTable<T>({
  columns,
  pagination,
  TableData,
  ErrorMessage,
}: iTableDataProps<T>): JSX.Element {
  return (
    <TableWrapper>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <TableBody>
        {ErrorMessage !== '' || TableData.length === 0 ? (
          <MessageNoData>{ErrorMessage}</MessageNoData>
        ) : (
          <TableRow data={TableData} columns={columns} />
        )}
      </TableBody>
      {pagination && (
        <tfoot>
          <TablePagination
            CurrentPage={pagination.CurrentPage}
            TotalPages={pagination.TotalPages}
            RowsPerPage={pagination.RowsPerPage}
            onChange={pagination.onChange}
            onFirstPage={pagination.onFirstPage}
            onNextPage={pagination.onNextPage}
            onPrevPage={pagination.onPrevPage}
            onLastPage={pagination.onLastPage}
          />
        </tfoot>
      )}
    </TableWrapper>
  );
}
