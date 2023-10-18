import React, { useEffect, useRef, useState } from 'react';

import { faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { iFilter } from '../../../@types/Filter';
import { iProduto } from '../../../@types/Produto';
import { iColumnType, iTableRef } from '../../../@types/Table';
import Button from '../../../components/Button';
import { FlexComponent } from '../../../components/FlexComponent';
import { InputCustom } from '../../../components/InputCustom';
import Table from '../../../components/Table';
import useModal from '../../../hooks/useModal';
import useProduto from '../../../hooks/useProduto';
import { useTheme } from '../../../hooks/useTheme';
import { FormEditOrcamento, FormFooter } from './styles';

interface iModalProduto {
  produtos: iProduto[];
  produtoPalavras: string;
  callback: (prodtuto: iProduto) => void;
}

export const ModalProduto: React.FC<iModalProduto> = ({
  produtoPalavras,
  produtos,
  callback,
}) => {
  const { ThemeName } = useTheme();
  const { GetProdutosSuperBusca, GetProduto } = useProduto();
  const { Modal, showModal, OnCloseModal } = useModal();
  const [newProdutos, setProdutos] = useState<iProduto[]>({} as iProduto[]);
  const [ProdutoPalavras, setProdutoPalavras] = useState<string>('');
  const TableRef = useRef<iTableRef<iProduto>>(null!);

  useEffect(() => {
    setProdutos(produtos);
    setProdutoPalavras(produtoPalavras);
    showModal();
  }, [produtos]);

  const fetchProdutoList = async (filter?: iFilter<iProduto>) => {
    return await GetProdutosSuperBusca(filter);
  };

  const ListProdutos = async () => {
    TableRef.current.onRefresh({
      top: 15,
      skip: 0,
      orderBy: 'PRODUTO',
      filter: [{ key: 'PRODUTO', value: ProdutoPalavras }],
    });
  };

  const OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setProdutoPalavras(value.toUpperCase());
  };

  const OnSearchProduto = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchProdutoList({
        top: 15,
        skip: 0,
        orderBy: 'PRODUTO',
        filter: [{ key: 'PRODUTO', value: e.currentTarget.value }],
      });
    }
  };

  const AddProduto = async (produto: iProduto) => {
    const prod = await GetProduto(produto.PRODUTO);
    callback(prod.data);
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
          Title={`Buscar Produto`}
          width='95%'
          height='90vh'
          sm={{ width: '100%', height: '100vh' }}
          xs={{ width: '100%', height: '100vh' }}
        >
          <FormEditOrcamento>
            <FlexComponent direction='column' height='100%'>
              <FlexComponent
                alignItems='flex-end'
                sm={{ direction: 'column' }}
                gapRow='1rem'
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
                <FlexComponent width='15%' sm={{ width: '100%' }}>
                  <Button
                    Icon={faSearch}
                    onclick={() => ListProdutos()}
                    Text='BUSCAR'
                    Height='3.5rem'
                    Type='primary'
                    style={{ marginTop: '0.5rem' }}
                  />
                </FlexComponent>
              </FlexComponent>
              <FlexComponent height='65vh'>
                <Table
                  columns={tableHeaders}
                  onDataFetch={() =>
                    fetchProdutoList({
                      top: 15,
                      skip: 0,
                      orderBy: 'PRODUTO',
                      filter: [{ key: 'PRODUTO', value: ProdutoPalavras }],
                    })
                  }
                  pagination
                  ref={TableRef}
                />
              </FlexComponent>
              <FlexComponent margin='1rem 0rem'>
                <FormFooter>
                  <Button
                    Text='CANCELAR'
                    Type='danger'
                    Icon={faTimes}
                    Height='3.5rem'
                    onclick={() => OnCloseModal()}
                  />
                </FormFooter>
              </FlexComponent>
            </FlexComponent>
          </FormEditOrcamento>
        </Modal>
      )}
    </>
  );
};
