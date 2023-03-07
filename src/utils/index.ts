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
