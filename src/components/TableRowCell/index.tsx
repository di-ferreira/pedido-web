import { iColumnType } from '../../@types';
import Button from '../Button';
import { TableCell, ActionContainer } from './styles';
import { get } from 'lodash';

interface iTableCellProps<T> {
  item: T;
  column: iColumnType<T>;
}

export function TableRowCell<T>({
  item,
  column,
}: iTableCellProps<T>): JSX.Element {
  const value = get(item, column.key);
  return (
    <TableCell>
      {column.action ? (
        <ActionContainer>
          {column.action.map((button, i) => (
            <Button
              Icon={button.Icon}
              onclick={() => button.onclick(item)}
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
  );
}

