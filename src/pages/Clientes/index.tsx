import React, { useEffect, useState } from 'react';
import { iColumnType } from '../../@types';
import Table from '../../components/Table';
import api from '../../services';
import { Container, FilterContainer } from './styles';
import { formatLocalDate } from '../../utils/index';
import {
  faBan,
  faCheck,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Loading } from '../../components/Loading';
import { Icon } from '../../components/Icon';
import useModal from '../../hooks/useModal';

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
  const [users, setUsers] = useState<iCliente[]>([]);
  const [user, setUser] = useState<iCliente | null>(null);

  const [loading, setLoading] = useState(true);

  const { Modal, showModal } = useModal();

  const LoadUser = (cliente: iCliente) => {
    setUser(cliente);
    showModal();
    console.info(cliente);
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
        <select>
          <option value='nome'>NOME</option>
          <option value='codigo'>CÓDIGO</option>
          <option value='cic'>CPF/CNPJ</option>
          <option value='bairro'>BAIRRO</option>
          <option value='cidade'>CIDADE</option>
        </select>
        <input type='text' placeholder='buscar' />
        <input type='button' value='buscar' />
        <input type='checkbox' checked={true} />
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

