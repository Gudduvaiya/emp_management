import React, { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import Button from "react-bootstrap/Button";

import { makeGetAPICall, makePostAPICall } from "../API";
import AddHolidayModal from "./AddHolidayModal";
import UpdateHolidayModal from "./UpdateHolidatModal";
import DeleteHolidayModal from "./DeleteHolidayModal";

const Holiday = () => {
  const [holiday, setHoliday] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [addModalShow, setAddModalShow] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeletetModal] = useState(false);
  const [selectedHolidayId, setSelectedHolidayId] = useState(null);

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
        setSelectedHolidayId(row.id);
        return (
          <Button
            variant="success"
            onClick={() => {
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
      cell: () => (
        <Button
          onClick={() => {
            setDeletetModal(true);
          }}
          variant="danger"
        >
          Delete
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const reqObj = {
      urlPath: "holiday",
      onSuccess: (data) => {
        console.log(data);
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

    // Add Holiday part

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
        data={holiday.filter((item) => item.id === selectedHolidayId)}
        onHide={() => {
          setUpdateModal(false);
        }}
      />
      <DeleteHolidayModal
        show={deleteModal}
        onHide={() => {
          setDeletetModal(false);
        }}
      />
    </div>
  );
};
export default Holiday;
