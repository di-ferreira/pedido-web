import { iTableProps } from '../../@types/Table';
import TableHeader from '../TableHeader';
import { TablePagination } from '../TablePagination';
import TableRow from '../TableRow';
import { TableWrapper, TableBody, MessageNoData } from './styles';

function Table<T>({
  data,
  columns,
  pagination,
  messageNoData,
}: iTableProps<T>): JSX.Element {
  return messageNoData !== '' && data.length === 0 ? (
    <MessageNoData>{messageNoData}</MessageNoData>
  ) : (
    <TableWrapper>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <TableBody>
        <TableRow data={data} columns={columns} />
      </TableBody>
      <tfoot>
        {pagination && (
          <TablePagination
            CurrentPage={pagination.CurrentPage}
            TotalPages={pagination.TotalPages}
            RowsPerPage={pagination.RowsPerPage}
            onChange={pagination.onChange}
            onNextPage={pagination.onNextPage}
            onFirstPage={pagination.onFirstPage}
            onLastPage={pagination.onLastPage}
            onPrevPage={pagination.onPrevPage}
          />
        )}
      </tfoot>
    </TableWrapper>
  );
}

export default Table;
