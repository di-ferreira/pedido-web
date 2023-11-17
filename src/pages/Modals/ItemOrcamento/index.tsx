/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';

import { faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormEditOrcamento, FormFooter } from './styles';

import dayjs from 'dayjs';
import { SingleValue } from 'react-select';
import { toast } from 'react-toastify';
import { iFilter } from '../../../@types/Filter';
import { iItensOrcamento } from '../../../@types/Orcamento';
import { iListaChave, iProduto } from '../../../@types/Produto';
import { iColumnType, iOption } from '../../../@types/Table';
import Button from '../../../components/Button';
import { DataTable } from '../../../components/DataTable';
import { FlexComponent } from '../../../components/FlexComponent';
import { InputCustom } from '../../../components/InputCustom';
import { TextAreaCustom } from '../../../components/TextAreaCustom';
import { ResetCurrentItem, SetCurrentItem } from '../../../features/orcamento/Orcamento.slice';
import { ResetProduct } from '../../../features/produto/Produto.slice';
import { SetProduct, SuperFindProducts } from '../../../features/produto/Produto.thunk';
import useSelect from '../../../hooks/UseSelect';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import useModal from '../../../hooks/useModal';
import { useTheme } from '../../../hooks/useTheme';
import { ObjectIsEmpty } from '../../../utils';
import { ModalProduto } from '../Produto';

export interface callbackResult {
  itemOrcamento: iItensOrcamento;
  update: boolean;
}

interface iModalItemOrcamento {
  callback: (item: callbackResult | null) => void;
}

