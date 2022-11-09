import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
// import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import { makeGetAPICall } from "../API";
// import DataTable from "datatables.net";

const User = () => {
  const [users, setUsers] = useState([]);
  const tableRef = useRef();

  $.DataTable = require("datatables.net");
  useEffect(() => {
    // console.log(tableRef.current);
    const reqObj = {
      urlPath: "user",
      onSuccess: (data) => {
        console.log(data);
        setUsers(data);

        setTimeout(() => {
          $(tableRef.current).DataTable();
        }, 1000);
        //datatable code
        // const table = $(tableRef.current).DataTable({
        //   data: data,
        //   columns: [
        //     { title: "Username." },
        //     { title: "Name" },
        //     { title: "E-mail" },
        //     { title: "Joining Date" },
        //     { title: "Designation" },
        //   ],
        //   destroy: true,
        // });
        // return function () {
        //   console.log("Table destroyed");
        //   table.destroy();
        // };
      },
      onFail: (err) => {
        console.log(err);
      },
    };
    makeGetAPICall(reqObj);
  }, []);
  return (
    <div>
      <h1>Users</h1>
      <table className="display" width="100%" ref={tableRef} id="usersTable">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Admin</th>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default User;
