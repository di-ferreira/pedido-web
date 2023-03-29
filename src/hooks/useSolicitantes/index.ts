import api from '../../services/index';
import { iSolicitante } from '../../@types';

const GetSolicitantes = async (): Promise<iSolicitante[]> => {
  const response = await api.get('solicitante?$expand=EMPRESA');
  return response.data.value;
};

export const useSolicitantes = () => {
  return { GetSolicitantes };
};
