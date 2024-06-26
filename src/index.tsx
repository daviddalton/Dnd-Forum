import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/creation/Providers/userContext';
import { WidthProvider } from './components/creation/Providers/WidthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (process.env.NODE_ENV === 'development') {
  require('./mocks/browser')
}

root.render(
  <React.StrictMode>
    <AuthProvider>
      <WidthProvider>
      <App />
      </WidthProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
