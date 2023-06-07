import React, { useEffect, useState } from 'react';

import {
  FormEditOrcamento,
  FormEditOrcamentoColumn,
  FormEditOrcamentoInputContainer,
  FormEditOrcamentoRow,
  FormFooter,
} from './styles';
import {
  iItemInserir,
  iItemRemove,
  iItensOrcamento,
  iOrcamento,
} from '../../../@types/Orcamento';
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
import { iDataResult } from '../../../@types';
import { useTheme } from '../../../hooks/useTheme';

interface iModalOrcamento {
  Orcamento: iOrcamento;
  callback?: () => void;
}

export const ModalOrcamento: React.FC<iModalOrcamento> = ({
  Orcamento,
  callback,
}) => {
  const { ThemeName } = useTheme();

  const [NewOrcamento, setOrcamento] = useState<iOrcamento>(Orcamento);
  const [ItensOrcamento, setItensOrcamento] = useState<iItensOrcamento[]>([]);
  const [ItemOrcamento, setItemOrcamento] = useState<iItensOrcamento | null>(
    null
  );

  const { Modal, showModal, OnCloseModal } = useModal();

  const { AddItemOrcamento, GetOrcamento, RemoveItemOrcamento } =
    useOrcamento();

  useEffect(() => {
    const OpenModal = () => {
      showModal();
      setOrcamento(Orcamento);
      setItensOrcamento(Orcamento.ItensOrcamento);
    };
    return () => OpenModal();
  }, [Orcamento]);

  const OpenModalItemOrcamento = () => {
    setItemOrcamento({
      ORCAMENTO: Orcamento,
      QTD: 1,
      SUBTOTAL: 0.0,
      TOTAL: 0.0,
      VALOR: 0.0,
      PRODUTO: null,
      TABELA: '',
    });
  };

  const SaveOrUpdate = async (item: iItensOrcamento) => {
    await DeleteItem(item);
    await AddItem(item);
  };

  const AddItem = async (item: iItensOrcamento) => {
    let saveItem: iItemInserir = {
      pIdOrcamento: item.ORCAMENTO.ORCAMENTO,
      pItemOrcamento: {
        CodigoProduto: item.PRODUTO ? item.PRODUTO.PRODUTO : '',
        Desconto: item.DESCONTO ? item.DESCONTO : 0,
        Frete: 0,
        Qtd: item.QTD,
        Tabela: item.TABELA,
        Total: item.PRODUTO ? item.PRODUTO.PRECO * item.QTD : 0,
        SubTotal: item.SUBTOTAL,
        Valor: item.PRODUTO ? item.PRODUTO.PRECO : 0,
      },
    };
    console.log('🚀 ~ file: index.tsx:93 ~ AddItem ~ saveItem:', saveItem);

    AddItemOrcamento(saveItem).then(async (res) => {
      const { StatusCode, Data, StatusMessage } = res.data;

      if (StatusCode !== 200) {
        toast.error(`Opps, ${StatusMessage} 🤯`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: ThemeName,
        });
      } else {
        const orc: iOrcamento = (await GetOrcamento(Data.ORCAMENTO)).data;
        setItensOrcamento(orc.ItensOrcamento);
      }
    });
  };

  const DeleteItem = async (item: iItensOrcamento) => {
    let removeItem: iItemRemove = {
      pIdOrcamento: NewOrcamento.ORCAMENTO,
      pProduto: item.PRODUTO ? item.PRODUTO.PRODUTO : '',
    };
    RemoveItemOrcamento(removeItem).then(async (res) => {
      const { StatusCode, Data, StatusMessage } = res.data;

      if (StatusCode !== 200) {
        toast.error(`Opps, ${StatusMessage} 🤯`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: ThemeName,
        });
      } else {
        const orc: iOrcamento = (await GetOrcamento(Data.ORCAMENTO)).data;
        setItensOrcamento(orc.ItensOrcamento);
      }
    });
  };

  const UpdateItem = async (item: iItensOrcamento) => {
    setItemOrcamento({ ...item, ORCAMENTO: NewOrcamento });
  };

  const SalvarOrcamento = () => {
    // toast.promise(SaveOrcamento(NewOrcamento), {
    //   pending: `Salvando Orçamento do cliente ${NewOrcamento.CLIENTE.NOME}`,
    //   success: 'Orçamento Salvo 👌',
    //   error: 'Opps, ocorreu um erro 🤯',
    // });
    OnCloseModal();
    callback && callback();
  };

  const tableHeaders: iColumnType<iItensOrcamento>[] = [
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: '20%',
      action: [
        {
          onclick: UpdateItem,
          Icon: faEdit,
          Title: 'Editar',
          Type: 'warn',
        },
        {
          onclick: DeleteItem,
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
                <Table
                  messageNoData={'Esse orçamento não possuí itens!'}
                  columns={tableHeaders}
                  data={ItensOrcamento}
                />
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
        <ModalItemOrcamento callback={SaveOrUpdate} Item={ItemOrcamento} />
      )}
    </>
  );
};

