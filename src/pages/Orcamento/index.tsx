/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import {
  faEdit,
  faFileInvoiceDollar,
  faPlus,
  faSave,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { iItemInserir, iItemRemove, iItensOrcamento, iOrcamento } from '../../@types/Orcamento';
import { iProduto } from '../../@types/Produto';
import { iColumnType } from '../../@types/Table';
import Button from '../../components/Button';
import { DataTable } from '../../components/DataTable';
import { DetailContainer } from '../../components/DetailContainer';
import { FlexComponent } from '../../components/FlexComponent';
import { InputCustom } from '../../components/InputCustom';
import { SetCurrentItem } from '../../features/orcamento/Orcamento.slice';
import {
  NewItemOrcamento,
  RemoveItemOrcamento,
  UpdateItemOrcamento,
} from '../../features/orcamento/Orcamento.thunk';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppSelector';
import useTabList from '../../hooks/useTabList';
import { useTheme } from '../../hooks/useTheme';
import { MaskCnpjCpf } from '../../utils';
import { ModalItemOrcamento, callbackResult } from '../Modals/ItemOrcamento';
import { Container, FormEditOrcamento, FormFooter } from './styles';

interface iModalOrcamento {
  callback?: (value: iOrcamento) => void;
}

export const Orcamento: React.FC<iModalOrcamento> = ({ callback }) => {
  const { ThemeName } = useTheme();
  const navigate = useNavigate();
  const { openTab } = useTabList((state) => state);

  const dispatch = useAppDispatch();

  const { Current, errorMessage, isLoading } = useAppSelector((state) => state.orcamento);
  const [ItemModalIsOpen, setItemModalIsOpen] = useState<boolean>(false);

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

  // eslint-disable-next-line no-undef
  const SaveOrUpdate = (item: callbackResult | null) => {
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

  const OpenModalUpdateItem = (item: iItensOrcamento) => {
    dispatch(SetCurrentItem({ ...item, ORCAMENTO: Current }));
    setItemModalIsOpen(true);
  };

  const SalvarOrcamento = () => {
    callback && callback(Current);
  };

  const GerarPreVenda = (orc: iOrcamento) => {
    openTab({
      Icon: faFileInvoiceDollar,
      Link: `orcamentos/${orc.ORCAMENTO}/pre-venda`,
      Closable: true,
      TitleTab: `Pré-Venda ${orc.ORCAMENTO}`,
      isActive: true,
    });
    navigate(`/orcamentos/${orc.ORCAMENTO}/pre-venda`);
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
    <Container>
      <FormEditOrcamento>
        <FlexComponent direction='column' overflow='hidden auto'>
          <FlexComponent padding='0rem 1rem' direction='column'>
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
          <FlexComponent padding='0rem 1rem'>
            <DetailContainer summary={'DETALHES'}>
              <FlexComponent
                padding='0rem 1rem'
                sm={{
                  wrap: 'wrap',
                  gapColumn: '1rem',
                  gapRow: '1rem',
                  margin: '0rem',
                }}
                md={{
                  padding: '1rem',
                  wrap: 'wrap',
                  gapColumn: '1rem',
                  gapRow: '1rem',
                  margin: '0rem',
                }}
              >
                <FlexComponent
                  margin='0.5rem'
                  width='45%'
                  sm={{ margin: '0rem', width: '100%' }}
                  md={{ margin: '0rem', width: '25%' }}
                >
                  <InputCustom label='TELEFONE' name='TELEFONE' value={Current.CLIENTE.TELEFONE} />
                </FlexComponent>
                <FlexComponent
                  margin='0.5rem'
                  width='40%'
                  md={{ margin: '0rem', width: '40%' }}
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
                  md={{ margin: '0rem', width: '30%' }}
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
                  md={{ margin: '0rem', width: '25%' }}
                  sm={{ margin: '0rem', width: '48.5%' }}
                >
                  <InputCustom
                    label='CIDADE'
                    name='CLIENTE.CIDADE'
                    value={Current.CLIENTE.CIDADE}
                  />
                </FlexComponent>
                <FlexComponent
                  margin='0.5rem'
                  width='5%'
                  md={{ margin: '0rem', width: '25%' }}
                  sm={{ margin: '0rem', width: '12%' }}
                >
                  <InputCustom label='UF' name='CLIENTE.UF' value={Current.CLIENTE.UF} />
                </FlexComponent>
                <FlexComponent
                  margin='0.5rem'
                  width='10%'
                  md={{ margin: '0rem', width: '25%' }}
                  sm={{ margin: '0rem', width: '33.5%' }}
                >
                  <InputCustom label='CEP' name='CLIENTE.CEP' value={Current.CLIENTE.CEP} />
                </FlexComponent>
              </FlexComponent>
              <FlexComponent padding='0rem 1rem' direction='column' margin='1rem 0'>
                <h3>ORÇAMENTO</h3>
                <FlexComponent margin='.5rem 0 0 0' sm={{ direction: 'column', gapRow: '1rem' }}>
                  <FlexComponent margin='0.5rem' width='50%' sm={{ margin: '0rem', width: '100%' }}>
                    <InputCustom label='OBSERVAÇÃO 1' name='OBS1' value={Current.OBS1} />
                  </FlexComponent>
                  <FlexComponent margin='0.5rem' width='50%' sm={{ margin: '0rem', width: '100%' }}>
                    <InputCustom label='OBSERVAÇÃO 2' name='OBS2' value={Current.OBS2} />
                  </FlexComponent>
                </FlexComponent>
              </FlexComponent>
            </DetailContainer>
          </FlexComponent>
          <FlexComponent direction='column'>
            <FlexComponent padding='0rem 1rem' margin='0.5rem 0rem' gapColumn='.5rem'>
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
              md={{
                alignItems: 'center',
                padding: '1rem 0 0 0',
              }}
            >
              <FlexComponent width='25%' sm={{ width: '100%' }} lg={{ width: '100%' }}>
                <Button
                  onclick={() => SalvarOrcamento()}
                  Text='ORÇAMENTO'
                  Type='success'
                  Icon={faSave}
                  Height='3.5rem'
                />
              </FlexComponent>
              <FlexComponent width='25%' sm={{ width: '100%' }} lg={{ width: '100%' }}>
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
              md={{ width: '50%', margin: '1rem 0 0 0' }}
            >
              <FlexComponent width='30%' sm={{ width: '100%' }} md={{ width: '70%' }}>
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

      {ItemModalIsOpen && <ModalItemOrcamento callback={SaveOrUpdate} />}
    </Container>
  );
};
