import React, { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "../Components/FilterComponent";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import {
  makeGetAPICall,
  makePostAPICall,
  makeDeleteAPIcall,
  makePutAPIcall,
} from "../API";
import { DeleteConfirmationModal } from "../Components/Modals";

// import DeleteConfirmationModal from "../Components/Modals/DeleteConfirmationModal";

const Holiday = () => {
  const [holidays, setHolidays] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedHolidayId, setSelectedHolidayId] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const isAdmin = JSON.parse(localStorage.getItem("user")).is_admin;

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
              setIsEditing(true);
              setSelectedHolidayId(row._id);
              setName(row.name);
              setDay(row.day);
              setDate(row.date);
              setIsAddEditModalVisible(true);
            }}
          >
            Edit
          </Button>
        );
      },
    },

    {
      name: "Action",
      cell: (row) => {
        return (
          <Button
            onClick={() => {
              setSelectedHolidayId(row._id);
              setIsDeleteModalVisible(true);
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
    fetchHolidays();
  }, []);

  const fetchHolidays = () => {
    const reqObj = {
      urlPath: "holiday",
      onSuccess: (data) => {
        setHolidays(data);
        setColumns(cols);
      },
      onFail: (err) => {
        console.log(err);
      },
    };
    makeGetAPICall(reqObj);
  };

  //Search Filter section
  const filteredItems = holidays.filter(
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

  const hideAddEditModal = () => {
    setIsAddEditModalVisible(false);
    if (isEditing) setIsEditing(false);
    setName("");
    setDay("");
    setDate("");
  };

  const handleAddEdit = () => {
    if (isEditing) {
      const reqObj = {
        urlPath: `holiday/update/${selectedHolidayId}`,
        data: { name, day, date },
        onSuccess: (data) => {
          toast.success(`Holiday Updated Successfully!`);
          hideAddEditModal();
          fetchHolidays();
        },
        onFail: (err) => {
          toast.error(err.response.data.Error);
          toast.warning(err.response.data.error);
        },
      };
      makePutAPIcall(reqObj);
    } else {
      const reqObj = {
        urlPath: "holiday",
        data: { name, day, date },
        onSuccess: (data) => {
          toast.success(`Holiday ${data.data.name} Added Successfully!`);
          hideAddEditModal();
          fetchHolidays();
        },
        onFail: (err) => {
          console.log(err);
          toast.error(err.response.data.Error);
          toast.error(err.response.data.error);
        },
      };
      makePostAPICall(reqObj);
    }
  };

  const handleDelete = () => {
    const reqObj = {
      urlPath: `holiday/remove/${selectedHolidayId}`,
      onSuccess: (data) => {
        console.log(data);
        toast.success(`Holiday Deleted Successfully!`);
        setIsDeleteModalVisible(false);
        fetchHolidays();
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
    <div>
      <h1>Holidays</h1>
      {isAdmin ? (
        <button
          className="submitbtn"
          style={{ marginTop: "0px", position: "absolute", zIndex: "99" }}
          onClick={() => {
            setIsAddEditModalVisible(true);
          }}
        >
          Add Holiday
        </button>
      ) : (
        <span></span>
      )}
      <DataTable
        columns={isAdmin ? columns : columns.slice(0, 3)}
        data={filteredItems}
        pagination
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
      />
      <Modal
        show={isAddEditModalVisible}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {isEditing ? "Edit" : "Add"} Holiday
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Enter Holiday Name"
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter Holiday Day"
            value={day}
            onChange={({ target }) => {
              setDay(target.value);
            }}
          />
          <input
            type="date"
            placeholder="Enter Holiday Date"
            value={date}
            onChange={({ target }) => {
              setDate(target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleAddEdit}>
            {isEditing ? "Update" : "Add"}
          </Button>
          <Button variant="light" onClick={hideAddEditModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <DeleteConfirmationModal
        show={isDeleteModalVisible}
        body={`The Holiday named ${
          holidays.filter((item) => item._id === selectedHolidayId)[0]?.name
        } will be deleted and this action is irreversible!`}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
    </div>
  );
};
export default Holiday;
