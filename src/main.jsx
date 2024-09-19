import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { I18nextProvider } from 'react-i18next';
import { store } from './store/store.js';
import { Provider } from 'react-redux';

import App from './App.jsx';
import './index.css';
import i18n from './i18n.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </StrictMode>
);
