import React, { useEffect, useRef, useState } from 'react';

import { faBan, faSave } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { SingleValue } from 'react-select';
import { toast } from 'react-toastify';
import { iOrcamento } from '../../../@types/Orcamento';
import {
  iCondicaoPgto,
  iFormaPgto,
  iItemPreVenda,
  iPreVenda,
  iTransportadora,
} from '../../../@types/PreVenda';
import { iColumnType, iOption, iTableRef } from '../../../@types/Table';
import { Secondary } from '../../../colors';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';
import { FieldSet } from '../../../components/FieldSet';
import { FlexComponent } from '../../../components/FlexComponent';
import { InputCustom } from '../../../components/InputCustom';
import Table from '../../../components/Table';
import useSelect from '../../../hooks/UseSelect';
import useModal from '../../../hooks/useModal';
import usePreVenda from '../../../hooks/usePreVenda';
import { useTheme } from '../../../hooks/useTheme';
import { FormEditOrcamento, FormFooter } from './styles';

interface iModalPreVenda {
  Orcamento: iOrcamento;
  callback?: (value: iOrcamento) => void;
}
interface iParcelasPgto {
  DIAS: number;
  VENCIMENTO: string;
  VALOR: number;
}

export const ModalPreVenda: React.FC<iModalPreVenda> = ({
  Orcamento,
  callback,
}) => {
  const { GetCondicaoPgto, GetFormaPgto, GetTransportadora, SavePreVenda } =
    usePreVenda();
  const { ThemeName } = useTheme();
  const { Select } = useSelect();

  const [SwitchEntrega, setSwitchEntrega] = useState('N');

  const [NewPreVenda, setNewPreVenda] = useState<iOrcamento>(Orcamento);
  const [ListaParcelas, setListaParcelas] = useState<iParcelasPgto[]>([]);
  const [IdCondicaoPgto, setIdCondicaoPgto] = useState<number>(0);
  const [IdTransp, setIdTransp] = useState<number>(0);
  const [OptCondicaoPgto, setOptCondicaoPgto] = useState<iOption[]>([]);
  const [OptFormasPgto, setOptFormasPgto] = useState<iOption[]>([]);
  const [OptTransportadoras, setOptTransportadoras] = useState<iOption[]>([]);

  const [valueSubTotal, setvalueSubTotal] = useState(0);
  const [valueTotal, setvalueTotal] = useState(0);
  const [valueFrete, setvalueFrete] = useState<string>('');
  const [valueFreteNumero, setvalueFreteNumero] = useState<number>(0);
  const [valueObsPedido1, setvalueObsPedido1] = useState('');
  const [valueObsNotaFiscal, setvalueObsNotaFiscal] = useState('');
  const [valueNumeroOrdemCompraCliente, setvalueNumeroOrdemCompraCliente] =
    useState('');
  const [FretePorConta, setFretePorConta] = useState<number>(0);

  const [OptFormasPgtoSelected, setOptFormasPgtoSelected] = useState<iOption>();
  const [OptTransportadorasSelected, setOptTransportadorasSelected] =
    useState<iOption>();
  const [OptCondicaoPgtoSelected, setOptCondicaoPgtoSelected] =
    useState<iOption>();
  const [CondicoesPgto, setCondicoesPgto] = useState<iCondicaoPgto[]>([]);
  const [OptVeiculos, _] = useState<iOption[]>([
    { label: 'CARRO', value: 'CARRO' },
    { label: 'MOTO', value: 'MOTO' },
  ]);
  const [OptVeiculo, setOptVeiculo] = useState<iOption>(OptVeiculos[0]);
  const TableRef = useRef<iTableRef<iParcelasPgto>>(null!);

  const { Modal, showModal, OnCloseModal } = useModal();

  const OpenModal = async () => {
    showModal();
    setNewPreVenda(Orcamento);
    await ListarCondicaoPgto();
    await ListarFormaPgto();
    await ListarTransportadoras();
    setvalueSubTotal(Orcamento.TOTAL);
    setvalueTotal(Orcamento.TOTAL);
  };

  useEffect(() => {
    const Open = () => {
      OpenModal();
    };
    return () => Open();
  }, [Orcamento]);

  const OnChangeTransp = (newValue: SingleValue<iOption>) => {
    if (newValue) {
      setIdTransp(Number(newValue.value));
    }
  };

  const SelectVeic = (newValue: SingleValue<iOption>) => {
    if (newValue) {
      setOptVeiculo(newValue);
    }
  };

  const OnChangeFrete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/))
      setvalueFrete(inputValue);

    if (inputValue.match(/^([0-9]{1,})?(\,)?([0-9]{1,})?$/))
      setvalueFrete(inputValue.replace(',', '.'));
  };

  const OnBlurFrete = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    let newValueFrete = parseFloat(e.target.value) || 0;

    setvalueFreteNumero(newValueFrete);
    setvalueFrete(String(newValueFrete));
    const total = valueSubTotal + newValueFrete;
    setvalueTotal(total);
  };

  const OnChangeCondicaoPgto = (newValue: SingleValue<iOption>) => {
    if (newValue) {
      setIdCondicaoPgto(Number(newValue.value));
      setOptCondicaoPgtoSelected({
        label: newValue ? newValue.label : '',
        value: newValue ? newValue.value : 0,
      });

      let Condicao: iCondicaoPgto = CondicoesPgto.filter(
        (Condicao) => Condicao.ID === newValue.value
      )[0];
      ListarParcelas(Condicao);
    }
  };

  const OnChangeFormaPgto = (newValue: SingleValue<iOption>) => {
    if (newValue) {
      setOptFormasPgtoSelected(newValue);
    }
  };

  const ListarParcelas = (condicao: iCondicaoPgto) => {
    let parcelas: iParcelasPgto[] = [];
    let DataVencimento = dayjs();
    type KeyCondicao = keyof typeof condicao;

    for (let i = 0; i < condicao.PARCELAS; i++) {
      let ParcelaNameKey: KeyCondicao = ('PZ0' + String(i + 1)) as KeyCondicao;
      const DiaParcela: number = Number(condicao[ParcelaNameKey]);

      parcelas.push({
        DIAS: DiaParcela,
        VALOR: Orcamento.TOTAL / condicao.PARCELAS,
        VENCIMENTO: DataVencimento.add(DiaParcela, 'day').format('DD/MM/YYYY'),
      });
    }

    setListaParcelas(parcelas);
    TableRef.current.onRefreshData(parcelas);
  };

  const ListarCondicaoPgto = async () => {
    let opt: iOption[] = [];
    const { data } = await GetCondicaoPgto(Orcamento.TOTAL);

    let Condicoes: iCondicaoPgto[] = data.Data;

    for (let i = 0; i < Condicoes.length; i++) {
      opt.push({ label: Condicoes[i].NOME, value: Condicoes[i].ID });
    }
    setIdCondicaoPgto(Condicoes[0].ID);
    setCondicoesPgto(Condicoes);
    setOptCondicaoPgtoSelected({
      label: Condicoes[0].NOME,
      value: Condicoes[0].ID,
    });

    ListarParcelas(Condicoes[0]);

    setOptCondicaoPgto(opt);
  };

  const ListarFormaPgto = async () => {
    let opt: iOption[] = [];
    const { data } = await GetFormaPgto();

    let FormasPgto: iFormaPgto[] = data.Data;

    for (let i = 0; i < FormasPgto.length; i++) {
      opt.push({ label: FormasPgto[i].CARTAO, value: FormasPgto[i].CARTAO });
    }
    setOptFormasPgtoSelected(opt[0]);
    setOptFormasPgto(opt);
  };

  const ListarTransportadoras = async () => {
    let opt: iOption[] = [];
    const { data } = await GetTransportadora();

    let Transp: iTransportadora[] = data.Data;

    for (let i = 0; i < Transp.length; i++) {
      opt.push({ label: Transp[i].NOME, value: Transp[i].FORNECEDOR });
    }

    let optSelected: iOption = opt.filter(
      (o) => o.value === Orcamento.CLIENTE.TRANSPORTADORA
    )[0];

    if (!optSelected) {
      optSelected = opt[0];
    }

    setOptTransportadorasSelected(optSelected);
    setIdTransp(Number(optSelected.value));

    setOptTransportadoras(opt);
  };

  const tableHeaders: iColumnType<iParcelasPgto>[] = [
    {
      key: 'DIAS',
      title: 'DIAS',
      width: '10%',
    },
    {
      key: 'VENCIMENTO',
      title: 'VENCIMENTO',
      width: '10%',
    },
    {
      key: 'VALOR',
      title: 'VALOR',
      width: '20%',
      render: (_, item) => {
        let TotalPV: number = 0.0;

        if (item.VALOR) {
          TotalPV = item.VALOR;
        }

        return TotalPV.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },
  ];

  const GerarPV = async () => {
    let ItensPV: iItemPreVenda[] = [];

    for (let item in Orcamento.ItensOrcamento) {
      ItensPV.push({
        CodigoProduto: Orcamento.ItensOrcamento[item].PRODUTO.PRODUTO,
        Qtd: Orcamento.ItensOrcamento[item].QTD,
        Desconto: Orcamento.ItensOrcamento[item].DESCONTO
          ? Orcamento.ItensOrcamento[item].DESCONTO
          : 0,
        SubTotal: Orcamento.ItensOrcamento[item].SUBTOTAL,
        Tabela: Orcamento.ItensOrcamento[item].TABELA,
        Valor: Orcamento.ItensOrcamento[item].VALOR,
        Total: Orcamento.ItensOrcamento[item].TOTAL,
        Frete: 0,
      });
    }

    const PV: iPreVenda = {
      CodigoCliente: Orcamento.CLIENTE.CLIENTE,
      CodigoCondicaoPagamento: IdCondicaoPgto,
      CodigoVendedor1: Orcamento.VENDEDOR.VENDEDOR,
      DataPedido: dayjs().format('YYYY-MM-DD').toString(),
      ModeloNota: '55',
      Itens: ItensPV,
      SubTotal: valueSubTotal,
      Total: valueTotal,
      ObsPedido1: valueObsPedido1,
      ObsPedido2: '',
      ObsNotaFiscal: valueObsNotaFiscal,
      Entrega: SwitchEntrega,
      NumeroOrdemCompraCliente: valueNumeroOrdemCompraCliente,
      CodigoVendedor2: 0,
      Desconto: 0,
      Origem: '',
      PedidoEcommerce: '',
      TipoEntrega: OptVeiculo ? OptVeiculo.label : '',
      ValorFrete: valueFreteNumero,
    };

    await SavePreVenda(PV)
      .then((result) => {
        const { Data } = result.data;

        callback && callback(Orcamento);

        OnCloseModal();
      })
      .catch((error) => {
        toast.error(`Opps, ${error.message} 🤯`, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: ThemeName,
        });
      });
  };

  return (
    <>
      {Modal && Orcamento && (
        <Modal
          Title={'FECHAMENTO DE PRÉ-VENDA'}
          OnCloseButtonClick={() => callback && callback(Orcamento)}
          width='95%'
          height='90vh'
          sm={{ width: '100%', height: '100vh' }}
          xs={{ width: '100%', height: '100vh' }}
        >
          <FormEditOrcamento>
            <FlexComponent
              height='100%'
              direction='column'
              overflow='hidden auto'
            >
              <FlexComponent width='100%' sm={{ direction: 'column' }}>
                <FlexComponent
                  width='69%'
                  direction='column'
                  sm={{
                    width: '100%',
                    gapRow: '1rem',
                    height: '75rem',
                  }}
                >
                  <h4>CONDIÇÃO DE PAGAMENTO</h4>
                  <FlexComponent
                    width='100%'
                    margin='2rem 0rem 0rem 0rem'
                    wrap='wrap'
                    gapColumn='1rem'
                    gapRow='1rem'
                    sm={{ gapRow: '2.5rem' }}
                  >
                    <FlexComponent width='10%' sm={{ flexShrink: 2 }}>
                      <InputCustom
                        name='ID_CONDICAO'
                        value={IdCondicaoPgto}
                        height='3.5rem'
                      />
                    </FlexComponent>
                    <FlexComponent width='45%' sm={{ flexGrow: 1 }}>
                      <Select
                        options={OptCondicaoPgto}
                        menuPosition='bottom'
                        value={OptCondicaoPgtoSelected}
                        onChange={OnChangeCondicaoPgto}
                      />
                    </FlexComponent>
                    <FlexComponent width='42%' sm={{ flexGrow: 1 }}>
                      <Select
                        label='FORMAS DE PGTº'
                        options={OptFormasPgto}
                        menuPosition='bottom'
                        value={OptFormasPgtoSelected}
                        onChange={OnChangeFormaPgto}
                      />
                    </FlexComponent>
                    <FlexComponent width='100%' sm={{ flexGrow: 1 }}>
                      <InputCustom
                        onChange={(e) => setvalueObsPedido1(e.target.value)}
                        label='OBS PEDIDO'
                        labelPosition='top'
                        name='OBS_PEDIDO'
                        value={valueObsPedido1}
                        height='3.5rem'
                      />
                    </FlexComponent>
                  </FlexComponent>
                  <FlexComponent
                    width='100%'
                    margin='2rem 0rem 0rem 0rem'
                    wrap='wrap'
                    gapColumn='1rem'
                    gapRow='1rem'
                    sm={{
                      direction: 'column',
                    }}
                  >
                    <FlexComponent
                      width='100%'
                      sm={{ margin: '1rem 0rem 0rem 0rem' }}
                    >
                      <h4>TRANSPORTADORA</h4>
                    </FlexComponent>
                    <FlexComponent
                      width='100%'
                      sm={{ gapRow: '2.5rem', gapColumn: '1rem', wrap: 'wrap' }}
                    >
                      <FlexComponent width='7%' sm={{ flexShrink: 1 }}>
                        <InputCustom
                          textAlign='right'
                          name='ID_TRANSPORTADORA'
                          value={IdTransp}
                          height='3.5rem'
                        />
                      </FlexComponent>
                      <FlexComponent
                        width='93%'
                        sm={{ flexGrow: 1, width: '90%' }}
                      >
                        <Select
                          options={OptTransportadoras}
                          menuPosition='bottom'
                          value={OptTransportadorasSelected}
                          onChange={(SingleValue) =>
                            OnChangeTransp(SingleValue)
                          }
                        />
                      </FlexComponent>
                    </FlexComponent>
                  </FlexComponent>
                  <FlexComponent
                    width='100%'
                    margin='2rem 0rem 0rem 0rem'
                    wrap='wrap'
                    gapColumn='1rem'
                    gapRow='1rem'
                  >
                    <FlexComponent width='18%' sm={{ width: '35%' }}>
                      <Checkbox
                        type='checkbox'
                        labelColor='#fff'
                        label='ENTREGAR'
                        checkedOnColor={Secondary.main}
                        checked={SwitchEntrega === 'S' ? true : false}
                        onClick={() =>
                          SwitchEntrega === 'S'
                            ? setSwitchEntrega('N')
                            : setSwitchEntrega('S')
                        }
                      />
                    </FlexComponent>
                    <FlexComponent width='80%' sm={{ width: '62%' }}>
                      <Select
                        options={OptVeiculos}
                        menuPosition='bottom'
                        onChange={(SingleValue) => SelectVeic(SingleValue)}
                      />
                    </FlexComponent>
                    <FlexComponent width='100%'>
                      <InputCustom
                        onChange={(e) => setvalueObsNotaFiscal(e.target.value)}
                        label='OBS NOTA FISCAL'
                        labelPosition='top'
                        name='OBS_NF'
                        value={valueObsNotaFiscal}
                        height='3.5rem'
                      />
                    </FlexComponent>
                  </FlexComponent>
                  <FlexComponent
                    width='100%'
                    margin='2rem 0rem 0rem 0rem'
                    sm={{ margin: '1rem 0rem' }}
                  >
                    <FieldSet legend='FRETE POR CONTA'>
                      <InputCustom
                        onChange={() => setFretePorConta(0)}
                        label='EMITENTE'
                        labelPosition='left'
                        name='FRETE_POR'
                        value='0'
                        type='radio'
                        defaultChecked={true}
                      />
                      <InputCustom
                        onChange={() => setFretePorConta(1)}
                        label='DESTINATARIO'
                        labelPosition='left'
                        name='FRETE_POR'
                        value='1'
                        type='radio'
                      />
                    </FieldSet>
                  </FlexComponent>
                  <FlexComponent
                    width='100%'
                    margin='2rem 0rem 0rem 0rem'
                    wrap='wrap'
                    gapColumn='1.3rem'
                    gapRow='1rem'
                    sm={{ gapRow: '2.5rem' }}
                  >
                    <FlexComponent
                      width='32%'
                      sm={{ flexGrow: 1, width: '100%' }}
                    >
                      <InputCustom
                        readOnly={true}
                        onChange={() => {}}
                        label='SUBTOTAL'
                        textAlign='right'
                        name='SUBTOTAL'
                        value={valueSubTotal.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                        height='3.5rem'
                      />
                    </FlexComponent>
                    <FlexComponent
                      width='32%'
                      sm={{ flexGrow: 1, width: '100%' }}
                    >
                      <InputCustom
                        onChange={(e) => OnChangeFrete(e)}
                        onBlur={(e) => OnBlurFrete(e)}
                        label='FRETE R$'
                        textAlign='right'
                        name='FRETE'
                        value={valueFrete}
                        height='3.5rem'
                      />
                    </FlexComponent>
                    <FlexComponent
                      width='32%'
                      sm={{ flexGrow: 1, width: '100%' }}
                    >
                      <InputCustom
                        readOnly={true}
                        label='TOTAL'
                        textAlign='right'
                        name='TOTAL'
                        value={valueTotal.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                        height='3.5rem'
                      />
                    </FlexComponent>
                  </FlexComponent>
                </FlexComponent>
                <FlexComponent
                  width='31%'
                  height='100%'
                  sm={{ width: '100%', height: '40vh' }}
                >
                  <Table
                    columns={tableHeaders}
                    TableData={ListaParcelas}
                    ref={TableRef}
                  />
                </FlexComponent>
              </FlexComponent>
            </FlexComponent>
            <FormFooter>
              <FlexComponent
                padding='1.5rem 0'
                sm={{ direction: 'column', gapRow: '1rem', height: '12vh' }}
                gapColumn='1.5rem'
              >
                <FlexComponent width='20%' sm={{ width: '100%' }}>
                  <Button
                    onclick={GerarPV}
                    Text='GERAR PRÉ-VENDA'
                    Type='success'
                    Icon={faSave}
                    Height='3.5rem'
                  />
                </FlexComponent>
                <FlexComponent sm={{ width: '100%' }}>
                  <Button
                    Text='CANCELAR'
                    onclick={() => OnCloseModal()}
                    Type='danger'
                    Icon={faBan}
                    Height='3.5rem'
                  />
                </FlexComponent>
              </FlexComponent>
            </FormFooter>
          </FormEditOrcamento>
        </Modal>
      )}
    </>
  );
};
