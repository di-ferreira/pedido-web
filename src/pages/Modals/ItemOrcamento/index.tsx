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

interface iModalItemOrcamento {
  Item: iItensOrcamento;
  callback: (item: iItensOrcamento) => void;
}

export const ModalItemOrcamento: React.FC<iModalItemOrcamento> = ({
  Item,
  callback,
}) => {
  const { Modal, showModal } = useModal();
  const [ItemOrcamento, setItemOrcamento] = useState<iItensOrcamento>(
    {} as iItensOrcamento
  );

  const [ProdutoPalavras, setProdutoPalavras] = useState<string>('');
  const [Produtos, setProdutos] = useState<iProduto[]>([]);

  useEffect(() => {
    showModal();
    setItemOrcamento(Item);
  }, [Item]);
  console.log('oi');

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

  const OnChangeTextArea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      console.log(e.target.value);
      setProdutoPalavras(e.target.value);
    },
    [ProdutoPalavras]
  );

  // const OnSearchProduto = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   if (e.key === 'Enter') {
  //     console.log(e.currentTarget.value);
  //     setProdutoPalavras(e.currentTarget.value);
  //   }
  // };

  const ProdutoToItem = (produto: iProduto) => {
    setItemOrcamento({
      ...ItemOrcamento,
      PRODUTO: produto,
    });
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback(ItemOrcamento);
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
                    // onKeydown={OnSearchProduto}
                    value={ProdutoPalavras}
                    name='ProdutoPalavras'
                    label='PRODUTO'
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='25%'>
                  <InputCustom
                    onChange={OnChangeInput}
                    label='REFERÊNCIA'
                    readOnly={true}
                    name='REFERENCIA'
                    value={'teste'}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='20%'>
                  <InputCustom
                    label='FABRICANTE'
                    readOnly={true}
                    name='FABRICANTE'
                    // value={}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='20%'>
                  <InputCustom
                    label='LOCALIZAÇÃO'
                    readOnly={true}
                    name='LOCALIZACAO'
                    // value={}
                  />
                </FormEditOrcamentoInputContainer>
              </FormEditOrcamentoRow>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoInputContainer width='95%'>
                  <InputCustom
                    onChange={OnChangeInput}
                    label='NOME DO PRODUTO'
                    readOnly={true}
                    name='PRODUTO.NOME'
                    // value={}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='95%'>
                  <TextAreaCustom
                    onChange={OnChangeTextArea}
                    label='APLICAÇÃO PRODUTO'
                    readOnly={true}
                    name='APLICACAO'
                    // value={}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='95%'>
                  <TextAreaCustom
                    onChange={OnChangeTextArea}
                    label='INFORMACOES'
                    readOnly={true}
                    name='INFORMACOES.PRODUTO'
                    // value={}
                  />
                </FormEditOrcamentoInputContainer>
              </FormEditOrcamentoRow>
            </FormEditOrcamentoColumn>
            <FormEditOrcamentoColumn>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoInputContainer width='45%'>
                  <InputCustom
                    onChange={OnChangeInput}
                    label='ESTOQUE'
                    name='OBS1'
                    // value={}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='45%'>
                  <InputCustom
                    onChange={OnChangeInput}
                    label='OBSERVAÇÃO 2'
                    name='OBS2'
                    // value={}
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
      {/* {ProdutoPalavras !== '' && (
        <ModalProduto callback={ProdutoToItem} produtos={Produtos} />
      )} */}
    </>
  );
};

