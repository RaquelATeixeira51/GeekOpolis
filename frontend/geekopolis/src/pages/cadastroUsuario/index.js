import "./index.css";
import * as React from "react";
import Header from "../../components/Header";
import { Navigate } from "react-router-dom";

export default function CadastroUsuario() {
  const [redirect, setRedirect] = React.useState('');
  const [error, setError] = React.useState(null);
  const [body, setBody] = React.useState({
    name: "",
    email: "",
    senha: "",
    grupo: "",
    cpf: "",
    ativo: true,
  });

  const handleBody = (event) => {
    const { name, value } = event.target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(JSON.stringify(body));
    fetch(
      `http://localhost:8080/usuario/incluiAcesso`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    ).then((response) => {
      if (response.ok) {
        setRedirect('/');
        return response.json();
      } else {
        setError("Erro ao cadastrar, tente novamente");
      }
    }).catch(err => {
      setError("Erro ao cadastrar, tente novamente");
    });
  };

  if (redirect !== '') return <Navigate to={redirect} />;

  return (
    <>
      <Header />
      <main>
        <div className="modal">
          <section className="campos">
            <div className="componentes">
              <h3 className="field-label">Nome</h3>
              <input className="field" type="text" name="name" onKeyUp={handleBody} />
              <h3 className="field-label">Email</h3>
              <input className="field" type="email" name="email" onKeyUp={handleBody} />
              <h3 className="field-label">Senha</h3>
              <input className="field" type="password" name="senha" onKeyUp={handleBody} />
              <h3 className="field-label">Confirmar Senha</h3>
              <input className="field" type="password" name="confirmeSenha" />
              <form className="dupla">
                <div>
                  <h3 className="field-label">CPF</h3>
                  <input className="field" type="text" name="cpf" onKeyUp={handleBody} />
                </div>
                <div className="select">
                  <h3 className="field-label">Grupo</h3>
                  <select name="grupo" className="select" onChange={handleBody}>
                    <option value=''>---</option>
                    <option value='ADMIN'>Administrador</option>
                    <option value='ESTOQUISTA'>Estoquista</option>
                  </select>
                </div>
              </form>
              <div className="botao">
                <button className="submit-button" onClick={handleSubmit}>Cadastrar</button>
                {error && <p className="user-register-paragraph">{error}</p>}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
