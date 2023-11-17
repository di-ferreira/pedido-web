import { JSX } from 'react';
import { iColumnType } from '../../@types/Table';
import { Loading } from '../Loading';
import TableHeader from './TableHeader';
import { TablePagination } from './TablePagination';
import TableRow from './TableRow';
import { MessageNoData, TableBody, TableWrapper } from './styles';

type iTableDataProps<T> = {
  ErrorMessage?: string;
  columns: iColumnType<T>[];
  TableData: T[];
  QuantityRegiters?: number;
  IsLoading: boolean;
  onFetchPagination?: (top: number, skip: number) => void;
};

export function DataTable<T>({
  columns,
  TableData,
  ErrorMessage,
  onFetchPagination,
  QuantityRegiters,
  IsLoading,
}: iTableDataProps<T>): JSX.Element {
  return (
    <TableWrapper>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <TableBody>
        {IsLoading && <Loading />}

        {!IsLoading && <TableRow data={TableData} columns={columns} />}

        {ErrorMessage !== '' && TableData.length === 0 && (
          <MessageNoData>{ErrorMessage}</MessageNoData>
        )}
      </TableBody>
      {onFetchPagination && QuantityRegiters && (
        <tfoot>
          <TablePagination OnFetchData={onFetchPagination} QuantityRegiters={QuantityRegiters} />
        </tfoot>
      )}
    </TableWrapper>
  );
}
