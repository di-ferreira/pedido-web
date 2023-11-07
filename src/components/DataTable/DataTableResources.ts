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
    ...FilterConfig,
    top: value ? Number(value.value) : RowsPerPage,
    skip: RowsPerPage * CurrentPage - RowsPerPage,
  });
};

const GoToFirstPage = () => {
  setCurrentPage(1);
  OnFetchDataTable({
    ...FilterConfig,
    top: RowsPerPage,
    skip: 0,
  });
};

const GoToNextPage = () => {
  CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage + 1);
  OnFetchDataTable({
    ...FilterConfig,
    top: RowsPerPage,
    skip: SkipPage(),
  });
};

const GoToPrevPage = () => {
  CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage - 1);
  OnFetchDataTable({
    ...FilterConfig,
    top: RowsPerPage,
    skip: SkipPage(false),
  });
};

const GoToLastPage = () => {
  setCurrentPage(TotalPages);
  OnFetchDataTable({
    ...FilterConfig,
    top: RowsPerPage,
    skip: TotalRegisters - RowsPerPage,
  });
};

const OnFetchDataTable = useCallback(
  async (filter?: iFilter<T>) => {
    setMessage('');
    try {
      setIsLoading(true);

      if (onDataFetch) {
        onDataFetch(filter).then(({ Qtd_Registros, value }) => {
          console.log('onDataFetch', value);

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
        });
      } else if (TableData) {
        setData(TableData);

        if (TableData.length === 0) {
          setMessage('Nenhum registro encontrado');
        }
        if (!columns) {
          ConvertColumnsHeders(TableData);
        } else {
          setHeaders(columns);
        }
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
  setFilterConfig((oldFilter) => {
    return { ...filter };
  });
}, []);

