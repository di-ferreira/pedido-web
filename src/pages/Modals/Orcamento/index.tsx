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
import { iProduto } from '../../../@types/Produto';
import { iColumnType } from '../../../@types/Table';
import Button from '../../../components/Button';
import { DetailContainer } from '../../../components/DetailContainer';
import { FlexComponent } from '../../../components/FlexComponent';
import { InputCustom } from '../../../components/InputCustom';
import Table from '../../../components/Table';
import useModal from '../../../hooks/useModal';
import useOrcamento from '../../../hooks/useOrcamento';
import usePreVenda from '../../../hooks/usePreVenda';
import { useTheme } from '../../../hooks/useTheme';
import { MaskCnpjCpf } from '../../../utils';
import { ModalItemOrcamento, callback } from '../ItemOrcamento';
import { ModalPreVenda } from '../PreVenda';
import { FormEditOrcamento, FormFooter } from './styles';

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
  const [NewPreVenda, setNewPreVenda] = useState<iOrcamento | null>(null);

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

  const onCloseModalPreVenda = async (value: iOrcamento) => {
    // const newListPreVenda: iMovimento[] = PreVendaList.map((pv: iMovimento) => {
    //   if (pv.MOVIMENTO === value.MOVIMENTO) {
    //     pv = value;
    //     return pv;
    //   } else return pv;
    // });
    // setPreVendaList(newListPreVenda);
    setNewPreVenda(null);
  };

  const OpenModalItemOrcamento = () => {
    setItemOrcamento({
      ORCAMENTO: Orcamento,
      QTD: 1,
      SUBTOTAL: 0.0,
      TOTAL: 0.0,
      VALOR: 0.0,
      PRODUTO: {} as iProduto,
      TABELA: '',
      DESCONTO: 0,
    });
  };

  const SaveOrUpdate = async (item: callback) => {
    if (item.saveorupdate) {
      let removeItem: iItemRemove = {
        pIdOrcamento: NewOrcamento.ORCAMENTO,
        pProduto: item.itemOrcamento.PRODUTO
          ? item.itemOrcamento.PRODUTO.PRODUTO
          : '',
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
            pIdOrcamento: item.itemOrcamento.ORCAMENTO.ORCAMENTO,
            pItemOrcamento: {
              CodigoProduto: item.itemOrcamento.PRODUTO
                ? item.itemOrcamento.PRODUTO.PRODUTO
                : '',
              Desconto: item.itemOrcamento.DESCONTO
                ? item.itemOrcamento.DESCONTO
                : 0,
              Frete: 0,
              Qtd: item.itemOrcamento.QTD,
              Tabela: item.itemOrcamento.TABELA,
              Total: item.itemOrcamento.TOTAL,
              SubTotal: item.itemOrcamento.SUBTOTAL,
              Valor: item.itemOrcamento.VALOR,
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
    } else {
      await AddItem(item.itemOrcamento);
    }
  };

  const AddItem = async (item: iItensOrcamento) => {
    console.log('🚀 ~ file: index.tsx:161 ~ AddItem ~ item:', item);
    let saveItem: iItemInserir = {
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
        console.log(
          '🚀 ~ file: index.tsx:223 ~ RemoveItemOrcamento ~ orc:',
          orc
        );
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
    setNewPreVenda(orc);
  };

  const tableHeaders: iColumnType<iItensOrcamento>[] = [
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: '15%',
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
      {Modal && NewOrcamento && NewOrcamento.CLIENTE && (
        <Modal
          Title={
            NewOrcamento.ORCAMENTO > 0
              ? `ORÇAMENTO Nº ${NewOrcamento.ORCAMENTO.toString()}`
              : 'NOVO ORÇAMENTO'
          }
          width='95%'
          height='90vh'
          sm={{ width: '100%', height: '100vh' }}
          xs={{ width: '100%', height: '100vh' }}
          OnCloseButtonClick={() => callback && callback(NewOrcamento)}
        >
          <FormEditOrcamento>
            <FlexComponent direction='column' overflow='hidden auto'>
              <FlexComponent direction='column'>
                <h3>CLIENTE</h3>
                <FlexComponent
                  sm={{ wrap: 'wrap', gapColumn: '1rem', gapRow: '1rem' }}
                >
                  <FlexComponent
                    margin='0.5rem'
                    width='8%'
                    sm={{ width: '20%', order: 0, margin: '0rem' }}
                  >
                    <InputCustom
                      labelPosition='top'
                      label='CÓDIGO'
                      name='CLIENTE.CLIENTE'
                      value={NewOrcamento.CLIENTE.CLIENTE}
                    />
                  </FlexComponent>
                  <FlexComponent
                    margin='0.5rem'
                    width='50%'
                    sm={{ width: '100%', order: 2, margin: '0rem' }}
                  >
                    <InputCustom
                      label='NOME'
                      name='CLIENTE.NOME'
                      value={NewOrcamento.CLIENTE.NOME}
                    />
                  </FlexComponent>
                  <FlexComponent
                    margin='0.5rem'
                    width='42%'
                    sm={{ width: '77%', order: 1, margin: '0rem' }}
                  >
                    <InputCustom
                      label='CPF/CNPJ'
                      name='CLIENTE.CIC'
                      value={MaskCnpjCpf(NewOrcamento.CLIENTE.CIC)}
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
                  <FlexComponent
                    margin='0.5rem'
                    width='45%'
                    sm={{ margin: '0rem', width: '100%' }}
                  >
                    <InputCustom
                      label='TELEFONE'
                      name='TELEFONE'
                      value={NewOrcamento.DATA}
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
                      value={NewOrcamento.CLIENTE.ENDERECO}
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
                      value={NewOrcamento.CLIENTE.BAIRRO}
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
                      value={NewOrcamento.CLIENTE.CIDADE}
                    />
                  </FlexComponent>
                  <FlexComponent
                    margin='0.5rem'
                    width='5%'
                    sm={{ margin: '0rem', width: '12%' }}
                  >
                    <InputCustom
                      label='UF'
                      name='CLIENTE.UF'
                      value={NewOrcamento.CLIENTE.UF}
                    />
                  </FlexComponent>
                  <FlexComponent
                    margin='0.5rem'
                    width='10%'
                    sm={{ margin: '0rem', width: '33.5%' }}
                  >
                    <InputCustom
                      label='CEP'
                      name='CLIENTE.CEP'
                      value={NewOrcamento.CLIENTE.CEP}
                    />
                  </FlexComponent>
                </FlexComponent>
                <FlexComponent direction='column' margin='1rem 0'>
                  <h3>ORÇAMENTO</h3>
                  <FlexComponent
                    margin='.5rem 0 0 0'
                    sm={{ direction: 'column', gapRow: '1rem' }}
                  >
                    <FlexComponent
                      margin='0.5rem'
                      width='50%'
                      sm={{ margin: '0rem', width: '100%' }}
                    >
                      <InputCustom
                        label='OBSERVAÇÃO 1'
                        name='OBS1'
                        value={NewOrcamento.OBS1}
                      />
                    </FlexComponent>
                    <FlexComponent
                      margin='0.5rem'
                      width='50%'
                      sm={{ margin: '0rem', width: '100%' }}
                    >
                      <InputCustom
                        label='OBSERVAÇÃO 2'
                        name='OBS2'
                        value={NewOrcamento.OBS2}
                      />
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
                  <Table
                    messageNoData={'Esse orçamento não possuí itens!'}
                    columns={tableHeaders}
                    data={ItensOrcamento}
                  />
                </FlexComponent>
              </FlexComponent>
            </FlexComponent>
            <FormFooter>
              <FlexComponent
                padding='.5rem 0'
                sm={{ direction: 'column', gapRow: '1rem', height: '30vh' }}
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
                  <FlexComponent
                    width='20%'
                    sm={{ width: '100%' }}
                    lg={{ width: '100%' }}
                  >
                    <Button
                      onclick={() => SalvarOrcamento()}
                      Text='ORÇAMENTO'
                      Type='success'
                      Icon={faSave}
                      Height='3.5rem'
                    />
                  </FlexComponent>
                  <FlexComponent
                    width='20%'
                    sm={{ width: '100%' }}
                    lg={{ width: '100%' }}
                  >
                    <Button
                      onclick={() => GerarPreVenda(NewOrcamento)}
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
                  sm={{ width: '100%', order: 0 }}
                >
                  <FlexComponent width='30%' sm={{ width: '100%' }}>
                    <InputCustom
                      label='TOTAL ORCAMENTO'
                      name='TOTAL'
                      readOnly={true}
                      textAlign='right'
                      value={NewOrcamento.TOTAL.toLocaleString('pt-br', {
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

      {ItemOrcamento && (
        <ModalItemOrcamento callback={SaveOrUpdate} Item={ItemOrcamento} />
      )}
      {NewPreVenda && (
        <ModalPreVenda
          Orcamento={NewPreVenda}
          callback={onCloseModalPreVenda}
        />
      )}
    </>
  );
};
