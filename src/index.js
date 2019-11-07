import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'unistore/react';

import Store from '~/state/Store';
import App from '~/modules/App';
import GlobalStyles from '~/styles/Global';

const root = document.createElement('div');

ReactDOM.render(
  <Provider store={Store}>
    <>
      <GlobalStyles />
      <App />
    </>
  </Provider>,
  root
);

document.body.appendChild(root);
