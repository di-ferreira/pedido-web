import React, { useEffect, useState } from 'react';

import { faPlus, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { iProduto } from '../../../@types/Produto';
import { iColumnType } from '../../../@types/Table';
import Button from '../../../components/Button';
import { InputCustom } from '../../../components/InputCustom';
import Table from '../../../components/Table';
import useModal from '../../../hooks/useModal';
import useProduto from '../../../hooks/useProduto';
import { useTheme } from '../../../hooks/useTheme';
import {
  FormEditOrcamento,
  FormEditOrcamentoColumn,
  FormEditOrcamentoInputContainer,
  FormEditOrcamentoRow,
  FormFooter,
} from './styles';

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
  const [Produto, setProduto] = useState<iProduto>({} as iProduto);
  const [ProdutoPalavras, setProdutoPalavras] = useState<string>('');

  useEffect(() => {
    setProdutos(produtos);
    setProdutoPalavras(produtoPalavras);
    showModal();
  }, [produtos]);

  const fetchProdutoList = async (busca: string) => {
    const resultSuperBusca = await GetProdutosSuperBusca({ Palavras: busca });

    const { data } = resultSuperBusca;

    let ProdutosList: iProduto[] = data.Data;

    if (data.StatusCode !== 200)
      toast.error(`Opps, ${data.StatusMessage} 🤯`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: ThemeName,
      });

    if (ProdutosList.length > 1) {
      setProdutos(ProdutosList);
    } else if (ProdutosList[0]) {
      setProdutoPalavras(ProdutosList[0].PRODUTO);
      AddProduto(ProdutosList[0]);
    }

    if (data.StatusCode === 200 && ProdutosList.length < 1) {
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

  const OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setProdutoPalavras(value.toUpperCase());
  };

  const OnSearchProduto = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchProdutoList(e.currentTarget.value);
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
    // {
    //   key: 'FABRICANTE',
    //   title: 'FABRICANTE',
    //   width: '35%',
    // },
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
        <Modal Title={`Buscar Produto`} width='95%' height='90vh'>
          <FormEditOrcamento>
            <FormEditOrcamentoColumn>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoInputContainer width='85%'>
                  <InputCustom
                    onChange={OnChangeInput}
                    onKeydown={OnSearchProduto}
                    label='BUSCAR PRODUTO'
                    name='SEARCH'
                    value={ProdutoPalavras}
                  />
                </FormEditOrcamentoInputContainer>
                <Button
                  Icon={faSearch}
                  onclick={() => fetchProdutoList(ProdutoPalavras)}
                  Text='BUSCAR'
                  Height='3.5rem'
                  Type='primary'
                  style={{ marginTop: '0.5rem' }}
                />
              </FormEditOrcamentoRow>
              <FormEditOrcamentoRow height='60vh'>
                {newProdutos.length > 0 && (
                  <Table
                    messageNoData={'Essa busca não retornou itens!'}
                    columns={tableHeaders}
                    data={newProdutos}
                  />
                )}
              </FormEditOrcamentoRow>
            </FormEditOrcamentoColumn>
            <FormFooter>
              <Button
                Text='SALVAR'
                Type='success'
                Icon={faSave}
                Height='3.5rem'
              />
            </FormFooter>
          </FormEditOrcamento>
        </Modal>
      )}
    </>
  );
};

