import React, { useEffect, useState } from 'react';

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
import { iColumnType, iOption } from '../../../@types/Table';
import { Secondary } from '../../../colors';
import Button from '../../../components/Button';
import { CustomSwitch } from '../../../components/CustomSwitch';
import { FieldSet } from '../../../components/FieldSet';
import { InputCustom } from '../../../components/InputCustom';
import Table from '../../../components/Table';
import useSelect from '../../../hooks/UseSelect';
import useModal from '../../../hooks/useModal';
import usePreVenda from '../../../hooks/usePreVenda';
import { useTheme } from '../../../hooks/useTheme';
import {
  FormEditOrcamento,
  FormEditOrcamentoColumn,
  FormEditOrcamentoInputContainer,
  FormEditOrcamentoRow,
  FormFooter,
} from './styles';

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

  const { Modal, showModal, OnCloseModal } = useModal();

  useEffect(() => {
    const OpenModal = () => {
      showModal();
      setNewPreVenda(Orcamento);
      console.log(
        '🚀 ~ file: index.tsx:91 ~ OpenModal ~ Orcamento:',
        Orcamento.TABELA
      );
      ListarCondicaoPgto();
      ListarFormaPgto();
      ListarTransportadoras();
      setvalueSubTotal(Orcamento.TOTAL);
      setvalueTotal(Orcamento.TOTAL);
    };
    return () => OpenModal();
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
          width='85vw'
          height='100%'
        >
          <FormEditOrcamento>
            <FormEditOrcamentoColumn>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoColumn width='69%'>
                  <h4>CONDIÇÃO DE PAGAMENTO</h4>
                  <FormEditOrcamentoRow>
                    <FormEditOrcamentoInputContainer width='10%'>
                      <InputCustom
                        name='ID_CONDICAO'
                        value={IdCondicaoPgto}
                        height='3.5rem'
                      />
                    </FormEditOrcamentoInputContainer>
                    <FormEditOrcamentoInputContainer width='45%'>
                      <Select
                        options={OptCondicaoPgto}
                        menuPosition='bottom'
                        value={OptCondicaoPgtoSelected}
                        onChange={OnChangeCondicaoPgto}
                      />
                    </FormEditOrcamentoInputContainer>
                    <FormEditOrcamentoInputContainer width='40%'>
                      <Select
                        label='FORMAS DE PGTº'
                        options={OptFormasPgto}
                        menuPosition='bottom'
                        value={OptFormasPgtoSelected}
                        onChange={(SingleValue) => console.log(SingleValue)}
                      />
                    </FormEditOrcamentoInputContainer>
                  </FormEditOrcamentoRow>
                  <FormEditOrcamentoRow>
                    <FormEditOrcamentoInputContainer width='100%'>
                      <InputCustom
                        onChange={(e) => setvalueObsPedido1(e.target.value)}
                        label='OBS PEDIDO'
                        labelPosition='top'
                        name='OBS_PEDIDO'
                        value={valueObsPedido1}
                        height='3.5rem'
                      />
                    </FormEditOrcamentoInputContainer>
                  </FormEditOrcamentoRow>
                  <FormEditOrcamentoRow>
                    <h4>TRANSPORTADORA</h4>
                    <FormEditOrcamentoRow>
                      <FormEditOrcamentoInputContainer width='7%'>
                        <InputCustom
                          textAlign='right'
                          name='ID_TRANSPORTADORA'
                          value={IdTransp}
                          height='3.5rem'
                        />
                      </FormEditOrcamentoInputContainer>
                      <FormEditOrcamentoInputContainer width='90%'>
                        <Select
                          options={OptTransportadoras}
                          menuPosition='bottom'
                          value={OptTransportadorasSelected}
                          onChange={(SingleValue) =>
                            OnChangeTransp(SingleValue)
                          }
                        />
                      </FormEditOrcamentoInputContainer>
                    </FormEditOrcamentoRow>
                  </FormEditOrcamentoRow>
                  <FormEditOrcamentoRow>
                    <FormEditOrcamentoInputContainer width='100%'>
                      <FormEditOrcamentoRow>
                        <FormEditOrcamentoInputContainer width='7%'>
                          <CustomSwitch
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
                        </FormEditOrcamentoInputContainer>
                        <FormEditOrcamentoInputContainer width='90%'>
                          <Select
                            options={OptVeiculos}
                            menuPosition='bottom'
                            onChange={(SingleValue) => SelectVeic(SingleValue)}
                          />
                        </FormEditOrcamentoInputContainer>
                      </FormEditOrcamentoRow>
                      <FormEditOrcamentoInputContainer width='99%'>
                        <InputCustom
                          onChange={(e) =>
                            setvalueObsNotaFiscal(e.target.value)
                          }
                          label='OBS NOTA FISCAL'
                          labelPosition='top'
                          name='OBS_NF'
                          value={valueObsNotaFiscal}
                          height='3.5rem'
                        />
                      </FormEditOrcamentoInputContainer>
                    </FormEditOrcamentoInputContainer>
                  </FormEditOrcamentoRow>
                  <FormEditOrcamentoRow>
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
                  </FormEditOrcamentoRow>
                  <FormEditOrcamentoRow>
                    <FormEditOrcamentoInputContainer width='18.6%'>
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
                    </FormEditOrcamentoInputContainer>
                    <FormEditOrcamentoInputContainer width='18.6%'>
                      <InputCustom
                        onChange={(e) => OnChangeFrete(e)}
                        onBlur={(e) => OnBlurFrete(e)}
                        label='FRETE R$'
                        textAlign='right'
                        name='FRETE'
                        value={valueFrete}
                        height='3.5rem'
                      />
                    </FormEditOrcamentoInputContainer>
                    <FormEditOrcamentoInputContainer width='18.6%'>
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
                    </FormEditOrcamentoInputContainer>
                  </FormEditOrcamentoRow>
                </FormEditOrcamentoColumn>
                <FormEditOrcamentoColumn width='31%' height='100vh'>
                  <Table
                    messageNoData={'Sem condição de pagamento'}
                    columns={tableHeaders}
                    data={ListaParcelas}
                  />
                </FormEditOrcamentoColumn>
              </FormEditOrcamentoRow>
            </FormEditOrcamentoColumn>
            <FormFooter>
              <FormEditOrcamentoInputContainer width='16%'>
                <Button
                  onclick={GerarPV}
                  Text='GERAR PRÉ-VENDA'
                  Type='success'
                  Icon={faSave}
                  Height='3.5rem'
                />
              </FormEditOrcamentoInputContainer>
              <FormEditOrcamentoInputContainer width='60%'>
                <Button
                  Text='CANCELAR'
                  onclick={() => OnCloseModal()}
                  Type='danger'
                  Icon={faBan}
                  Height='3.5rem'
                />
              </FormEditOrcamentoInputContainer>
            </FormFooter>
          </FormEditOrcamento>
        </Modal>
      )}
    </>
  );
};

