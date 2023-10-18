import React, { useEffect, useState } from 'react';

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { iOption, iTablePagination } from '../../../@types/Table';
import useSelect from '../../../hooks/UseSelect';
import Button from '../../Button';
import { Container, ContainerButtons, ContainerInfo, Label } from './styles';

export const TablePagination: React.FC<iTablePagination> = ({
  CurrentPage,
  TotalPages,
  RowsPerPage,
  onChange,
  onNextPage,
  onFirstPage,
  onLastPage,
  onPrevPage,
}) => {
  const { Select } = useSelect();
  const OptionsSelect: iOption[] = [
    { label: '15', value: 15 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ];

  const [CurrentOption, setCurrentOption] = useState<iOption>(OptionsSelect[1]);

  useEffect(() => {
    let NewOption = OptionsSelect.find((opt) => opt.value === RowsPerPage);
    setCurrentOption(NewOption ? NewOption : OptionsSelect[0]);
  }, [RowsPerPage]);
  /*
  top = qtd registros por página
  skip = qtd de registro "pulados"
  currentPage = skip/top
  totalPages = total de páginas
  */
  return (
    <Container>
      <ContainerInfo>
        <Label>Registros por página</Label>
        <Select
          value={CurrentOption}
          menuPosition='top'
          options={OptionsSelect}
          onChange={(SingleValue) =>
            SingleValue &&
            onChange({
              label: SingleValue.label,
              value: SingleValue.value,
            })
          }
        />
        <Label>
          <strong>{CurrentPage}</strong> de <strong>{TotalPages}</strong>
        </Label>
      </ContainerInfo>
      <ContainerButtons>
        <Button
          Icon={faAngleDoubleLeft}
          Title='Primeiro'
          Type='secondary'
          Height='50%'
          Width='12rem'
          disabled={CurrentPage === 1 ? true : false}
          onclick={() => onFirstPage()}
        />
        <Button
          Icon={faAngleLeft}
          Title='Anterior'
          Type='secondary'
          Height='50%'
          Width='12rem'
          disabled={CurrentPage === 1 ? true : false}
          onclick={() => onPrevPage()}
        />
        <Button
          Icon={faAngleRight}
          Title='Próximo'
          Type='secondary'
          Height='50%'
          Width='12rem'
          disabled={CurrentPage === TotalPages ? true : false}
          onclick={() => onNextPage()}
        />
        <Button
          Icon={faAngleDoubleRight}
          Title='Último'
          Type='secondary'
          Height='50%'
          Width='12rem'
          disabled={CurrentPage === TotalPages ? true : false}
          onclick={() => onLastPage()}
        />
      </ContainerButtons>
    </Container>
  );
};

