// import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import User from "./components/User"
import Organisation from "./components/Organisation"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllUsers from "./components/AllUsers";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/user" element={<User id={localStorage.getItem('user_id')}/>}/>
          <Route path="/organisation" element={<Organisation/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/all_users" element={<AllUsers/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;