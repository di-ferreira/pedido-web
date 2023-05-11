import React, { useEffect, useState } from 'react';

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

interface iModalProduto {
  produtos: iProduto[];
  callback: (prodtuto: iProduto) => void;
}

export const ModalProduto: React.FC<iModalProduto> = ({
  produtos,
  callback,
}) => {
  const { Modal, showModal } = useModal();
  const [newProdutos, setProdutos] = useState<iProduto[]>({} as iProduto[]);
  const [Produto, setProduto] = useState<iProduto>({} as iProduto);

  useEffect(() => {
    setProdutos(produtos);
    showModal();
  }, [produtos]);

  const OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
  };

  const OnChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callback(Produto);
  };

  return (
    <>
      {Modal && (
        <Modal Title={`Buscar Produto`}>
          {/* <FormEditOrcamento onSubmit={(e) => onSubmitForm(e)}>
            <FormEditOrcamentoColumn>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoInputContainer width='25%'>
                  <InputCustom
                    onChange={OnChangeInput}
                    label='PRODUTO'
                    name='PRODUTO'
                    value={ItemOrcamento.PRODUTO}
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
                    onChange={OnChangeInput}
                    label='FABRICANTE'
                    readOnly={true}
                    name='FABRICANTE'
                    // value={}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='20%'>
                  <InputCustom
                    onChange={OnChangeInput}
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
          </FormEditOrcamento> */}
        </Modal>
      )}
    </>
  );
};

