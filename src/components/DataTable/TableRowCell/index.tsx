import { get } from 'lodash';
import { JSX } from 'react';
import { iColumnType } from '../../../@types/Table';
import Button from '../../Button';
import { ActionContainer, TableCell } from './styles';

interface iTableCellProps<T> {
  item: T;
  column: iColumnType<T>;
}

export function TableRowCell<T>({ item, column }: iTableCellProps<T>): JSX.Element {
  const value = get(item, column.key);
  return (
    <>
      {
        <TableCell isHideMobile={column.isHideMobile} min_width={column.width}>
          {column.action ? (
            <ActionContainer>
              {column.action.map((button, i) => (
                <Button
                  Icon={button.Icon}
                  onclick={() => button.onclick(item)}
                  Height='3rem'
                  Width='3rem'
                  Title={button.Title}
                  Rounded={button.Rounded}
                  Type={button.Type}
                  Size={button.Size}
                  Text={button.Text}
                  key={i}
                />
              ))}
            </ActionContainer>
          ) : column.render ? (
            column.render(column, item)
          ) : (
            value
          )}
        </TableCell>
      }
    </>
  );
}
