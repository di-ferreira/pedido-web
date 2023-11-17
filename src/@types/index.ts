export interface iDataResult<T> {
  data: {
    Data: T;
    RecordCount: number;
    StatusCode: number;
    StatusMessage: string;
  };
}
export interface iApiData<T> {
  Qtd_Registros: number;
  value: T[];
}
export interface iApiResult<T> {
  Data: T;
  RecordCount: number;
  StatusCode: number;
  StatusMessage: string;
}
export interface iUniqueResult<T> {
  data: T;
}

export type typeSimNao = 'S' | 'N';

type SQLType =
  | 'ftUnknown'
  | 'ftString'
  | 'ftSmallint'
  | 'ftInteger'
  | 'ftWord'
  | 'ftBoolean'
  | 'ftFloat'
  | 'ftCurrency'
  | 'ftBCD'
  | 'ftDate'
  | 'ftTime'
  | 'ftDateTime'
  | 'ftBytes'
  | 'ftVarBytes'
  | 'ftAutoInc'
  | 'ftBlob'
  | 'ftMemo'
  | 'ftGraphic'
  | 'ftFmtMemo'
  | 'ftParadoxOle'
  | 'ftDBaseOle'
  | 'ftTypedBinary'
  | 'ftCursor'
  | 'ftFixedChar'
  | 'ftWideString'
  | 'ftLargeint'
  | 'ftADT'
  | 'ftArray'
  | 'ftReference'
  | 'ftDataSet'
  | 'ftOraBlob'
  | 'ftOraClob'
  | 'ftVariant'
  | 'ftInterface'
  | 'ftIDispatch'
  | 'ftGuid'
  | 'ftTimeStamp'
  | 'ftFMTBcd'
  | 'ftFixedWideChar'
  | 'ftWideMemo'
  | 'ftOraTimeStamp'
  | 'ftOraInterval'
  | 'ftLongWord'
  | 'ftShortint'
  | 'ftByte'
  | 'ftExtended'
  | 'ftConnection'
  | 'ftParams'
  | 'ftStream'
  | 'ftTimeStampOffset'
  | 'ftObject'
  | 'ftSingle';

interface iSelectParam {
  ParamType: SQLType;
  ParamName: string;
  ParamValues: string[] | number[];
}

export interface iSelectSQL {
  pSQL: string;
  pPar: iSelectParam[];
}
