import React, { useEffect, useState } from 'react';

import {
  FormEditOrcamento,
  FormEditOrcamentoColumn,
  FormEditOrcamentoInputContainer,
  FormEditOrcamentoRow,
  FormFooter,
} from './styles';
import { iItensOrcamento, iOrcamento } from '../../../@types/Orcamento';
import useModal from '../../../hooks/useModal';
import { InputCustom } from '../../../components/InputCustom';
import {
  faEdit,
  faPlus,
  faSave,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Button from '../../../components/Button';
import { MaskCnpjCpf } from '../../../utils';
import Table from '../../../components/Table';
import { iColumnType } from '../../../@types/Table';
import useOrcamento from '../../../hooks/useOrcamento';
import { ModalItemOrcamento } from '../ItemOrcamento';

interface iModalOrcamento {
  Orcamento: iOrcamento;
  callback?: () => void;
}

export const ModalOrcamento: React.FC<iModalOrcamento> = ({
  Orcamento,
  callback,
}) => {
  let NewOrcamento: iOrcamento = Orcamento;
  const [ItensOrcamento, setItensOrcamento] = useState<iItensOrcamento[]>([]);
  const [ItemOrcamento, setItemOrcamento] = useState<iItensOrcamento | null>(
    null
  );

  const { Modal, showModal, OnCloseModal } = useModal();

  const { AddItemOrcamento } = useOrcamento();

  useEffect(() => {
    showModal();
    NewOrcamento = Orcamento;
    console.log('🚀 ~ file: index.tsx:49 ~ useEffect ~ Orcamento:', Orcamento);
    setItensOrcamento([]);
  }, [Orcamento]);

  const tableHeaders: iColumnType<iItensOrcamento>[] = [
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: '20%',
      action: [
        {
          onclick: () => {},
          Icon: faEdit,
          Title: 'Editar',
          Type: 'warn',
        },
        {
          onclick: () => {},
          Icon: faTrashAlt,
          Title: 'Excluir',
          Type: 'danger',
        },
      ],
    },
    {
      key: 'PRODUTO.NOME',
      title: 'PRODUTO',
      width: '10%',
    },
    {
      key: 'QTD',
      title: 'QTD',
      width: '10%',
    },
    {
      key: 'TOTAL',
      title: 'TOTAL',
      width: '20%',
      isHideMobile: true,
      render: (_, item) => {
        return item.TOTAL.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },
  ];

  const OpenModalItemOrcamento = () => {
    setItemOrcamento({
      ORCAMENTO: Orcamento,
      QTD: 1,
      SUBTOTAL: 0.0,
      TOTAL: 0.0,
      VALOR: 0.0,
      PRODUTO: null,
    });
  };

  const AddItem = async (item: iItensOrcamento) => {
    let newItem: iItensOrcamento = item;
    const { TABELA } = await AddItemOrcamento(item);
    newItem = { ...newItem, TABELA };
    console.log('🚀 ~ file: index.tsx:111 ~ AddItem ~ newItem:', newItem);

    setItensOrcamento((old) => [...old, newItem]);
  };

  const SalvarOrcamento = () => {
    // toast.promise(SaveOrcamento(NewOrcamento), {
    //   pending: `Salvando Orçamento do cliente ${NewOrcamento.CLIENTE.NOME}`,
    //   success: 'Orçamento Salvo 👌',
    //   error: 'Opps, ocorreu um erro 🤯',
    // });
    OnCloseModal();
  };

  return (
    <>
      {Modal && NewOrcamento && NewOrcamento.CLIENTE && (
        <Modal
          Title={
            NewOrcamento.ORCAMENTO > 0
              ? `ORÇAMENTO Nº ${NewOrcamento.ORCAMENTO.toString()}`
              : 'NOVO ORÇAMENTO'
          }
          OnCloseButtonClick={callback}
        >
          <FormEditOrcamento>
            <FormEditOrcamentoColumn>
              <h3>CLIENTE</h3>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoInputContainer width='8%'>
                  <InputCustom
                    onChange={() => {}}
                    label='CÓDIGO'
                    name='CLIENTE.CLIENTE'
                    value={NewOrcamento.CLIENTE.CLIENTE}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='50%'>
                  <InputCustom
                    label='NOME'
                    onChange={() => {}}
                    name='CLIENTE.NOME'
                    value={NewOrcamento.CLIENTE.NOME}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='35%'>
                  <InputCustom
                    label='CPF/CNPJ'
                    onChange={() => {}}
                    name='CLIENTE.CIC'
                    value={MaskCnpjCpf(NewOrcamento.CLIENTE.CIC)}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='45%'>
                  <InputCustom
                    label='TELEFONE'
                    onChange={() => {}}
                    name='TELEFONE'
                    value={NewOrcamento.DATA}
                  />
                </FormEditOrcamentoInputContainer>
              </FormEditOrcamentoRow>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoInputContainer width='40%'>
                  <InputCustom
                    onChange={() => {}}
                    label='ENDEREÇO'
                    name='CLIENTE.ENDERECO'
                    value={NewOrcamento.CLIENTE.ENDERECO}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='15%'>
                  <InputCustom
                    onChange={() => {}}
                    label='BAIRRO'
                    name='CLIENTE.BAIRRO'
                    value={NewOrcamento.CLIENTE.BAIRRO}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='20%'>
                  <InputCustom
                    onChange={() => {}}
                    label='CIDADE'
                    name='CLIENTE.CIDADE'
                    value={NewOrcamento.CLIENTE.CIDADE}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='5%'>
                  <InputCustom
                    onChange={() => {}}
                    label='UF'
                    name='CLIENTE.UF'
                    value={NewOrcamento.CLIENTE.UF}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='10%'>
                  <InputCustom
                    onChange={() => {}}
                    label='CEP'
                    name='CLIENTE.CEP'
                    value={NewOrcamento.CLIENTE.CEP}
                  />
                </FormEditOrcamentoInputContainer>
              </FormEditOrcamentoRow>
            </FormEditOrcamentoColumn>
            <FormEditOrcamentoColumn>
              <h3>ORÇAMENTO</h3>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoInputContainer width='45%'>
                  <InputCustom
                    label='OBSERVAÇÃO 1'
                    onChange={() => {}}
                    name='OBS1'
                    value={NewOrcamento.OBS1}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='45%'>
                  <InputCustom
                    label='OBSERVAÇÃO 2'
                    onChange={() => {}}
                    name='OBS2'
                    value={NewOrcamento.OBS2}
                  />
                </FormEditOrcamentoInputContainer>
              </FormEditOrcamentoRow>
            </FormEditOrcamentoColumn>
            <FormEditOrcamentoColumn>
              <FormEditOrcamentoRow>
                <h3>ITENS</h3>
                <Button
                  onclick={() => OpenModalItemOrcamento()}
                  Type='success'
                  Title='Adicionar Item'
                  Icon={faPlus}
                  Height='2.5rem'
                  Width='2.5rem'
                  Rounded
                />
              </FormEditOrcamentoRow>
              <FormEditOrcamentoRow height='10rem'>
                {NewOrcamento.ItensOrcamento &&
                  NewOrcamento.ItensOrcamento?.length > 0 && (
                    <Table
                      messageNoData={'Esse orçamento não possuí itens!'}
                      columns={tableHeaders}
                      data={NewOrcamento.ItensOrcamento}
                    />
                  )}
              </FormEditOrcamentoRow>
            </FormEditOrcamentoColumn>
            <FormFooter>
              <Button
                onclick={() => SalvarOrcamento()}
                Text='SALVAR'
                Type='success'
                Icon={faSave}
                Height='3.5rem'
              />
            </FormFooter>
          </FormEditOrcamento>
        </Modal>
      )}
      {ItemOrcamento && (
        <ModalItemOrcamento callback={AddItem} Item={ItemOrcamento} />
      )}
    </>
  );
};

