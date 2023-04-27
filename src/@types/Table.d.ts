export interface iTableProps<T> {
  data: T[];
  columns: iColumnType<T>[];
}

export type iTabData = {
  Icon: IconProp;
  TitleTab: string;
  Link: string;
  Closable?: boolean;
  isActive: boolean;
};

export interface iTablePagination {
  CurrentPage: number;
  TotalPages: number;
  RowsPerPage: number;
  onFirstPage: () => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  onLastPage: () => void;
  onChange: (value: iOption) => void;
}

export interface iTableProps<T> {
  messageNoData?: string;
  data: T[];
  columns: iColumnType<T>[];
  pagination?: iTablePagination;
}

export interface iOption {
  label: string;
  value: string | number;
}

export interface iColumnType<T> {
  key: string;
  title: string;
  width?: string;
  isHideMobile?: boolean;
  render?: (column: iColumnType<T>, item: T) => void;
  action?: iButtonAction<T>[];
}
