import { faFileLines, faSave } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import { FlexComponent } from '../../components/FlexComponent';
import { InputCustom } from '../../components/InputCustom';
import { useAppSelector } from '../../hooks/useAppSelector';
import useTabList from '../../hooks/useTabList';
import { MaskCnpjCpf } from '../../utils';
import { FormEditCliente, FormFooter } from './styles';

export const Cliente: React.FC = () => {
  const CurrentCliente = useAppSelector((state) => state.cliente.Current);
  const { removeTab, Tabs } = useTabList((state) => state);
  const navigate = useNavigate();
  const ClosePage = () => {
    removeTab({
      Icon: faFileLines,
      Link: `clientes/cliente/${CurrentCliente.CLIENTE}`,
      Closable: true,
      TitleTab: `Cliente ${CurrentCliente.NOME}`,
      isActive: true,
    });

    navigate('/' + Tabs[Tabs.length - 2].Link);
  };
  return (
    <FormEditCliente>
      <FlexComponent direction='column' overflow='hidden auto' gapRow='1rem'>
        <FlexComponent
          alignItems='flex-end'
          gapColumn='1rem'
          sm={{ direction: 'column', gapRow: '1rem' }}
        >
          <FlexComponent width='10%' sm={{ width: '100%' }}>
            <InputCustom
              onChange={() => {}}
              label='ID'
              name='CLIENTE'
              value={CurrentCliente.CLIENTE}
            />
          </FlexComponent>
          <FlexComponent width='60%' sm={{ width: '100%' }}>
            <InputCustom label='NOME' onChange={() => {}} name='NOME' value={CurrentCliente.NOME} />
          </FlexComponent>
          <FlexComponent width='45%' sm={{ width: '100%' }}>
            <InputCustom
              label='E-MAIL'
              onChange={() => {}}
              name='EMAIL'
              value={CurrentCliente.EMAIL}
            />
          </FlexComponent>
          <FlexComponent width='45%' sm={{ width: '100%' }}>
            <InputCustom
              label='TELEFONE'
              onChange={() => {}}
              name='TELEFONE'
              value={CurrentCliente.TELEFONE}
            />
          </FlexComponent>
        </FlexComponent>
        <FlexComponent gapColumn='1rem' sm={{ direction: 'column', gapRow: '1rem' }}>
          <FlexComponent width='25%' sm={{ width: '100%' }}>
            <InputCustom
              label='CNPJ'
              onChange={() => {}}
              name='CurrentCliente.CIC'
              value={MaskCnpjCpf(CurrentCliente.CIC)}
            />
          </FlexComponent>
          <FlexComponent width='15%' sm={{ width: '100%' }}>
            <Checkbox
              type='checkbox'
              label='BLOQUEADO'
              checked={CurrentCliente.BLOQUEADO === 'S'}
            />
          </FlexComponent>
          <FlexComponent width='25%' sm={{ width: '100%' }}>
            <InputCustom
              label='MOTIVO BLOQUEIO'
              onChange={() => {}}
              name='CurrentCliente.MOTIVO'
              value={CurrentCliente.MOTIVO}
            />
          </FlexComponent>
        </FlexComponent>
      </FlexComponent>
      <FormFooter>
        <Button Text='FECHAR' Type='danger' Icon={faSave} Height='3.5rem' onclick={ClosePage} />
      </FormFooter>
    </FormEditCliente>
  );
};
