import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/authentication/login';
import Register from './components/authentication/register'
import Post from './components/dashboard/makePost'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from "react"



function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />}>

              </Route>
              <Route path="/register" element={<Register />}>

              </Route>
              <Route path="/dashboard" element={<Dashboard />}>

              </Route>
              <Route path="/post" element={<Post />}>

              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
