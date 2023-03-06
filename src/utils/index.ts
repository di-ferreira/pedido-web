import { useMatch, useResolvedPath } from 'react-router-dom';

export const isActiveLink = (Link: string): boolean => {
  const revolvedPath = useResolvedPath(Link);
  const isActive = useMatch({ path: revolvedPath.pathname, end: true });
  return isActive !== null;
};
