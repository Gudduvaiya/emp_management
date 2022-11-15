import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { makePostAPICall } from "../../API";

const ChangePasswordModal = (props) => {
  const [password, setPassword] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const handleUpdatePassword = () => {
    const reqObj = {
      urlPath: `/user/update-pass/${props.username}`,
      data: { password, oldPassword },
      onSuccess: (data) => {
        console.log(data);
        toast.success(data.Success);
        setPassword("");
        setoldPassword("");
        props.onCancel();
      },
      onFail: (err) => {
        console.log(err);
        toast.error(err.response.data.error);
      },
    };
    makePostAPICall(reqObj);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="password"
          placeholder="Enter your old Password"
          value={oldPassword}
          onChange={({ target }) => {
            setoldPassword(target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter new Password"
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            handleUpdatePassword();
          }}
        >
          Update
        </Button>
        <Button variant="light" onClick={props.onCancel}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
