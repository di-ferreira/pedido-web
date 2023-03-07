import React, { useEffect, useState } from 'react';
import { iColumnType } from '../../@types';
import Table from '../../components/Table';
import api from '../../services';
import { Container } from './styles';
import { formatLocalDate } from '../../utils/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Loading } from '../../components/Loading';

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
  const [loading, setLoading] = useState(true);

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
      render: () => (
        <>
          <button>editar</button>
          <button>excluir</button>
        </>
      ),
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
                ? (item.bloqueado = <FontAwesomeIcon icon={faCheck} />)
                : (item.bloqueado = item.bloqueado =
                    <FontAwesomeIcon icon={faBan} />);
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
      {loading && <Loading />}
      {users.length > 0 && !loading && <Table columns={headers} data={users} />}
      {users.length <= 0 && !loading && <p>Não há registros</p>}
    </Container>
  );
};

