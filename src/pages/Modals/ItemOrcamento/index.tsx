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
import { iProduto } from '../../../@types/Produto';
import { ModalProduto } from '../Produto';
import api from '../../../services';
import { toast } from 'react-toastify';
import { useTheme } from '../../../hooks/useTheme';

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

  useEffect(() => {
    showModal();
    setItemOrcamento(Item);
    setProdutoPalavras('');
    setProdutos([]);
  }, [Item]);

  const fetchProdutoList = async (busca: string) => {
    const response = await api.get(
      `/Produto?$filter=NOME like '% ${busca} %'&$top=20`
    );

    const { data } = response;

    let ProdutosList: iProduto[] = data.value;

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
      setItemOrcamento({
        ...ItemOrcamento,
        [name]: value,
      });
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
    callback(ItemOrcamento);
    setProdutoPalavras('');
    setProdutos([]);
    setItemOrcamento({} as iItensOrcamento);
    OnCloseModal();
  };

  return (
    <>
      {Modal && (
        <Modal
          Title={`NOVO ITEM AO ORÇAMENTO Nº ${ItemOrcamento?.ORCAMENTO.ORCAMENTO}`}
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
                <FormEditOrcamentoInputContainer width='45%'>
                  <InputCustom
                    onChange={OnChangeInput}
                    label='OBSERVAÇÃO 2'
                    name='OBS2'
                    value={ItemOrcamento.OBS}
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

