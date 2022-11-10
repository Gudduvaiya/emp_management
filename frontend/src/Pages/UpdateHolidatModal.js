import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { makePutAPIcall } from "../API";

function UpdateHolidayModal(props) {
  const [name, setHname] = useState("");
  const [day, setHday] = useState("");
  const [date, setHdate] = useState("");

  useEffect(() => {
    console.log(props.data);
    if (props.data) {
      setHname(props.data.name);
      setHday(props.data.day);
      setHdate(props.data.date);
    }
  }, [props.data]);
  const sendData = () => {
    const reqObj = {
      urlPath: `holiday/update/${props.id}`,
      data: { name, day, date },
      onSuccess: (data) => {
        console.log(data);
        toast.success(`Holiday Updated Successfully!`);
      },

      onFail: (err) => {
        console.log(err);
        console.log(props.data.name);
        toast.error(err.response.data.Error);
        toast.warning(err.response.data.error);
      },
    };
    makePutAPIcall(reqObj);
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
            // value={name}
            defaultValue={name}
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
