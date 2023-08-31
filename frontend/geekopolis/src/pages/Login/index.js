import "./index.css";
import * as React from "react";
import Header from "../../components/Header";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const [redirect, setRedirect] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleLogin = () => {
    fetch(`http://localhost:8080/usuario/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current.value,
        senha: passwordRef.current.value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          setError("Erro ao logar, tente novamente");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data);
        setRedirect("/");
      })
      .catch((err) => {
        console.log(err);
        setError("Erro ao logar, tente novamente");
      });
  };

  if (redirect !== "") return <Navigate to={redirect} />;

  return (
    <>
      <Header />
      <main>
      <div className="modal">
        <section className="login">
          <div className="componentes">
            <h3 className="field-label">Email</h3>
            <input className="field" type="email" name="email" ref={emailRef} />
          </div>
          <div className="componentes2">
            <h3 className="field-label">Senha</h3>
            <input
              className="field"
              type="password"
              name="senha"
              ref={passwordRef}
            />
            {/* <h2>Esqueceu a senha?</h2> */}
          </div>
          <div className="entrar">
            <button className="login-button" onClick={handleLogin}>Entrar</button>
          </div>
          <p className="login-paragraph">ou</p>
          <div className="cadastrar">
            <button className="login-button">
              <Link to='/cadastro-usuario' className="login-anchor">Cadastrar</Link>
            </button>
            {error && <p className="user-login-paragraph">{error}</p>}
          </div>
        </section>
      </div>
      </main>
    </>
  );
}
