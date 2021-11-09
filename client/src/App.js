import './App.css';
import Dashboard from './components/dashboard/dashboard';
import { BrowserRouter, Route, Routes} from 'react-router-dom';


function App() {
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
