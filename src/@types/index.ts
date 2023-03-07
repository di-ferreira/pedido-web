export interface iColumnType<T> {
  key: string;
  title: string;
  width?: number;
  render?: (column: iColumnType<T>, item: T) => void;
}

export interface iTableProps<T> {
  data: T[];
  columns: iColumnType<T>[];
}
