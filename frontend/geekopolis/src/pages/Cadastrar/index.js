import { Navigate, useParams } from "react-router-dom";
import "./index.css";
import * as React from "react";
import Header from "../../components/Header";

export default function Cadastrar() {
  const passwordRef = React.createRef();
  const passwordConfirmationRef = React.createRef();
  const { id } = useParams();
  const [redirect, setRedirect] = React.useState("");
  const [error, setError] = React.useState(null);
  const [body, setBody] = React.useState({});

  const handleBody = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  }

  const handleUpdate = () => {
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      setError("As senhas não coincidem");
      return;
    }

    fetch(`http://localhost:8080/usuario/atualizaUsuario/${id}?token=${localStorage.getItem('token')}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    .then((response) => setRedirect("/usuarios"))
    .catch((err) => {
      console.log("DEU ERRO", err);
      setError("Erro ao atualizar, tente novamente");
    });
  };

  if (redirect !== "") return <Navigate to={redirect} />;

  return (
    <>
      <Header />
      <main>
        <div className="modal">
          <section className="campos">
            <div className="componentes">
              <h3 className="field-label">Nome</h3>
              <input
                className="field"
                type="text"
                name="nome"
                onChange={handleBody}
              />
              <h3 className="field-label">Senha</h3>
              <input
                className="field"
                type="password"
                name="password"
                ref={passwordRef}
                onChange={handleBody}
              />
              <h3 className="field-label">Confirme a senha</h3>
              <input
                className="field"
                type="password"
                name="passwordConfirmation"
                ref={passwordConfirmationRef}
              />
              <form className="dupla">
                <div>
                  <h3 className="field-label">CPF</h3>
                  <input
                    className="field"
                    type="text"
                    name="cpf"
                    onChange={handleBody}
                  />
                </div>
                <div className="select">
                  <h3>Grupo</h3>
                  <select name="grupo" className="select" onChange={handleBody}>
                    <option value="">---</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="ESTOQUISTA">ESTOQUISTA</option>
                  </select>
                </div>
              </form>
              <div className="botao">
                <button onClick={handleUpdate}>Atualizar</button>
                {error && <p className="user-register-paragraph">{error}</p>}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
