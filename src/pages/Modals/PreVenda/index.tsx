import React, { useEffect, useState } from 'react';

import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { iItemPreVenda, iMovimento } from '../../../@types/PreVenda';
import { iColumnType } from '../../../@types/Table';
import Button from '../../../components/Button';
import { DetailContainer } from '../../../components/DetailContainer';
import { InputCustom } from '../../../components/InputCustom';
import Table from '../../../components/Table';
import useModal from '../../../hooks/useModal';
import usePreVenda from '../../../hooks/usePreVenda';
import { useTheme } from '../../../hooks/useTheme';
import { MaskCnpjCpf } from '../../../utils';
import {
  FormEditOrcamento,
  FormEditOrcamentoColumn,
  FormEditOrcamentoInputContainer,
  FormEditOrcamentoRow,
  FormFooter,
} from './styles';

interface iModalPreVenda {
  PreVenda: iMovimento;
  callback?: (value: iMovimento) => void;
}

export const ModalPreVenda: React.FC<iModalPreVenda> = ({
  PreVenda,
  callback,
}) => {
  const { ThemeName } = useTheme();

  const [NewPreVenda, setNewPreVenda] = useState<iMovimento>(PreVenda);
  const [ItensPreVenda, setItensPreVenda] = useState<iItemPreVenda[]>([]);
  const [ItemPreVenda, setItemPreVenda] = useState<iItemPreVenda | null>(null);

  const { Modal, showModal, OnCloseModal } = useModal();

  const { GetPreVenda } = usePreVenda();

  useEffect(() => {
    const OpenModal = () => {
      showModal();
      setNewPreVenda(PreVenda);
      setItensPreVenda(PreVenda.Itens_List);
    };
    console.log('🚀 ~ file: index.tsx:47 ~ OpenModal ~ PreVenda:', PreVenda);
    return () => OpenModal();
  }, [PreVenda]);

  // const OpenModalItemOrcamento = () => {
  //   setItemPreVenda({

  //     ORCAMENTO: PreVenda,
  //     QTD: 1,
  //     SUBTOTAL: 0.0,
  //     TOTAL: 0.0,
  //     VALOR: 0.0,
  //     PRODUTO: null,
  //     TABELA: '',
  //   });
  // };

  // const SaveOrUpdate = async (item: callback) => {
  //   if (item.saveorupdate) {
  //     let removeItem: iItemRemove = {
  //       pIdOrcamento: NewPreVenda.ORCAMENTO,
  //       pProduto: item.orcamento.PRODUTO ? item.orcamento.PRODUTO.PRODUTO : '',
  //     };
  //     RemoveItemOrcamento(removeItem).then(async (res) => {
  //       const { StatusCode, Data, StatusMessage } = res.data;

  //       if (StatusCode !== 200) {
  //         toast.error(`Opps, ${StatusMessage} 🤯`, {
  //           position: 'bottom-right',
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: ThemeName,
  //         });
  //       } else {
  //         let saveItem: iItemInserir = {
  //           pIdOrcamento: item.orcamento.ORCAMENTO.ORCAMENTO,
  //           pItemOrcamento: {
  //             CodigoProduto: item.orcamento.PRODUTO
  //               ? item.orcamento.PRODUTO.PRODUTO
  //               : '',
  //             Desconto: item.orcamento.DESCONTO ? item.orcamento.DESCONTO : 0,
  //             Frete: 0,
  //             Qtd: item.orcamento.QTD,
  //             Tabela: item.orcamento.TABELA,
  //             Total: item.orcamento.PRODUTO
  //               ? item.orcamento.PRODUTO.PRECO * item.orcamento.QTD
  //               : 0,
  //             SubTotal: item.orcamento.SUBTOTAL,
  //             Valor: item.orcamento.VALOR,
  //           },
  //         };

  //         AddItemOrcamento(saveItem).then(async (res) => {
  //           const { StatusCode, Data, StatusMessage } = res.data;

  //           if (StatusCode !== 200) {
  //             toast.error(`Opps, ${StatusMessage} 🤯`, {
  //               position: 'bottom-right',
  //               autoClose: 5000,
  //               hideProgressBar: false,
  //               closeOnClick: true,
  //               pauseOnHover: true,
  //               draggable: true,
  //               progress: undefined,
  //               theme: ThemeName,
  //             });
  //           } else {
  //             const orc: iMovimento = (await GetOrcamento(Data.ORCAMENTO)).data;
  //             setNewPreVenda(orc);
  //             setItensPreVenda(orc.ItensPreVenda);
  //           }
  //         });
  //       }
  //     });
  //   } else await AddItem(item.orcamento);
  // };

  // const AddItem = async (item: iItensOrcamento) => {
  //   let saveItem: iItemInserir = {
  //     pIdOrcamento: item.ORCAMENTO.ORCAMENTO,
  //     pItemOrcamento: {
  //       CodigoProduto: item.PRODUTO ? item.PRODUTO.PRODUTO : '',
  //       Desconto: item.DESCONTO ? item.DESCONTO : 0,
  //       Frete: 0,
  //       Qtd: item.QTD,
  //       Tabela: item.TABELA,
  //       Total: item.PRODUTO ? item.PRODUTO.PRECO * item.QTD : 0,
  //       SubTotal: item.SUBTOTAL,
  //       Valor: item.VALOR,
  //     },
  //   };

  //   AddItemOrcamento(saveItem).then(async (res) => {
  //     const { StatusCode, Data, StatusMessage } = res.data;

  //     if (StatusCode !== 200) {
  //       toast.error(`Opps, ${StatusMessage} 🤯`, {
  //         position: 'bottom-right',
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: ThemeName,
  //       });
  //     } else {
  //       const orc: iMovimento = (await GetOrcamento(Data.ORCAMENTO)).data;
  //       setNewPreVenda(orc);
  //       setItensPreVenda(orc.ItensPreVenda);
  //     }
  //   });
  // };

  // const DeleteItem = async (item: iItensOrcamento) => {
  //   let removeItem: iItemRemove = {
  //     pIdOrcamento: NewPreVenda.ORCAMENTO,
  //     pProduto: item.PRODUTO ? item.PRODUTO.PRODUTO : '',
  //   };
  //   RemoveItemOrcamento(removeItem).then(async (res) => {
  //     const { StatusCode, Data, StatusMessage } = res.data;

  //     if (StatusCode !== 200) {
  //       toast.error(`Opps, ${StatusMessage} 🤯`, {
  //         position: 'bottom-right',
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: ThemeName,
  //       });
  //     } else {
  //       const orc: iMovimento = (await GetOrcamento(Data.ORCAMENTO)).data;
  //       setNewPreVenda(orc);
  //       setItensPreVenda(orc.ItensPreVenda);
  //     }
  //   });
  // };

  // const UpdateItem = async (item: iItensOrcamento) => {
  //   setItemPreVenda({ ...item, ORCAMENTO: NewPreVenda });
  // };

  // const SalvarOrcamento = () => {
  //   // toast.promise(SaveOrcamento(NewPreVenda), {
  //   //   pending: `Salvando Orçamento do cliente ${NewPreVenda.CLIENTE.NOME}`,
  //   //   success: 'Orçamento Salvo 👌',
  //   //   error: 'Opps, ocorreu um erro 🤯',
  //   // });
  //   OnCloseModal();
  //   callback && callback(NewPreVenda);
  // };

  const tableHeaders: iColumnType<iItemPreVenda>[] = [
    // {
    //   key: 'acoes',
    //   title: 'AÇÕES',
    //   width: '20%',
    //   action: [
    //     {
    //       onclick: UpdateItem,
    //       Icon: faEdit,
    //       Title: 'Editar',
    //       Type: 'warn',
    //     },
    //     {
    //       onclick: DeleteItem,
    //       Icon: faTrashAlt,
    //       Title: 'Excluir',
    //       Type: 'danger',
    //     },
    //   ],
    // },
    {
      key: 'CodigoProduto',
      title: 'COD. PRODUTO',
      width: '10%',
    },
    {
      key: 'Qtd',
      title: 'QTD',
      width: '10%',
    },
    {
      key: 'Total',
      title: 'TOTAL',
      width: '20%',
      isHideMobile: true,
      render: (_, item) => {
        let TotalPV: number = 0.0;

        if (item.Total) {
          TotalPV = item.Total;
        }

        return TotalPV.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },
  ];

  return (
    <>
      {Modal && NewPreVenda && NewPreVenda.CLIENTE && (
        <Modal
          Title={
            NewPreVenda.MOVIMENTO > 0
              ? `ORÇAMENTO Nº ${NewPreVenda.MOVIMENTO.toString()}`
              : 'NOVO ORÇAMENTO'
          }
          OnCloseButtonClick={() => callback && callback(NewPreVenda)}
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
                    value={NewPreVenda.CLIENTE.CLIENTE}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='50%'>
                  <InputCustom
                    label='NOME'
                    onChange={() => {}}
                    name='CLIENTE.NOME'
                    value={NewPreVenda.CLIENTE.NOME}
                  />
                </FormEditOrcamentoInputContainer>
                <FormEditOrcamentoInputContainer width='35%'>
                  <InputCustom
                    label='CPF/CNPJ'
                    onChange={() => {}}
                    name='CLIENTE.CIC'
                    value={MaskCnpjCpf(NewPreVenda.CLIENTE.CIC)}
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
                      value={NewPreVenda.DATA}
                    />
                  </FormEditOrcamentoInputContainer>
                  <FormEditOrcamentoInputContainer width='40%'>
                    <InputCustom
                      onChange={() => {}}
                      label='ENDEREÇO'
                      name='CLIENTE.ENDERECO'
                      value={NewPreVenda.CLIENTE.ENDERECO}
                    />
                  </FormEditOrcamentoInputContainer>
                  <FormEditOrcamentoInputContainer width='15%'>
                    <InputCustom
                      onChange={() => {}}
                      label='BAIRRO'
                      name='CLIENTE.BAIRRO'
                      value={NewPreVenda.CLIENTE.BAIRRO}
                    />
                  </FormEditOrcamentoInputContainer>
                  <FormEditOrcamentoInputContainer width='20%'>
                    <InputCustom
                      onChange={() => {}}
                      label='CIDADE'
                      name='CLIENTE.CIDADE'
                      value={NewPreVenda.CLIENTE.CIDADE}
                    />
                  </FormEditOrcamentoInputContainer>
                  <FormEditOrcamentoInputContainer width='5%'>
                    <InputCustom
                      onChange={() => {}}
                      label='UF'
                      name='CLIENTE.UF'
                      value={NewPreVenda.CLIENTE.UF}
                    />
                  </FormEditOrcamentoInputContainer>
                  <FormEditOrcamentoInputContainer width='10%'>
                    <InputCustom
                      onChange={() => {}}
                      label='CEP'
                      name='CLIENTE.CEP'
                      value={NewPreVenda.CLIENTE.CEP}
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
                      value={NewPreVenda.OBS1}
                    />
                  </FormEditOrcamentoInputContainer>
                  <FormEditOrcamentoInputContainer width='45%'>
                    <InputCustom
                      label='OBSERVAÇÃO 2'
                      onChange={() => {}}
                      name='OBS2'
                      value={NewPreVenda.OBS2}
                    />
                  </FormEditOrcamentoInputContainer>
                </FormEditOrcamentoRow>
              </FormEditOrcamentoColumn>
            </DetailContainer>
            <FormEditOrcamentoColumn>
              <FormEditOrcamentoRow>
                <h3>ITENS</h3>
                <Button
                  // onclick={() => OpenModalItemOrcamento()}
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
                  data={ItensPreVenda}
                />
              </FormEditOrcamentoRow>
            </FormEditOrcamentoColumn>
            <FormFooter>
              <FormEditOrcamentoInputContainer width='15%'>
                <Button
                  // onclick={() => SalvarOrcamento()}
                  Text='SALVAR'
                  Type='success'
                  Icon={faSave}
                  Height='3.5rem'
                />
              </FormEditOrcamentoInputContainer>
              <FormEditOrcamentoInputContainer width='60%'>
                <Button
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
                  value={NewPreVenda.TOTAL.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                />
              </FormEditOrcamentoInputContainer>
            </FormFooter>
          </FormEditOrcamento>
        </Modal>
      )}
      {/* {ItemPreVenda && (
        <ModalItemOrcamento callback={SaveOrUpdate} Item={ItemPreVenda} />
      )} */}
    </>
  );
};

