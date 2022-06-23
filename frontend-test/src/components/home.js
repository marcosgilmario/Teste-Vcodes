import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardOptions, CardTitle, Col } from "../assets/styles/card";
import { DestroySearch } from "../assets/styles/home";
import api from "../services/api";
import Card from "./card";
import ModalConfirm from "./modalConfirmation";
import ModalForm from "./modalForm";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (loading === true) {
      api
        .get("/users")
        .then((response) => {
          if (response.data) {
            setUsers(response.data);
          }
        })
        .catch((err) => {
          console.log("error:", err);
          throw err;
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading]);

  const createGrid = function () {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        {users.length > 0 ? (
          users
            .filter((item) => {
              if (query === "") {
                return item;
              } else {
                return item.name.toLowerCase().includes(query.toLowerCase());
              }
            })
            .map((user, index) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                <Card user={user} auxFunc={setLoading} />
              </Grid>
            ))
        ) : (
          <CardTitle style={{ color: "white" }}>
            Nenhum usuário cadatrado
          </CardTitle>
        )}
      </Grid>
    );
  };

  const navigate = useNavigate();
  if (
    !(sessionStorage.getItem("email") && sessionStorage.getItem("password"))
  ) {
    navigate("/auth/login");
  }

  if (loading === true) {
    return (
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Carregando...</span>
      </div>
    );
  }

  return (
    <>
      <div className="navbar" style={{ marginTop: -90, marginBottom: 40 }}>
        <span></span>
        <span></span>
        <div className="search" style={{ marginTop: 80 }}>
          <div>
            <input
              type="text"
              placeholder="Buscar usuário . . ."
              value={query ? query : ""}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              required
            />
            <DestroySearch
              onClick={() => {
                setQuery("");
              }}
              hidden={query === ""}
            >
              X
            </DestroySearch>
          </div>
        </div>
        <CardOptions className="mb-4">
          <Col style={{ marginRight: "12px" }}>
            <ModalForm
              action="create"
              listData={users}
              setListData={setUsers}
            />
          </Col>
          <Col>
            <ModalConfirm action="logout" />
          </Col>
        </CardOptions>
      </div>
      {createGrid()}
    </>
  );
}
