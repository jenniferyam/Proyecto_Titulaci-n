import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Importar estilos de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/js/bootstrap.bundle.min";

// Importar estilos definidos
import './styles/styles.css';
import "./styles/user.css"; // Importar estilos personalizado

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />  // Eliminamos <React.StrictMode>
);
