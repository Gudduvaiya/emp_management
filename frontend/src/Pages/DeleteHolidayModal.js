import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { makeDeleteAPIcall } from "../API";

function DeleteHolidayModal(props) {
  const sendData = () => {
    const reqObj = {
      urlPath: `holiday/remove/${props.id}`,
      //   data: { name, day, date },
      onSuccess: (data) => {
        console.log(data);
        toast.success(`Holiday Deleted Successfully!`);
        {
          props.close();
        }
      },

      onFail: (err) => {
        console.log(err);
        toast.error(err.response.data.Error);
        toast.error(err.response.data.error);
      },
    };
    makeDeleteAPIcall(reqObj);
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Holiday
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to Delete this Holiday ???</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={sendData}>
            Delete
          </Button>
          <Button variant="light" onClick={props.close}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteHolidayModal;
