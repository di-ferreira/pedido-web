import React, { useState } from 'react';
import { iColumnType, iSolicitante } from '../../@types';
import Table from '../../components/Table';
import {
  Container,
  ContainerInput,
  FilterContainer,
  SwitchContainer,
  SwitchLabel,
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
import Switch from 'react-switch';
import { Black, Light, Secondary } from '../../colors';
import { InputCustom } from '../../components/InputCustom';
import { useTheme } from '../../hooks/useTheme/index';
import { useSolicitantes } from '../../hooks/useSolicitantes';
import { useQuery } from 'react-query';

export const Clientes: React.FC = () => {
  const { ThemeName } = useTheme();
  const { GetSolicitantes } = useSolicitantes();
  const { data, isLoading } = useQuery('solicitantes-list', GetSolicitantes);

  const [solicitante, setSolicitante] = useState<iSolicitante | null>(null);

  const { Modal, showModal } = useModal();

  const { Select } = useSelect();

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
    if (value === 'S')
      return <Icon Icon={faCheck} Type='success' key={value} />;
    return <Icon Icon={faBan} Type='danger' key={value} />;
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
          <SwitchLabel>Ativos</SwitchLabel>
          <Switch
            checked
            onChange={() => {}}
            checkedIcon={false}
            uncheckedIcon={false}
            handleDiameter={25}
            height={20}
            width={50}
            onHandleColor={ThemeName === 'light' ? Light.surface : Black.text}
            offHandleColor={ThemeName === 'light' ? Light.surface : Black.text}
            offColor={Secondary.light}
            onColor={Secondary.main}
          />
        </SwitchContainer>
      </FilterContainer>
      {Modal && solicitante && (
        <Modal Title={'Cliente - ' + solicitante.NOME}>
          <label>Nome:</label> <input type='text' value={solicitante.NOME} />
          <InputCustom label='NOME' onChange={() => {}} />
        </Modal>
      )}
      {isLoading && <Loading />}
      {data && !isLoading && <Table columns={headers} data={data} />}
      {!data && !isLoading && <p>Não há registros</p>}
    </Container>
  );
};

