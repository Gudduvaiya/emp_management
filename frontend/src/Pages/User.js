import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import {
  makeGetAPICall,
  makeDeleteAPIcall,
  makePostAPICall,
  makePutAPIcall,
} from "../API";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { toast } from "react-toastify";

import { DeleteConfirmationModal } from "../Components/Modals";

const User = () => {
  const [users, setUsers] = useState([]);
  const [DeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [AddEditModalVisible, setAddEditModalVisible] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [isAdding, setisAdding] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [desigation, setDesigation] = useState("");
  const [joined_on, setjoined_on] = useState("");
  const [password, setPassword] = useState("");
  const tableRef = useRef();

  $.DataTable = require("datatables.net");
  useEffect(() => {
    const reqObj = {
      urlPath: "user",
      onSuccess: (data) => {
        console.log(data);
        setUsers(data);

        setTimeout(() => {
          $(tableRef.current).DataTable();
        }, 1000);
      },
      onFail: (err) => {
        console.log(err);
      },
    };
    makeGetAPICall(reqObj);
  }, []);

  // fetch all user API
  const FetchUsers = () => {
    const reqObj = {
      urlPath: "user",
      onSuccess: (data) => {
        console.log(data);
        setUsers(data);
      },
    };
    makeGetAPICall(reqObj);
  };
  //Delte API call
  const HandleDeleteonClick = () => {
    const reqObj = {
      urlPath: `user/remove/${selectedUsername}`,
      onSuccess: (data) => {
        toast.success("User Removed Successfully!");
        setDeleteModalVisible(false);
        FetchUsers();
      },
      onFail: (err) => {
        alert(err);
      },
    };
    makeDeleteAPIcall(reqObj);
  };
  // Add/update User API call
  const HandleAddEditonClick = () => {
    if (isAdding) {
      const reqObj = {
        urlPath: "user",
        data: { name, email, desigation, password, username, joined_on },
        onSuccess: (data) => {
          console.log(data);
          toast.success(data.message);
          FetchUsers();
        },
        onFail: (err) => {
          console.log(err);
          toast.error(err.response.data.description);
          toast.error(err.response.data.error);
        },
      };
      makePostAPICall(reqObj);
    } else {
      const reqObj = {
        urlPath: `user/update/${selectedUsername}`,
        data: { name, desigation, username },
        onSuccess: (data) => {
          console.log(data);
          toast.success(data.data);
          FetchUsers();
          setAddEditModalVisible(false);
        },
        onFail: (err) => {
          console.log(err);
          toast.error(err.response.data.description);
          toast.warning(err.response.data.error);
        },
      };
      makePutAPIcall(reqObj);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <Button
        variant="info mb-3"
        onClick={() => {
          setAddEditModalVisible(true);
          setisAdding(true);
        }}
      >
        Add User
      </Button>
      <table className="display" width="100%" ref={tableRef} id="usersTable">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Admin</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return (
              <tr>
                <td>{item.username}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.desigation}</td>
                <td>{item.is_admin ? "Yes" : "No"}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => {
                      setAddEditModalVisible(true);
                      setSelectedUsername(item.username);
                      setisAdding(false);
                      setUsername(item.username);
                      setName(item.name);
                      setDesigation(item.desigation);
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setDeleteModalVisible(true);
                      setSelectedUsername(item.username);
                    }}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Add/edit modal */}
      <Modal
        show={AddEditModalVisible}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {isAdding ? "Add" : "Update"} User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isAdding ? (
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
          ) : (
            <span></span>
          )}
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter Designation"
            value={desigation}
            onChange={({ target }) => {
              setDesigation(target.value);
            }}
          />
          {isAdding ? (
            <>
              <input
                type="date"
                placeholder="Enter Joining Date"
                value={joined_on}
                onChange={({ target }) => {
                  setjoined_on(target.value);
                }}
              />

              <input
                type="email"
                placeholder="Enter e-mail"
                value={email}
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
              />
            </>
          ) : (
            <span></span>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              HandleAddEditonClick();
            }}
          >
            {isAdding ? "Add" : "Update"}
          </Button>
          <Button
            variant="light"
            onClick={() => {
              setAddEditModalVisible(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <DeleteConfirmationModal
        title="Remoove User"
        body={`Are you sure! User named ${
          users.filter((item) => item.username === selectedUsername)[0]?.name
        } will be deleted Permanently!`}
        show={DeleteModalVisible}
        onCancel={() => {
          setDeleteModalVisible(false);
        }}
        onConfirm={HandleDeleteonClick}
        purposeBtn="Remove"
      />
    </div>
  );
};
export default User;
