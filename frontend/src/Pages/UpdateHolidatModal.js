import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { makePostAPICall } from "../API";

function UpdateHolidayModal(props) {
  const [name, setHname] = useState(props.data.name);
  const [day, setHday] = useState("");
  const [date, setHdate] = useState("");

  const sendData = () => {
    const reqObj = {
      urlPath: `holiday/update/${props.id}`,
      data: { name, day, date },
      onSuccess: (data) => {
        console.log(data);
        toast.success(`Holiday ${data.data.name} Updated Successfully!`);
        // setHname(data.data.name);
        // setHday(data.data.day);
        // setHdate(data.data.date);
      },

      onFail: (err) => {
        console.log(err);
        toast.error(err.response.data.Error);
        toast.error(err.response.data.error);
      },
    };
    makePostAPICall(reqObj);
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
            Update Holiday
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter Holiday Name"
            value={name}
            // defaultValue={props.data.name}
            onChange={(e) => {
              setHname(e.target.value);
              //   console.log(name);
            }}
          />
          <input
            type="text"
            placeholder="Enter Holiday Day"
            value={day}
            onChange={(e) => {
              setHday(e.target.value);
            }}
          />
          <input
            type="date"
            placeholder="Enter Holiday Date"
            value={date}
            onChange={(e) => {
              setHdate(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={sendData}>
            Update
          </Button>
          <Button variant="light" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateHolidayModal;
