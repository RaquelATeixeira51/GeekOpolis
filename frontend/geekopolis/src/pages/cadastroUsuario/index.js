import "./index.css";
import * as React from "react";
import Header from "../../components/Header";
import { Navigate } from "react-router-dom";
import { validate as validateCPF} from 'gerador-validador-cpf';

export default function CadastroUsuario() {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const passwordConfirmationRef = React.createRef();
  const nameRef = React.createRef();
  const cpfRef = React.createRef();
  const groupRef = React.createRef();

  const [redirect, setRedirect] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleRegister = () => {
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      setError("As senhas não coincidem");
      return;
    }

    debugger;
    if (!validateCPF(cpfRef.current.value)) {
      setError("Cpf inválido!");
      return;
    }

    fetch(`http://localhost:8080/usuario/incluiAcesso`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: `${nameRef.current.value}`.trim(),
        email: `${emailRef.current.value}`.trim(),
        senha: `${passwordRef.current.value}`.trim(),
        grupo: `${groupRef.current.value}`.trim(),
        cpf: `${cpfRef.current.value}`.trim(),
        ativo: true
      }),
    })
      .then((response) => {
        if (response.ok) {
          setRedirect("/login");
          return response.json();
        } else {
          setError(
            response.status === 400
              ? "Email já cadastrado"
              : "Erro ao cadastrar, tente novamente"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        setError("Erro ao cadastrar, tente novamente");
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
              <input className="field" type="text" name="nome" ref={nameRef} />
              <h3 className="field-label">Email</h3>
              <input
                className="field"
                type="email"
                name="email"
                ref={emailRef}
              />
              <h3 className="field-label">Senha</h3>
              <input
                className="field"
                type="password"
                name="senha"
                ref={passwordRef}
              />
              <h3 className="field-label">Confirmar Senha</h3>
              <input
                className="field"
                type="password"
                name="confirmeSenha"
                ref={passwordConfirmationRef}
              />
              <form className="dupla">
                <div>
                  <h3 className="field-label">CPF</h3>
                  <input
                    className="field"
                    type="text"
                    name="cpf"
                    ref={cpfRef}
                  />
                </div>
                <div className="select">
                  <h3 className="field-label" id="import">Grupo</h3>
                  <select name="grupo" className="select" ref={groupRef}>
                    <option value="">---</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="ESTOQUISTA">ESTOQUISTA</option>
                  </select>
                </div>
              </form>
              <div className="botao">
                <button className="submit-button" onClick={handleRegister}>
                  Cadastrar
                </button>
                {error && <p className="user-register-paragraph">{error}</p>}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
