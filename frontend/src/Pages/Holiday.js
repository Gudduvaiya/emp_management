import React, { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import {
  makeGetAPICall,
  makePostAPICall,
  makeDeleteAPIcall,
  makePutAPIcall,
} from "../API";

// Add Holiday Modal
const AddHolidayModal = (props) => {
  const [name, setHname] = useState("");
  const [day, setHday] = useState("");
  const [date, setHdate] = useState("");
  const sendAddHolidayData = () => {
    const reqObj = {
      urlPath: "holiday",
      data: { name, day, date },
      onSuccess: (data) => {
        console.log(data);
        toast.success(`Holiday ${data.data.name} Added Successfully!`);
        setHname("");
        setHday("");
        setHdate("");
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
            Add Holiday
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter Holiday Name"
            value={name}
            onChange={(e) => {
              setHname(e.target.value);
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
          <Button variant="success" onClick={sendAddHolidayData}>
            Add
          </Button>
          <Button variant="light" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      ;
    </>
  );
};

//Delete Holiday Modal
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

//Update Holidayy Modal
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
        props.onHide();
      },

      onFail: (err) => {
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

const Holiday = () => {
  const [holiday, setHoliday] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [addModalShow, setAddModalShow] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeletetModal] = useState(false);
  const [selectedHolidayId, setSelectedHolidayId] = useState(null);
  const [updateData, setUpdateData] = useState(null);

  const cols = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Day",
      selector: (row) => row.day,
      sortable: false,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => {
        return (
          <Button
            variant="success"
            onClick={() => {
              console.log(row);
              setSelectedHolidayId(row._id);
              setUpdateData(row);
              setUpdateModal(true);
            }}
          >
            Update
          </Button>
        );
      },
    },
    {
      name: "Action",
      // selector: (row) => setSelectedHolidayId(row._id),
      cell: (row) => {
        // console.log(row);
        // console.log(row._id);
        return (
          <Button
            onClick={() => {
              setSelectedHolidayId(row._id);
              setDeletetModal(true);
            }}
            variant="danger"
          >
            Delete
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    const reqObj = {
      urlPath: "holiday",
      onSuccess: (data) => {
        // console.log(data);
        setHoliday(data);
        setColumns(cols);
      },
      onFail: (err) => {
        console.log(err);
      },
    };
    makeGetAPICall(reqObj);
  }, []);

  //Search Filter section
  const filteredItems = holiday.filter(
    (item) => item && item.name.toLowerCase().includes(filterText.toLowerCase())
  );
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  return (
    <div>
      <h1>Holidays</h1>
      <button
        className="submitbtn"
        style={{ marginTop: "0px", position: "absolute", zIndex: "99" }}
        onClick={() => {
          setAddModalShow(true);
        }}
      >
        Add Holiday
      </button>
      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
      <AddHolidayModal
        show={addModalShow}
        onHide={() => {
          setAddModalShow(false);
        }}
      />
      <UpdateHolidayModal
        show={updateModal}
        id={selectedHolidayId}
        // data={holiday.filter((item) => item._id === selectedHolidayId)}
        data={updateData}
        onHide={() => {
          setUpdateModal(false);
        }}
      />
      <DeleteHolidayModal
        id={selectedHolidayId}
        show={deleteModal}
        close={() => {
          setDeletetModal(false);
        }}
        onHide={() => {
          setDeletetModal(false);
        }}
      />
    </div>
  );
};
export default Holiday;
