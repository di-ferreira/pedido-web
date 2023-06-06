import React, { useCallback, useEffect, useState } from 'react';

import {
  FormEditOrcamento,
  FormEditOrcamentoColumn,
  FormEditOrcamentoInputContainer,
  FormEditOrcamentoRow,
  FormFooter,
} from './styles';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { InputCustom } from '../../../components/InputCustom';
import useModal from '../../../hooks/useModal';
import Button from '../../../components/Button';
import { iItensOrcamento } from '../../../@types/Orcamento';
import { TextAreaCustom } from '../../../components/TextAreaCustom';
import { iListaChave, iProduto } from '../../../@types/Produto';
import { ModalProduto } from '../Produto';
import api from '../../../services';
import { toast } from 'react-toastify';
import { useTheme } from '../../../hooks/useTheme';
import Table from '../../../components/Table';
import { iColumnType } from '../../../@types/Table';

interface iModalItemOrcamento {
  Item: iItensOrcamento;
  callback: (item: iItensOrcamento) => void;
}

export const ModalItemOrcamento: React.FC<iModalItemOrcamento> = ({
  Item,
  callback,
}) => {
  const { Modal, showModal, OnCloseModal } = useModal();
  const { ThemeName } = useTheme();
  const [ItemOrcamento, setItemOrcamento] = useState<iItensOrcamento>(
    {} as iItensOrcamento
  );

  const [ProdutoPalavras, setProdutoPalavras] = useState<string>('');
  const [Produtos, setProdutos] = useState<iProduto[]>([]);
  const [TotalPrice, setTotalPrice] = useState<number>(0.0);

  useEffect(() => {
    showModal();
    setItemOrcamento(Item);
    setTotalPrice(Item.PRODUTO ? Item.PRODUTO.PRECO * Item.QTD : 0);
    setProdutoPalavras(Item.PRODUTO ? Item.PRODUTO.PRODUTO : '');
    setProdutos([]);
  }, [Item]);

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
      ProdutoToItem(ProdutosList[0]);
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

  const OnChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const { value, name } = e.target;

      if (name === 'QTD') {
        setItemOrcamento({
          ...ItemOrcamento,
          TOTAL: ItemOrcamento.PRODUTO
            ? ItemOrcamento.PRODUTO.PRECO * parseInt(value)
            : 0,
        });

        setTotalPrice(
          ItemOrcamento.PRODUTO
            ? ItemOrcamento.PRODUTO.PRECO * parseInt(value)
            : 0
        );

        setItemOrcamento({
          ...ItemOrcamento,
          QTD: parseInt(value),
        });
      } else {
        setItemOrcamento({
          ...ItemOrcamento,
          [name]: value,
        });
      }
    },
    [ItemOrcamento]
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

  const ProdutoToItem = (produto: iProduto) => {
    setProdutoPalavras(produto.PRODUTO);
    setItemOrcamento({
      ...ItemOrcamento,
      PRODUTO: produto,
    });
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItemOrcamento({ ...ItemOrcamento, TABELA: 'SISTEMA' });
    callback({ ...ItemOrcamento, TABELA: 'SISTEMA' });
    setProdutoPalavras('');
    setProdutos([]);
    setItemOrcamento({} as iItensOrcamento);
    OnCloseModal();
  };

  const tableChavesHeaders: iColumnType<iListaChave>[] = [
    {
      key: 'DATA_ATUALIZACAO',
      title: 'DATA',
      width: '10%',
    },
    {
      key: 'CNA',
      title: 'DOC',
      width: '10%',
    },
  ];

  return (
    <>
      {Modal && (
        <Modal
          Title={`ADD ITEM AO ORÇAMENTO Nº ${ItemOrcamento?.ORCAMENTO.ORCAMENTO}`}
        >
          <FormEditOrcamento onSubmit={(e) => onSubmitForm(e)}>
            <FormEditOrcamentoColumn>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoInputContainer width='25%'>
                  <InputCustom
                    onChange={OnProdutoPalavras}
                    onKeydown={OnSearchProduto}
                    value={ProdutoPalavras}
                    name='ProdutoPalavras'
                    label='PRODUTO'
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='25%'>
                  <InputCustom
                    label='REFERÊNCIA'
                    readOnly={true}
                    name='REFERENCIA'
                    value={ItemOrcamento.PRODUTO?.REFERENCIA}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='20%'>
                  <InputCustom
                    label='FABRICANTE'
                    readOnly={true}
                    name='FABRICANTE'
                    value={ItemOrcamento.PRODUTO?.FABRICANTE}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='20%'>
                  <InputCustom
                    label='LOCALIZAÇÃO'
                    readOnly={true}
                    name='LOCALIZACAO'
                    value={ItemOrcamento.PRODUTO?.LOCAL}
                  />
                </FormEditOrcamentoInputContainer>
              </FormEditOrcamentoRow>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoInputContainer width='95%'>
                  <InputCustom
                    label='NOME DO PRODUTO'
                    readOnly={true}
                    name='PRODUTO.NOME'
                    value={ItemOrcamento.PRODUTO?.NOME}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='95%'>
                  <TextAreaCustom
                    label='APLICAÇÃO PRODUTO'
                    readOnly={true}
                    name='APLICACAO'
                    value={ItemOrcamento.PRODUTO?.APLICACOES}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='95%'>
                  <TextAreaCustom
                    label='INFORMACOES'
                    readOnly={true}
                    name='INFORMACOES.PRODUTO'
                    value={ItemOrcamento.PRODUTO?.INSTRUCOES}
                  />
                </FormEditOrcamentoInputContainer>
              </FormEditOrcamentoRow>
              <FormEditOrcamentoColumn>
                <FormEditOrcamentoRow>
                  {ItemOrcamento.PRODUTO &&
                    ItemOrcamento.PRODUTO.ListaChaves && (
                      <Table
                        messageNoData={'Essa busca não retornou itens!'}
                        columns={tableChavesHeaders}
                        data={ItemOrcamento.PRODUTO.ListaChaves}
                      />
                    )}
                </FormEditOrcamentoRow>
              </FormEditOrcamentoColumn>
            </FormEditOrcamentoColumn>
            <FormEditOrcamentoColumn>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoInputContainer width='10%'>
                  <InputCustom
                    readOnly={true}
                    label='ESTOQUE'
                    name='ESTOQUE'
                    type='number'
                    value={ItemOrcamento.PRODUTO?.QTDATUAL}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='5%'>
                  <InputCustom
                    onChange={OnChangeInput}
                    label='QTD'
                    name='QTD'
                    type='number'
                    value={ItemOrcamento.QTD}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='10%'>
                  <InputCustom
                    label='VALOR'
                    name='VALOR'
                    value={ItemOrcamento.PRODUTO?.PRECO.toLocaleString(
                      'pt-br',
                      {
                        style: 'currency',
                        currency: 'BRL',
                      }
                    )}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='15%'>
                  <InputCustom
                    label='TOTAL'
                    name='TOTAL'
                    value={TotalPrice.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  />
                </FormEditOrcamentoInputContainer>
              </FormEditOrcamentoRow>
            </FormEditOrcamentoColumn>
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

