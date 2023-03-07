import { iTableProps } from '../../@types';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import { TableWrapper } from './styles';

function Table<T>({ data, columns }: iTableProps<T>): JSX.Element {
  return (
    <TableWrapper>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <tbody>
        <TableRow data={data} columns={columns} />
      </tbody>
    </TableWrapper>
  );
}

export default Table;
