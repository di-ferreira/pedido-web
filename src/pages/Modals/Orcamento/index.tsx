import React, { useEffect, useState } from 'react';

import { faEdit, faPlus, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { iItemInserir, iItemRemove, iItensOrcamento, iOrcamento } from '../../../@types/Orcamento';
import { iProduto } from '../../../@types/Produto';
import { iColumnType } from '../../../@types/Table';
import Button from '../../../components/Button';
import { DataTable } from '../../../components/DataTable';
import { DetailContainer } from '../../../components/DetailContainer';
import { FlexComponent } from '../../../components/FlexComponent';
import { InputCustom } from '../../../components/InputCustom';
import {
  NewItemOrcamento,
  RemoveItemOrcamento,
  UpdateItemOrcamento,
} from '../../../features/orcamento/Orcamento-Thunk';
import { SetCurrentItem } from '../../../features/orcamento/orcamento-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppSelector';
import useModal from '../../../hooks/useModal';
import { useTheme } from '../../../hooks/useTheme';
import { MaskCnpjCpf } from '../../../utils';
import { ModalItemOrcamento, callback } from '../ItemOrcamento';
import { ModalPreVenda } from '../PreVenda';
import { FormEditOrcamento, FormFooter } from './styles';

interface iModalOrcamento {
  callback?: (value: iOrcamento) => void;
}

export const ModalOrcamento: React.FC<iModalOrcamento> = ({ callback }) => {
  const { ThemeName } = useTheme();

  const dispatch = useAppDispatch();

  const { Current, errorMessage, isLoading } = useAppSelector((state) => state.orcamento);

  const [NewPreVenda, setNewPreVenda] = useState<iOrcamento | null>(null);

  const [ItemModalIsOpen, setItemModalIsOpen] = useState<boolean>(false);

  const { Modal, showModal, OnCloseModal } = useModal();

  useEffect(() => {
    return () => showModal();
  }, []);

  const onCloseModalPreVenda = async (value: iOrcamento) => {
    setNewPreVenda(null);
  };

  const OpenModalItemOrcamento = () => {
    dispatch(
      SetCurrentItem({
        ORCAMENTO: Current,
        QTD: 1,
        SUBTOTAL: 0.0,
        TOTAL: 0.0,
        VALOR: 0.0,
        PRODUTO: {} as iProduto,
        TABELA: '',
        DESCONTO: 0,
      }),
    );
    setItemModalIsOpen(true);
  };

  const SaveOrUpdate = (item: callback | null) => {
    if (item !== null) {
      if (item.update) {
        UpdateItem(item.itemOrcamento);
      } else {
        AddItem(item.itemOrcamento);
      }
    }
    setItemModalIsOpen(false);
  };

  const AddItem = (item: iItensOrcamento) => {
    const saveItem: iItemInserir = {
      pIdOrcamento: item.ORCAMENTO.ORCAMENTO,
      pItemOrcamento: {
        CodigoProduto: item.PRODUTO ? item.PRODUTO.PRODUTO : '',
        Desconto: item.DESCONTO ? item.DESCONTO : 0,
        Frete: 0,
        Qtd: item.QTD,
        Tabela: item.TABELA,
        Total: item.TOTAL,
        SubTotal: item.SUBTOTAL,
        Valor: item.VALOR,
      },
    };

    const itemsVerify = Current.ItensOrcamento.filter(
      (i) => i.PRODUTO.PRODUTO === saveItem.pItemOrcamento.CodigoProduto,
    );

    if (itemsVerify.length > 0) {
      toast.warning('Opps, Produto já se encontra na lista 🤯', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: ThemeName,
      });
    } else {
      dispatch(NewItemOrcamento(saveItem));

      if (errorMessage !== '' && !isLoading) {
        toast.error(`Opps, ${errorMessage} 🤯`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: ThemeName,
        });
      }
    }
  };

  const DeleteItem = (item: iItensOrcamento) => {
    const removeItem: iItemRemove = {
      pIdOrcamento: Number(Current.ORCAMENTO),
      pProduto: item.PRODUTO ? item.PRODUTO.PRODUTO : '',
    };

    dispatch(RemoveItemOrcamento(removeItem));

    if (errorMessage !== '' && !isLoading) {
      toast.error(`Opps, ${errorMessage} 🤯`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: ThemeName,
      });
    }
  };

  const UpdateItem = (item: iItensOrcamento) => {
    const updateItem: iItemInserir = {
      pIdOrcamento: item.ORCAMENTO.ORCAMENTO,
      pItemOrcamento: {
        CodigoProduto: item.PRODUTO ? item.PRODUTO.PRODUTO : '',
        Desconto: item.DESCONTO ? item.DESCONTO : 0,
        Frete: 0,
        Qtd: item.QTD,
        Tabela: item.TABELA,
        Total: item.TOTAL,
        SubTotal: item.SUBTOTAL,
        Valor: item.VALOR,
      },
    };

    dispatch(UpdateItemOrcamento(updateItem));

    if (errorMessage !== '' && !isLoading) {
      toast.error(`Opps, ${errorMessage} 🤯`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: ThemeName,
      });
    }
  };

  const OpenModalUpdateItem = async (item: iItensOrcamento) => {
    dispatch(SetCurrentItem({ ...item, ORCAMENTO: Current }));
    setItemModalIsOpen(true);
  };

  const SalvarOrcamento = () => {
    OnCloseModal();
    callback && callback(Current);
  };

  const GerarPreVenda = (orc: iOrcamento) => {
    setNewPreVenda(orc);
  };

  const tableHeaders: iColumnType<iItensOrcamento>[] = [
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: '15%',
      action: [
        {
          onclick: OpenModalUpdateItem,
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
      key: 'PRODUTO.PRODUTO',
      title: 'CÓDIGO',
      width: '15%',
    },
    {
      key: 'PRODUTO.REFERENCIA',
      title: 'REFERÊNCIA',
      width: '15%',
    },
    {
      key: 'PRODUTO.NOME',
      title: 'PRODUTO',
      width: '15%',
    },
    {
      key: 'PRODUTO.APLICACOES',
      title: 'APLICAÇÕES',
      width: '35%',
    },
    {
      key: 'PRODUTO.FABRICANTE.NOME',
      title: 'FABRICANTE',
      width: '15%',
    },
    {
      key: 'QTD',
      title: 'QTD',
      width: '5%',
    },
    {
      key: 'TOTAL',
      title: 'TOTAL',
      width: '15%',
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
      {Modal && (
        <Modal
          Title={
            Current.ORCAMENTO !== undefined || Current.ORCAMENTO > 0
              ? `ORÇAMENTO Nº ${Current.ORCAMENTO.toString()}`
              : 'NOVO ORÇAMENTO'
          }
          width='100vw'
          height='100vh'
          sm={{ width: '100%', height: '100vh' }}
          xs={{ width: '100%', height: '100vh' }}
          OnCloseButtonClick={() => callback && callback(Current)}
        >
          <FormEditOrcamento>
            <FlexComponent direction='column' overflow='hidden auto'>
              <FlexComponent direction='column'>
                <h3>CLIENTE</h3>
                <FlexComponent sm={{ wrap: 'wrap', gapColumn: '1rem', gapRow: '1rem' }}>
                  <FlexComponent
                    margin='0.5rem'
                    width='8%'
                    sm={{ width: '20%', order: 0, margin: '0rem' }}
                  >
                    <InputCustom
                      labelPosition='top'
                      label='CÓDIGO'
                      name='CLIENTE.CLIENTE'
                      value={Current.CLIENTE.CLIENTE}
                    />
                  </FlexComponent>
                  <FlexComponent
                    margin='0.5rem'
                    width='50%'
                    sm={{ width: '100%', order: 2, margin: '0rem' }}
                  >
                    <InputCustom label='NOME' name='CLIENTE.NOME' value={Current.CLIENTE.NOME} />
                  </FlexComponent>
                  <FlexComponent
                    margin='0.5rem'
                    width='42%'
                    sm={{ width: '77%', order: 1, margin: '0rem' }}
                  >
                    <InputCustom
                      label='CPF/CNPJ'
                      name='CLIENTE.CIC'
                      value={MaskCnpjCpf(Current.CLIENTE.CIC)}
                    />
                  </FlexComponent>
                </FlexComponent>
              </FlexComponent>
              <DetailContainer summary={'DETALHES'}>
                <FlexComponent
                  sm={{
                    wrap: 'wrap',
                    gapColumn: '1rem',
                    gapRow: '1rem',
                    margin: '0rem',
                  }}
                >
                  <FlexComponent margin='0.5rem' width='45%' sm={{ margin: '0rem', width: '100%' }}>
                    <InputCustom
                      label='TELEFONE'
                      name='TELEFONE'
                      value={Current.CLIENTE.TELEFONE}
                    />
                  </FlexComponent>
                  <FlexComponent
                    margin='0.5rem'
                    width='40%'
                    sm={{ margin: '0rem', width: '48.5%' }}
                  >
                    <InputCustom
                      label='ENDEREÇO'
                      name='CLIENTE.ENDERECO'
                      value={Current.CLIENTE.ENDERECO}
                    />
                  </FlexComponent>
                  <FlexComponent
                    margin='0.5rem'
                    width='15%'
                    sm={{ margin: '0rem', width: '48.5%' }}
                  >
                    <InputCustom
                      label='BAIRRO'
                      name='CLIENTE.BAIRRO'
                      value={Current.CLIENTE.BAIRRO}
                    />
                  </FlexComponent>
                  <FlexComponent
                    margin='0.5rem'
                    width='20%'
                    sm={{ margin: '0rem', width: '48.5%' }}
                  >
                    <InputCustom
                      label='CIDADE'
                      name='CLIENTE.CIDADE'
                      value={Current.CLIENTE.CIDADE}
                    />
                  </FlexComponent>
                  <FlexComponent margin='0.5rem' width='5%' sm={{ margin: '0rem', width: '12%' }}>
                    <InputCustom label='UF' name='CLIENTE.UF' value={Current.CLIENTE.UF} />
                  </FlexComponent>
                  <FlexComponent
                    margin='0.5rem'
                    width='10%'
                    sm={{ margin: '0rem', width: '33.5%' }}
                  >
                    <InputCustom label='CEP' name='CLIENTE.CEP' value={Current.CLIENTE.CEP} />
                  </FlexComponent>
                </FlexComponent>
                <FlexComponent direction='column' margin='1rem 0'>
                  <h3>ORÇAMENTO</h3>
                  <FlexComponent margin='.5rem 0 0 0' sm={{ direction: 'column', gapRow: '1rem' }}>
                    <FlexComponent
                      margin='0.5rem'
                      width='50%'
                      sm={{ margin: '0rem', width: '100%' }}
                    >
                      <InputCustom label='OBSERVAÇÃO 1' name='OBS1' value={Current.OBS1} />
                    </FlexComponent>
                    <FlexComponent
                      margin='0.5rem'
                      width='50%'
                      sm={{ margin: '0rem', width: '100%' }}
                    >
                      <InputCustom label='OBSERVAÇÃO 2' name='OBS2' value={Current.OBS2} />
                    </FlexComponent>
                  </FlexComponent>
                </FlexComponent>
              </DetailContainer>
              <FlexComponent direction='column'>
                <FlexComponent margin='0.5rem 0rem' gapColumn='.5rem'>
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
                </FlexComponent>
                <FlexComponent height='60vh'>
                  <DataTable
                    columns={tableHeaders}
                    TableData={Current.ItensOrcamento}
                    IsLoading={isLoading}
                  />
                </FlexComponent>
              </FlexComponent>
            </FlexComponent>
            <FormFooter>
              <FlexComponent
                padding='.5rem 0'
                sm={{ direction: 'column', gapRow: '1rem', height: '23vh' }}
              >
                <FlexComponent
                  width='50%'
                  justifyContent='flex-start'
                  gapColumn='1.5rem'
                  sm={{
                    gapColumn: '0rem',
                    width: '100%',
                    direction: 'column',
                    gapRow: '1rem',
                    order: 1,
                  }}
                >
                  <FlexComponent width='20%' sm={{ width: '100%' }} lg={{ width: '100%' }}>
                    <Button
                      onclick={() => SalvarOrcamento()}
                      Text='ORÇAMENTO'
                      Type='success'
                      Icon={faSave}
                      Height='3.5rem'
                    />
                  </FlexComponent>
                  <FlexComponent width='20%' sm={{ width: '100%' }} lg={{ width: '100%' }}>
                    <Button
                      onclick={() => GerarPreVenda(Current)}
                      Text='PRÉ-VENDA'
                      Type='success'
                      Icon={faSave}
                      Height='3.5rem'
                    />
                  </FlexComponent>
                </FlexComponent>
                <FlexComponent
                  width='50%'
                  justifyContent='flex-end'
                  sm={{ width: '100%', order: 0, padding: '1.5rem 0 0 0' }}
                >
                  <FlexComponent width='30%' sm={{ width: '100%' }}>
                    <InputCustom
                      label='TOTAL ORCAMENTO'
                      name='TOTAL'
                      readOnly={true}
                      textAlign='right'
                      value={Current.TOTAL.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    />
                  </FlexComponent>
                </FlexComponent>
              </FlexComponent>
            </FormFooter>
          </FormEditOrcamento>
        </Modal>
      )}

      {ItemModalIsOpen && <ModalItemOrcamento callback={SaveOrUpdate} />}
      {NewPreVenda && <ModalPreVenda Orcamento={NewPreVenda} callback={onCloseModalPreVenda} />}
    </>
  );
};
