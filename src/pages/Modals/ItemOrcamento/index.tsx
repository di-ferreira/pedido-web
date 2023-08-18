import React, { useCallback, useEffect, useState } from 'react';

import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormEditOrcamento, FormFooter } from './styles';

import dayjs from 'dayjs';
import { SingleValue } from 'react-select';
import { toast } from 'react-toastify';
import { iItensOrcamento } from '../../../@types/Orcamento';
import { iListaChave, iProduto, iTabelaVenda } from '../../../@types/Produto';
import { iColumnType, iOption } from '../../../@types/Table';
import Button from '../../../components/Button';
import { FlexComponent } from '../../../components/FlexComponent';
import { InputCustom } from '../../../components/InputCustom';
import Table from '../../../components/Table';
import { TextAreaCustom } from '../../../components/TextAreaCustom';
import useSelect from '../../../hooks/UseSelect';
import useModal from '../../../hooks/useModal';
import useProduto from '../../../hooks/useProduto';
import { useTheme } from '../../../hooks/useTheme';
import { ObjectIsEmpty } from '../../../utils';
import { ModalProduto } from '../Produto';

export interface callback {
  itemOrcamento: iItensOrcamento;
  saveorupdate: boolean;
}

interface iModalItemOrcamento {
  Item: iItensOrcamento;
  callback: (item: callback) => void;
}

