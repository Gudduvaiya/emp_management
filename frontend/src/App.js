import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Signup from './Components/Signup';
import Login from './Components/Login'
import Nav from './Components/Nav'

function App() {
  return (
    <div>
    <BrowserRouter>


    <Nav/>
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path ="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
