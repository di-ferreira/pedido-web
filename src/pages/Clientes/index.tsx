import React, { useEffect, useState } from 'react';
import { iColumnType, iSolicitante } from '../../@types';
import Table from '../../components/Table';
import {
  Container,
  ContainerInput,
  FilterContainer,
  FormEditCliente,
  FormEditClienteInputContainer,
  FormEditClienteRow,
  FormEditClienteSwitchContainer,
  SwitchContainer,
} from './styles';
import {
  faBan,
  faCheck,
  faEdit,
  faSearch,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Loading } from '../../components/Loading';
import { Icon } from '../../components/Icon';
import useModal from '../../hooks/useModal';
import useSelect, { iOption } from '../../hooks/UseSelect';
import Button from '../../components/Button';
import { InputCustom } from '../../components/InputCustom';
import { useSolicitantes } from '../../hooks/useSolicitantes';
import { useQuery } from 'react-query';
import { CustomSwitch } from '../../components/CustomSwitch';

export const Clientes: React.FC = () => {
  const { GetSolicitantes } = useSolicitantes();

  const { data, isLoading } = useQuery('solicitantes-list', GetSolicitantes);

  const { Modal, showModal } = useModal();

  const { Select } = useSelect();

  const [checkedSwitch, setCheckedSwitch] = useState<boolean>(false);

  const [checkedSwitchSolicitante, setCheckedSwitchSolicitante] =
    useState<boolean>(false);

  const [solicitante, setSolicitante] = useState<iSolicitante | null>(null);

  useEffect(() => {
    setCheckedSwitchSolicitante(
      solicitante?.EMPRESA.BLOQUEADO === 'S' ? true : false
    );
  }, [solicitante]);

  const OptionsSelect: iOption[] = [
    { label: 'NOME', value: 'nome' },
    { label: 'CÓDIGO', value: 'codigo' },
    { label: 'CPF/CNPJ', value: 'cic' },
    { label: 'BAIRRO', value: 'bairro' },
    { label: 'CIDADE', value: 'cidade' },
  ];

  const LoadSolicitante = (value: iSolicitante) => {
    setSolicitante(value);
    showModal();
  };

  const RenderIconBloqueado = (value: string): JSX.Element => {
    if (value === 'S') return <Icon Icon={faBan} Type='danger' key={value} />;
    return <Icon Icon={faCheck} Type='success' key={value} />;
  };

  const handdleCheckSolicitanteBloqueado = () => {
    if (solicitante) {
      let newSolicitante = solicitante;
      setCheckedSwitchSolicitante((oldCheck) => {
        oldCheck = !oldCheck;
        oldCheck
          ? (newSolicitante.EMPRESA.BLOQUEADO = 'S')
          : (newSolicitante.EMPRESA.BLOQUEADO = 'N');
        return oldCheck;
      });
      setSolicitante(newSolicitante);
    }
  };

  const headers: iColumnType<iSolicitante>[] = [
    {
      key: 'ID',
      title: 'ID',
      width: 200,
    },
    {
      key: 'NOME',
      title: 'NOME',
      width: 200,
    },
    {
      key: 'EMPRESA.BLOQUEADO',
      title: 'BLOQUEADO',
      width: 200,
      render: (_, item) =>
        item.EMPRESA && (
          <>{RenderIconBloqueado(String(item.EMPRESA.BLOQUEADO))}</>
        ),
    },
    {
      key: 'TELEFONES',
      title: 'TELEFONE',
      width: 200,
      isHideMobile: false,
    },
    {
      key: 'EMAIL',
      title: 'EMAIL',
      width: 200,
      isHideMobile: false,
    },
    {
      key: 'EMPRESA.NOME',
      title: 'EMPRESA',
      width: 200,
    },
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: 200,
      action: [
        {
          onclick: LoadSolicitante,
          Icon: faEdit,
          Rounded: true,
          Title: 'Editar',
          Type: 'warn',
        },
        {
          onclick: LoadSolicitante,
          Icon: faTrashAlt,
          Rounded: true,
          Title: 'Excluír',
          Type: 'danger',
        },
      ],
    },
  ];

  return (
    <Container>
      <FilterContainer>
        <Select
          options={OptionsSelect}
          onChange={(SingleValue) => console.log(SingleValue)}
        />
        <ContainerInput>
          <InputCustom
            onChange={(e) => console.log(e.target.value)}
            placeholder='Digite sua busca'
          />
        </ContainerInput>

        <Button
          Icon={faSearch}
          onclick={() => console.log('search')}
          Text='Buscar'
          Type='secondary'
          Title='Buscar'
          Height={'40px'}
        />
        <SwitchContainer>
          <CustomSwitch
            label='Ativos'
            checked={checkedSwitch}
            style='secondary'
            onClick={() => {}}
          />
        </SwitchContainer>
      </FilterContainer>
      {Modal && solicitante && (
        <Modal Title={'Cliente - ' + solicitante.NOME}>
          <FormEditCliente>
            <FormEditClienteRow>
              <FormEditClienteInputContainer>
                <InputCustom
                  label='ID'
                  onChange={() => {}}
                  name='id'
                  value={solicitante.ID}
                />
              </FormEditClienteInputContainer>
              <FormEditClienteInputContainer>
                <InputCustom
                  label='NOME'
                  onChange={() => {}}
                  name='nome'
                  value={solicitante.NOME}
                />
              </FormEditClienteInputContainer>
              <FormEditClienteInputContainer>
                <InputCustom
                  label='E-MAIL'
                  onChange={() => {}}
                  name='email'
                  value={solicitante.EMAIL}
                />
              </FormEditClienteInputContainer>
              <FormEditClienteInputContainer>
                <InputCustom
                  label='TELEFONES'
                  onChange={() => {}}
                  name='telefone'
                  value={solicitante.TELEFONES}
                />
              </FormEditClienteInputContainer>
            </FormEditClienteRow>
            <FormEditClienteRow>
              <FormEditClienteInputContainer>
                <InputCustom
                  label='EMPRESA'
                  onChange={() => {}}
                  name='empresa'
                  value={solicitante.EMPRESA.NOME}
                />
              </FormEditClienteInputContainer>
              <FormEditClienteInputContainer>
                <InputCustom
                  label='CNPJ'
                  onChange={() => {}}
                  name='cnpj'
                  value={solicitante.EMPRESA.CNPJ}
                />
              </FormEditClienteInputContainer>
              <FormEditClienteInputContainer>
                <InputCustom
                  label='RAZÃO SOCIAL'
                  onChange={() => {}}
                  name='razao'
                  value={solicitante.EMPRESA.RAZAO_SOCIAL}
                />
              </FormEditClienteInputContainer>
              <FormEditClienteInputContainer>
                <InputCustom
                  label='TELEFONES EMPRESA'
                  onChange={() => {}}
                  name='telefone_empresa'
                  value={solicitante.EMPRESA.TELEFONES}
                />
              </FormEditClienteInputContainer>
            </FormEditClienteRow>
            <FormEditClienteRow>
              <FormEditClienteSwitchContainer>
                <CustomSwitch
                  label='BLOQUEADO'
                  checked={checkedSwitchSolicitante}
                  onClick={() => handdleCheckSolicitanteBloqueado()}
                />
              </FormEditClienteSwitchContainer>
              <FormEditClienteInputContainer>
                <InputCustom
                  label='MOTIVO BLOQUEIO'
                  onChange={() => {}}
                  name='motivo_bloqueado'
                  value={solicitante.EMPRESA.MOTIVO_BLOQUEADO}
                />
              </FormEditClienteInputContainer>
            </FormEditClienteRow>
          </FormEditCliente>
        </Modal>
      )}
      {isLoading && <Loading />}
      {data && !isLoading && <Table columns={headers} data={data} />}
      {!data && !isLoading && <p>Não há registros</p>}
    </Container>
  );
};

