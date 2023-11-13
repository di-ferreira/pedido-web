import { create } from 'zustand';
import { iCliente } from '../../@types/Cliente';
import { iFilter } from '../../@types/Filter';
import { iVendedor } from '../../@types/Vendedor';
import api from '../../services/index';
import { VENDEDOR_STORE } from '../../utils/Constants';

interface iDataCliente {
  Qtd_Registros: number;
  value: iCliente[];
}

interface iUseCliente {
  GetClientes: (filter?: iFilter<iCliente>) => Promise<iDataCliente>;
}

const ROUTE_CLIENTE = '/Clientes';

const CreateFilter = (filter: iFilter<iCliente>): string => {
  const VendedorLocal: iVendedor = JSON.parse(String(localStorage.getItem(VENDEDOR_STORE)));

  let ResultFilter: string = `$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}`;

  if (filter.filter && filter.filter.length >= 1) {
    ResultFilter = `$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}`;
    const andStr = ' AND ';
    filter.filter.map((itemFilter) => {
      if (itemFilter.typeSearch) {
        itemFilter.typeSearch === 'like'
          ? (ResultFilter = `${ResultFilter}${andStr} contains(${itemFilter.key}, '${String(
              itemFilter.value,
            ).toUpperCase()}')${andStr}`)
          : itemFilter.typeSearch === 'eq' &&
            (ResultFilter = `${ResultFilter}${andStr}${itemFilter.key} eq '${itemFilter.value}'${andStr}`);
      } else
        ResultFilter = `${ResultFilter}${andStr} contains(${itemFilter.key}, '${String(
          itemFilter.value,
        ).toUpperCase()}')${andStr}`;
      ResultFilter = ResultFilter.slice(0, -andStr.length);
    });
  }

  const ResultOrderBy = filter.orderBy ? `&$orderby=${filter.orderBy}` : '';

  const ResultSkip = filter.skip ? `&$skip=${filter.skip}` : '&$skip=0';

  let ResultTop = filter.top ? `$top=${filter.top}` : '$top=15';

  ResultFilter !== '' ? (ResultTop = `&${ResultTop}`) : (ResultTop = ResultTop);

  const ResultRoute: string = `?${ResultFilter}${ResultTop}${ResultSkip}${ResultOrderBy}&$inlinecount=allpages`;

  return ResultRoute;
};

const GetClientes = async (filter?: iFilter<iCliente>): Promise<iDataCliente> => {
  const VendedorLocal: iVendedor = JSON.parse(String(localStorage.getItem(VENDEDOR_STORE)));

  const FILTER = filter
    ? CreateFilter(filter)
    : `?$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}&$inlinecount=allpages`;
  const response = await api.get(`${ROUTE_CLIENTE}${FILTER}`);
  const result: iDataCliente = {
    Qtd_Registros: response.data['@xdata.count'],
    value: response.data.value,
  };
  return result;
};

const useClientes = create<iUseCliente>((set) => ({
  GetClientes: (filter) => GetClientes(filter),
}));

export default useClientes;
