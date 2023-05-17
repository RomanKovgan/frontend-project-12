/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable functional/no-expression-statements */
import ReactDOM from 'react-dom/client';
import './index.css';
import init from './init';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init());
};

app();
