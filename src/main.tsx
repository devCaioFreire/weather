import React from 'react';
import ReactDOM from 'react-dom/client';
import { ForecastContextProvider } from '../src/context/ForecastContext.tsx';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ForecastContextProvider>
      <App />
    </ForecastContextProvider>
  </React.StrictMode>,
)
