import { create } from 'zustand';
import { iDataResult } from '../../@types';
import { iFilter } from '../../@types/Filter';
import { iOrcamento, iOrcamentoInserir } from '../../@types/Orcamento';
import { iMovimento, iPreVenda } from '../../@types/PreVenda';
import { iVendedor } from '../../@types/Vendedor';
import { VENDEDOR_STORE } from '../../Constants';
import api from '../../services/index';

interface iDataOrcamento {
  Qtd_Registros: number;
  value: iMovimento[];
}

interface iDataCreateOrcamento {
  data: iDataResult<iMovimento>;
}

interface iResultPreVenda {
  data: {
    value: iMovimento[];
  };
}

interface iUseOrcamento {
  SavePreVenda: (orcamento: iOrcamento) => Promise<iDataResult<iPreVenda>>;
  GetPreVenda: (IdPV: number) => Promise<iResultPreVenda>;
  GetPreVendas: (filter?: iFilter<iPreVenda>) => Promise<iDataOrcamento>;
}

const ROUTE_GET_ALL_PRE_VENDA = '/Movimento';
const ROUTE_SAVE_PRE_VENDA = '/ServiceVendas/NovaPreVenda';

const CreateFilter = (filter: iFilter<iPreVenda>): string => {
  let VendedorLocal: iVendedor = JSON.parse(
    String(localStorage.getItem(VENDEDOR_STORE))
  );

  let ResultFilter: string = `$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}`;

  if (filter.filter && filter.filter.length >= 1) {
    ResultFilter = `$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR}`;
    let andStr = ' AND ';
    filter.filter.map((itemFilter) => {
      if (itemFilter.typeSearch)
        itemFilter.typeSearch === 'like'
          ? (ResultFilter = `${ResultFilter}${andStr}${
              itemFilter.key
            } like '% ${String(itemFilter.value).toUpperCase()} %'${andStr}`)
          : itemFilter.typeSearch === 'eq' &&
            (ResultFilter = `${ResultFilter}${andStr}${itemFilter.key} eq '${itemFilter.value}'${andStr}`);
      else
        ResultFilter = `${ResultFilter}${andStr}${
          itemFilter.key
        } like '% ${String(itemFilter.value).toUpperCase()} %'${andStr}`;
    });
    ResultFilter = ResultFilter.slice(0, -andStr.length);
  }

  let ResultOrderBy = filter.orderBy ? `&$orderby=${filter.orderBy}` : '';

  let ResultSkip = filter.skip ? `&$skip=${filter.skip}` : '&$skip=0';

  let ResultTop = filter.top ? `$top=${filter.top}` : '$top=15';

  ResultFilter !== '' ? (ResultTop = `&${ResultTop}`) : (ResultTop = ResultTop);

  let ResultRoute: string = `?${ResultFilter}${ResultTop}${ResultSkip}${ResultOrderBy}&$inlinecount=allpages`;
  return ResultRoute;
};

const GetPreVendas = async (
  filter?: iFilter<iPreVenda>
): Promise<iDataOrcamento> => {
  let VendedorLocal: iVendedor = JSON.parse(
    String(localStorage.getItem(VENDEDOR_STORE))
  );

  const FILTER = filter
    ? CreateFilter(filter)
    : `?$filter=VENDEDOR eq ${VendedorLocal.VENDEDOR} and TIPOMOV eq 'PRE-VENDA'and CANCELADO eq 'N'&$top=15&$inlinecount=allpages&$orderby=DATA desc&$expand=CLIENTE,VENDEDOR,Itens_List`;

  const response = await api.get(`${ROUTE_GET_ALL_PRE_VENDA}${FILTER}`);

  let result: iDataOrcamento = {
    Qtd_Registros: response.data['@xdata.count'],
    value: response.data.value,
  };

  return result;
};

const GetPreVenda = (IdPV: number): Promise<iResultPreVenda> => {
  return api.get(
    `${ROUTE_GET_ALL_PRE_VENDA}?$filter=MOVIMENTO eq ${IdPV} and TIPOMOV eq 'PRE-VENDA'and CANCELADO eq 'N'&$top=15&$expand=CLIENTE,VENDEDOR,Itens_List`
  );
};

const SavePreVenda = (
  orcamento: iOrcamento
): Promise<iDataResult<iPreVenda>> => {
  // let ItensOrcamento: iItemInserir[] = [];

  // orcamento.ItensOrcamento?.map((item) => {
  //   let ItemInsert: iItemInserir = {
  //     pIdOrcamento: 0,
  //     pItemOrcamento: {
  //       CodigoProduto: item.PRODUTO ? item.PRODUTO.PRODUTO : '',
  //       Qtd: item.QTD,
  //       SubTotal: item.SUBTOTAL,
  //       Tabela: item.TABELA ? item.TABELA : 'SISTEMA',
  //       Total: item.TOTAL,
  //       Valor: item.VALOR,
  //       Frete: 0,
  //       Desconto: 0,
  //     },
  //   };
  //   ItensOrcamento.push(ItemInsert);
  // });

  const OrcamentoInsert: iOrcamentoInserir = {
    CodigoCliente: orcamento.CLIENTE.CLIENTE,
    CodigoVendedor1: orcamento.VENDEDOR.VENDEDOR,
    Total: orcamento.TOTAL,
    SubTotal: orcamento.TOTAL,
    // Itens: ItensOrcamento,
  };

  return api.post(ROUTE_SAVE_PRE_VENDA, OrcamentoInsert);
};

const usePreVenda = create<iUseOrcamento>((set) => ({
  SavePreVenda: (orcamento: iOrcamento) => SavePreVenda(orcamento),
  GetPreVenda: (IdPreVenda: number) => GetPreVenda(IdPreVenda),
  GetPreVendas: (filter) => GetPreVendas(filter),
}));

export default usePreVenda;
