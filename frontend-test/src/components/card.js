import React from "react";
import PropTypes from "prop-types";
import "../assets/styles/card.js";
import {
  CardContent,
  CardHeader,
  CardInfo,
  CardItem,
  CardOptions,
  CardTitle,
  Col,
  PrimaryLabel,
  SecondaryLabel,
} from "../assets/styles/card.js";
import ModalForm from "./modalForm.js";
import ModalConfirm from "./modalConfirmation.js";

const Card = ({user, auxFunc}) => {
  return (
    <>
      <CardContent>
        <CardHeader>
          <PrimaryLabel>{user.name}</PrimaryLabel>
          <CardInfo>
            <CardItem>
              <CardTitle>
                {String(user.cpf).replaceAll(
                  user.cpf.substring(3, 10),
                  ".***.**"
                )}
              </CardTitle>
              <SecondaryLabel>{user.email}</SecondaryLabel>
            </CardItem>
          </CardInfo>
          <CardOptions className="CardOptions">
            <Col className="profile-card-ctr">
              <ModalForm user={user} onComplete={auxFunc} action="edit" />
            </Col>
            <Col>
              <ModalConfirm user={user}  onComplete={auxFunc} action="delete" />
            </Col>
          </CardOptions>
        </CardHeader>
      </CardContent>
    </>
  );
};
export default Card;

Card.propTypes = {
  user: PropTypes.object.isRequired,
  auxFunc: PropTypes.func.isRequired,
};