export const ModalItemOrcamento: React.FC<iModalItemOrcamento> = ({
  Item,
  callback,
}) => {
  const { GetTabelasFromProduto, GetProdutosSuperBusca } = useProduto();
  const { Select } = useSelect();
  const { Modal, showModal, OnCloseModal } = useModal();
  const { ThemeName } = useTheme();
  const [ItemOrcamento, setItemOrcamento] = useState<iItensOrcamento>(
    {} as iItensOrcamento
  );

  const [ProdutoPalavras, setProdutoPalavras] = useState<string>('');
  const [Produtos, setProdutos] = useState<iProduto[]>([]);
  const [Chaves, setChaves] = useState<iListaChave[]>([]);
  const [Price, setPrice] = useState<number>(0.0);
  const [Total, setTotal] = useState<number>(0.0);
  const [QTDProduto, setQTDProduto] = useState<number>(1);
  const [SaveOrUpdateItem, setSaveOrUpdateItem] = useState<boolean>(false);
  const [Tabelas, setTabelas] = useState<iOption[]>([]);
  const [TabelaSelected, setTabelaSelected] = useState<iOption>({} as iOption);

  useEffect(() => {
    showModal();
    setSaveOrUpdateItem(false);

    setItemOrcamento({
      ...Item,
      PRODUTO: Item.PRODUTO,
      TOTAL: Item.TOTAL,
    });

    if (!ObjectIsEmpty(Item.PRODUTO)) {
      GetTabelas(Item.PRODUTO);
      setSaveOrUpdateItem(true);
      setProdutoPalavras(Item.PRODUTO.PRODUTO);
      if (Item.PRODUTO.ListaChaves !== undefined)
        setChaves(Item.PRODUTO.ListaChaves);
    }
    setTabelaSelected({
      label: `${Item.TABELA} - ${Item.VALOR.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}`,
      value: Item.VALOR,
    });
    setPrice(Item.TOTAL / Item.QTD);
    setTotal(Item.TOTAL);
    setQTDProduto(Item.QTD);
    setProdutos([]);
  }, [Item]);

  const fetchProdutoList = async (busca: string) => {
    const response = await GetProdutosSuperBusca({ Palavras: busca });

    const { data } = response;

    let ProdutosList: iProduto[] = data.Data;

    if (ProdutosList.length > 1) {
      setProdutos(ProdutosList);
    } else if (ProdutosList[0]) {
      ProdutoToItem(ProdutosList[0]);
      setProdutoPalavras(ProdutosList[0].PRODUTO);
      setChaves(ProdutosList[0].ListaChaves);
    } else {
      toast.error('Opps, Não encontrou nenhum PRODUTO 🤯', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: ThemeName,
      });
    }
  };

  const OnChangeInputQTD = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const { value } = e.target;

      let newQTD: number = parseInt(value) <= 0 ? 1 : parseInt(value);

      setQTDProduto(newQTD);

      setItemOrcamento({
        ...ItemOrcamento,
        QTD: newQTD,
        VALOR: Number(TabelaSelected?.value),
        TOTAL: Number(TabelaSelected?.value) * newQTD,
      });

      setPrice(Number(TabelaSelected?.value));
      setTotal(Number(TabelaSelected?.value) * newQTD);
    },
    [QTDProduto, ItemOrcamento, Price, Total]
  );

  const CalcTabela = useCallback(
    (value: SingleValue<iOption>) => {
      setTabelaSelected({
        label: String(value?.label),
        value: Number(value?.value),
      });

      setItemOrcamento({
        ...ItemOrcamento,
        VALOR: Number(value?.value),
        TOTAL: Number(value?.value) * QTDProduto,
      });

      setPrice(Number(value?.value));
      setTotal(Number(value?.value) * QTDProduto);
    },
    [Tabelas, ItemOrcamento, Price, Total]
  );

  const OnProdutoPalavras = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProdutoPalavras(e.target.value.toUpperCase());
    },
    [ProdutoPalavras]
  );

  const OnSearchProduto = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchProdutoList(e.currentTarget.value);
    }
  };

  const GetTabelas = async (produto: iProduto) => {
    let tabelas: iTabelaVenda[] = [];
    await GetTabelasFromProduto(produto).then((tabs) => {
      tabelas = [...tabs];
      let tabOptions: iOption[] = [];
      tabelas.map((tab) =>
        tabOptions.push({
          label: `${tab.TABELA} - ${tab.PRECO.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}`,
          value: tab.PRECO,
        })
      );
      setTabelas(tabOptions);
    });
  };

  const ProdutoToItem = async (produto: iProduto) => {
    setProdutoPalavras(produto.PRODUTO);

    await GetTabelas(produto);

    setItemOrcamento({
      ...ItemOrcamento,
      PRODUTO: produto,
      SUBTOTAL: Number(TabelaSelected?.value) * QTDProduto,
      TOTAL: Number(TabelaSelected?.value) * QTDProduto,
      VALOR: Number(TabelaSelected?.value),
    });
    setTotal(Number(TabelaSelected?.value) * QTDProduto);
    setPrice(Number(TabelaSelected?.value));
    setChaves(produto.ListaChaves);
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    const tabelaSplited = TabelaSelected.label.split('-');
    let tabela: string = tabelaSplited[0].replace(/\s/g, '');

    e.preventDefault();
    let result: callback = {
      itemOrcamento: {
        ...ItemOrcamento,
        TABELA: tabela,
        VALOR: ItemOrcamento.VALOR,
        TOTAL: ItemOrcamento.TOTAL,
        SUBTOTAL: ItemOrcamento.TOTAL,
      },
      saveorupdate: SaveOrUpdateItem,
    };
    setItemOrcamento(result.itemOrcamento);
    callback(result);
    setProdutoPalavras('');
    setProdutos([]);
    setItemOrcamento({} as iItensOrcamento);
    OnCloseModal();
  };

  const tableChavesHeaders: iColumnType<iListaChave>[] = [
    {
      key: 'DATA_ATUALIZACAO',
      title: 'DATA ATUALIZACAO',
      width: '30%',
      render: (_, item) => {
        return dayjs(item.DATA_ATUALIZACAO).format('DD/MM/YYYY');
      },
    },
    {
      key: 'CNA',
      title: 'DOC',
      width: '10%',
    },
    {
      key: 'Chave',
      title: 'CHAVE',
      width: '25%',
    },
  ];

  return (
    <>
      {Modal && (
        <Modal
          Title={`ADD ITEM AO ORÇAMENTO Nº ${ItemOrcamento?.ORCAMENTO.ORCAMENTO}`}
          width='95vw'
          height='95vh'
          sm={{ width: '100%', height: '100vh' }}
          xs={{ width: '100%', height: '100vh' }}
        >
          <FormEditOrcamento onSubmit={(e) => onSubmitForm(e)}>
            <FlexComponent gapColumn='2rem' sm={{ direction: 'column' }}>
              <FlexComponent
                width='70%'
                direction='column'
                gapRow='1rem'
                sm={{ width: '100%' }}
              >
                <FlexComponent
                  gapColumn='1rem'
                  sm={{ direction: 'column', gapRow: '1rem' }}
                >
                  <FlexComponent flexGrow={1}>
                    <InputCustom
                      onChange={OnProdutoPalavras}
                      onKeydown={OnSearchProduto}
                      value={ProdutoPalavras}
                      name='ProdutoPalavras'
                      label='PRODUTO'
                    />
                  </FlexComponent>
                  <FlexComponent flexGrow={1}>
                    <InputCustom
                      readOnly={true}
                      label='REFERÊNCIA'
                      name='REFERENCIA'
                      value={ItemOrcamento.PRODUTO?.REFERENCIA}
                    />
                  </FlexComponent>
                  <FlexComponent flexGrow={1}>
                    <InputCustom
                      label='FABRICANTE'
                      readOnly={true}
                      name='FABRICANTE'
                      value={ItemOrcamento.PRODUTO?.FABRICANTE?.NOME}
                    />
                  </FlexComponent>
                  <FlexComponent flexGrow={1}>
                    <InputCustom
                      label='LOCALIZAÇÃO'
                      readOnly={true}
                      name='LOCALIZACAO'
                      value={ItemOrcamento.PRODUTO?.LOCAL}
                    />
                  </FlexComponent>
                </FlexComponent>
                <FlexComponent direction='column' gapRow='1rem'>
                  <FlexComponent>
                    <InputCustom
                      label='NOME DO PRODUTO'
                      readOnly={true}
                      name='PRODUTO.NOME'
                      value={ItemOrcamento.PRODUTO?.NOME}
                    />
                  </FlexComponent>
                  <FlexComponent>
                    <TextAreaCustom
                      label='APLICAÇÃO PRODUTO'
                      readOnly={true}
                      name='APLICACAO'
                      value={ItemOrcamento.PRODUTO?.APLICACOES}
                    />
                  </FlexComponent>
                  <FlexComponent>
                    <TextAreaCustom
                      label='INFORMACOES'
                      readOnly={true}
                      name='INFORMACOES.PRODUTO'
                      value={ItemOrcamento.PRODUTO?.INSTRUCOES}
                    />
                  </FlexComponent>
                </FlexComponent>
              </FlexComponent>
              <FlexComponent
                width='30%'
                sm={{ width: '100%', height: '25vh', margin: '1rem 0' }}
              >
                <Table
                  messageNoData={
                    'Não foi encontrado chaves para esses produtos!'
                  }
                  columns={tableChavesHeaders}
                  data={Chaves}
                />
              </FlexComponent>
            </FlexComponent>
            <FlexComponent
              gapColumn='1rem'
              alignItems='flex-end'
              padding='1rem 0 0 0'
              sm={{
                gapRow: '1rem',
                gapColumn: '0.5rem',
                wrap: 'wrap',
              }}
            >
              <FlexComponent width='10%' sm={{ width: '49.4%' }}>
                <InputCustom
                  readOnly={true}
                  label='ESTOQUE'
                  name='ESTOQUE'
                  type='number'
                  textAlign='right'
                  value={ItemOrcamento.PRODUTO?.QTDATUAL}
                />
              </FlexComponent>
              <FlexComponent width='10%' sm={{ width: '49.4%' }}>
                <InputCustom
                  onChange={OnChangeInputQTD}
                  label='QTD'
                  name='QTD'
                  type='number'
                  value={QTDProduto}
                />
              </FlexComponent>
              <FlexComponent width='40%' sm={{ width: '99%' }}>
                <Select
                  options={Tabelas}
                  menuPosition='top'
                  value={TabelaSelected}
                  onChange={(SingleValue) => CalcTabela(SingleValue)}
                />
              </FlexComponent>
              <FlexComponent width='20%' sm={{ width: '100%' }}>
                <InputCustom
                  label='VALOR'
                  name='VALOR'
                  textAlign='right'
                  value={Price.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                />
              </FlexComponent>
              <FlexComponent width='20%' sm={{ width: '100%' }}>
                <InputCustom
                  label='TOTAL'
                  name='TOTAL'
                  textAlign='right'
                  value={Total.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                />
              </FlexComponent>
            </FlexComponent>
            <FormFooter>
              <Button
                Text='SALVAR'
                Type='success'
                TypeButton='submit'
                Icon={faSave}
                Height='3.5rem'
              />
            </FormFooter>
          </FormEditOrcamento>
        </Modal>
      )}
      {Produtos.length > 1 && (
        <ModalProduto
          produtoPalavras={ProdutoPalavras}
          callback={ProdutoToItem}
          produtos={Produtos}
        />
      )}
    </>
  );
};
