import { useContext } from 'react';

import authContext from '../context/index';

const useAuth = () => useContext(authContext);

export default useAuth;
