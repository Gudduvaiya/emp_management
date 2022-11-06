import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Signup from "./Components/Signup";
import Login from "./Pages/Login";
import PrivateComponent from "./Components/PrivateComponent";
import Nav from "./Components/Nav";


function App() {
  const auth = localStorage.getItem("user");
  return (
    <div style={{display:"flex"}}>
      <BrowserRouter>
      {auth?<Nav/>:<span></span>}
        <Routes>
          <Route element={<PrivateComponent />}>
            {/* <Route element={<Nav/>}/> */}
            <Route path="/" element={<h1>Yet to come</h1>} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