export const ModalItemOrcamento: React.FC<iModalItemOrcamento> = ({ callback }) => {
  const { ListProduto, errorMessage, isLoading } = useAppSelector((state) => state.produto);
  const CurrentProduct = useAppSelector((state) => state.produto.Current);
  const CurrentItem = useAppSelector((state) => state.orcamento.CurrentItem);
  const IsLoadingItem = useAppSelector((state) => state.orcamento.isLoading);
  const dispatch = useAppDispatch();

  const { Select } = useSelect();
  const { Modal, showModal, OnCloseModal } = useModal();
  const { ThemeName } = useTheme();

  const [ProdutoPalavras, setProdutoPalavras] = useState<string>('');

  const [SaveOrUpdateItem, setSaveOrUpdateItem] = useState<boolean>(false);

  const [Tabelas, setTabelas] = useState<iOption[]>([]);
  const [TabelaSelected, setTabelaSelected] = useState<iOption>({} as iOption);

  useEffect(() => {
    showModal();
    setSaveOrUpdateItem(false);

    if (!ObjectIsEmpty(CurrentItem.PRODUTO)) {
      GetTabelas();
      setSaveOrUpdateItem(true);
      setProdutoPalavras((old) => (old = CurrentItem.PRODUTO.PRODUTO));

      dispatch(SetProduct(CurrentItem.PRODUTO.PRODUTO));
      setTabelaSelected({
        label: `${CurrentItem.TABELA} - ${CurrentItem.VALOR.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}`,
        value: CurrentItem.VALOR,
      });
    }
  }, []);

  const fetchProdutoList = (filter?: iFilter<iProduto>) => {
    dispatch(ResetProduct());
    dispatch(SuperFindProducts(filter));

    if (ListProduto.Qtd_Registros === 1) {
      ProdutoToItem(ListProduto.value[0]);
    }

    if (errorMessage !== '')
      toast.error(`Opps, ${errorMessage} 🤯`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: ThemeName,
      });
  };

  const OnChangeInputQTD = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    const newQTD: number = parseInt(value) <= 0 ? 1 : parseInt(value);

    dispatch(
      SetCurrentItem({
        ...CurrentItem,
        QTD: newQTD,
        VALOR: Number(TabelaSelected?.value),
        TOTAL: Number(TabelaSelected?.value) * newQTD,
      }),
    );
  };

  const CalcTabela = (value: SingleValue<iOption>) => {
    setTabelaSelected({
      label: String(value?.label),
      value: Number(value?.value),
    });

    dispatch(
      SetCurrentItem({
        ...CurrentItem,
        VALOR: Number(value?.value),
        TOTAL: Number(value?.value) * CurrentItem.QTD,
      }),
    );
  };

  const OnProdutoPalavras = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProdutoPalavras((old) => (old = e.target.value.toUpperCase()));
  };

  const OnSearchProduto = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchProdutoList({
        filter: [{ key: 'PRODUTO', value: e.currentTarget.value }],
      });
    }
  };

  const OnSearchProdutoClick = () => {
    fetchProdutoList({
      filter: [{ key: 'PRODUTO', value: ProdutoPalavras }],
    });
  };

  const GetTabelas = () => {
    const tabOptions: iOption[] = [];

    CurrentProduct.tables.map((tab) =>
      tabOptions.push({
        label: `${tab.TABELA} - ${tab.PRECO.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}`,
        value: tab.PRECO,
      }),
    );
    setTabelas(tabOptions);
    setTabelaSelected(tabOptions[0]);
    dispatch(
      SetCurrentItem({
        ...CurrentItem,
        PRODUTO: CurrentProduct.produto,
        SUBTOTAL: Number(tabOptions[0]?.value) * CurrentItem.QTD,
        TOTAL: Number(tabOptions[0]?.value) * CurrentItem.QTD,
        VALOR: Number(tabOptions[0]?.value),
      }),
    );
  };

  const ProdutoToItem = (produto: iProduto) => {
    dispatch(SetProduct(produto.PRODUTO));
    dispatch(
      SetCurrentItem({
        ...CurrentItem,
        PRODUTO: produto,
      }),
    );

    setProdutoPalavras((old) => (old = produto.PRODUTO));
    if (!isLoading && errorMessage !== '') {
      toast.error(`Opps, ${errorMessage} 🤯`, {
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

  useEffect(() => {
    GetTabelas();
  }, [CurrentProduct]);
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    const tabelaSplited = TabelaSelected.label.split('-');
    const tabela: string = tabelaSplited[0].replace(/\s/g, '');

    e.preventDefault();
    const result: callbackResult = {
      itemOrcamento: {
        ...CurrentItem,
        TABELA: tabela,
        VALOR: CurrentItem.VALOR,
        TOTAL: CurrentItem.TOTAL,
        SUBTOTAL: CurrentItem.TOTAL,
      },
      update: SaveOrUpdateItem,
    };

    dispatch(SetCurrentItem(result.itemOrcamento));
    ResetForm();
    callback(result);
    OnCloseModal();
  };

  const ResetForm = () => {
    setProdutoPalavras('');
    dispatch(ResetCurrentItem());
    dispatch(ResetProduct());
    callback(null);
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
          Title={`ADD ITEM AO ORÇAMENTO Nº ${CurrentItem?.ORCAMENTO.ORCAMENTO}`}
          width='75vw'
          height='80vh'
          sm={{ width: '100%', height: '100vh' }}
          xs={{ width: '100%', height: '100vh' }}
          OnCloseButtonClick={() => ResetForm()}
        >
          <FormEditOrcamento onSubmit={(e) => onSubmitForm(e)}>
            <FlexComponent
              height='50vh'
              gapColumn='2rem'
              gapRow='2rem'
              sm={{ direction: 'column' }}
              overflow='hidden auto'
            >
              <FlexComponent width='70%' direction='column' gapRow='1.5rem' sm={{ width: '100%' }}>
                <FlexComponent gapColumn='1.5rem' sm={{ direction: 'column', gapRow: '1rem' }}>
                  <FlexComponent alignItems='flex-end'>
                    <FlexComponent width='85%'>
                      <InputCustom
                        onChange={OnProdutoPalavras}
                        onKeydown={OnSearchProduto}
                        value={ProdutoPalavras}
                        name='ProdutoPalavras'
                        label='PRODUTO'
                      />
                    </FlexComponent>
                    <FlexComponent width='10%' container={true}>
                      <Button
                        Type='primary'
                        TypeButton='button'
                        onclick={OnSearchProdutoClick}
                        Icon={faSearch}
                        Height='3.5rem'
                        Width='3.5rem'
                        Title='Buscar Produto'
                      />
                    </FlexComponent>
                  </FlexComponent>
                  <FlexComponent margin='0 0 0 .5rem' flexGrow={1}>
                    <InputCustom
                      readOnly={true}
                      label='REFERÊNCIA'
                      name='REFERENCIA'
                      value={CurrentProduct.produto.REFERENCIA}
                    />
                  </FlexComponent>
                  <FlexComponent flexGrow={1}>
                    <InputCustom
                      label='FABRICANTE'
                      readOnly={true}
                      name='FABRICANTE'
                      value={CurrentProduct.produto.FABRICANTE?.NOME}
                    />
                  </FlexComponent>
                  <FlexComponent flexGrow={1}>
                    <InputCustom
                      label='LOCALIZAÇÃO'
                      readOnly={true}
                      name='LOCALIZACAO'
                      value={CurrentProduct.produto.LOCAL}
                    />
                  </FlexComponent>
                </FlexComponent>
                <FlexComponent direction='column' gapRow='1.5rem'>
                  <FlexComponent>
                    <InputCustom
                      label='NOME DO PRODUTO'
                      readOnly={true}
                      name='PRODUTO.NOME'
                      value={CurrentProduct.produto.NOME}
                    />
                  </FlexComponent>
                  <FlexComponent>
                    <TextAreaCustom
                      label='APLICAÇÃO PRODUTO'
                      readOnly={true}
                      name='APLICACAO'
                      value={CurrentProduct.produto.APLICACOES}
                    />
                  </FlexComponent>
                  <FlexComponent>
                    <TextAreaCustom
                      label='INFORMACOES'
                      readOnly={true}
                      name='INFORMACOES.PRODUTO'
                      value={CurrentProduct.produto.INSTRUCOES}
                    />
                  </FlexComponent>
                </FlexComponent>
              </FlexComponent>
              <FlexComponent width='30%' sm={{ width: '100%', height: '20vh', margin: '1rem 0' }}>
                <DataTable
                  columns={tableChavesHeaders}
                  IsLoading={IsLoadingItem}
                  ErrorMessage={errorMessage}
                  TableData={CurrentProduct.produto.ListaChaves}
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
              <FlexComponent width='10%' sm={{ width: '49%' }}>
                <InputCustom
                  readOnly={true}
                  label='ESTOQUE'
                  name='ESTOQUE'
                  type='number'
                  textAlign='right'
                  value={CurrentProduct.produto.QTDATUAL}
                />
              </FlexComponent>
              <FlexComponent width='10%' sm={{ width: '49%' }}>
                <InputCustom
                  onChange={OnChangeInputQTD}
                  label='QTD'
                  name='QTD'
                  type='number'
                  value={CurrentItem.QTD}
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
                  value={
                    isNaN(CurrentItem.VALOR)
                      ? 0
                      : CurrentItem.VALOR.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                  }
                />
              </FlexComponent>
              <FlexComponent width='20%' sm={{ width: '100%' }}>
                <InputCustom
                  label='TOTAL'
                  name='TOTAL'
                  textAlign='right'
                  value={
                    isNaN(CurrentItem.TOTAL)
                      ? 0
                      : CurrentItem.TOTAL.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                  }
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
      {ListProduto.Qtd_Registros > 0 && (
        <ModalProduto
          produtoPalavras={ProdutoPalavras}
          callback={ProdutoToItem}
          produtos={ListProduto.value}
        />
      )}
    </>
  );
};
