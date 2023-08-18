import { format } from 'date-fns';
import { useMatch, useResolvedPath } from 'react-router-dom';

export const AddZeros = (data: string | number, totalZeros: number) => {
  return String(data).padStart(totalZeros, '0');
};

export const isActiveLink = (Link: string): boolean => {
  const revolvedPath = useResolvedPath(Link);
  const isActive = useMatch({ path: revolvedPath.pathname, end: true });
  return isActive !== null;
};

export const formatLocalDate = (date: string, pattern: string) => {
  const dt = new Date(date);
  const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 100);
  return format(dtDateOnly, pattern);
};

export const HEXToRGB = (HexColor: string): string => {
  let aRgbHex = HexColor.replace('#', '').match(/.{1,2}/g);
  if (aRgbHex?.length != 3) {
    throw 'Only six-digit hex colors are allowed.';
  }

  let aR = aRgbHex ? parseInt(aRgbHex[0], 16) : '0';
  let aG = aRgbHex ? parseInt(aRgbHex[1], 16) : '0';
  let aB = aRgbHex ? parseInt(aRgbHex[2], 16) : '0';

  let Result = aR.toString() + ',' + aG.toString() + ',' + aB.toString();

  return Result;
};

export const MaskFone = (value: String | undefined) => {
  if (!value) return '';

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1');
};

const MaskCpf = (value: String | undefined) => {
  if (!value) return '';
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

export const FormatToCurrency = (value: string): string => {
  let BrlValue = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });
  let result = BrlValue.format(parseFloat(value));
  return result;
};

export const FormatToNumber = (value: string): number => {
  let BrlValue = Intl.NumberFormat('pt-BR', {
    // style: 'currency',
    // currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  });
  let result = BrlValue.format(parseFloat(value));
  return parseFloat(result);
};

const MaskCnpj = (value: String | undefined) => {
  if (!value) return '';

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const MaskCnpjCpf = (value: String | undefined) => {
  if (!value) return '';
  if (value.length <= 12)
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');

  if (value.length > 12)
    return value
      .replace(/[\D]/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
};

export const MaskCEP = (value: String | undefined) => {
  if (!value) return '';
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
    .replace(/(-\d{3})(\d+?)/, '$1');
};

export const ObjectIsEmpty = (obj: Object): boolean => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
};

export const CompareAND = (valueA: boolean, valueB: boolean): boolean => {
  let result: boolean = false;
  result = valueA && valueB;
  return result;
};

export const CompareNAND = (valueA: boolean, valueB: boolean): boolean => {
  let result: boolean = false;
  result = !valueA && valueB;
  return result;
};

export const CompareXOR = (valueA: boolean, valueB: boolean): boolean => {
  console.log('🚀 ~ file: index.ts:137 ~ CompareXOR ~ valueB:', valueB);
  let result: boolean = false;
  if (valueA) result = true;
  else result = valueA || valueB;
  return result;
};

export const CompareXNOR = (valueA: boolean, valueB: boolean): boolean => {
  let result: boolean = false;
  if (!valueA) result = true;
  else result = !(valueA || valueB);
  return result;
};

export const CompareOR = (valueA: boolean, valueB: boolean): boolean => {
  let result: boolean = false;
  result = valueA || valueB;
  return result;
};

export const CompareNOR = (valueA: boolean, valueB: boolean): boolean => {
  let result: boolean = false;
  result = !(valueA || valueB);
  return result;
};
