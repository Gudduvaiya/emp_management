import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Signup from './Components/Signup';
import Login from './Components/Login'
import Nav from './Components/Nav'
import Holiday from "./Components/Holiday"
import Profile from './Components/Profile';

function App() {
  return (
    <div>
    <BrowserRouter>


    <Nav/>
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path ="/login" element={<Login/>}/>
    <Route path ="/holiday" element={<Holiday/>}/>
    <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
