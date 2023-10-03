import { useCallback, useEffect, useState } from 'react';
import { iFilter } from '../../@types/Filter';
import { iColumnType, iOption } from '../../@types/Table';
import { Loading } from '../Loading';
import TableHeader from './TableHeader';
import { TablePagination } from './TablePagination';
import TableRow from './TableRow';
import { MessageNoData, TableBody, TableWrapper } from './styles';

interface iDataResultTable<T> {
  Qtd_Registros: number;
  value: T[];
}
interface iTableDataProps<T> {
  pagination?: boolean;
  columns?: iColumnType<T>[];
  filter?: iFilter<T>;
  onDataFetch: (filter?: iFilter<T>) => Promise<iDataResultTable<T>>;
}

function Table<T>({
  onDataFetch,
  columns,
  pagination,
  filter,
}: iTableDataProps<T>): JSX.Element {
  const [FilterConfig, setFilterConfig] = useState<iFilter<T>>({
    skip: 0,
    top: 15,
    filter: filter?.filter,
  });
  const [CurrentPage, setCurrentPage] = useState<number>(1);
  const [RowsPerPage, setRowsPerPage] = useState<number>(15);
  const [TotalPages, setTotalPages] = useState<number>(1);
  const [TotalRegisters, setTotalRegisters] = useState<number>(1);

  const [Message, setMessage] = useState<string>('');
  const [Data, setData] = useState<T[]>([]);
  const [Headers, setHeaders] = useState<iColumnType<T>[]>([]);
  const [IsLoading, setIsLoading] = useState<boolean>(false);

  const ConvertColumnsHeders = (column: T[]) => {
    const keyNames = Object.keys(column[0] as {});

    let headers: iColumnType<T>[] = [];

    keyNames.forEach((keyName) => {
      headers.push({
        key: keyName,
        title: keyName.replaceAll('_', ' ').replaceAll('-', ' ').toUpperCase(),
      });
    });
    setHeaders(headers);
  };

  const SkipPage = (
    NextPage: boolean = true,
    RegPerPage: number = RowsPerPage
  ): number => {
    let CurPage = NextPage ? CurrentPage + 1 : CurrentPage - 1;
    const Skip = RegPerPage * CurPage - RegPerPage;
    return Skip;
  };

  const ChangeRowsPerPage = (value: iOption) => {
    setRowsPerPage((oldValue) => {
      oldValue = Number(value.value);
      return oldValue;
    });

    OnFetchDataTable({
      top: value ? Number(value.value) : RowsPerPage,
      skip: RowsPerPage * CurrentPage - RowsPerPage,
      orderBy: FilterConfig.orderBy,
      filter: FilterConfig.filter,
    });
  };

  const GoToFirstPage = () => {
    setCurrentPage(1);
    OnFetchDataTable({
      top: RowsPerPage,
      skip: 0,
      orderBy: FilterConfig.orderBy,
      filter: FilterConfig.filter,
    });
  };

  const GoToNextPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage + 1);
    OnFetchDataTable({
      top: RowsPerPage,
      skip: SkipPage(),
      orderBy: FilterConfig.orderBy,
      filter: FilterConfig.filter,
    });
  };

  const GoToPrevPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage - 1);
    OnFetchDataTable({
      top: RowsPerPage,
      skip: SkipPage(false),
      orderBy: FilterConfig.orderBy,
      filter: FilterConfig.filter,
    });
  };

  const GoToLastPage = () => {
    setCurrentPage(TotalPages);
    OnFetchDataTable({
      top: RowsPerPage,
      skip: TotalRegisters - RowsPerPage,
      orderBy: FilterConfig.orderBy,
      filter: FilterConfig.filter,
    });
  };

  const OnFetchDataTable = useCallback(
    async (filter?: iFilter<T>) => {
      setMessage('');
      try {
        setIsLoading(true);
        const { Qtd_Registros, value } = await onDataFetch(filter);
        setData(value);
        setTotalPages(Math.ceil(Qtd_Registros / RowsPerPage));
        setTotalRegisters(Qtd_Registros);

        if (Qtd_Registros === 0) {
          setMessage('Nenhum registro encontrado');
        }
        if (!columns) {
          ConvertColumnsHeders(value);
        } else {
          setHeaders(columns);
        }
      } catch (error: any) {
        setMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [setData, setRowsPerPage, onDataFetch, setTotalRegisters, setFilterConfig]
  );

  useEffect(() => {
    OnFetchDataTable();
  }, []);

  return (
    <TableWrapper>
      {IsLoading ? (
        <Loading />
      ) : (
        <>
          <thead>
            <TableHeader columns={Headers} />
          </thead>
          {Message !== '' || Data.length === 0 ? (
            <TableBody>
              <MessageNoData>{Message}</MessageNoData>
            </TableBody>
          ) : (
            <>
              <TableBody>
                <TableRow data={Data} columns={Headers} />
              </TableBody>
              {pagination && (
                <tfoot>
                  <TablePagination
                    CurrentPage={CurrentPage}
                    TotalPages={TotalPages}
                    RowsPerPage={RowsPerPage}
                    onChange={ChangeRowsPerPage}
                    onFirstPage={GoToFirstPage}
                    onNextPage={GoToNextPage}
                    onPrevPage={GoToPrevPage}
                    onLastPage={GoToLastPage}
                  />
                </tfoot>
              )}
            </>
          )}
        </>
      )}
    </TableWrapper>
  );
}

export default Table;
