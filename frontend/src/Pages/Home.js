import React, { useEffect, useState } from "react";
import { makeGetAPICall } from "../API";

const Home = () => {
  const [numUsers, setNumUsers] = useState(0);
  const [numAdmins, setNumAdmins] = useState(0);
  const [numEmployees, setEmployees] = useState(0);
  const isAdmin = JSON.parse(localStorage.getItem("user")).is_admin;

  useEffect(() => {
    const requestObject = {
      urlPath: "user",
      onSuccess: (data) => {
        setNumUsers(data.length);
        setNumAdmins(data.filter((item) => item.is_admin).length);
        setEmployees(data.filter((item) => !item.is_admin).length);
      },

      onFail: (error) => {
        console.error(error?.response?.data);
      },
    };
    makeGetAPICall(requestObject);
  }, []);

  return (
    <>
      <h1>
        WELCOME{" "}
        <span style={{ color: "#e80d54" }}>
          {JSON.parse(localStorage.getItem("user")).name}
        </span>{" "}
      </h1>
      {isAdmin && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="card width-30">
              <p>{numUsers}</p>
              <h2>Users</h2>
            </div>
            <div className="card width-30">
              <p>{numAdmins}</p>
              <h2>Admins</h2>
            </div>
            <div className="card width-30">
              <p>{numEmployees}</p>
              <h2>Employees</h2>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Home;
