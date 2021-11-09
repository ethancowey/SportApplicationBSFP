import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/authentication/login';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import React from "react";


function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

function App() {
    const token = getToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

  return (
    <div className="App">
        <h1> HI </h1>

      <BrowserRouter>
          <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
          </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
