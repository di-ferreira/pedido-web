import React, { useEffect, useState } from 'react';

import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { iOption } from '../../../@types/Table';
import useSelect from '../../../hooks/UseSelect';
import Button from '../../Button';
import { Container, ContainerButtons, ContainerInfo, Label } from './styles';
interface iDataTablePagination {
  QuantityRegiters: number;
  OnFetchData: (top: number, skip: number) => void;
}
export const TablePagination: React.FC<iDataTablePagination> = ({
  QuantityRegiters,
  OnFetchData,
}) => {
  const { Select } = useSelect();
  const OptionsSelect: iOption[] = [
    { label: '15', value: 15 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
  ];

  const [CurrentOption, setCurrentOption] = useState<iOption>(OptionsSelect[1]);

  const [CurrentPage, setCurrentPage] = useState<number>(1);
  const [RowsPerPage, setRowsPerPage] = useState<number>(15);
  const [TotalPages, setTotalPages] = useState<number>(1);
  const [TotalRegisters, setTotalRegisters] = useState<number>(1);

  const SkipPage = (
    NextPage: boolean = true,
    RegPerPage: number = RowsPerPage
  ): number => {
    let CurPage = NextPage ? CurrentPage + 1 : CurrentPage - 1;
    const Skip = RegPerPage * CurPage - RegPerPage;
    return Skip;
  };

  const ChangeRowsPerPage = (value: iOption) => {
    setRowsPerPage((oldValue) => {
      oldValue = Number(value.value);
      return oldValue;
    });

    OnFetchData(
      value ? Number(value.value) : RowsPerPage,
      RowsPerPage * CurrentPage - RowsPerPage
    );
  };

  const GoToFirstPage = () => {
    setCurrentPage(1);
    OnFetchData(RowsPerPage, 0);
  };

  const GoToNextPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage + 1);
    console.log('RowsperPage', RowsPerPage);
    console.log('SkipPage', SkipPage());

    OnFetchData(RowsPerPage, SkipPage());
  };

  const GoToPrevPage = () => {
    CurrentPage < TotalPages && setCurrentPage((oldPage) => oldPage - 1);
    OnFetchData(RowsPerPage, SkipPage(false));
  };

  const GoToLastPage = () => {
    setCurrentPage(TotalPages);
    OnFetchData(RowsPerPage, TotalRegisters - RowsPerPage);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(QuantityRegiters / RowsPerPage));
    setTotalRegisters(QuantityRegiters);
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
            ChangeRowsPerPage({
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
          onclick={() => GoToFirstPage()}
        />
        <Button
          Icon={faAngleLeft}
          Title='Anterior'
          Type='secondary'
          Height='50%'
          Width='12rem'
          disabled={CurrentPage === 1 ? true : false}
          onclick={() => GoToPrevPage()}
        />
        <Button
          Icon={faAngleRight}
          Title='Próximo'
          Type='secondary'
          Height='50%'
          Width='12rem'
          disabled={CurrentPage === TotalPages ? true : false}
          onclick={() => GoToNextPage()}
        />
        <Button
          Icon={faAngleDoubleRight}
          Title='Último'
          Type='secondary'
          Height='50%'
          Width='12rem'
          disabled={CurrentPage === TotalPages ? true : false}
          onclick={() => GoToLastPage()}
        />
      </ContainerButtons>
    </Container>
  );
};
