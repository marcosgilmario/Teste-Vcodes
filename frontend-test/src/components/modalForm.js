import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/card.js";
import { Modal } from "bootstrap";
import { useAlert } from "react-alert";
import api from "../services/api.js";
import { cpfMask, phoneMask } from "../services/masks.js";

export function ModalForm({ user, action, listData, setListData, onComplete }) {
  const modalRef = useRef();
  const message = useAlert();
  const [cpf, setCpf] = useState(`${user ? user.cpf : ""}`);
  const [name, setName] = useState(`${user ? user.name : ""}`);
  const [phone, setPhone] = useState(`${user ? user.phone : ""}`);
  const [email, setEmail] = useState(`${user ? user.email : ""}`);
  const [address, setAddress] = useState(`${user ? user.address : ""}`);

  useEffect(() => {
    if (action === "create") {
      clear();
    } else if (action === "edit") {
      setDefault();
    }
  }, [action]);

  const clear = () => {
    setCpf("");
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
  };

  const setDefault = () => {
    setCpf(user.cpf);
    setName(user.name);
    setPhone(user.phone);
    setEmail(user.email);
    setAddress(user.address);
  };

  const showModal = () => {
    const modalEle = modalRef.current;
    const bsModal = new Modal(modalEle, {
      backdrop: "static",
      keyboard: true,
    });
    bsModal.show();
  };

  const hideModal = () => {
    const modalEle = modalRef.current;
    const bsModal = Modal.getInstance(modalEle);
    if (action === "edit") {
      setDefault();
    }
    bsModal.hide();
  };

  const createUser = () => {
    if (!(cpf && name && phone && email && address)) {
      message.error("Atenção preencha todos os campos");
    } else {
      api
        .post("/users", {
          name: name,
          email: email,
          cpf: cpf,
          phone: phone,
          address: address,
        })
        .then(async (response) => {
          if (await response.data) {
            hideModal();
            message.success("Usuário cadastrado com suscesso!");
            setListData([...listData, response.data]);
            onComplete(true);
          }
        })
        .catch((err) => {
          message.error(`Erro: ${err}`);
          throw err;
        });
    }
  };

  const updateUser = () => {
    if (
      !(
        cpf.length > 0 &&
        name.length > 0 &&
        phone.length > 0 &&
        email.length > 0 &&
        address.length > 0
      )
    ) {
      message.error("Atenção preencha todos os campos");
    } else {
      api
        .put(`/users/${user.id}`, {
          name: name,
          email: email,
          cpf: cpf,
          phone: phone,
          address: address,
        })
        .then(async (response) => {
          if (await response.data) {
            hideModal();
            onComplete(true);
            message.success(response.data.msg);
          }
        })
        .catch((err) => {
          message.error(`Erro: ${err.msg}`);
          throw err;
        });
    }
  };

  const handlePhone = (e) => {
    return phoneMask(e.target.value);
  };

  const handleCPF = (e) => {
    return cpfMask(e.target.value);
  };

  return (
    <div className="addEmployee">
      <button
        type="button"
        className="BaseButton button--blue js-message-btn"
        onClick={showModal}
      >
        {action === "edit" ? "Editar" : "Novo Usuário"}
      </button>
      <div className="modal fade" ref={modalRef} tabIndex="-2">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {user && action === "edit"
                  ? `Editar usuário: ${user.name}`
                  : "Criar Novo Usuário"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={hideModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <div className="mb-3">
                <label className="float-left">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Insira o nome"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="float-left">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="people@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="float-left">Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(00) 90000-0000"
                  value={phone}
                  maxLength="15"
                  minLength={15}
                  onChange={(e) => {
                    setPhone(handlePhone(e));
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="float-left">CPF</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  value={cpf}
                  onChange={(e) => {
                    setCpf(handleCPF(e));
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="float-left">Endereço</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rua ..."
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="BaseButton button--orange"
                onClick={hideModal}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  action === "create" ? createUser() : updateUser();
                }}
                // disabled={!(cpf && name && phone && email && address)}
                type="button"
                className="BaseButton button--blue"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalForm;

ModalForm.propTypes = {
  user: PropTypes.object,
  action: PropTypes.string.isRequired,
  listData: PropTypes.array,
  setListData: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

ModalForm.defaultProps = {
  user: {},
  action: "",
  listData: [],
  setListData: function () {
    return null;
  },
  onComplete: function () {
    return null;
  },
};
