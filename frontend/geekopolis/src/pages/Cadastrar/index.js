import "./index.css";
import * as React from "react";
import Header from "../../components/Header";

export default function Cadastrar() {
  return (
    <>
      <Header />
      <main>
        <section className="campos">
          <div className="componentes">
            <h3>E-mail</h3>
            <input></input>
            <h3>Senha</h3>
            <input></input>
            <h3>Confirmar Senha</h3>
            <input></input>
            <h3>Nome</h3>
            <input></input>
            <form className="dupla">
              <div>
                <h3>CPF</h3>
                <input></input>
              </div>
              <div className="select">
                <h3>grupo</h3>
                <select>
                  <option>opção 1</option>
                  <option>opção 2</option>
                </select>
              </div>
            </form>
            <div className="botao">
              <button>Cadastrar</button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
