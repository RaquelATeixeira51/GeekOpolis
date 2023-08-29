import * as React from 'react';
import '../../assets/css/reset.css';
import './index.css'

function Login() {
  return (
    <div className='fundo'>
      <section className='login'>
        <div className='componentes'>
          <h3>E-mail</h3>
          <input></input>
        </div>
        <div className='componentes2'>
          <h3>Senha</h3>
          <input></input>
          <h2>Esqueceu a senha?</h2>
        </div>
        <div className='entrar'>
            <button>Entrar</button>
        </div>
        <p>ou</p>
        <div className='cadastrar'>
            <button>Cadastrar</button>
        </div>
      </section>
    </div>
  );
}

export default Login;
