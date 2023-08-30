import "./index.css";
import * as React from "react";
import Header from "../../components/Header";

export default function Login() {
  return (
    <>
      <Header />
      <main>
        <section className="login">
          <div className="componentes">
            <h3>E-mail</h3>
            <input></input>
          </div>
          <div className="componentes2">
            <h3>Senha</h3>
            <input></input>
            <h2>Esqueceu a senha?</h2>
          </div>
          <div className="entrar">
            <button>Entrar</button>
          </div>
          <p className="login-paragraph">ou</p>
          <div className="cadastrar">
            <button>Cadastrar</button>
          </div>
        </section>
      </main>
    </>
  );
}
