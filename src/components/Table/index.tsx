import { iTableProps } from '../../@types/Table';
import TableHeader from './TableHeader';
import { TablePagination } from './TablePagination';
import TableRow from './TableRow';
import { MessageNoData, TableBody, TableWrapper } from './styles';

function Table<T>({
  data,
  columns,
  pagination,
  messageNoData,
}: iTableProps<T>): JSX.Element {
  return (
    <TableWrapper>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      {messageNoData !== '' && data.length === 0 ? (
        <TableBody>
          <MessageNoData>{messageNoData}</MessageNoData>
        </TableBody>
      ) : (
        <>
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
        </>
      )}
    </TableWrapper>
  );
}

export default Table;
