import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ChangePasswordModal from "../Components/Modals/ChangePasswordModal";
function Profile() {
  let udtls = JSON.parse(localStorage.getItem("user"));
  const [CPasswordModalVisible, setCPasswordModalVisible] = useState(false);
  const styleObj = {
    color: "#18e318",
    fontWeight: "400",
    textDecoration: "underline",
    fontStyle: "italic",
    cursor: "pointer",
  };
  const chpBtn = {
    right: "21px",
    position: "absolute",
  };

  //update password PI call
  // const handleUpdatePassword = () => {
  //   const reqObj = {
  //     urlPath: `/user/update-pass/${udtls.username}`,
  //     data: { password, oldPassword },
  //     onSuccess: (data) => {
  //       console.log(data);
  //       toast.success(data.Success);
  //       setPassword("");
  //       setoldPassword("");
  //       setCPasswordModalVisible(false);
  //     },
  //     onFail: (err) => {
  //       console.log(err);
  //       toast.error(err.response.data.error);
  //     },
  //   };
  //   makePostAPICall(reqObj);
  // };
  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Profile</h1>
      <h2>
        You are <span style={styleObj}>{udtls.name}</span>
      </h2>
      <h2>
        Your username is <span style={styleObj}>{udtls.username}</span>
      </h2>
      <h2>
        Your are working as a <span style={styleObj}>{udtls.desigation}</span>
      </h2>

      <h2>
        Your e-mail id is <span style={styleObj}>{udtls.email}</span>
      </h2>
      <h2>
        You Joined on <span style={styleObj}>{udtls.joined_on}</span>
      </h2>
      <Button
        style={chpBtn}
        variant="success"
        onClick={() => {
          setCPasswordModalVisible(true);
        }}
      >
        Change Password
      </Button>

      <ChangePasswordModal
        show={CPasswordModalVisible}
        username={udtls.username}
        onCancel={() => {
          setCPasswordModalVisible(false);
        }}
      />
    </div>
  );
}
export default Profile;
