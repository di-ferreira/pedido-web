/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { faPlus, faSearch, faStoreAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { iFilter } from '../../../@types/Filter';
import { iProduto } from '../../../@types/Produto';
import { iColumnType } from '../../../@types/Table';
import Button from '../../../components/Button';
import { DataTable } from '../../../components/DataTable';
import { FlexComponent } from '../../../components/FlexComponent';
import { InputCustom } from '../../../components/InputCustom';
import { SetProduct, SuperFindProducts } from '../../../features/produto/Produto.thunk';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import useModal from '../../../hooks/useModal';
import ModalEstoqueLojas from '../EstoqueLojas';

interface iModalProduto {
  produtos: iProduto[];
  produtoPalavras: string;
  callback: (prodtuto: iProduto) => void;
}

export const ModalProduto: React.FC<iModalProduto> = ({ produtoPalavras, produtos, callback }) => {
  const { ListProduto, errorMessage, isLoading } = useAppSelector((state) => state.produto);
  const dispatch = useAppDispatch();

  const { Modal, showModal, OnCloseModal } = useModal();
  const [ProdutoPalavras, setProdutoPalavras] = useState<string>('');
  const [ShowModalEstoqueLojas, setShowModalEstoqueLojas] = useState<boolean>(false);

  useEffect(() => {
    setProdutoPalavras(produtoPalavras);
    showModal();
  }, [produtos]);

  const fetchProdutoList = (top: number, skip: number) => {
    dispatch(
      SuperFindProducts({
        top,
        skip,
        orderBy: 'PRODUTO',
        filter: [{ key: 'PRODUTO', value: ProdutoPalavras }],
      }),
    );
  };

  const ListProdutos = async (
    filter: iFilter<iProduto> = {
      top: 15,
      skip: 0,
      orderBy: 'PRODUTO',
      filter: [{ key: 'PRODUTO', value: ProdutoPalavras }],
    },
  ) => {
    dispatch(SuperFindProducts(filter));
  };

  const OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setProdutoPalavras(value.toUpperCase());
  };

  const OnSearchProduto = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(
        SuperFindProducts({
          top: 15,
          skip: 0,
          orderBy: 'PRODUTO',
          filter: [{ key: 'PRODUTO', value: e.currentTarget.value }],
        }),
      );
    }
  };

  const AddProduto = async (produto: iProduto) => {
    callback(produto);
    OnCloseModal();
  };

  const tableHeaders: iColumnType<iProduto>[] = [
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: '10%',
      action: [
        {
          onclick: AddProduto,
          Icon: faPlus,
          Title: 'Adicionar',
          Type: 'success',
          Rounded: true,
        },
        {
          onclick: (item) => {
            setShowModalEstoqueLojas(true);
            dispatch(SetProduct(item.PRODUTO));
          },
          Icon: faStoreAlt,
          Title: 'Consulta Estoque Lojas',
          Type: 'primary',
          Rounded: true,
        },
      ],
    },
    {
      key: 'PRODUTO',
      title: 'CÓDIGO',
      width: '10%',
      isHideMobile: true,
    },
    {
      key: 'REFERENCIA',
      title: 'REFERÊNCIA',
      width: '25%',
    },
    {
      key: 'NOME',
      title: 'NOME',
      width: '20%',
    },
    {
      key: 'APLICACOES',
      title: 'APLICAÇÕES',
      width: '35%',
    },
    {
      key: 'FABRICANTE.NOME',
      title: 'FABRICANTE',
      width: '35%',
    },
    {
      key: 'QTDATUAL',
      title: 'QTD',
      width: '10%',
    },
    {
      key: 'PRECO',
      title: 'VALOR',
      width: '10%',
      isHideMobile: true,
      render: (_, item) => {
        return item.PRECO.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },
  ];

  return (
    <>
      {Modal && (
        <Modal
          Title={'Buscar Produto'}
          width='100vw'
          height='100vh'
          sm={{ width: '100%', height: '100vh' }}
          xs={{ width: '100%', height: '100vh' }}
        >
          <FlexComponent gapRow='1.5rem' direction='column' height='100%'>
            <FlexComponent
              alignItems='flex-end'
              sm={{ direction: 'column' }}
              gapRow='1rem'
              gapColumn='1rem'
            >
              <FlexComponent width='85%' sm={{ width: '100%' }}>
                <InputCustom
                  onChange={OnChangeInput}
                  onKeydown={OnSearchProduto}
                  label='BUSCAR PRODUTO'
                  name='SEARCH'
                  value={ProdutoPalavras}
                />
              </FlexComponent>
              <FlexComponent width='fit-content' sm={{ width: '100%' }}>
                <Button
                  Icon={faSearch}
                  onclick={() => ListProdutos()}
                  Text='BUSCAR'
                  Height='3.5rem'
                  Type='primary'
                  style={{ marginTop: '0.5rem' }}
                />
              </FlexComponent>
              <FlexComponent width='fit-content' sm={{ width: '100%' }}>
                <Button
                  Text='CANCELAR'
                  Type='danger'
                  Icon={faTimes}
                  Height='3.5rem'
                  onclick={() => OnCloseModal()}
                />
              </FlexComponent>
            </FlexComponent>
            <FlexComponent height='90vh'>
              <DataTable
                IsLoading={isLoading}
                TableData={ListProduto.value}
                ErrorMessage={errorMessage}
                QuantityRegiters={ListProduto.Qtd_Registros}
                columns={tableHeaders}
                onFetchPagination={fetchProdutoList}
              />
            </FlexComponent>
          </FlexComponent>
        </Modal>
      )}
      {ShowModalEstoqueLojas && (
        <ModalEstoqueLojas callback={() => setShowModalEstoqueLojas(false)} />
      )}
    </>
  );
};
