import React, { useEffect, useState } from 'react';

import {
  FormEditOrcamento,
  FormEditOrcamentoColumn,
  FormEditOrcamentoInputContainer,
  FormEditOrcamentoRow,
  FormFooter,
} from './styles';
import { faPlus, faSave, faSearch } from '@fortawesome/free-solid-svg-icons';
import { InputCustom } from '../../../components/InputCustom';
import useModal from '../../../hooks/useModal';
import Button from '../../../components/Button';
import { iItensOrcamento } from '../../../@types/Orcamento';
import { TextAreaCustom } from '../../../components/TextAreaCustom';
import { iProduto } from '../../../@types/Produto';
import Table from '../../../components/Table';
import { iColumnType } from '../../../@types/Table';

interface iModalProduto {
  produtos: iProduto[];
  produtoPalavras: string;
  callback: (prodtuto: iProduto) => void;
}

export const ModalProduto: React.FC<iModalProduto> = ({
  produtoPalavras,
  produtos,
  callback,
}) => {
  const { Modal, showModal, OnCloseModal } = useModal();
  const [newProdutos, setProdutos] = useState<iProduto[]>({} as iProduto[]);
  const [Produto, setProduto] = useState<iProduto>({} as iProduto);
  const [ProdutoPalavras, setProdutoPalavras] = useState<string>('');

  useEffect(() => {
    setProdutos(produtos);
    setProdutoPalavras(produtoPalavras);
    showModal();
  }, [produtos]);

  const OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
  };

  const AddProduto = (produto: iProduto) => {
    callback(produto);
    OnCloseModal();
  };

  const tableHeaders: iColumnType<iProduto>[] = [
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: '5%',
      action: [
        {
          onclick: AddProduto,
          Icon: faPlus,
          Title: 'Adicionar',
          Type: 'success',
          Rounded: true,
        },
      ],
    },
    {
      key: 'PRODUTO',
      title: 'CÓDIGO',
      width: '10%',
    },
    {
      key: 'NOME',
      title: 'NOME',
      width: '25%',
      isHideMobile: true,
    },
    {
      key: 'QTDATUAL',
      title: 'QTD',
      width: '5%',
    },
    {
      key: 'PRECO',
      title: 'VALOR',
      width: '5%',
      isHideMobile: true,
      render: (_, item) => {
        return item.PRECO.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },
  ];

  return (
    <>
      {Modal && (
        <Modal Title={`Buscar Produto`}>
          <FormEditOrcamento>
            <FormEditOrcamentoColumn>
              <FormEditOrcamentoRow>
                <FormEditOrcamentoInputContainer width='85%'>
                  <InputCustom
                    onChange={OnChangeInput}
                    label='BUSCAR PRODUTO'
                    name='SEARCH'
                    value={ProdutoPalavras}
                  />
                </FormEditOrcamentoInputContainer>
                <Button
                  Icon={faSearch}
                  Text='BUSCAR'
                  Height='3.5rem'
                  Type='primary'
                  style={{ marginTop: '0.5rem' }}
                />
              </FormEditOrcamentoRow>
              <FormEditOrcamentoRow height='45rem'>
                {newProdutos.length > 0 && (
                  <Table
                    messageNoData={'Esse orçamento não possuí itens!'}
                    columns={tableHeaders}
                    data={newProdutos}
                  />
                )}
              </FormEditOrcamentoRow>
            </FormEditOrcamentoColumn>
            <FormFooter>
              <Button
                Text='SALVAR'
                Type='success'
                Icon={faSave}
                Height='3.5rem'
              />
            </FormFooter>
          </FormEditOrcamento>
        </Modal>
      )}
    </>
  );
};

