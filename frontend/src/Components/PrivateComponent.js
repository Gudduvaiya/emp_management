import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateComponent = () => {
  return localStorage.getItem("user") ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateComponent;
