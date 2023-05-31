import React, { useEffect, useState } from 'react';

import {
  FormEditOrcamento,
  FormEditOrcamentoColumn,
  FormEditOrcamentoInputContainer,
  FormEditOrcamentoRow,
  FormFooter,
} from './styles';
import { faPlus, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputCustom } from '../../../components/InputCustom';
import useModal from '../../../hooks/useModal';
import Button from '../../../components/Button';
import { iItensOrcamento } from '../../../@types/Orcamento';
import { TextAreaCustom } from '../../../components/TextAreaCustom';
import { iProduto } from '../../../@types/Produto';
import Table from '../../../components/Table';
import { iColumnType } from '../../../@types/Table';
import api from '../../../services';
import { toast } from 'react-toastify';
import { useTheme } from '../../../hooks/useTheme';

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
    const response = await api.post(`/ServiceProdutos/SuperBusca`, {
      Palavras: busca,
      QuantidadeRegistros: 15,
    });

    const { data } = response;

    let ProdutosList: iProduto[] = data.Data;

    if (ProdutosList.length > 1) {
      setProdutos(ProdutosList);
    } else if (ProdutosList[0]) {
      setProdutoPalavras(ProdutosList[0].PRODUTO);
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

  const AddProduto = (produto: iProduto) => {
    callback(produto);
    OnCloseModal();
  };

  const tableHeaders: iColumnType<iProduto>[] = [
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: '5%',
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
    },
    {
      key: 'NOME',
      title: 'NOME',
      width: '25%',
      isHideMobile: true,
    },
    {
      key: 'QTDATUAL',
      title: 'QTD',
      width: '5%',
    },
    {
      key: 'PRECO',
      title: 'VALOR',
      width: '5%',
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
        <Modal Title={`Buscar Produto`}>
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
              <FormEditOrcamentoRow height='45rem'>
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

