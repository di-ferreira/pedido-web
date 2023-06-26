import React, { useEffect, useState } from 'react';

import {
  faEdit,
  faPlus,
  faSave,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import {
  iItemInserir,
  iItemRemove,
  iItensOrcamento,
  iOrcamento,
} from '../../../@types/Orcamento';
import { iColumnType } from '../../../@types/Table';
import Button from '../../../components/Button';
import { DetailContainer } from '../../../components/DetailContainer';
import { InputCustom } from '../../../components/InputCustom';
import Table from '../../../components/Table';
import useModal from '../../../hooks/useModal';
import useOrcamento from '../../../hooks/useOrcamento';
import usePreVenda from '../../../hooks/usePreVenda';
import { useTheme } from '../../../hooks/useTheme';
import { MaskCnpjCpf } from '../../../utils';
import { ModalItemOrcamento, callback } from '../ItemOrcamento';
import {
  FormEditOrcamento,
  FormEditOrcamentoColumn,
  FormEditOrcamentoInputContainer,
  FormEditOrcamentoRow,
  FormFooter,
} from './styles';

interface iModalOrcamento {
  Orcamento: iOrcamento;
  callback?: (value: iOrcamento) => void;
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
  const { SavePreVenda } = usePreVenda();

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

  const SaveOrUpdate = async (item: callback) => {
    if (item.saveorupdate) {
      let removeItem: iItemRemove = {
        pIdOrcamento: NewOrcamento.ORCAMENTO,
        pProduto: item.orcamento.PRODUTO ? item.orcamento.PRODUTO.PRODUTO : '',
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
          let saveItem: iItemInserir = {
            pIdOrcamento: item.orcamento.ORCAMENTO.ORCAMENTO,
            pItemOrcamento: {
              CodigoProduto: item.orcamento.PRODUTO
                ? item.orcamento.PRODUTO.PRODUTO
                : '',
              Desconto: item.orcamento.DESCONTO ? item.orcamento.DESCONTO : 0,
              Frete: 0,
              Qtd: item.orcamento.QTD,
              Tabela: item.orcamento.TABELA,
              Total: item.orcamento.PRODUTO
                ? item.orcamento.PRODUTO.PRECO * item.orcamento.QTD
                : 0,
              SubTotal: item.orcamento.SUBTOTAL,
              Valor: item.orcamento.VALOR,
            },
          };

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
              setOrcamento(orc);
              setItensOrcamento(orc.ItensOrcamento);
            }
          });
        }
      });
    } else await AddItem(item.orcamento);
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
        Valor: item.VALOR,
      },
    };

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
        setOrcamento(orc);
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
        setOrcamento(orc);
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
    callback && callback(NewOrcamento);
  };

  const GerarPreVenda = (orc: iOrcamento) => {
    const result = SavePreVenda(orc);
    console.log('🚀 ~ file: index.tsx:223 ~ GerarPreVenda ~ result:', result);
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
          OnCloseButtonClick={() => callback && callback(NewOrcamento)}
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
              </FormEditOrcamentoRow>
            </FormEditOrcamentoColumn>
            <DetailContainer summary={'DETALHES'}>
              <FormEditOrcamentoColumn>
                <FormEditOrcamentoRow>
                  <FormEditOrcamentoInputContainer width='45%'>
                    <InputCustom
                      label='TELEFONE'
                      onChange={() => {}}
                      name='TELEFONE'
                      value={NewOrcamento.DATA}
                    />
                  </FormEditOrcamentoInputContainer>
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
            </DetailContainer>
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
              <FormEditOrcamentoRow height='30rem'>
                <Table
                  messageNoData={'Esse orçamento não possuí itens!'}
                  columns={tableHeaders}
                  data={ItensOrcamento}
                />
              </FormEditOrcamentoRow>
            </FormEditOrcamentoColumn>
            <FormFooter>
              <FormEditOrcamentoInputContainer width='15%'>
                <Button
                  onclick={() => SalvarOrcamento()}
                  Text='SALVAR'
                  Type='success'
                  Icon={faSave}
                  Height='3.5rem'
                />
              </FormEditOrcamentoInputContainer>
              <FormEditOrcamentoInputContainer width='60%'>
                <Button
                  onclick={() => GerarPreVenda(NewOrcamento)}
                  Text='GERAR PRÉ-VENDA'
                  Type='success'
                  Icon={faSave}
                  Height='3.5rem'
                />
              </FormEditOrcamentoInputContainer>
              <FormEditOrcamentoInputContainer width='20%'>
                <InputCustom
                  label='TOTAL ORCAMENTO'
                  onChange={() => {}}
                  name='TOTAL'
                  readOnly={true}
                  textAlign='right'
                  value={NewOrcamento.TOTAL.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                />
              </FormEditOrcamentoInputContainer>
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

