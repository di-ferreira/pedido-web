import React, { useEffect, useState } from 'react';
import { iColumnType, iEmpresa, iSolicitante } from '../../@types';
import Table from '../../components/Table';
import {
  Container,
  ContainerInput,
  FilterContainer,
  FormEditCliente,
  FormEditClienteColumn,
  FormEditClienteInputContainer,
  FormEditClienteRow,
  FormEditClienteSwitchContainer,
  FormFooter,
  SwitchContainer,
} from './styles';
import {
  faBan,
  faCheck,
  faEdit,
  faSave,
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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CustomSwitch } from '../../components/CustomSwitch';

export const Clientes: React.FC = () => {
  const { GetSolicitantes, UpdateSolicitante } = useSolicitantes();

  const [solicitante, setSolicitante] = useState<iSolicitante>(
    {} as iSolicitante
  );

  const { data, isLoading } = useQuery('solicitantes-list', GetSolicitantes);

  const queryClient = useQueryClient();

  const MutateEdit = useMutation(
    () => UpdateSolicitante(solicitante ? solicitante : ({} as iSolicitante)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('solicitantes-list');
        showModal();
      },
    }
  );

  const { Modal, showModal } = useModal();

  const { Select } = useSelect();

  const [checkedSwitchFilter, setCheckedSwitchFilter] =
    useState<boolean>(false);

  const [checkedSwitchSolicitante, setCheckedSwitchSolicitante] =
    useState<boolean>(false);

  useEffect(() => {
    if (solicitante.EMPRESA) {
      setCheckedSwitchSolicitante(
        solicitante.EMPRESA.BLOQUEADO === 'S' ? true : false
      );
    } else {
      setCheckedSwitchSolicitante(false);
    }
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

  const onSaveSolicitante = (e: React.FormEvent) => {
    e.preventDefault();
    MutateEdit.mutate();
    ClearFields();
    showModal();
  };

  const OnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    console.log(`${name}=>${value}`);
    setSolicitante({
      ...solicitante,
      [name]: value,
    });
  };

  const ClearFields = () => {
    setSolicitante({
      ID: 0,
      EMAIL: '',
      NOME: '',
      SENHA: '',
      TELEFONES: '',
      EMPRESA: {} as iEmpresa,
    });
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
      render: (_, item) => item.EMPRESA && <>{item.EMPRESA.NOME}</>,
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
            checked={checkedSwitchFilter}
            style='secondary'
            onClick={() => setCheckedSwitchFilter(!checkedSwitchFilter)}
          />
        </SwitchContainer>
      </FilterContainer>
      {Modal && solicitante && (
        <Modal Title={'Cliente - ' + solicitante.NOME}>
          <FormEditCliente onSubmit={(e) => onSaveSolicitante(e)}>
            <FormEditClienteColumn>
              <FormEditClienteRow>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='ID'
                    onChange={OnChangeInput}
                    name='ID'
                    value={solicitante.ID}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='NOME'
                    onChange={OnChangeInput}
                    name='NOME'
                    value={solicitante.NOME}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='E-MAIL'
                    onChange={OnChangeInput}
                    name='EMAIL'
                    value={solicitante.EMAIL}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='TELEFONES'
                    onChange={OnChangeInput}
                    name='TELEFONES'
                    value={solicitante.TELEFONES}
                  />
                </FormEditClienteInputContainer>
              </FormEditClienteRow>
              <FormEditClienteRow>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='EMPRESA'
                    onChange={OnChangeInput}
                    name='EMPRESA.NOME'
                    value={solicitante.EMPRESA.NOME}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='CNPJ'
                    onChange={OnChangeInput}
                    name='EMPRESA.CNPJ'
                    value={solicitante.EMPRESA.CNPJ}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='RAZÃO SOCIAL'
                    onChange={OnChangeInput}
                    name='EMPRESA.RAZAO_SOCIAL'
                    value={solicitante.EMPRESA.RAZAO_SOCIAL}
                  />
                </FormEditClienteInputContainer>
                <FormEditClienteInputContainer>
                  <InputCustom
                    label='TELEFONES EMPRESA'
                    onChange={OnChangeInput}
                    name='EMPRESA.TELEFONES'
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
                    onChange={OnChangeInput}
                    name='EMPRESA.MOTIVO_BLOQUEADO'
                    value={solicitante.EMPRESA.MOTIVO_BLOQUEADO}
                  />
                </FormEditClienteInputContainer>
              </FormEditClienteRow>
            </FormEditClienteColumn>
            <FormFooter>
              <Button
                Text='ATUALIZAR'
                Type='success'
                Icon={faSave}
                Height='3.5rem'
                TypeButton='submit'
              />
            </FormFooter>
          </FormEditCliente>
        </Modal>
      )}
      {isLoading && <Loading />}
      {data && !isLoading && <Table columns={headers} data={data} />}
      {!data && !isLoading && <p>Não há registros</p>}
    </Container>
  );
};

