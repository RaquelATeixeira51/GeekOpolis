import "./assets/css/reset.css";
import "./assets/css/styles.css";
import "./assets/css/root.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastrar from "./pages/cadastrar";
import CadastroUsuario from "./pages/cadastroUsuario";
import Inicio from "./pages/inicio";
import Login from "./pages/login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
        <Route path="/cadastrar-admin" element={<Cadastrar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
