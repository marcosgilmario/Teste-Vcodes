import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Home from "../components/home";

function Painel() {
  return (
    <>
      <div className="mt--5 App">
        <div className="mx-5 mb-2">
          <Home />
        </div>
      </div>
    </>
  );
}

export default Painel;
