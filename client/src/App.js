import './App.css';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/authentication/login';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import React from "react";

function App() {

  return (
    <div className="App">
        <h1> HI </h1>
        <Login/>

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
