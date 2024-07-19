import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles';

import { ThemeProvider } from '@gravity-ui/uikit';
import App from './App';

const root = createRoot(document.getElementById('app'));
root.render(
  <ThemeProvider theme="light">
    <App />
  </ThemeProvider>
);
