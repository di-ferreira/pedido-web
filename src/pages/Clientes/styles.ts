import styled from 'styled-components';
import { darken } from 'polished';
import { colors } from '../../colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden auto;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0rem 2rem;
  /* justify-content: center; */
  width: 100%;
  min-height: 6rem;
  background-color: rgba(${colors.whiteGrayRgb}, 1);
  border-bottom: solid 0.2rem ${darken(0.009, colors.gray)};
`;

