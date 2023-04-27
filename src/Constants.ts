const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const devices = {
  xs: `(max-width: ${breakpoints.xs})`,
  sm: `(max-width: ${breakpoints.sm})`,
  md: `(max-width: ${breakpoints.md})`,
  lg: `(max-width: ${breakpoints.lg})`,
  xl: `(max-width: ${breakpoints.xl})`,
  '2xl': `(max-width: ${breakpoints['2xl']})`,
};

export const TOKEN_NAME_STORE = '@PWEMSoftToken';
export const USER_NAME_STORE = '@PWEMSoftUser';
export const VENDEDOR_STORE = '@PWEMSoftVendedor';
export const ROUTE_LOGIN = '/ServiceSistema/Login';
export const ROUTE_LOGIN_VENDEDOR = '/ServiceSistema/LoginVendedor';
export const ROUTE_GET_VENDEDOR = '/Colaboradores';
export const SECRET_KEY = 'xxxxxxxxEMSoft@Sistemasxxxxxxxxx';
export const VENDA_LOGIN = 'venda';
export const VENDA_PASSWORD = '1emsoft1';
