import React, { useEffect, useState } from 'react';
import { iColumnType } from '../../@types';
import Table from '../../components/Table';
import api from '../../services';
import {
  Container,
  ContainerInput,
  FilterContainer,
  SwitchContainer,
  SwitchLabel,
} from './styles';
import { formatLocalDate } from '../../utils/index';
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

interface iCliente {
  id: number;
  nome: string;
  bloqueado: boolean;
  vendedor: string;
  bairro: string;
  cidade: string;
  ultima_compra: string;
}

export const Clientes: React.FC = () => {
  const { ThemeName } = useTheme();
  const OptionsSelect: iOption[] = [
    { label: 'NOME', value: 'nome' },
    { label: 'CÓDIGO', value: 'codigo' },
    { label: 'CPF/CNPJ', value: 'cic' },
    { label: 'BAIRRO', value: 'bairro' },
    { label: 'CIDADE', value: 'cidade' },
  ];
  const [users, setUsers] = useState<iCliente[]>([]);
  const [user, setUser] = useState<iCliente | null>(null);

  const [loading, setLoading] = useState(true);

  const { Modal, showModal } = useModal();

  const { Select } = useSelect();

  const LoadUser = (cliente: iCliente) => {
    setUser(cliente);
    showModal();
  };

  const headers: iColumnType<iCliente>[] = [
    {
      key: 'id',
      title: 'ID',
      width: 200,
    },
    {
      key: 'nome',
      title: 'NOME',
      width: 200,
    },
    {
      key: 'bloqueado',
      title: 'BLOQUEADO',
      width: 200,
    },
    {
      key: 'vendedor',
      title: 'VENDEDOR',
      width: 200,
    },
    {
      key: 'bairro',
      title: 'BAIRRO',
      width: 200,
      isHideMobile: false,
    },
    {
      key: 'cidade',
      title: 'CIDADE',
      width: 200,
    },
    {
      key: 'ultima_compra',
      title: 'ULTIMA COMPRA',
      width: 200,
    },
    {
      key: 'acoes',
      title: 'AÇÕES',
      width: 200,
      action: [
        {
          onclick: LoadUser,
          Icon: faEdit,
          Rounded: true,
          Title: 'Editar',
          Type: 'warn',
        },
        {
          onclick: LoadUser,
          Icon: faTrashAlt,
          Rounded: true,
          Title: 'Excluír',
          Type: 'danger',
        },
      ],
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      let newData: iCliente[] = [];
      api.get('/users').then((res) => {
        newData = res.data.map(
          (item: { ultima_compra: string; bloqueado: JSX.Element }) => {
            if (item) {
              item.ultima_compra = formatLocalDate(
                item.ultima_compra,
                'dd/mm/yyyy'
              );

              item.bloqueado
                ? (item.bloqueado = <Icon Icon={faCheck} Type='success' />)
                : (item.bloqueado = item.bloqueado =
                    <Icon Icon={faBan} Type='danger' />);
            }
            return item;
          }
        );
        setUsers(newData);
        setLoading(false);
      });
    }, 3000);
  }, []);

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
      {Modal && user && (
        <Modal Title={'Cliente - ' + user.nome}>
          <label>Nome:</label> <input type='text' value={user.nome} />
        </Modal>
      )}
      {loading && <Loading />}
      {users.length > 0 && !loading && <Table columns={headers} data={users} />}
      {users.length <= 0 && !loading && <p>Não há registros</p>}
    </Container>
  );
};

