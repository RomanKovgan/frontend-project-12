import { useContext } from 'react';

import { AuthContext, ApiContext } from '../context/index';

export const useAuth = () => useContext(AuthContext);

export const useApi = () => {
  const api = useContext(ApiContext);
  return api;
};
