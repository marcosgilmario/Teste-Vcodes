import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import encrypt from "../services/encrypt";
import { useAuth } from "../services/useAuth";

export default function Login() {
  const message = useAlert();

  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handdleLogin = () => {
    setLoading(true);
    if (!email) {
      message.show("Insira um email válido");
    }
    if (!password) {
      message.show("Insira uma senha válida");
    }

    api
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data) {
          sessionStorage.setItem("email", encrypt(email));
          sessionStorage.setItem("password", encrypt(password));
          login().then(() => {
            navigate(state?.path || "/panel/home");
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        message.error("Erro ao fazer login :(");
        throw err;
      });
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div>
      <h3>Bem vindo - Login</h3>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Insira o email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="mb-3">
        <label>Senha</label>
        <input
          type="password"
          className="form-control"
          placeholder="Insira a senha"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="d-grid mt-5">
        {loading === false ? (
          <button
            className="btn  BaseButton button--blue"
            style={{ width: "60%", marginLeft: "20%" }}
            onClick={() => {
              handdleLogin();
            }}
          >
            ENTRAR
          </button>
        ) : (
          <div className="spinner-border text-info" role="status">
            <span className="sr-only">Carregando...</span>
          </div>
        )}
      </div>
    </div>
  );
}
