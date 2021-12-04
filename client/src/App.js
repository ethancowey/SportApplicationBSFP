import './App.css';
import Feed from './components/dashboard/feed';
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
              <Route path="/dashboard" element={<Feed />}>

              </Route>
              <Route path="/post" element={<Post />}>

              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
