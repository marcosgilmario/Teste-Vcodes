import React from "react";
import { useNavigate } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Login from "../components/login";

function Auth() {
  const navigate =useNavigate();
  if(!(sessionStorage.getItem("email") && sessionStorage.getItem("passeord"))){
    navigate("/auth/login")
  }
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <div className="navbar-brand">TESTE VCODES</div>
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Auth;
