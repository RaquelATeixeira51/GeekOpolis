import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/reset.css';
import './assets/css/root.css';
import './assets/css/styles.css';
import Inicio from './pages/Inicio';
import ListaUsuarios from './pages/ListaUsuarios';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path='/ListaUsuarios' element={<ListaUsuarios/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
