import { login } from "./utils";
import "./index.css";
import { useState } from "react";

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  function handleSubmit() {
    setLoading(true);

    login({ email, password })
      .then(() => {
        alert("Logado com sucesso!");
        setLoading(false);
      })
      .catch((error) => {
        setAuthError("Usuário ou senha incorretos!");
        setLoading(false);
        setTimeout(clearAuthError, 5000);
      });
  }

  function clearAuthError() {
    setAuthError("");
  }

  const checkStatesToDisableButton = !email || password.length < 6 || loading;

  return (
    <div className="wrapper">
      <div className="login-form">
        <h1>Login Form 🐞</h1>
        <div className="errorMessage">{authError}</div>
        <div className="row">
          <label htmlFor={"email"}>Email</label>
          <input
            id={"email"}
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={clearAuthError}
            value={email}
            autoComplete="off"
          />
        </div>
        <div className="row">
          <label htmlFor={"password"}>Password</label>
          <input
            id={"password"}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={clearAuthError}
            value={password}
          />
        </div>

        <div className="button">
          <button disabled={checkStatesToDisableButton} onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
