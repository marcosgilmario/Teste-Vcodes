import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "../assets/styles/card.js";
import { Modal } from "bootstrap";
import { PrimaryLabel } from "../assets/styles/card.js";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAlert } from "react-alert";
import { useAuth } from "../services/useAuth.js";

export function ModalConfirm({
  user,
  action,
  listData,
  setListData,
  onComplete,
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const modalRef = useRef();
  const message = useAlert();
  const [out, getOut] = useState(false);

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
    bsModal.hide();
  };

  const handdleLogout = () => {
    sessionStorage.clear();
    if (
      !(sessionStorage.getItem("email") && sessionStorage.getItem("password"))
    ) {
      logout();
      getOut(true);
      window.location.reload();
    }
  };

  const deleteUser = () => {
    api
      .delete(`/users/${user.id}`)
      .then((response) => {
        if (response.data) {
          message.success(`${response.data.msg}`);
          hideModal();
          setListData(
            listData.filter((data) => {
              return data.id !== user.id;
            })
          );
          onComplete(true)
        }
      })
      .catch((err) => {
        message.error(`${err.msg}`);
        throw err;
      });
  };

  useEffect(() => {
    if (out === true) {
      navigate("/auth/login");
      window.location.reload();
    }
  }, [navigate, out]);

  return (
    <div className="addEmployee">
      <button
        type="button"
        className="BaseButton button--orange js-message-btn round"
        onClick={showModal}
      >
        {action === "logout" ? "Sair" : "Excluir"}
      </button>
      <div className="modal fade" ref={modalRef} tabIndex="-2">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {action === "logout" ? "Encerrar sessão" : `Excluir usuário`}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={hideModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <PrimaryLabel>
                {" "}
                {action === "logout"
                  ? "Deseja realmente sair?"
                  : "Deseja realmete excluir o usuário?"}
              </PrimaryLabel>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="BaseButton button--gray"
                onClick={hideModal}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (action === "logout") {
                    return handdleLogout();
                  } else {
                    return deleteUser();
                  }
                }}
                type="button"
                className="BaseButton button--orange"
              >
                {action === "logout" ? "Sair" : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalConfirm;

ModalConfirm.propTypes = {
  user: PropTypes.object,
  action: PropTypes.string.isRequired,
  listData: PropTypes.array,
  setListData: PropTypes.func,
  onComplete: PropTypes.func,
};

ModalConfirm.defaultProps = {
  user: {},
  action: "",
  listData: [],
  setListData: function(){return null},
  onComplete: function(){return null}
};
