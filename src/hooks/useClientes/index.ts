import api from '../../services/index';
import { iSolicitante } from '../../@types';

const GetSolicitantes = async (): Promise<iSolicitante[]> => {
  const response = await api.get('solicitante?$expand=EMPRESA');
  return response.data.value;
};

const UpdateSolicitante = async (
  SolicitanteValue: iSolicitante
): Promise<iSolicitante> => {
  const response = await api.put(
    `solicitante/${SolicitanteValue.ID}`,
    SolicitanteValue
  );
  console.log(response);
  return response.data;
};

export const useSolicitantes = () => {
  return { GetSolicitantes, UpdateSolicitante };
};
