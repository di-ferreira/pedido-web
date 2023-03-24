import { useMatch, useResolvedPath } from 'react-router-dom';
import { format } from 'date-fns';

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
